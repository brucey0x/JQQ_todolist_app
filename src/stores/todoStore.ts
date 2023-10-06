import { writable } from "svelte/store"
import { supabase } from "../supabaseClient"

export const todos = writable<Todo[]>([])

export const loadTodos = async () => {
	const { data, error } = await supabase.from("todos").select("*")

	if (error) return console.error(error)
	todos.set(data as Todo[])
}

export const addTodo = async (text: string, due_date: string | null, user_id: string) => {
	const { data, error } = await supabase
		.from("todos")
		.insert([{ text, due_date, completed: false, user_id }])
		.select("*")

	console.log("supabase added todo is: ", data)

	if (error) return console.error(error)

	if (data && text) {
		todos.update((currentTodos: Todo[]) => [...currentTodos, data[0]])
	}
}

export const deleteTodo = async (id: number) => {
	const { error } = await supabase.from("todos").delete().match({ id })

	if (error) return console.error(error)

	// Filter todos array to retain the IDs which aren't being deleted.
	todos.update((todos) => todos.filter((todo) => todo.id !== id))
}

export const toggleTodoCompleted = async (id: number, currentState: boolean) => {
	const { error } = await supabase
		.from("todos")
		.update({ completed: !currentState })
		.match({ id })

	if (error) return console.error(error)

	todos.update((currentTodos: Todo[]) => {
		const updatedTodos = currentTodos.map((todo: Todo) => {
			if (todo.id === id) {
				console.log("todo.completed updated to: ", !todo.completed)
				return { ...todo, completed: !todo.completed }
			}
			return todo
		})
		return updatedTodos
	})
}
// export const toggleTodoCompleted = async (id: number, currentState: boolean) => {
// 	const { error } = await supabase
// 		.from("todos")
// 		.update({ completed: !currentState })
// 		.match({ id })

// 	if (error) return console.error(error)

// 	// Fetch the updated todo by ID
// 	const { data: updatedData, error: fetchError } = await supabase
// 		.from("todos")
// 		.select("completed")
// 		.match({ id })

// 	if (fetchError) return console.error(fetchError)

// 	if (updatedData && updatedData.length > 0) {
// 		console.log("todo.completed updated to:", updatedData[0].completed)
// 	}

// 	todos.update((currentTodos: Todo[]) =>
// 		currentTodos.map((todo: Todo) =>
// 			todo.id === id ? { ...todo, completed: !todo.completed } : todo
// 		)
// 	)
// }

export const updateTodo = async (id: number, newText: string, newDate: string | null) => {
	const { error } = await supabase
		.from("todos")
		.update({
			text: newText,
			due_date: newDate
		})
		.match({ id })

	if (error) return console.error(error)

	todos.update((currentTodos: Todo[]) =>
		currentTodos.map((todo: Todo) =>
			todo.id === id ? { ...todo, text: newText, due_date: newDate } : todo
		)
	)
}
