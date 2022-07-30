import { HttpContext, HttpContextToken } from "@angular/common/http";

export const constants = {
	ghCommitUrl:
		"https://api.github.com/repos/scriptSQD/traineesqd-front/commits/master",
};

// Http interceptor context to provide auth headers
export const withAuth = new HttpContextToken<boolean>(() => true);
export const withCache = new HttpContextToken<boolean>(() => false);

export function withoutAuthContext() {
	return new HttpContext().set(withAuth, false);
}
export function withCacheContext() {
	return new HttpContext().set(withCache, true);
}
