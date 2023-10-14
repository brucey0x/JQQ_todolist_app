import { writable } from "svelte/store"
import { supabase } from "../supabaseClient"

export const todos = writable<Todo[]>([])

let currentState: Todo[] = []
let currentSortBy: string = (key: string) => {
	currentSortBy = key
}

todos.subscribe((value) => {
	currentState = value
})

export const loadTodos = async () => {
	const { data, error } = await supabase
		.from("todos")
		.select("*")
		.order("completed", { ascending: true })
		.order("order", { ascending: false })

	if (error) return console.error(error)
	todos.set(data as Todo[])
}

const updateTodoStore = (updateLogic: (currentTodos: Todo[]) => Todo[]) => {
	todos.update((currentTodos) => {
		const newTodos = updateLogic(currentTodos)
		return newTodos.sort(sortTodos)
	})
}

const supabaseUpdater = async (vars: UpdateVars) => {
	// Separate id and other update values from vars
	const { id, ...updateValues } = vars
	if (!id) return

	const { error } = await supabase.from("todos").update(updateValues).match({ id })
	console.log("Supabase updated with the vars: ", vars)

	if (error) return console.error(error)
}

const sortTodos = (a: Todo, b: Todo) => {
	if (a.completed !== b.completed) return a.completed ? 1 : -1

	if (currentSortBy === "due_date")
		return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()

	return b.order - a.order
}

export const setSortAndFilter = (sortBy: string, filterBy: string) => {
	currentSortBy = sortBy

	todos.update((currentTodos) => {
		let filteredTodos = currentTodos
		if (filterBy !== "All") {
			filteredTodos = currentTodos.filter(
				(todo) => todo.completed === (filterBy === "Completed")
			)
		}
		return filteredTodos.sort(sortTodos)
	})
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
		updateTodoStore((currentTodos: Todo[]) => [...currentTodos, data[0]])
	}
}

export const deleteTodo = async (id: number) => {
	const { error } = await supabase.from("todos").delete().match({ id })

	if (error) return console.error(error)

	updateTodoStore((todos) => todos.filter((todo) => todo.id !== id))
}

export const toggleTodoCompleted = async (id: number, currentState: boolean) => {
	supabaseUpdater({ completed: !currentState, id })

	updateTodoStore((currentTodos: Todo[]) =>
		currentTodos.map((todo: Todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		)
	)
}

export const updateTodo = async (id: number, newText: string, newDate: string | null) => {
	const checkedDate = newDate || null

	supabaseUpdater({ text: newText, due_date: checkedDate, id })

	updateTodoStore((currentTodos: Todo[]) =>
		currentTodos.map((todo: Todo) =>
			todo.id === id ? { ...todo, text: newText, due_date: newDate } : todo
		)
	)
}
