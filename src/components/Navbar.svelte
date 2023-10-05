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

<div class="flex justify-end px-4 my-4 ">
    <button on:click={logout} class="shadow rounded bg-red-600 hover:bg-red-700 text-white py-1 px-2">Log out</button>
</div>