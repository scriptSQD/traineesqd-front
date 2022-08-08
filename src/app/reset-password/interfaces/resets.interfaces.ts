import { IUser } from "src/app/auth/models/user.model";

export interface IPasswordResetVerificationResponse {
	tokenValid: boolean;
	user: IUser;
	invalidCredentials?: boolean;
}

export interface IPasswordResetEmailStatus {
	success?: boolean;
	invalidCredentials?: boolean;
}

export interface IPasswordResetResponse {
	success?: boolean;
	invalidCredentials?: boolean;
	invalidToken?: boolean;
}
