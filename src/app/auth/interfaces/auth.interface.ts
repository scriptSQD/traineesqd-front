import { HttpStatusCode } from "@angular/common/http";
import { IUser } from "../models/user.model";

export interface ILogin {
	identifier: string;
	password: string;
	totp: string | null;
}

export interface IRegister {
	username: string;
	password: string;
	email: string;
}

export interface IAuthResponse {
	statusCode?: HttpStatusCode;

	invalidCredentials?: boolean;
	resetTwoFa?: boolean;
	message?: string;
	totpCodeRequired?: boolean;

	user?: IUser;
	jwt?: string;
}
