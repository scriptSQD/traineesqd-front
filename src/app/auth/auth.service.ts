import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, ReplaySubject, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { ILogin, IRegister } from "./interfaces/auth.interface";
import { User } from "./models/user.model";
import {
    clearLocalJwt,
    getLocalStorageJwt,
    UpdateLocalJwt,
} from "./utils/utils";

type JwtAuth = {
    jwt: string;
    user: User;
};

@Injectable({
    providedIn: "root",
})
export class AuthService {
    user$ = new ReplaySubject<User | null>();
    jwt = getLocalStorageJwt();
    isAuth$ = new ReplaySubject<boolean>();

    constructor(private readonly http: HttpClient) {
        if (!this.jwt) return;

        this.http
            .get<User>(`${environment.backend_url}/users/me`, {
                headers: { Authorization: `Bearer ${this.jwt}` },
            })
            .subscribe({
                next: (res: User) => {
                    this.user$.next(res);
                    this.isAuth$.next(true);
                },
                error: () => {
                    clearLocalJwt();
                    this.isAuth$.next(false);
                },
            });
    }

    login(payload: ILogin): Observable<HttpErrorResponse | null> {
        return this.http
            .post<JwtAuth>(`${environment.backend_url}/auth/login`, {
                ...payload,
            })
            .pipe(
                switchMap(res => {
                    this.jwt = UpdateLocalJwt(res.jwt);
                    this.user$.next(res.user);
                    this.isAuth$.next(true);

                    return of(null);
                }),
                catchError(err => {
                    return of(err);
                })
            );
    }

    register(payload: IRegister): Observable<void> {
        return this.http
            .post<JwtAuth>(`${environment.backend_url}/auth/register`, {
                ...payload,
            })
            .pipe(
                switchMap(res => {
                    if (!res) throw new HttpErrorResponse({ error: res });

                    this.jwt = UpdateLocalJwt(res.jwt);
                    this.user$.next(res.user);
                    this.isAuth$.next(true);

                    return of(undefined);
                })
            );
    }

    logout(): void {
        clearLocalJwt();
        this.jwt = null;
        this.isAuth$.next(false);
        this.user$.next(null);
    }
}
