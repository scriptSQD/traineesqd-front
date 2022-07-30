import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse,
} from "@angular/common/http";
import { Observable, of, switchMap, tap } from "rxjs";
import { Store } from "@ngxs/store";
import { withCache } from "../constants";
import { HttpCacheState, HttpReqCache } from "src/app/states/http-cache.state";
import { HttpCache } from "src/app/actions/http-cache.actions";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
	constructor(private readonly store: Store) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		if (!request.context.has(withCache)) return next.handle(request);

		return this.store.select<HttpReqCache[]>(HttpCacheState).pipe(
			switchMap(cache => {
				const sameOrigin = cache.find(
					cached => cached.origin === request.urlWithParams
				);

				if (sameOrigin === undefined)
					return next.handle(request).pipe(
						switchMap(resp => {
							if (resp instanceof HttpResponse) {
								this.store.dispatch(
									new HttpCache.AddToCache({
										origin: request.urlWithParams,
										resp: resp as HttpResponse<unknown>,
									})
								);

								return of(resp);
							} else return of();
						})
					);

				return of(sameOrigin.resp);
			})
		);
	}
}
