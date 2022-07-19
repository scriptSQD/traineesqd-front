import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-loading-indicator",
	templateUrl: "./loading-indicator.component.html",
})
export class ValidationIndicatorComponent implements OnInit {
	constructor() {}

	@Input() loaderCondition!: any;
	@Input() placeholder: string = "Checking availability...";

	@Input() class = "";
	ngOnInit(): void {}
}
