import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ITodo } from "../interfaces/todos.interface";

@Injectable({
	providedIn: "root",
})
export class TodosNgxsService {
	constructor(private readonly http: HttpClient) {}

	getAll(): Observable<ITodo[] | null> {
		return this.http.get<ITodo[]>(`${environment.backend_url}/todos/mine`);
	}

	addOne(payload: ITodo): Observable<ITodo> {
		return this.http.post<ITodo>(
			`${environment.backend_url}/todos`,
			payload
		);
	}

	updateOne(id: string, payload: Partial<ITodo>): Observable<boolean> {
		return this.http.put<boolean>(
			`${environment.backend_url}/todos/${id}`,
			payload
		);
	}

	deleteOne(id: string): Observable<boolean> {
		return this.http.delete<boolean>(
			`${environment.backend_url}/todos/${id}`
		);
	}
}
