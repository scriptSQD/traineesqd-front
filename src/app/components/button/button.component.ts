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
	template: `
		<button
			[type]="type"
			class="submit_button border border-neutral-400 w-fit shadow-md hover:shadow"
			[disabled]="disabledCondition"
		>
			<ng-container *ngIf="children">
				<ng-template
					*ngFor="let child of children"
					[ngTemplateOutlet]="child"
				></ng-template>
			</ng-container>
		</button>
	`,
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
