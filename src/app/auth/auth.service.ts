import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, lastValueFrom, ReplaySubject } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginDTO, RegisterDTO } from "./models/Auth.dto";
import { User } from "./models/User.model";
import {
    ClearLocalJwt,
    getLocalStorageJwt,
    UpdateLocalJwt,
} from "./utils/Utils";

type JwtAuth = {
    jwt: string;
    user: User;
};

@Injectable({
    providedIn: "root",
})
export class AuthService {
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
                    ClearLocalJwt();
                    this.isAuth$.next(false);
                },
            });
    }

    user$: ReplaySubject<User | null> = new ReplaySubject<User | null>();
    jwt: string | null = getLocalStorageJwt();
    isAuth$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

    async login(payload: LoginDTO): Promise<HttpErrorResponse | null> {
        let errors: HttpErrorResponse | null = null;
        const res = await lastValueFrom(
            this.http.post<JwtAuth>(`${environment.backend_url}/auth/login`, {
                ...payload,
            })
        ).catch(err => {
            if (err.totpCodeRequired)
                errors = new HttpErrorResponse({
                    error: { totpCodeRequired: true },
                });
            else errors = new HttpErrorResponse({ error: err });
        });

        if (!res) return errors;

        this.jwt = UpdateLocalJwt(res.jwt);
        this.user$.next(res.user);
        this.isAuth$.next(true);
        return null;
    }

    async register(payload: RegisterDTO): Promise<void> {
        const res = await lastValueFrom(
            this.http.post<JwtAuth>(
                `${environment.backend_url}/auth/register`,
                {
                    ...payload,
                }
            )
        );

        if (!res) throw new HttpErrorResponse({ error: res });

        this.jwt = UpdateLocalJwt(res.jwt);
        this.user$.next(res.user);
        this.isAuth$.next(true);
    }

    logout(): void {
        ClearLocalJwt();
        this.jwt = null;
        this.isAuth$.next(false);
        this.user$.next(null);
    }
}
