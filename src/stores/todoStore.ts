import { writable } from 'svelte/store'

export const todos = writable<Todo[]>([])

export const addTodo = (text: string) => {
	if (text) {
		todos.update((currentValue) => {
			// Spreading current todos, adding new ones, returning updated todos.
			const newTodos = [...currentValue, { text, completed: false, id: Date.now() }]
			return newTodos
		})
	}
}

export const deleteTodo = (id: number) => {
	// Filter todos array to retain the IDs which aren't being deleted.
	todos.update((todos) => todos.filter((todo) => todo.id !== id))
}

export const toggleTodoCompleted = (id: number) => {
	todos.update((currentTodos: Todo[]) =>
		currentTodos.map((todo: Todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		)
	)
}
// export const toggleTodoCompleted = (id: number) => {
// 	todos.update((todos) => {
// 		let index = -1
// 		for (let i = 0; i < todos.length; i++) {
// 			if (todos[i].id === id) {
// 				index = i
// 				break
// 			}
// 		}
// 		if (index !== -1) {
// 			todos[index].completed = !todos[index].completed
// 		}
// 		return todos
// 	})
// }
