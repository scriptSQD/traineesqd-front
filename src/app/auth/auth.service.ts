import {
	HttpBackend,
	HttpClient,
	HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { catchError, Observable, of, ReplaySubject, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { CloudTodos } from "../utils/components/todos-ngxs/actions/cloud-todos-ngxs.actions";
import { withoutAuthContext } from "../utils/constants";
import { ILogin, IRegister } from "./interfaces/auth.interface";
import { IUser, User } from "./models/user.model";
import {
	clearLocalJwt,
	getLocalStorageJwt,
	updateLocalJwt,
} from "./utils/utils";

type JwtAuth = {
	jwt: string;
	user: IUser;
};

@Injectable({
	providedIn: "root",
})
export class AuthService {
	user$ = new ReplaySubject<User | null>(1);
	jwt = getLocalStorageJwt();
	isAuth$ = new ReplaySubject<boolean>(1);

	// Avoid Http interceptor to
	// resolve circular dependency
	http = new HttpClient(this.httpBackend);

	constructor(
		private readonly httpBackend: HttpBackend,
		private readonly store: Store
	) {
		if (!this.jwt) {
			this.isAuth$.next(false);
			return;
		}

		this.http
			.get<IUser>(`${environment.backend_url}/users/me`, {
				context: withoutAuthContext(),
				headers: {
					Authorization: `Bearer ${this.jwt}`,
				},
			})
			.subscribe({
				next: (res: IUser) => {
					this.user$.next(new User(res));
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
			.post<JwtAuth>(
				`${environment.backend_url}/auth/login`,
				{
					...payload,
				},
				{
					context: withoutAuthContext(),
				}
			)
			.pipe(
				switchMap(res => {
					this.jwt = updateLocalJwt(res.jwt);
					this.user$.next(new User(res.user));
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
			.post<JwtAuth>(
				`${environment.backend_url}/auth/register`,
				{
					...payload,
				},
				{ context: withoutAuthContext() }
			)
			.pipe(
				switchMap(res => {
					if (!res) throw new HttpErrorResponse({ error: res });

					this.jwt = updateLocalJwt(res.jwt);
					this.user$.next(new User(res.user));
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
		this.store.dispatch(new CloudTodos.RemoveAll());
	}
}
