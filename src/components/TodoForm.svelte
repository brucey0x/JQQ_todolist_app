<script>
    import { user } from "../stores/authStore"
    import { addTodo } from "../stores/todoStore"
    
    let todo = ""

    const handleSubmit = () => {
        if(todo && $user){
            addTodo(todo, $user.id)
            todo = ""
        }
        console.error(`Error: todo (${todo}) and user (${user}) not both true.`);
    }
</script>

<form class="my-6" on:submit|preventDefault={handleSubmit}>
    <div class="flex flex-col text-sm mb-2">
        <label for="todo" class="font-bold mb-2 text-gray-800"></label>
        <input type="text" bind:value={todo} name="todo" placeholder="Insert task" class="appearance-none shadow border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg" />
    </div>
    <button type="submit" class="w-full shadow rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">Submit</button>
</form>