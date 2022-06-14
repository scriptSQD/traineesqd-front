import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import {
    firstValueFrom,
    lastValueFrom,
    Observable,
    of,
    switchMap,
    takeLast,
} from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

@Injectable({
    providedIn: "root",
})
export class AccountGuard implements CanActivate {
    constructor(private as: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        // console.log("hi from AccountGuard");
        // const isAuth = await lastValueFrom(this.as.isAuth$);
        // console.log(isAuth);
        // if (!isAuth) this.router.navigateByUrl("/login");

        // return isAuth;

        return this.as.isAuth$.asObservable().pipe(
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
