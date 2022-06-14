import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Component({
    selector: "FormValidationHandler",
    template: `
        <p
            *ngIf="control.getError(err) && control.dirty"
            class="not-prose text-sm font-light text-rose-600 m-0"
        >
            {{ err_msg }}
        </p>
    `,
    styles: [],
})
export class FormValidationHandlerComponent implements OnInit {
    constructor() {}

    @Input("fvh-control") control!: AbstractControl;
    @Input("fvh-check-for-error") err!: string;
    @Input("fvh-error-msg") err_msg?: string = "Incorrect field!";

    ngOnInit(): void {}
}
