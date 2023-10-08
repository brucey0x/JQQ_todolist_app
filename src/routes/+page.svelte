<script lang="ts">
	import { dndzone, type DndEvent } from "svelte-dnd-action"
	import Todo from "../components/Todo.svelte"
	import TodoForm from "../components/TodoForm.svelte"
	import { todos, updateTodoOrder } from "../stores/todoStore"

    export let items: Todo[]
    let previousItems: Todo[] = []

    function handleConsider (e: CustomEvent<DndEvent<{ items: Todo[]}>>) {
        items = e.detail.items
        console.log("handleConsider e.detail.items: ", items);
    }
    
    async function handleFinalize (e: CustomEvent<DndEvent<{ items: Todo[]}>>) {
        const { items: newItems } = e.detail
        console.log("handleFinalize e.detail: ", newItems);

        previousItems = [...items]

        try {
            await updateTodoOrder(newItems)
        } catch (error) {
            console.error("Failed to update, reverting changes", error);
            items = previousItems
        }

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