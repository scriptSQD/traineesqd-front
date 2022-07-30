import { HttpReqCache } from "../states/http-cache.state";

export namespace HttpCache {
	export class AddToCache {
		static readonly type = "[HttpCache] Add to cache store";
		constructor(public resp: HttpReqCache) {}
	}

	export class ClearCacheStorage {
		static readonly type = "[HttpCache] Clear cache storage";
		constructor() {}
	}
}
