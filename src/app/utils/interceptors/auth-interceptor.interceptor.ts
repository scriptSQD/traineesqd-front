import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { withAuth } from "../constants";
import { AuthService } from "src/app/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private readonly authService: AuthService) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		if (request.context.get(withAuth))
			request = request.clone({
				headers: new HttpHeaders({
					Authorization: `Bearer ${this.authService.jwt}`,
				}),
			});

		return next.handle(request);
	}
}
