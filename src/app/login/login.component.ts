import { HttpErrorResponse } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ReplaySubject } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	loginForm = this.fb.nonNullable.group({
		username: new FormControl<string>("", {
			validators: [Validators.required, Validators.minLength(4)],
		}),
		password: new FormControl<string>("", {
			validators: Validators.required,
		}),
		totp: new FormControl<string | null>(null, {
			validators: [Validators.pattern(/^[0-9]{6}$/)],
		}),
	});

	loginSubmissionInProcess = new ReplaySubject<boolean>();
	loginErrors?: HttpErrorResponse | null;

	needsTotp = false;

	constructor(
		private readonly fb: FormBuilder,
		private readonly authService: AuthService,
		private readonly cdr: ChangeDetectorRef
	) {}

	submitLogin(): void {
		this.loginSubmissionInProcess.next(true);
		this.loginErrors = null;

		this.authService
			.login({
				username: this.loginForm.controls["username"].value!,
				password: this.loginForm.controls["password"].value!,
				totp: this.loginForm.value.totp!,
			})
			.subscribe({
				next: (err: null | HttpErrorResponse) => {
					if (err?.error.totpCodeRequired) {
						// disable controls with previously entered data
						this.loginForm.controls["username"].disable();
						this.loginForm.controls["password"].disable();

						this.loginForm.controls["totp"].addValidators(
							Validators.required
						);

						this.needsTotp = true;
						this.cdr.detectChanges();
					} else if (err?.error.resetTwoFa) {
						setTimeout(() => window.location.reload(), 2000);
						this.loginErrors = err?.error;
					} else if (err?.error.message)
						this.loginErrors = err?.error;
					else {
						this.loginErrors = err;
						window.location.href = "/";
					}

					this.loginSubmissionInProcess.next(false);
				},
			});
	}

	ngOnInit(): void {}
}
