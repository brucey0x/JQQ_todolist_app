<script lang="ts">
	import Todo from "../components/Todo.svelte"
	import TodoForm from "../components/TodoForm.svelte"
	import { todos } from "../stores/todoStore"
</script>

<main>
    <div class="px-4">
    <TodoForm/>
    <!-- {#each $todos as todo} -->
    {#each $todos.sort((a,b) => a.id - b.id) as todo}
        <Todo todo={todo}/>
    {/each}
    </div>
</main>