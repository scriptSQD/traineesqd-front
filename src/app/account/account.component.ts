import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { lastValueFrom, ReplaySubject } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";
import * as CryptoJS from "crypto-js";
import * as QRCode from "qrcode";
import { FormControl, Validators } from "@angular/forms";

@Component({
    selector: "app-account",
    templateUrl: "./account.component.html",
    styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
    constructor(public as: AuthService, private http: HttpClient) {}

    ngOnInit(): void {}
    shout(msg: string): void {
        console.log(msg);
    }

    totpCodeControl: FormControl = new FormControl<string>("", {
        validators: [Validators.required, Validators.pattern(/^[0-9]{6}$/)],
    });
    twoFaRegSuccess?: boolean;
    regErrors?: string;
    async totpSubmitted(): Promise<void> {
        this.regErrors = undefined;
        this.twoFaRegSuccess = undefined;

        const twoFaRegistered = await lastValueFrom(
            this.http.post<boolean>(
                `${environment.backend_url}/2fa/register`,
                {
                    token: this.totpCodeControl.value,
                },
                {
                    headers: { Authorization: `Bearer ${this.as.jwt}` },
                }
            )
        ).catch(e => {
            if (e.status === 400) {
                this.regErrors = "Invalid OTP code!";
            }
        });

        if (twoFaRegistered) {
            this.twoFaRegSuccess = true;
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else this.twoFaRegSuccess = false;
    }

    qrRendered: boolean = false;
    requestingQr: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    async requestQrCode(): Promise<void> {
        this.qrRendered = false;
        this.requestingQr.next(true);
        const encHex = await lastValueFrom(
            this.http.get<{
                encryptedHexified: string;
                iv: string;
            }>(`${environment.backend_url}/2fa/getUri`, {
                headers: { Authorization: `Bearer ${this.as.jwt}` },
            })
        );

        const dec = CryptoJS.AES.decrypt(
            encHex.encryptedHexified,
            environment.cipher_key,
            {
                iv: CryptoJS.enc.Hex.parse(encHex.iv),
            }
        );

        QRCode.toCanvas(
            document.getElementById("qrCanvas"),
            dec.toString(CryptoJS.enc.Utf8)
        );
        this.qrRendered = true;
        this.requestingQr.next(false);
    }
}
