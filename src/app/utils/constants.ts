import { HttpContext, HttpContextToken } from "@angular/common/http";

export const constants = {
	ghCommitUrl:
		"https://api.github.com/repos/scriptSQD/traineesqd-front/commits/master",
};

// Http interceptor context to provide auth headers
export const withAuth = new HttpContextToken<boolean>(() => true);
export function withoutAuthContext() {
	return new HttpContext().set(withAuth, false);
}
