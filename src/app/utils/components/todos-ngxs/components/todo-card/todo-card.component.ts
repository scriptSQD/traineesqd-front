import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ITodo } from "../../interfaces/todos.interface";

@Component({
	selector: "app-todo-card",
	template: `
		<div
			class="group relative flex flex-row-reverse gap-2 justify-center w-full max-w-[39ch]"
		>
			<span
				class="with-hover:hidden with-hover:absolute group-hover:flex touch:flex items-center justify-center p-2.5 border border-neutral-300 rounded-lg bg-gray-50 hover:bg-gray-100 active:bg-gray-200 top-1 right-1 cursor-pointer transition-all w-fit h-fit"
				(click)="removeTodo(todo.id!)"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512"
					class="w-4 h-4 fill-neutral-500"
				>
					<path
						d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"
					/>
				</svg>
			</span>
			<div class="flex flex-col gap-1 w-full">
				<h3
					class="my-0"
					[ngClass]="{
						'line-through': todo.completed
					}"
				>
					{{ todo.title }}
				</h3>
				<label class="flex gap-2 my-0 w-fit">
					Completed:
					<input
						type="checkbox"
						[checked]="todo.completed"
						class="rounded-lg shadow border border-neutral-300"
						(click)="toggleTodoComplete(todo, self.checked)"
						#self
					/>
				</label>
			</div>
		</div>
	`,
	styles: [
		`
			:host {
				display: flex;
				width: 100%;
			}
		`,
	],
})
export class TodoCardComponent implements OnInit {
	@Input()
	todo!: ITodo;

	@Output()
	triggerRemoveTodo = new EventEmitter<string>();
	@Output()
	triggerTodoCompleteStatus = new EventEmitter<{
		todo: ITodo;
		completed: boolean;
	}>();

	constructor() {}

	removeTodo(id: string) {
		this.triggerRemoveTodo.emit(id);
	}

	toggleTodoComplete(todo: ITodo, completed: boolean) {
		this.triggerTodoCompleteStatus.emit({ todo, completed });
	}

	ngOnInit(): void {}
}
