<script lang="ts">
  import { Moon, Sun } from "lucide-svelte";
  import { getLogoWithParams } from "../utils";

  export let groupSlug: string = "schdesign";
  export let teamSlug: string = "schdesign";
  export let logo: {
    id: number;
    name: string;
    type: "LIGHT" | "DARK";
  };
  export let host: string = "";

  let isDark = logo.type === "DARK";

  export let onClick: () => void | undefined = undefined;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<figure class="shadow-md rounded-lg p-2 cursor-pointer">
  <div class="aspect-square rounded-lg relative z-40">
    <button on:click={() => (isDark = !isDark)}>
      {#if !isDark}
        <Sun />
      {:else}
        <Moon />
      {/if}
    </button>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class:dark={isDark} class="svgContainer" on:click={onClick}>
      <img
        src={getLogoWithParams({
          host,
          group: groupSlug,
          team: teamSlug,
          logo: logo.name,
        })}
        class="object-contain w-full h-full"
        alt={`${logo.name} logo`}
      />
    </div>
  </div>
  <div>
    <h1 class="text-center text-sm py-2 truncate" on:click={onClick}>
      {logo.name}
    </h1>
  </div>
</figure>

<style lang="postcss">
  .svgContainer {
    @apply p-4 w-full h-full flex flex-col justify-center items-center bg-gray-50 rounded-lg transition-colors;
  }

  .dark {
    @apply bg-gray-800;
  }

  button {
    @apply absolute top-0 right-0 bg-white p-1 m-1 aspect-square rounded-md shadow-md;
  }
</style>
