import { JWT_LOCALSTORAGE_KEY } from "../auth.constants";

export function UpdateLocalJwt(jwt: string): string {
    localStorage.setItem(JWT_LOCALSTORAGE_KEY, jwt);
    return jwt;
}

export function clearLocalJwt(): void {
    localStorage.removeItem(JWT_LOCALSTORAGE_KEY);
}

export function getLocalStorageJwt(): string | null {
    return localStorage.getItem(JWT_LOCALSTORAGE_KEY);
}
