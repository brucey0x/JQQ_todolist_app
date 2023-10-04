<script lang="ts">
	import { supabase } from "../supabaseClient"

    let load = "false"
    let email: string

    const handleLogin = async () => {
        try {
            console.log(email);
            const {error} = await supabase.auth.signInWithOtp({email})
        
            if(error) throw error

            email = ""

            alert("Check your email for the login link.")
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }
</script>

<h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">
    Log in
</h1>
<p class="text-center mt-2">Sign in with magic link via your email</p>

<form on:submit|preventDefault={handleLogin}>
    <div class="flex flex-col text-sm mb-2">
        <label for="email" class="font-bold mb-2 text-gray-800">Email</label>
        <input type="email" placeholder="Your email" name="email" class="appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg" bind:value={email}>
    </div>
    <button
    class="w-full shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
    type="submit">Log in</button>
</form>