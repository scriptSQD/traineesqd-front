export interface ILogin {
    username: string;
    password: string;
    totp: string | null;
}

export interface IRegister {
    username: string;
    password: string;
    email: string;
}
