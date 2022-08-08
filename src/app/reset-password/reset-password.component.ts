import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ReplaySubject } from "rxjs";

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

	sendingRequest = new ReplaySubject<boolean>();
	requestErrors?: { sent?: boolean; failed?: boolean };

	constructor(private readonly fb: FormBuilder) {}

	submitResetRequest(): void {}
}
