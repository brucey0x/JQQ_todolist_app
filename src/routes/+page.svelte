<script lang="ts">
	import Auth from "../components/Auth.svelte"
	import Todo from "../components/Todo.svelte"
	import TodoForm from "../components/TodoForm.svelte"
	import { user } from "../stores/authStore"
	import { setSortAndFilter, todos } from "../stores/todoStore"

    let sortBy: string = "due_date"
    let filterBy: string = "All"
    let showSortMenu = false;
    let showFilterMenu = false;
    let sortAscending = true; // To keep track of ascending or descending

    function applySortAndFilter () {
        setSortAndFilter(sortBy, filterBy)
    }
</script>


<style>
  .menu {
    display: none;
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
  }
  .show-menu {
    display: block;
  }
</style>

<main>
    {#if $user}
        <div class="container mx-auto max-w-md md:max-w-xl py-4">
            <h2 class="text-2xl text-center">What do you need to do?</h2>
            <div class="px-4">
                <TodoForm/>
                <!-- Sort and Filter UI -->
                <div class="flex flex-row justify-between p-4 bg-white rounded-lg py-2 mt-4 shadow">
                    <div>
                    <label for="sortBy">Sort By:</label>
                    <select id="sortBy" bind:value={sortBy} on:change={applySortAndFilter}>
                        <option value="date_created" selected>Date created</option>
                        <option value="due_date">Due Date</option>
                    </select>
                    </div>
                    <div>
                    <label for="filterBy">Filter By:</label>
                    <select id="filterBy" bind:value={filterBy} on:change={applySortAndFilter}>
                        <option value="All">All</option>
                        <option value="To Do">To Do</option>
                        <option value="Completed">Completed</option>
                    </select>
                    </div>
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