import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Action, State, StateContext, StateToken } from "@ngxs/store";
import { tap } from "rxjs";
import { CloudTodos } from "../actions/cloud-todos-ngxs.actions";
import { ITodo } from "../interfaces/todos.interface";
import { TodosNgxsService } from "../services/todos-ngxs.service";

export const CLOUD_TODOS_STATE_TOKEN = new StateToken<string>("cloudTodos");

@State<ITodo[]>({
	name: CLOUD_TODOS_STATE_TOKEN,
	defaults: [],
})
@Injectable()
export class CloudTodosState {
	constructor(private readonly todosService: TodosNgxsService) {}

	refreshOnError(ctx: StateContext<ITodo[]>): void {
		// Refresh current list
		this.todosService
			.getAll()
			.pipe(
				tap(resp => {
					if (!resp) ctx.setState([]);
					else ctx.setState(resp);

					throw new HttpErrorResponse({
						error: "Failed to modify cloud todos.",
					});
				})
			)
			.subscribe();
	}

	@Action(CloudTodos.Add)
	addTodo(ctx: StateContext<ITodo[]>, action: CloudTodos.Add): void {
		this.todosService
			.addOne(action.payload)
			.pipe(
				tap({
					next: resp => {
						if (!resp) this.refreshOnError(ctx);

						ctx.setState([...(ctx.getState() || []), resp]);
					},
					error: () => {
						this.refreshOnError(ctx);
					},
				})
			)
			.subscribe();
	}

	@Action(CloudTodos.InitFromCloud)
	initFromCloud(
		ctx: StateContext<ITodo[]>,
		action: CloudTodos.InitFromCloud
	): void {
		ctx.setState(action.payload);
	}

	@Action(CloudTodos.Update)
	updateTodo(ctx: StateContext<ITodo[]>, action: CloudTodos.Update): void {
		const updatedState = ctx.getState().map(todo => {
			if (todo._id === action.target)
				todo = { ...todo, ...action.withValue };

			return todo;
		});

		this.todosService
			.updateOne(action.target, action.withValue)
			.pipe(
				tap({
					next: resp => {
						if (!resp) this.refreshOnError(ctx);

						ctx.setState(updatedState);
					},
					error: () => {
						this.refreshOnError(ctx);
					},
				})
			)
			.subscribe();
	}

	@Action(CloudTodos.Remove)
	removeTodo(ctx: StateContext<ITodo[]>, action: CloudTodos.Remove): void {
		const updatedState = ctx
			.getState()
			.filter(todo => todo._id !== action.id);

		this.todosService
			.deleteOne(action.id)
			.pipe(
				tap({
					next: resp => {
						if (!resp) this.refreshOnError(ctx);

						ctx.setState(updatedState);
					},
					error: () => {
						this.refreshOnError(ctx);
					},
				})
			)
			.subscribe();
	}
}
