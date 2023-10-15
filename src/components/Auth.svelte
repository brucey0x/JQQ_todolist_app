<script lang="ts">
	import { Button, Modal } from "flowbite-svelte"
	import { onMount } from "svelte"
	import { supabase } from "../supabaseClient"
    
    let userEmail: string
    let emailInput: HTMLInputElement
    let modal: boolean = false

    onMount(() => emailInput.focus())

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
        if(userEmail){
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
            } catch (error) {
                console.error(error)
                alert(error)
            }
        }
    }
</script>

<p class="text-center text-base md:text-lg mt-4 mb-2">Insert email to login via magic link ✨</p>

<form on:submit|preventDefault={handleLogin} on:submit={() => (modal = true)}>
    <div class="flex flex-col mb-2 w-4/6 mx-auto">
        <input type="email" placeholder="Your email" name="email" class="appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg" bind:value={userEmail} bind:this={emailInput}>
        <button
        class="w-full shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 my-2"
        type="submit">Log in</button>

        <Modal title="Check your inbox 💌" bind:open={modal} autoclose outsideclose>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">The magic link has been sent to your inbox. Click the link to login.</p>
            <svelte:fragment slot="footer">
                <Button>Got it</Button>
            </svelte:fragment>
        </Modal>
    </div>
</form>