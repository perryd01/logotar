<script lang="ts">
  export let team: string = "SCHdesign!";
  export let slug: string = "schdesign";
  export let logo: string = "";
</script>

<a href="/logok/{slug}">
  <div class="shadow-md rounded-lg p-2">
    <div class="aspect-square rounded-lg relative group transition-colors">
      <div class="svgContainer">
        {@html logo}
      </div>
    </div>
    <div>
      <h1 class="text-center">{team}</h1>
    </div>
  </div>
</a>

<style lang="postcss">
  .svgContainer {
    @apply p-2 w-full h-full flex flex-col justify-center items-center;
  }
</style>
