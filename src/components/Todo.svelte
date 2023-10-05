<script lang="ts">
	import { deleteTodo, toggleTodoCompleted } from "../stores/todoStore"
    
    export let todo: Todo
</script>

<li class="bg-white flex items-center shadow border border-gray-200 rounded-lg my-2 py-2 px-4">
    <input
    name="completed"
    type="checkbox"
    checked={todo.completed}
    on:change={() => toggleTodoCompleted(todo.id, todo.completed)}
    class="mr-2 form-checkbox h-5 w-5" />
    
    <span class={`flex-1 text-gray-800 ${todo.completed ? 'line-through' : ''}`}>{todo.text}</span>
    
    <span class={`flex-none text-gray-800 ml-2 ${todo.completed ? 'line-through' : ''}`}>{todo.due_date ? todo.due_date : ""}</span>

    <button
    type="button"
    class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 ml-2 rounded focus:outline-none focus:shadow-outline"
    on:click={() => deleteTodo(todo.id)}>Delete</button>

</li>