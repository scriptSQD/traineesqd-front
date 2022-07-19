import {
	Component,
	ContentChildren,
	Input,
	OnInit,
	QueryList,
	TemplateRef,
} from "@angular/core";

@Component({
	selector: "ui-button",
	templateUrl: "./button.component.html",
	styles: [
		`
			.submit_button {
				@apply bg-white text-black
				rounded-lg
				px-3 py-1.5
				hover:bg-gray-50
				active:bg-gray-100 transition-all
				disabled:hover:bg-gray-100 disabled:active:bg-gray-100 disabled:bg-gray-100;
			}
		`,
	],
})
export class ButtonComponent implements OnInit {
	@ContentChildren("content") children?: QueryList<TemplateRef<HTMLElement>>;

	@Input() type: string = "button";
	@Input() disabledCondition: boolean = false;

	@Input() content?: string;

	constructor() {}

	ngOnInit(): void {}
}
