import { Component, Input, OnInit } from "@angular/core";
import { ElementMargins, ElementSize } from "../types/element-size.type";

@Component({
	selector: "app-loading-indicator",
	template: `
		<span
			*ngIf="loaderCondition"
			class="flex gap-2"
			[ngStyle]="{ margin: margins }"
		>
			<div
				class="bg-transparent animate-spin rounded-full my-1"
				[ngClass]="{
					'border-gray-300 border-t-gray-800': !invertColors,
					'border-t-gray-300 border-gray-800': invertColors
				}"
				[ngStyle]="{
					width: diameter,
					height: diameter,
					borderWidth: thickness
				}"
			></div>
			{{ placeholder }}
		</span>
	`,
	styles: [],
})
export class ValidationIndicatorComponent implements OnInit {
	constructor() {}

	@Input() loaderCondition!: any;
	@Input() placeholder: string = "Checking availability...";

	@Input() invertColors: boolean = false;
	@Input() diameter: ElementSize = "1.25rem";
	@Input() thickness: ElementSize = "4px";
	@Input() margins: ElementMargins = "0px";

	ngOnInit(): void {}
}
