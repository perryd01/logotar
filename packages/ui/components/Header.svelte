<script lang="ts">
  import { mini } from "../static/logos";

  export let title: string = "logótár";
  export let logo: string = mini;

  import { Menu, X } from "lucide-svelte";

  import { onMount, onDestroy } from "svelte";
  let prevScrollPos = 0;
  let show = false;
  let isOpen = false;
  export let browser = false;
  export let navigating: any;
  onMount(() => {
    if (browser) {
      window.onscroll = () => {
        const currentScrollPos = window.scrollY;
        show = prevScrollPos < currentScrollPos && currentScrollPos > 24;
        prevScrollPos = currentScrollPos;
      };
    }
  });

  onDestroy(() => {
    if (browser) {
      window.onscroll = () => {};
    }
  });

  $: if ($navigating) {
    isOpen = false;
  }

  export let routes = [
    {
      name: "főoldal",
      path: "/",
    },
    {
      name: "logók",
      path: "/logok",
    },
    {
      name: "kategóriák",
      path: "/kategoriak",
    },
    {
      name: "keresés",
      path: "/kereses",
    },
  ] as {
    name: string;
    path: string;
  }[];
</script>

<header class:scrolled={show} class="bg-white text-2xl font-medium p-2">
  <div
    class="container items-center mx-auto p-2 rounded-lg flex flex-row justify-between"
  >
    <a href="/" class="flex flex-row items-center" style="gap: 8px">
      <div class="h-8 aspect-square" style="height: 32px; aspect-ratio: 1/1;">
        {@html logo}
      </div>
      <span>{title}</span>
    </a>
    <nav>
      <ul class="flex flex-row gap-2">
        {#each routes as r}
          <li class="text-xl font-medium text-black">
            <a href={r.path}>{r.name}</a>
          </li>
        {/each}
      </ul>
    </nav>
    <button class="md:hidden" on:click={() => (isOpen = !isOpen)}>
      {#if !isOpen}
        <Menu size="32" />
      {:else}
        <X size="32" />
      {/if}
    </button>
  </div>
</header>
<aside class:open={isOpen} class:close={!isOpen}>
  <nav>
    <ul>
      {#each routes as r}
        <li class="text-xl font-medium text-black">
          <a href={r.path}>{r.name}</a>
        </li>
      {/each}
    </ul>
  </nav>
</aside>

<style lang="postcss">
  header {
    @apply sticky top-0 left-0 w-full z-50 flex flex-row justify-between items-center px-8 h-16;
    justify-content: space-between;
    transition: transform 400ms cubic-bezier(1, 0.26, 0.51, 0.72);
  }

  .scrolled {
    transform: translateY(-100%);
  }

  aside {
    @apply flex md:hidden;
    @apply z-40 -right-full;
    @apply fixed w-full h-[100vh] bg-white border-r-2 shadow-lg flex-col justify-center;
    transition: right 400ms cubic-bezier(1, 0.26, 0.51, 0.72);
  }

  header nav {
    @apply hidden md:block;
  }

  aside nav {
    @apply p-12 text-xl container mx-auto;
  }

  .open {
    @apply right-0;
  }
</style>
