import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ReplaySubject } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";
import {
    FormControlsMatch,
    UniqueFieldValueAvailable,
} from "./reg-custom.validator";
import { UsernameAvailabilityStatus } from "./services/reg.service";

@Component({
    selector: "app-reg",
    templateUrl: "./reg.component.html",
    styleUrls: ["./reg.component.scss"],
})
export class RegComponent implements OnInit {
    usernameAvailable$ = new ReplaySubject<UsernameAvailabilityStatus>();

    regForm = this.fb.nonNullable.group(
        {
            username: new FormControl<string>("", {
                validators: [Validators.required, Validators.minLength(4)],
                asyncValidators: UniqueFieldValueAvailable(
                    1500,
                    this.http,
                    `${environment.backend_url}/users/checkUsername`
                ),
            }),
            email: new FormControl<string>("", {
                validators: [Validators.email, Validators.required],
                asyncValidators: UniqueFieldValueAvailable(
                    1500,
                    this.http,
                    `${environment.backend_url}/users/checkEmail`
                ),
            }),
            password: new FormControl<string>("", {
                validators: [Validators.minLength(6), Validators.required],
            }),
            passConfirm: new FormControl<string>("", {
                validators: Validators.required,
            }),
        },
        {
            validators: FormControlsMatch("password", "passConfirm", {
                passwordsMismatch: true,
            }),
        }
    );

    regSubmissionInProcess = new ReplaySubject<boolean>();

    constructor(
        private fb: FormBuilder,
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
