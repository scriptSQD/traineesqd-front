import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { Observable, of, switchMap, tap } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { CloudTodos } from "./actions/cloud-todos-ngxs.actions";
import { Todos } from "./actions/todos-ngxs.actions";
import { ITodo } from "./interfaces/todos.interface";
import { TodosNgxsService } from "./services/todos-ngxs.service";
import { CloudTodosState } from "./states/cloud-todos.state";
import { TodosState } from "./states/todos.state";

@Component({
	selector: "app-todos-ngxs",
	templateUrl: "./todos-ngxs.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosNgxsComponent implements OnInit {
	todoForm = this.fb.nonNullable.group({
		title: this.fb.control<string>("", {
			validators: Validators.required,
		}),
		completed: this.fb.control<boolean>(false, {
			validators: Validators.required,
		}),
	});

	@Select(TodosState) todos$?: Observable<ITodo[]>;
	@Select(CloudTodosState) cloudTodos$?: Observable<ITodo[]>;

	constructor(
		private readonly fb: FormBuilder,
		private readonly store: Store,
		private readonly todosService: TodosNgxsService,
		public readonly authService: AuthService
	) {
		this.authService.isAuth$
			.pipe(
				switchMap(isAuth => {
					if (!isAuth) return of(undefined);

					return this.todosService.getAll();
				}),
				tap(cloudTodos => {
					if (cloudTodos)
						this.store.dispatch(new CloudTodos.AddMany(cloudTodos));
				})
			)
			.subscribe();
	}

	ngOnInit(): void {}

	addTodo(submitter: HTMLButtonElement): void {
		const isCloud = submitter.id === "cloud" || false;

		const newTodo = {
			title: this.todoForm.controls.title.value!,
			completed: false,
		};

		if (!isCloud) this.store.dispatch(new Todos.Add(newTodo));
		else this.store.dispatch(new CloudTodos.Add(newTodo));

		this.todoForm.controls.title.reset();
	}

	toggleTodoComplete(
		todo: ITodo,
		completed: boolean,
		isCloud: boolean
	): void {
		const updatedTodo = {
			...todo,
			completed: completed,
		};

		if (!isCloud)
			this.store.dispatch(new Todos.Update(todo._id!, updatedTodo));
		else this.store.dispatch(new CloudTodos.Update(todo._id!, updatedTodo));
	}

	removeTodo(id: string, isCloud: boolean): void {
		if (!isCloud) this.store.dispatch(new Todos.Remove(id));
		else this.store.dispatch(new CloudTodos.Remove(id));
	}
}
