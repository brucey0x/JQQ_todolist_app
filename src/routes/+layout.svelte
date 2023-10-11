<script lang="ts">
    import type { Session, User } from "@supabase/supabase-js"
    import { onMount } from "svelte"
    import "../app.css"
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
        }
    }
    )

    supabase.auth.onAuthStateChange((event, session: Session | null) => {
        
        if(session?.user) {
            const authedUser = session.user
            user.set(authedUser)
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
    <h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl md:mt-12 mt-6">Todo List App ✅</h1>
    <div class="container mx-auto max-w-md md:max-w-xl">
        <Navbar/>
        <slot/>
    </div>
</main>