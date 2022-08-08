import { HttpErrorResponse } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ReplaySubject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { IAuthResponse } from "../auth/interfaces/auth.interface";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	loginForm = this.fb.nonNullable.group({
		identifier: this.fb.control<string>("", {
			validators: [Validators.required, Validators.minLength(4)],
		}),
		password: this.fb.control<string>("", {
			validators: Validators.required,
		}),
		totp: this.fb.control<string | null>(null, {
			validators: [
				Validators.pattern(/^[0-9]{6}$/),
				Validators.minLength(6),
				Validators.maxLength(6),
			],
		}),
	});

	loginSubmissionInProcess = new ReplaySubject<boolean>();
	loginErrors?: IAuthResponse;

	needsTotp = false;

	constructor(
		private readonly fb: FormBuilder,
		private readonly authService: AuthService,
		private readonly cdr: ChangeDetectorRef,
		private readonly router: Router
	) {}

	submitLogin(): void {
		this.loginSubmissionInProcess.next(true);
		this.loginErrors = {};

		this.authService
			.login({
				identifier: this.loginForm.controls["identifier"].value!,
				password: this.loginForm.controls["password"].value!,
				totp: this.loginForm.value.totp!,
			})
			.subscribe({
				next: (resp: IAuthResponse) => {
					if (resp?.totpCodeRequired) {
						// disable controls with previously entered data
						this.loginForm.controls["identifier"].disable();
						this.loginForm.controls["password"].disable();

						this.loginForm.controls["totp"].addValidators(
							Validators.required
						);

						this.needsTotp = true;
						this.cdr.detectChanges();
					} else if (resp.resetTwoFa) {
						setTimeout(() => this.router.navigateByUrl("."), 2000);
						this.loginErrors!.message = resp.message;
					} else if (resp.invalidCredentials) {
						this.loginErrors!.message = "Invalid credentials!";
					} else if (resp?.message)
						this.loginErrors!.message = resp.message;
					else {
						this.loginErrors!.message =
							resp.message ||
							"Unknown error (check response in console).";
						this.router.navigateByUrl("/");
					}

					this.loginSubmissionInProcess.next(false);
				},
			});
	}

	ngOnInit(): void {}
}
