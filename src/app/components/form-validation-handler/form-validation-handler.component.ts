import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Component({
    selector: "app-form-validation-handler",
    template: `
        <p
            *ngIf="control.getError(validationError) && control.dirty"
            class="not-prose text-sm font-light text-rose-600 m-0"
        >
            {{ errorMsg }}
        </p>
    `,
    styles: [],
})
export class FormValidationHandlerComponent implements OnInit {
    constructor() {}

    @Input() control!: AbstractControl;
    @Input() validationError!: string;
    @Input() errorMsg?: string = "Incorrect field!";

    ngOnInit(): void {}
}
