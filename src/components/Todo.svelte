<script lang="ts">
	import { deleteTodo, toggleTodoCompleted, updateTodo } from "../stores/todoStore"
    
    export let todo: Todo

    let isEditing: {text: boolean, date: boolean} = {
        text: false,
        date: false
    }
    let tempText: string = todo.text
    let tempDate: string | null = todo.due_date

    $: console.log('Is Todo Completed?', todo.completed);

</script>

<li class="bg-white flex items-center shadow border border-gray-200 rounded-lg my-2 py-2 px-4">
    <input
    name="completed"
    type="checkbox"
    checked={todo.completed}
    on:change|stopImmediatePropagation={() => {toggleTodoCompleted(todo.id, todo.completed)}}
    class="mr-2 form-checkbox h-5 w-5" />
    
    <span class={`flex-1 text-gray-800 ${todo.completed ? 'line-through' : ''}`}>
        {#if isEditing}
            <input 
            type="text" 
            bind:value={tempText} 
            on:blur={() => { isEditing.text = false, updateTodo(todo.id, tempText, tempDate)}}
            on:keydown={(event) => { if (event.key === "Enter") { event.target.blur()}}}
            />
         {:else}
            <button 
            on:click={() => isEditing.text = true}>
            {todo.text}
            </button>
         {/if}
        </span>
        
    <span class={`flex-none text-gray-800 ml-2 ${todo.completed ? 'line-through' : ''}`}>
        {#if isEditing}
            <input 
            type="date"
            bind:value={tempDate}
            on:blur={() => { isEditing.date = false, updateTodo(todo.id, tempText, tempDate)}}
            on:keydown={(event) => { if (event.key === "Enter") { event.target.blur()}}}
            />
        {:else}
            <button 
            on:click={() => isEditing.date = true}>
            {todo.due_date ? todo.due_date : ""}
            </button>
        {/if}
    </span>

    <button
    type="button"
    class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 ml-2 rounded focus:outline-none focus:shadow-outline"
    on:click={() => deleteTodo(todo.id)}>Delete</button>

</li>