import { AfterContentInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
	selector: "app-logout",
	template: `
		<div class="prose flex flex-col items-center justify-center gap-3">
			<h1 class="m-0">Logged out.</h1>
			<h3 class="m-0">You will now be redirected to the homepage.</h3>
			<p class="m-0">
				If you are not redirected, please click <a href="/">here</a>.
			</p>
		</div>
	`,
	styles: [],
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
