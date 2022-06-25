import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Todos } from "./actions/todos-ngxs.actions";
import { ITodo } from "./interfaces/todos.interface";
import { TodosState } from "./states/todos.state";

@Component({
	selector: "app-todos-ngxs",
	templateUrl: "./todos-ngxs.component.html",
	styleUrls: ["./todos-ngxs.component.scss"],
})
export class TodosNgxsComponent implements OnInit {
	todoForm = this.fb.nonNullable.group({
		title: new FormControl<string>("", {
			validators: Validators.required,
		}),
		completed: new FormControl<boolean>(false, {
			validators: Validators.required,
		}),
	});

	@Select(TodosState.todos) todos$?: Observable<{
		completed: ITodo[];
		uncompleted: ITodo[];
	}>;

	constructor(
		private readonly fb: FormBuilder,
		private readonly store: Store
	) {}

	ngOnInit(): void {}

	addTodo(): void {
		this.store.dispatch(
			new Todos.Add({
				title: this.todoForm.controls.title.value!,
				completed: false,
			})
		);

		this.todoForm.controls.title.reset();
	}

	toggleTodoComplete(todo: ITodo, completed: boolean): void {
		const updatedTodo = {
			...todo,
			completed: completed,
		};

		this.store.dispatch(new Todos.Update(todo, updatedTodo));
	}

	removeTodo(id: string): void {
		this.store.dispatch(new Todos.Remove(id));
	}
}
