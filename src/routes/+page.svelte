<script lang="ts">
	import { Button, Dropdown, Radio, Toggle } from 'flowbite-svelte'
	import { ChevronDownSolid } from 'flowbite-svelte-icons'
	import Auth from "../components/Auth.svelte"
	import Todo from "../components/Todo.svelte"
	import TodoForm from "../components/TodoForm.svelte"
	import { user } from "../stores/authStore"
	import { filteredAndSortedTodos, setSortAndFilter } from "../stores/todoStore"
    
    
    let sortBy: string = "due_date"
    let filterBy: string = "All"
    let isAscending: boolean = true

    $: applySortAndFilter = () => {
        setSortAndFilter(sortBy, filterBy, isAscending)
    }
</script>

<main>
    {#if $user}
        <div class="container mx-auto max-w-md md:max-w-xl py-4">
            <h2 class="text-2xl text-center">What do you need to do?</h2>
            <div class="px-4">
                <TodoForm/>
                <!-- Sort and Filter UI -->
                <div class="flex flex-row justify-between rounded-lg py-2 mt-8 bg-white shadow">
                    <Button class="mx-auto bg-blue-400 hover:bg-blue-500 py-1">
                    Sort<ChevronDownSolid class="w-2 h-3 ml-2 text-white dark:text-white " />
                    </Button>
                    <Dropdown class="w-44 p-3 space-y-3 text-sm">
                        <li>
                            <Radio name="group1" bind:group={sortBy} value={"creation_date"} class=" hover:bg-gray-100 hover:rounded-lg" on:change={applySortAndFilter}>Date created</Radio>
                        </li>
                        <li>
                            <Radio name="group1" bind:group={sortBy} value={"due_date"} class=" hover:bg-gray-100 hover:rounded-lg" on:change={applySortAndFilter}>Date due</Radio>
                        </li>
                        <li>
                            <Toggle bind:checked={isAscending} on:change={applySortAndFilter} class="rounded p-1 hover:bg-gray-100">Ascending</Toggle>
                        </li>
                    </Dropdown>
                    <Button class="mx-auto bg-blue-400 hover:bg-blue-500">
                    Filter<ChevronDownSolid class="w-2 h-3 ml-2 text-white dark:text-white" />
                    </Button>
                    <Dropdown class="w-44 p-3 space-y-3 text-sm">
                        <li>
                            <Radio name="group2" bind:group={filterBy} value={"All"} on:change={applySortAndFilter} class=" hover:bg-gray-100 hover:rounded-lg">All</Radio>
                        </li>
                        <li>
                            <Radio name="group2" bind:group={filterBy} value={"Uncompleted"} on:change={applySortAndFilter} class=" hover:bg-gray-100 hover:rounded-lg">To do</Radio>
                        </li>
                        <li>
                            <Radio name="group2" bind:group={filterBy} value={"Completed"} on:change={applySortAndFilter} class=" hover:bg-gray-100 hover:rounded-lg">Completed</Radio>
                        </li>
                    </Dropdown>
                </div>
                {#each $filteredAndSortedTodos as todo(todo.id)}
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