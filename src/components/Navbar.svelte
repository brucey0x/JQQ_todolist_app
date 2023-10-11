<script lang="ts">
	import { page } from "$app/stores"
	import { user } from "../stores/authStore"
	import { supabase } from "../supabaseClient"

    
    const logout = async () => {
        console.log("Log out");
        const {error} = await supabase.auth.signOut()
        if (error) {
            console.error("Error during signout: ", error);
        } else {
            location.reload()
        }
    }
    
    $: isActive = (path: string) => $page.url.pathname === path ? 'bg-blue-500' : 'bg-blue-400'

</script>

<div class="flex justify-center px-4 my-4">
    <a href="/"><button class={`shadow rounded ${isActive('/')} bg-blue-400 hover:bg-blue-500 text-white py-1 px-2 mx-2`}>Home</button></a>

    <a href="/about"><button class={`shadow rounded ${isActive("/about")} bg-blue-400 hover:bg-blue-500 text-white py-1 px-2 mx-2`}>About</button></a>
    {#if $user}
        <button on:click={logout} class="shadow rounded bg-blue-400 hover:bg-blue-500 text-white py-1 px-2 mx-2">Log out</button>
    {/if}
</div>