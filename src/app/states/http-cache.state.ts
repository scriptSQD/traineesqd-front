import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Action, State, StateContext, StateToken } from "@ngxs/store";
import { HttpCache } from "../actions/http-cache.actions";

export const HTTP_CACHE_STATE_TOKEN = new StateToken<string>("httpCache");
export interface HttpReqCache {
	origin: string;
	resp: HttpResponse<unknown>;
}

@State<HttpReqCache[]>({
	name: HTTP_CACHE_STATE_TOKEN,
	defaults: [],
})
@Injectable()
export class HttpCacheState {
	@Action(HttpCache.AddToCache)
	addToCache(
		ctx: StateContext<HttpReqCache[]>,
		action: HttpCache.AddToCache
	): void {
		ctx.setState([...(ctx.getState() || []), action.resp]);
	}

	@Action(HttpCache.ClearCacheStorage)
	clear(ctx: StateContext<HttpReqCache[]>): void {
		ctx.setState([]);
	}
}
