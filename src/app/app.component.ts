import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "./auth/auth.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	constructor(public readonly authService: AuthService) {}
}
