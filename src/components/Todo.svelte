<script lang="ts">
	import { onMount } from "svelte"
	import { deleteTodo, todos, toggleTodoCompleted, updateTodo } from "../stores/todoStore"
    
    export let todo: Todo

    let isEditingText: boolean = false
    let isEditingDate: boolean = false
    let tempText: string = todo.text
    let tempDate: string | null = todo.due_date || null
    let today = new Date().toISOString().split("T")[0]

    let inputTextElement: HTMLInputElement
    let inputDateElement: HTMLInputElement
    let textSpan: HTMLElement
    let dateSpan: HTMLElement

    onMount(() => {
        const unsubscribe = todos.subscribe($todos => {
            const updatedTodo = $todos.find(t => t.id === todo.id)
            if (updatedTodo) {
                tempText = updatedTodo.text
                tempDate = updatedTodo.due_date || null
                todo = updatedTodo
            }
        })
        return unsubscribe
    })
    
    function blurHandler (event: FocusEvent) {
        const target = event.target as HTMLInputElement
        if (target === inputDateElement) {
            updateTodo(todo.id, tempText, tempDate)
            isEditingDate = false
        }
    }
    
    function keydownHandler (event: KeyboardEvent) {
        const target = event.target as HTMLInputElement
        if (event.key === "Enter") {
            isEditingDate = false
        }
    }

    $: completedStyleClass = todo.completed ? 'line-through' : ""
    $: if (isEditingText && inputTextElement) {inputTextElement.focus()}
    $: if (isEditingDate && inputDateElement) {inputDateElement.focus()}

</script>

<li class="bg-white flex items-center shadow border border-gray-200 rounded-lg my-2 py-2 px-4">
    <input
    name="completed"
    type="checkbox"
    checked={todo.completed}
    on:change|stopImmediatePropagation={async () => await toggleTodoCompleted(todo.id, todo.completed)}
    class="mr-2 form-checkbox h-5 w-5" />
    
    <span class={`flex-1 text-gray-800`} bind:this={textSpan}>
        {#if isEditingText}
        <input 
        type="text" 
        bind:this={inputTextElement}
        bind:value={tempText} 
        on:keydown={keydownHandler}
        on:blur={blurHandler}
        />
        {:else}
        <button 
        class={`${completedStyleClass}`}
        on:click={() => isEditingText = true}>
        {todo.text}
        Order #: {todo.order}
        </button>
        {/if}
    </span>
    <span class={`flex-none text-gray-800 ml-2`} bind:this={dateSpan}>
        {#if isEditingDate}
        <input 
        type="date"
        min={today}
        bind:this={inputDateElement}
        bind:value={tempDate}
        on:keydown={keydownHandler}
        on:blur={blurHandler}
        />
        {:else}
        <button
        class={`${completedStyleClass}`}
        on:click={() => isEditingDate = true}>
        {todo.due_date || "N/A"}
        </button>
        {/if}
    </span>

    <button
    type="button"
    class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 ml-2 rounded focus:outline-none focus:shadow-outline"
    on:click={() => deleteTodo(todo.id)}>Delete</button>

</li>