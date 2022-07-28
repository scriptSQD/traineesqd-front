import { ITodo } from "../interfaces/todos.interface";

export namespace Todos {
	export class Add {
		static readonly type = "[Todo] Add";
		constructor(public payload: ITodo) {}
	}

	export class Update {
		static readonly type = "[Todo] Update";
		constructor(public target: string, public withValue: ITodo) {}
	}

	export class Remove {
		static readonly type = "[Todo] Remove";
		constructor(public id: string) {}
	}
}
