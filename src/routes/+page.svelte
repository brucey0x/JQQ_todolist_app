<script lang="ts">
	import Todo from "../components/Todo.svelte"
	import TodoForm from "../components/TodoForm.svelte"
	import { todos } from "../stores/todoStore"
    import {dndzone} from "svelte-dnd-action"
</script>

<main>
    <div class="px-4">
    <TodoForm/>
    <ul use:dndzone={{ items: $todos }}>
    {#each $todos as todo (todo.id)}
        <li>
            <Todo todo={todo}/>
        </li>
    {/each}
    </ul>
    <!-- {#each $todos.sort((a,b) => a.id - b.id) as todo}
        <Todo todo={todo}/>
    {/each} -->
    </div>
</main>