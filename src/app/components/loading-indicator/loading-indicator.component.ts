import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-loading-indicator",
	templateUrl: "./loading-indicator.component.html",
	styles: [
		`
			:host {
				display: block;
			}
		`,
	],
})
export class ValidationIndicatorComponent implements OnInit {
	constructor() {}

	@Input() placeholder: string = "Checking availability...";

	@Input() class = "";
	ngOnInit(): void {}
}
