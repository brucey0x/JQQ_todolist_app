<script lang="ts">
    import type { Session, User } from "@supabase/supabase-js"
    import { onMount } from "svelte"
    import "../app.css"
    import Auth from "../components/Auth.svelte"
    import Navbar from "../components/Navbar.svelte"
    import { user } from "../stores/authStore"
    import { loadTodos } from "../stores/todoStore"
    import { supabase } from "../supabaseClient"

    onMount(async () => {
        const { data, error } = await supabase.auth.getSession()
        console.log("getSupabaseSession data is: ", data);

        if (error) return console.error(error)

        if(data.session) {
            const sessionUser: User | null = data.session.user
            user.set(sessionUser)
            console.log("user is: ", sessionUser);
        }
    }
    )

    supabase.auth.onAuthStateChange((event, session: Session | null) => {
        if(session?.user) {
            const authedUser = session.user
            user.set(authedUser)
            console.log("authedUser: ", authedUser)
            loadTodos()
        }
    })
</script>

<svelte:head>
	<title>Svelte Todo App</title>
	<meta name="description" content="Budi's Todo App built with Svelte and Supabase." />
</svelte:head>


<main>
    <body class="bg-blue-200"></body>
    <h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl md:my-12 my-6">Todo List App ✅</h1>
        {#if $user}
            <div class="container mx-auto my-6">
                <div class=" max-w-md md:max-w-xl">
                    <Navbar/>
                </div>
                <h2 class="text-2xl text-center">What do you need to do?</h2>
                <slot>
                </slot>
            </div>
            {:else}
            <div class="container mx-auto my-6 max-w-md md:max-w-xl">
                <Auth/>
            </div>
        {/if}
</main>