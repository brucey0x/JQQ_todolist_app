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
                <div class="bg-white flex flex-row text-center shadow border border-gray-200 rounded-lg mt-4 py-2 px-4">
                    <div class="grow font-bold">Status</div>
                    <div class="grow font-bold">Task</div>
                    <div class="grow font-bold">Due Date</div>
                </div>
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