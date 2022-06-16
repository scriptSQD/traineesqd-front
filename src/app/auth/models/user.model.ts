export interface IUser {
    id: string;
    username: string;
    email: string;
    hasTwoFa: boolean;
}

export class User {
    constructor(val: IUser) {
        this.id = val.id;
        this.username = val.username;
        this.email = val.email;
        this.hasTwoFa = val.hasTwoFa;
    }

    private id!: string;
    private username!: string;
    private email?: string;
    private hasTwoFa: boolean = false;

    get getId(): string {
        return this.id;
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
