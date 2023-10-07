<script lang="ts">
	import { dndzone } from "svelte-dnd-action"
	import Todo from "../components/Todo.svelte"
	import TodoForm from "../components/TodoForm.svelte"
	import { todos, updateTodoOrder } from "../stores/todoStore"

    export let items

    function handleConsider (e: CustomEvent<{ items: Todo[]}>) {
        items = e.detail.items
    }

    function handleFinalize (e: CustomEvent<{ items: Todo[]}>) {
        const { items: newItems } = e.detail
        updateTodoOrder(newItems)
    }

</script>

<main>
    <div class="px-4">
    <TodoForm/>
    <ul>
    <section use:dndzone={{items: $todos}} on:consider={handleConsider} on:finalize={handleFinalize}>
        {#each $todos as todo(todo.id)}
            <li>
                <Todo todo={todo}/>
            </li>
        {/each}
    </section>
    </ul>
    </div>
</main>