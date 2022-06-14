export type LoginDTO = {
    username: string;
    password: string;
    totp?: string;
};

export type RegisterDTO = {
    username: string;
    password: string;
    email: string;
};
