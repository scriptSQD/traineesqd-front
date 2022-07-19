import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { map, of, ReplaySubject, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";
import * as CryptoJS from "crypto-js";
import * as QRCode from "qrcode";
import { FormBuilder, FormControl, Validators } from "@angular/forms";

@Component({
	selector: "app-account",
	templateUrl: "./account.component.html",
	styleUrls: ["./account.component.scss"],
})
export class AccountComponent {
	totpForm = this.fb.nonNullable.group({
		totpCode: new FormControl<string>("", {
			validators: [Validators.required, Validators.pattern(/^[0-9]{6}$/)],
		}),
	});

	twoFaRegSuccess?: boolean;
	regErrors?: string;

	qrRendered = false;
	requestingQr = new ReplaySubject<boolean>();

	constructor(
		public readonly authService: AuthService,
		private readonly http: HttpClient,
		private readonly fb: FormBuilder
	) {}

	totpSubmitted(): void {
		this.regErrors = undefined;
		this.twoFaRegSuccess = undefined;

		this.http
			.post<boolean | HttpErrorResponse>(
				`${environment.backend_url}/2fa/register`,
				{
					token: this.totpForm.controls.totpCode.value,
				}
			)
			.pipe(
				map(res => {
					if (typeof res === "boolean") {
						this.twoFaRegSuccess = true;
						window.location.reload();
					} else this.regErrors = res.message;
				})
			)
			.subscribe();
	}

	requestQrCode(): void {
		this.qrRendered = false;
		this.requestingQr.next(true);

		this.http
			.get<{
				encryptedHexified: string;
				iv: string;
			}>(`${environment.backend_url}/2fa/getUri`, {
				headers: { Authorization: `Bearer ${this.authService.jwt}` },
			})
			.pipe(
				switchMap(res => {
					const { encryptedHexified, iv } = res;

					const decrypted = CryptoJS.AES.decrypt(
						encryptedHexified,
						environment.cipher_key,
						{ iv: CryptoJS.enc.Hex.parse(iv) }
					);

					return of(decrypted.toString(CryptoJS.enc.Utf8));
				})
			)
			.subscribe({
				next: (uri: string) => {
					QRCode.toCanvas(document.getElementById("qrCanvas"), uri);

					this.qrRendered = true;
					this.requestingQr.next(false);
				},
			});
	}
}
