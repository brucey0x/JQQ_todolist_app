<script lang="ts">
	import Auth from "../components/Auth.svelte"
	import Todo from "../components/Todo.svelte"
	import TodoForm from "../components/TodoForm.svelte"
	import { user } from "../stores/authStore"
	import { todos } from "../stores/todoStore"
</script>

<main>
    {#if $user}
        <div class="container mx-auto max-w-md md:max-w-xl py-4">
            <h2 class="text-2xl text-center">What do you need to do?</h2>
            <div class="px-4">
                <TodoForm/>
                {#each $todos as todo(todo.id)}
                    <Todo todo={todo}/>
                {/each}
            </div>
        </div>
    {:else}
        <div class="container mx-auto my-6 max-w-md md:max-w-xl">
            <Auth/>
        </div>
    {/if}
</main>