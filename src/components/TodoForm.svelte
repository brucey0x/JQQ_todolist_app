<script lang="ts">
    import { today } from "$lib/utils"
    import { user } from "../stores/authStore"
    import { addTodo } from "../stores/todoStore"
    
    let todo: string = ""
    let dueDate: string | null = null

    const handleSubmit = () => {
        if(todo && $user){
            let trimmedTodo = todo.trim()
            addTodo(trimmedTodo, dueDate, $user.id)
            todo = ""
            if(dueDate) {
                console.log("dueDate is: ", dueDate);
                dueDate = null
            }
            return
        }
        console.error(`Error: todo (${todo}) and user (${user}) not both true.`);
    }
</script>

<form class="my-4" on:submit|preventDefault={handleSubmit}>
    <div class="flex flex-col text-sm mb-2">
        <div class="flex flex-row">
            <input type="text" bind:value={todo} name="todo" placeholder="Insert task" class="basis-1/2 appearance-none shadow border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg mr-2" />
            <input type="date" bind:value={dueDate} min={today} name="todoDate" class="basis-1/2 appearance-none shadow border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg ml-2" />
        </div>
    </div>
    <button type="submit" class="w-full shadow rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">Submit</button>
</form>