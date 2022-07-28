import {
	Component,
	ContentChildren,
	Input,
	QueryList,
	TemplateRef,
} from "@angular/core";

@Component({
	selector: "app-button",
	templateUrl: "./button.component.html",
	styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
	@ContentChildren("content") children?: QueryList<TemplateRef<HTMLElement>>;

	@Input() type: string = "button";
	@Input() isDisabled: boolean = false;
	@Input() attributes: string = "";
	@Input() customId?: string;

	@Input() content?: string;
}
