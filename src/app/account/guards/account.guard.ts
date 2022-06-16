import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { Observable, of, switchMap } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

@Injectable({
    providedIn: "root",
})
export class AccountGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.isAuth$.asObservable().pipe(
            switchMap(val => {
                if (!val) {
                    this.router.navigateByUrl("/login");
                    return of(val);
                } else {
                    return of(val);
                }
            })
        );
    }
}
