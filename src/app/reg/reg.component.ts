import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ReplaySubject } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";
import { controlsMatch, validateUnique } from "./reg-custom.validator";

enum UsernameAvailabilityStatus {
	UNAVAILABLE = 0,
	AVAILABLE = 1,
	LOADING = 2,
	EMPTY = 3,
}

@Component({
	selector: "app-reg",
	templateUrl: "./reg.component.html",
	styleUrls: ["./reg.component.scss"],
})
export class RegComponent implements OnInit {
	usernameAvailable$ = new ReplaySubject<UsernameAvailabilityStatus>();

	regForm = this.fb.nonNullable.group(
		{
			username: this.fb.control<string>("", {
				validators: [Validators.required, Validators.minLength(4)],
				asyncValidators: validateUnique(
					1500,
					this.http,
					`${environment.backend_url}/users/checkUsername`
				),
			}),
			email: this.fb.control<string>("", {
				validators: [Validators.email, Validators.required],
				asyncValidators: validateUnique(
					1500,
					this.http,
					`${environment.backend_url}/users/checkEmail`
				),
			}),
			password: this.fb.control<string>("", {
				validators: [Validators.minLength(6), Validators.required],
			}),
			passConfirm: this.fb.control<string>("", {
				validators: Validators.required,
			}),
		},
		{
			validators: controlsMatch("password", "passConfirm"),
		}
	);

	regSubmissionInProcess = new ReplaySubject<boolean>();

	constructor(
		private readonly fb: FormBuilder,
		private readonly http: HttpClient,
		private readonly authService: AuthService
	) {}

	submitReg(): void {
		this.regSubmissionInProcess.next(true);

		const { username, email, password } = this.regForm.value;
		this.authService
			.register({
				username: username!,
				email: email!,
				password: password!,
			})
			.subscribe({
				next: () => {
					this.regSubmissionInProcess.next(false);
				},
			});
	}

	ngOnInit(): void {}
}
