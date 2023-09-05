<script lang="ts">
  import { white } from "../static/logos";
  const logo = white;
  export let version: string | undefined = "0.0.0";
  export let domain: string = "logotar.schdesign.hu";
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
    {
      name: "gyik",
      path: "/gyik",
    },
  ] as {
    name: string;
    path: string;
  }[];
</script>

<!--
    @component
    @name Footer
    @default version 0.0.1
    @default domain logotar.schdesign.hu
-->

<footer>
  <div class="footerContent">
    <a href="/">{domain}</a>
    <ul
      class="flex flex-col sm:flex-row gap-1 items-center sm:gap-4 text-logotar-gray-100"
    >
      {#each routes as r}
        <li>
          <a href={r.path}>{r.name}</a>
        </li>
      {/each}
    </ul>
    <span>made with sveltekit & tailwindcss & turborepo</span>
    <span>{`logotar v${version}`}</span>
    <span class="w-32">
      {@html logo}
    </span>
  </div>
</footer>

<style lang="postcss">
  footer {
    @apply bg-logotar-dark py-8 px-2 text-white;
  }

  .footerContent {
    @apply flex flex-col items-center gap-3 container mx-auto;
  }
</style>
