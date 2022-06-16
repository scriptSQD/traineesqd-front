import { IEnvironment } from "./env.interface";

export const environment: IEnvironment = {
    production: process.env["PRODUCTION"] === "true",
    cipher_key: process.env["CIPHER_KEY"]!,
    backend_url: process.env["BACKEND_URL"]!,
};
