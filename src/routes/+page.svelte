<script lang="ts">
	import Todo from "../components/Todo.svelte"
	import TodoForm from "../components/TodoForm.svelte"
	import { todos } from "../stores/todoStore"
</script>

<main>
    <div class="px-4">
    <TodoForm/>
    {#each $todos as todo}
        <Todo todo={todo} index={todo.id}/>
    {/each}
    </div>
</main>