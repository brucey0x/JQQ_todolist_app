<script lang="ts">
	import { onMount } from "svelte"
	import { supabase } from "../supabaseClient"
    
    let userEmail: string
    let emailInput: HTMLInputElement
    let showDialog: boolean = false
    let modalDiv: HTMLElement

    onMount(() => emailInput.focus())

    $: keydownAction = (event: KeyboardEvent) => { if (event.key === "Enter" || event.key === "Escape") {showDialog = false}}
    $: if(showDialog) {modalDiv.focus()}

    const getURL = () => {
    let url =
        import.meta.env.VITE_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        import.meta.env.VITE_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'http://localhost:5173/'
    console.log(`VITE_PUBLIC_SITE_URL: ${import.meta.env.VITE_PUBLIC_SITE_URL}
    VITE_PUBLIC_VERCEL_URL: ${import.meta.env.VITE_PUBLIC_VERCEL_URL}`);
    
        // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
    return url
    }

    const handleLogin = async () => {
        try {
            console.log(userEmail);
            const {error} = await supabase.auth.signInWithOtp({
                email: userEmail,
                options: {
                    emailRedirectTo: getURL(),
                },
            })
        
            if(error) throw error

            userEmail = ""
            showDialog = true
        } catch (error) {
            console.error(error)
            showDialog = false
        }
    }
</script>

<p class="text-center text-base md:text-lg mt-4 mb-2">Insert email to login via magic link ✨</p>

<form on:submit|preventDefault={handleLogin}>
    <div class="flex flex-col mb-2 w-4/6 mx-auto">
        <input type="email" placeholder="Your email" name="email" class="appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg" bind:value={userEmail} bind:this={emailInput}>
        <button
        class="w-full shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 my-2"
        type="submit">Log in</button>
    </div>
</form>

{#if showDialog}
    <div 
    class="fixed inset-0 flex items-center justify-center z-50 shadow-md backdrop-blur-sm"
    bind:this={modalDiv}>
    <div 
    class="bg-white p-4 rounded-lg w-1/3 shadow-md"
    tabindex="0" 
    role="dialog"
    on:blur={() => { showDialog = false}}
    on:keydown={keydownAction}
    >
        <h1 class="text-xl m-2 text-center">Aba cadabra... login! 🪄</h1>
        <p class="m-4">Check your email for the login link.</p>
        <button 
        class="bg-blue-500 text-white p-2 rounded flex mx-auto shadow" 
        on:click={() => (showDialog = false)}
        on:keydown={keydownAction}>Close</button>
    </div>
    </div>
{/if}