import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { FormControlsMatch } from "./reg-custom.validator";

@Component({
    selector: "app-reg",
    templateUrl: "./reg.component.html",
    styleUrls: ["./reg.component.scss"],
})
export class RegComponent implements OnInit {
    constructor(private fb: FormBuilder) {}

    regForm: FormGroup = this.fb.nonNullable.group(
        {
            username: new FormControl<string>("", {
                validators: [Validators.required, Validators.minLength(6)],
            }),
            email: new FormControl<string>("", {
                validators: [Validators.email, Validators.required],
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

    submitReg(): void {
        console.log(this.regForm.value);
    }

    ngOnInit(): void {}
}
