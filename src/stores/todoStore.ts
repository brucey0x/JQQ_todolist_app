import { writable } from "svelte/store"
import { supabase } from "../supabaseClient"

export const todos = writable<Todo[]>([])

let currentState: Todo[] = []
todos.subscribe((value) => {
	currentState = value
})

export const loadTodos = async () => {
	const { data, error } = await supabase.from("todos").select("*")

	if (error) return console.error(error)
	todos.set(data as Todo[])
}

export const addTodo = async (text: string, due_date: string | null, user_id: string) => {
	const orderIndex = currentState.length + 1

	const { data, error } = await supabase
		.from("todos")
		.insert([{ text, due_date, completed: false, user_id, order: orderIndex }])
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

export const updateTodo = async (id: number, newText: string, newDate: string | null) => {
	const checkedDate = newDate || null

	const { error } = await supabase
		.from("todos")
		.update({
			text: newText,
			due_date: checkedDate
		})
		.match({ id })

	if (error) return console.error(error)

	todos.update((currentTodos: Todo[]) =>
		currentTodos.map((todo: Todo) =>
			todo.id === id ? { ...todo, text: newText, due_date: newDate } : todo
		)
	)

	console.log("updateTodo executed. Updated todos are: ", todos)
}
