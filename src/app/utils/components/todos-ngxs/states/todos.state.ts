import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { uid } from "src/utils/utils";
import { Todos } from "../actions/todos-ngxs.actions";
import { ITodo } from "../interfaces/todos.interface";

export const TODOS_STATE_TOKEN = new StateToken<string>("todos");

@State<ITodo[]>({
	name: TODOS_STATE_TOKEN,
	defaults: [],
})
@Injectable()
export class TodosState {
	constructor() {}

	@Selector()
	static todos(state: ITodo[]): { completed: ITodo[]; uncompleted: ITodo[] } {
		return {
			completed: state.filter(todo => todo.completed === true),
			uncompleted: state.filter(todo => todo.completed === false),
		};
	}

	@Action(Todos.Add)
	addTodo(ctx: StateContext<ITodo[]>, action: Todos.Add): void {
		const payload: ITodo = {
			...action.payload,
			id: uid(),
		};

		ctx.setState([...(ctx.getState() || []), payload]);
	}

	@Action(Todos.Update)
	updateTodo(ctx: StateContext<ITodo[]>, action: Todos.Update): void {
		const updatedState = ctx.getState().map(todo => {
			if (todo.id === action.payload.id) todo = action.withValue;

			return todo;
		});

		ctx.setState(updatedState);
	}

	@Action(Todos.Remove)
	removeTodo(ctx: StateContext<ITodo[]>, action: Todos.Remove): void {
		const updatedState = ctx
			.getState()
			.filter(todo => todo.id !== action.id);

		ctx.setState(updatedState);
	}
}
