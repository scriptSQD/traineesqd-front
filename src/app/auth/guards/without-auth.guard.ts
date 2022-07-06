import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({
	providedIn: "root",
})
export class WithoutAuthGuard implements CanActivate {
	constructor(
		private readonly authService: AuthService,
		private readonly router: Router
	) {}

	canActivate(): Observable<boolean> {
		return this.authService.isAuth$.pipe(
			map(isAuth => {
				if (isAuth) {
					this.router.navigateByUrl("/");
					return false;
				} else return true;
			})
		);
	}
}
