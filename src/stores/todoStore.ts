import { writable } from "svelte/store"
import { supabase } from "../supabaseClient"

export const todos = writable<Todo[]>([])
let currentTodos: Todo[] = []

todos.subscribe((value) => {
	currentTodos = value
	console.log("todos are: ", currentTodos)
})

export const loadTodos = async () => {
	const { data, error } = await supabase
		.from("todos")
		.select("*")
		.order("order", { ascending: true })

	if (error) return console.error(error)
	todos.set(data as Todo[])
}

export const addTodo = async (text: string, due_date: string | null, user_id: string) => {
	const index = currentTodos.length

	const { data, error } = await supabase
		.from("todos")
		.insert([{ text, due_date, completed: false, user_id, order: index }])
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

	todos.update((currentTodos: Todo[]) =>
		currentTodos.map((todo: Todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		)
	)
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
}

export const updateTodoOrder = async (newTodos: Todo[]) => {
	const sortedTodos = [...newTodos].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
	sortedTodos.forEach((todo, index) => {
		todo.order = index
	})

	todos.set(sortedTodos)

	const updates = newTodos.map((todo) => ({
		id: todo.id,
		order: todo.order
	}))

	const { error } = await supabase.from("todos").upsert(updates, { onConflict: ["id"] })
	if (error) {
		console.error("Failed to update order in database: ", error)
	}
}
