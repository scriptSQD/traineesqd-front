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

	@Action(CloudTodos.Add)
	addTodo(ctx: StateContext<ITodo[]>, action: CloudTodos.Add): void {
		this.todosService
			.addOne(action.payload)
			.pipe(
				tap({
					next: resp => {
						if (!resp) throw new Error("Failed to add todo.");

						ctx.setState([
							...(ctx.getState() || []),
							action.payload,
						]);
					},
					error: () => {
						throw new Error("Failed to add todo.");
					},
				})
			)
			.subscribe();
	}

	@Action(CloudTodos.AddMany)
	addManyToStore(
		ctx: StateContext<ITodo[]>,
		action: CloudTodos.AddMany
	): void {
		ctx.setState([...(ctx.getState() || []), ...action.payload]);
	}

	@Action(CloudTodos.Update)
	updateTodo(ctx: StateContext<ITodo[]>, action: CloudTodos.Update): void {
		const updatedState = ctx.getState().map(todo => {
			if (todo._id === action.target) todo = action.withValue;

			return todo;
		});

		this.todosService
			.updateOne(action.target, action.withValue)
			.pipe(
				tap({
					next: resp => {
						if (!resp) throw new Error("Failed to update todo.");

						ctx.setState(updatedState);
					},
					error: () => {
						throw new Error("Failed to update todo.");
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
						if (!resp) throw new Error("Failed to remove todo.");

						ctx.setState(updatedState);
					},
					error: () => {
						throw new Error("Failed to remove todo.");
					},
				})
			)
			.subscribe();
	}
}
