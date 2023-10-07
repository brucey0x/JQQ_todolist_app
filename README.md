# Briefing

Creating my first Svelte application by following James Q Quick's todo list tutorial. This should cover Svelte, Sveltekit, Supabase and will result in a todo list app that allows for users to log in and access their stored tasks.

-   [Build an App with SvelteKit and Tailwind CSS](https://www.youtube.com/watch?v=YipaPr4Aex8&t=166s)
-   [SvelteKit and Supabase Tutorial with Authentication - Build a SvelteKit App Part 2](https://www.youtube.com/watch?v=YqIyET7XKIQ)

[Production version of site hosted on Vercel](https://svelte-todo-app-budivoogt.vercel.app/)

# Tech stack

-   Svelte
-   Typescript
-   Supabase

## Tweaks

-   Using `pnpm` instead of `npm`.
-   Using Typescript instead of vanilla JS

# Version change observations

`__layout.svelte` is now `+layout.svelte`.

# Todos

## Features & upgrades

-   [x] Add local storage or database with authentication.
-   [x] Load the data upon each page load.
-   [x] Add dates to tasks
-   [x] Auto-focus on sign-in and task input forms upon DOM load.
-   [x] Make pages responsive (good looking on mobile too)
-   [x] Option to update text
-   [x] Option to update date
-   [x] Add footer with link to Budi Voogt site.
-   [x] Improve sign-in confirmation to something more fancy
-   [ ] Option to sort by date
-   [ ] Filter by completion state: Active, Completed, All.
-   [ ] Drag and drop tasks to different order
-   [ ] Animation to improve smoothness
-   [ ] Pop-out per task with description and comments which can be edited by user.
-   [ ] Improve CSS styling.
-   [ ] Study TailwindCSS basics and how to organize messy classes.

## Bugs

-   [x] Make Supabase magic sign-in link work for the public Vercel hosted version
-   [ ] Investigate (and ideally fix) Typescript errors in Svelte and JS files.

## Testing

-   [ ] Test on mobile and different browsers.
