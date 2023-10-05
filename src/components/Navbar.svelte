<script lang="ts">
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
</script>

<div class="my-4 flex justify-end">
    <button on:click={logout} class="shadow rounded bg-red-500 hover:bg-red-600 text-white py-2 px-4">Log out</button>
</div>