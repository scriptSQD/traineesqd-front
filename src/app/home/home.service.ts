import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICommit } from "./interfaces/commit.inteface";

@Injectable({
	providedIn: "root",
})
export class HomeService {
	constructor(private readonly http: HttpClient) {}

	getLatestCommit(): Observable<ICommit> {
		return this.http.get<ICommit>(
			"https://api.github.com/repos/scriptSQD/traineesqd-front/commits/master"
		);
	}
}
