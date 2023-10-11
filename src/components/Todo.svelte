<script lang="ts">
	import { onMount } from "svelte"
	import { deleteTodo, todos, toggleTodoCompleted, updateTodo } from "../stores/todoStore"
    
    export let todo: Todo
    export let order: number

    let isEditingText: boolean = false
    let isEditingDate: boolean = false
    let tempText: string = todo.text
    let tempDate: string | null = todo.due_date || null

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

    function keydownHandler (event: KeyboardEvent) {
        if (event.key === "Enter" && event.target) event.target.blur()
    }
    
    function blurHandler () {
        isEditingText = false
        updateTodo(todo.id, tempText, tempDate)
        
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
        on:blur={blurHandler}
        on:keydown={(event) => keydownHandler (event)}
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
        bind:this={inputDateElement}
        bind:value={tempDate}
        on:blur={blurHandler}
        on:keydown={(event) => keydownHandler (event)}
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