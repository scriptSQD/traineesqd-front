import {
	Component,
	ContentChildren,
	Input,
	OnInit,
	QueryList,
	TemplateRef,
} from "@angular/core";
import { ControlContainer, FormGroupDirective } from "@angular/forms";

@Component({
	selector: "app-input",
	templateUrl: "./input.component.html",
	styleUrls: ["./input.component.scss"],
	viewProviders: [
		{ provide: ControlContainer, useExisting: FormGroupDirective },
	],
})
export class InputComponent implements OnInit {
	@ContentChildren("validator") validators?: QueryList<
		TemplateRef<HTMLElement>
	>;

	@Input() inFormControlName!: string;

	@Input() id?: string;
	@Input() type: string = "text";
	@Input() placeholder?: string;
	@Input() title: string = "Input";

	constructor() {}

	ngOnInit(): void {}
}
