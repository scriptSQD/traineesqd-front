import { ITodo } from "../interfaces/todos.interface";

export namespace CloudTodos {
	export class Add {
		static readonly type = "[CloudTodo] Add";
		constructor(public payload: ITodo) {}
	}

	export class InitFromCloud {
		static readonly type = "[CloudTodo] Add many";
		constructor(public payload: ITodo[]) {}
	}

	export class Update {
		static readonly type = "[CloudTodo] Update";
		constructor(public target: string, public withValue: Partial<ITodo>) {}
	}

	export class Remove {
		static readonly type = "[CloudTodo] Remove";
		constructor(public id: string) {}
	}
}
