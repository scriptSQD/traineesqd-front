import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ReplaySubject } from "rxjs";
import { ResetPasswordService } from "./services/reset-password.service";
import { controlsMatch } from "../reg/reg-custom.validator";
import {
	IPasswordResetEmailStatus,
	IPasswordResetResponse,
	IPasswordResetVerificationResponse,
} from "./interfaces/resets.interfaces";

@Component({
	selector: "app-reset-password",
	templateUrl: "./reset-password.component.html",
	styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent {
	pwdResetForm = this.fb.nonNullable.group({
		identifier: this.fb.control<string>("", {
			validators: [Validators.required, Validators.minLength(4)],
		}),
	});

	newPasswordForm = this.fb.nonNullable.group(
		{
			password: this.fb.control<string>("", {
				validators: [Validators.required],
			}),
			repeat: this.fb.control<string>("", {
				validators: [Validators.required],
			}),
		},
		{
			validators: [controlsMatch("password", "repeat")],
		}
	);

	sendingRequest = new ReplaySubject<boolean>();
	requestErrors: IPasswordResetEmailStatus | IPasswordResetResponse = {};

	hasResetToken = new ReplaySubject<boolean>();

	resetToken?: string;
	passwordResetResponse?: IPasswordResetVerificationResponse;

	constructor(
		private readonly fb: FormBuilder,
		private readonly route: ActivatedRoute,
		private readonly resetService: ResetPasswordService
	) {
		this.route.queryParams.subscribe({
			next: params => {
				if (!params["token"] && !params["username"]) {
					this.hasResetToken.next(false);
					this.hasResetToken.complete();
					return;
				}

				let resetToken = params["token"];
				let username = params["username"];
				this.resetService
					.verifyResetToken(resetToken, username)
					.subscribe({
						next: resp => {
							if (
								!resp ||
								!resp.tokenValid ||
								resp.invalidCredentials
							) {
								this.hasResetToken.next(false);
								this.hasResetToken.complete();
								return;
							}

							this.passwordResetResponse = resp;
							this.resetToken = resetToken;
							this.hasResetToken.next(true);
							this.hasResetToken.complete();
							return;
						},
					});
			},
		});
	}

	submitResetRequest(): void {
		this.requestErrors = {};
		this.sendingRequest.next(true);
		this.resetService
			.sendPasswordResetRequest(
				this.pwdResetForm.controls.identifier.value!
			)
			.subscribe({
				next: resp => {
					this.sendingRequest.next(false);
					if (!resp || resp.invalidCredentials) {
						this.requestErrors.invalidCredentials = true;
						return;
					}

					this.requestErrors.success = true;
				},
			});
	}

	resetPassword(): void {
		this.requestErrors = {};
		this.sendingRequest.next(true);
		this.resetService
			.resetPassword(
				this.resetToken!,
				this.passwordResetResponse?.user.username!,
				this.newPasswordForm.controls.password.value!
			)
			.subscribe({
				next: resp => {
					this.sendingRequest.next(false);
					if (!resp || resp.invalidCredentials || resp.invalidToken) {
						this.requestErrors.invalidCredentials = true;
						return;
					}

					this.requestErrors.success = true;
				},
			});
	}
}
