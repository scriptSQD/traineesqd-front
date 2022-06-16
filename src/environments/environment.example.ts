import { IEnvironment } from "./env.interface";

export const environment: IEnvironment = {
    production: false, // false or true, depending on your configuraton,
    cipher_key: "some_super_secret_key", // used to decrypt responses from the server (symmetric encryption)
    backend_url: "http://localhost:3000", // the url of your backend server
};
