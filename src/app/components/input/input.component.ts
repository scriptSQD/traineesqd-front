import { Component, Input, OnInit } from "@angular/core";
import { ControlContainer, FormGroupDirective } from "@angular/forms";

@Component({
	selector: "ui-input",
	templateUrl: "./input.component.html",
	styles: [
		`
			:host {
				display: block;
				width: 100%;
			}

			label > span {
				@apply text-gray-700 font-medium;
			}

			input {
				@apply mb-2 last:mb-0 focus-visible:shadow-md focus-visible:shadow-indigo-100 focus-visible:outline-none;
			}
		`,
	],
	viewProviders: [
		{ provide: ControlContainer, useExisting: FormGroupDirective },
	],
})
export class InputComponent implements OnInit {
	@Input() id?: string;
	@Input() type: string = "text";
	@Input() placeholder?: string;
	@Input() title: string = "Input";

	// @Input() inputFormControl!: FormControl;
	@Input() inputFormControlName!: string;

	constructor() {}

	ngOnInit(): void {}
}
