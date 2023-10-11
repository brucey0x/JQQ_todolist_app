type Todo = {
	text: string
	completed: boolean
	id: number
	due_date: string | null
	order: number | null
}

type UpdateVars = {
	completed?: boolean
	text?: string
	due_date?: string | null
	id?: number
}
