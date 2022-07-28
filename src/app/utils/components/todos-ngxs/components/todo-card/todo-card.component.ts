import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ITodo } from "../../interfaces/todos.interface";

@Component({
	selector: "app-todo-card",
	templateUrl: "./todo-card.component.html",
	styles: [
		`
			:host {
				display: flex;
				width: 100%;
			}
		`,
	],
})
export class TodoCardComponent {
	@Input()
	todo!: ITodo;

	@Output()
	triggerRemoveTodo = new EventEmitter<string>();
	@Output()
	triggerTodoCompleteStatus = new EventEmitter<{
		id: string;
		completed: boolean;
	}>();

	constructor() {}

	removeTodo(id: string) {
		this.triggerRemoveTodo.emit(id);
	}

	toggleTodoComplete(id: string, completed: boolean) {
		this.triggerTodoCompleteStatus.emit({ id, completed });
	}
}
