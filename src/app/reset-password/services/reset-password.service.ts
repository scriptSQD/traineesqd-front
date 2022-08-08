import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { withoutAuthContext } from "src/app/utils/constants";
import { environment } from "src/environments/environment";
import {
	IPasswordResetEmailStatus,
	IPasswordResetResponse,
	IPasswordResetVerificationResponse,
} from "../interfaces/resets.interfaces";

@Injectable({
	providedIn: "root",
})
export class ResetPasswordService {
	constructor(private readonly http: HttpClient) {}

	verifyResetToken(
		token: string,
		username: string
	): Observable<IPasswordResetVerificationResponse> {
		return this.http.get<IPasswordResetVerificationResponse>(
			`${environment.backend_url}/auth/resetPassword/verify`,
			{
				params: { token, username },
				context: withoutAuthContext(),
			}
		);
	}

	sendPasswordResetRequest(
		identifier: string
	): Observable<IPasswordResetEmailStatus> {
		return this.http.get<IPasswordResetEmailStatus>(
			`${environment.backend_url}/auth/resetPassword`,
			{
				params: { identifier },
				context: withoutAuthContext(),
			}
		);
	}

	resetPassword(
		token: string,
		username: string,
		password: string
	): Observable<IPasswordResetResponse> {
		return this.http.post<IPasswordResetResponse>(
			`${environment.backend_url}/auth/resetPassword`,
			{
				token,
				username,
				password,
			},
			{
				context: withoutAuthContext(),
			}
		);
	}
}
