<script lang="ts">
    import type { Session, User } from "@supabase/supabase-js"
    import "../app.css"
    import Auth from "../components/Auth.svelte"
    import Navbar from "../components/Navbar.svelte"
    import { user } from "../stores/authStore"
    import { loadTodos } from "../stores/todoStore"
    import { supabase } from "../supabaseClient"

    const getSupabaseSession = async () => {
        const { data, error } = await supabase.auth.getSession()
        console.log("getSupabaseSession data is: ", data);

        if (error) return console.error(error)

        if(data.session) {
            const sessionUser: User | null = data.session.user
            user.set(sessionUser)
            console.log("user is: ", sessionUser);
        }
    }

    getSupabaseSession()

    supabase.auth.onAuthStateChange((event, session: Session | null) => {
        if(session?.user) {
            const authedUser = session.user
            user.set(authedUser)
            console.log("authedUser: ", authedUser)
            loadTodos()
        }
    })
</script>

<div class="container mx-auto my-6 max-w-lg">
    {#if $user}
        <Navbar/>
        <slot>
        </slot>
    {:else}
        <div class="my-6">
        </div>
        <Auth/>
    {/if}
</div>