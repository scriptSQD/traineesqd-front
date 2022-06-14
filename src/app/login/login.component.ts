import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { ReplaySubject } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    constructor(
        private readonly fb: FormBuilder,
        private readonly as: AuthService
    ) {}

    loginForm: FormGroup = this.fb.nonNullable.group({
        username: new FormControl<string>("", {
            validators: [Validators.required, Validators.minLength(4)],
        }),
        password: new FormControl<string>("", {
            validators: Validators.required,
        }),
    });

    loginSubmissionInProcess: ReplaySubject<boolean> =
        new ReplaySubject<boolean>();
    loginErrors?: HttpErrorResponse | null;

    needsTotp: boolean = false;

    async submitLogin(): Promise<void> {
        this.loginSubmissionInProcess.next(true);

        const res = await this.as.login({
            username: this.loginForm.controls["username"].value,
            password: this.loginForm.controls["password"].value,
            totp: this.needsTotp ? this.loginForm.value.totp : undefined,
        });

        if (!res) {
            console.log("login went smoothly");
            this.loginSubmissionInProcess.next(false);
            this.loginErrors = null;
            return;
        }

        if (res.error.error.totpCodeRequired) {
            // disable controls with previously entered data
            this.loginForm.controls["username"].disable();
            this.loginForm.controls["password"].disable();

            // add new control for totp code
            this.loginForm.addControl(
                "totp",
                new FormControl<string>("", {
                    validators: [
                        Validators.required,
                        Validators.pattern(/^[0-9]{6}$/),
                    ],
                })
            );
            this.needsTotp = true;
        }

        this.loginErrors = res.error;
        this.loginSubmissionInProcess.next(false);
    }

    ngOnInit(): void {}
}
