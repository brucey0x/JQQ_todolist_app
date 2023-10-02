<script>
    import "../app.css"
    import { supabase } from "../supabaseClient"
    console.log(supabase);
</script>

<div class="container mx-auto my-6 max-w-lg">
    <slot></slot>
</div>