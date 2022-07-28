import { Component, Input } from "@angular/core";
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
})
export class FormValidationHandlerComponent {
	constructor() {}

	@Input() control!: AbstractControl;
	@Input() validationError!: string;
	@Input() errorMsg?: string = "Incorrect field!";
}
