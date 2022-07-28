import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { constants, withoutAuthContext } from "../utils/constants";
import { ICommit } from "./interfaces/commit.inteface";

@Injectable({
	providedIn: "root",
})
export class HomeService {
	constructor(private readonly http: HttpClient) {}

	getLatestCommit(): Observable<ICommit> {
		return this.http.get<ICommit>(constants.ghCommitUrl, {
			context: withoutAuthContext(),
		});
	}
}
