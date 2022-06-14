import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export enum UsernameAvailabilityStatus {
    UNAVAILABLE = 0,
    AVAILABLE = 1,
    LOADING = 2,
    EMPTY = 3,
}

@Injectable({
    providedIn: "root",
})
export class RegService {
    constructor(private readonly http: HttpClient) {}

    checkUsername(username: string): Observable<boolean> {
        return this.http.post<boolean>(
            `${environment.backend_url}/users/checkUsername`,
            {
                username: username,
            }
        );
    }
}
