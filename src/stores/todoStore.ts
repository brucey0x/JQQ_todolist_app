import { writable } from "svelte/store"
import { supabase } from "../supabaseClient"

export const todos = writable<Todo[]>([])

export const loadTodos = async () => {
	const { data, error } = await supabase.from("todos").select()

	console.log("supabase todos are is: ", data)

	if (error) console.error(error)
	todos.set(data as Todo[])
}

export const addTodo = async (text: string, user_id: string) => {
	const { data, error } = await supabase.from("todos").insert([{ text, user_id }])

	console.log("supabase added todo is: ", data)

	if (error) console.error(error)

	if (text) {
		// Update todos to include new todo that's been added to Supabase
		todos.update((currentValue) => [...currentValue, data[0]])
	}
}

export const deleteTodo = async (id: number) => {
	const { error } = await supabase.from("todos").delete().match({ id })

	if (error) console.error(error)
	// Filter todos array to retain the IDs which aren't being deleted.
	todos.update((todos) => todos.filter((todo) => todo.id !== id))
}

export const toggleTodoCompleted = async (id: number, completed: boolean) => {
	const { error } = await supabase.from("todos").update({ completed: !completed }).match({ id })

	if (error) console.error(error)
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
