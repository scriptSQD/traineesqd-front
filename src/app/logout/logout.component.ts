import { AfterContentInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
	selector: "app-logout",
	templateUrl: "./logout.component.html",
})
export class LogoutComponent implements AfterContentInit {
	constructor(
		private readonly authService: AuthService,
		private readonly router: Router
	) {
		this.authService.logout();
		setTimeout(() => {
			this.router.navigateByUrl("/");
		}, 1500);
	}

	ngAfterContentInit(): void {}
}
