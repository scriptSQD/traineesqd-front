export interface IUser {
	_id: string;
	username: string;
	email: string;
	hasTwoFa: boolean;
}

export class User {
	constructor(payload: IUser) {
		this._id = payload._id;
		this.username = payload.username;
		this.email = payload.email;
		this.hasTwoFa = payload.hasTwoFa;
	}

	private _id!: string;
	private username!: string;
	private email?: string;
	private hasTwoFa: boolean = false;

	get getId(): string {
		return this._id;
	}

	get getUsername(): string {
		return this.username;
	}

	get getEmail(): string | undefined {
		return this.email;
	}

	get getHasTwoFa(): boolean {
		return this.hasTwoFa;
	}
}
