<script lang="ts">
  export let teamName: string = "SCHdesign!";
  export let href: string = "schdesign";

  export let image: string = "";
</script>

<a {href}>
  <div class="shadow-md rounded-lg p-2">
    <div class="aspect-square rounded-lg relative group transition-colors">
      <div class="svgContainer">
        <img
          src={image}
          class="object-contain w-full h-full"
          alt={`${teamName} logo`}
        />
      </div>
    </div>
    <div>
      <h1 class="text-center">{teamName}</h1>
    </div>
  </div>
</a>

<style lang="postcss">
  .svgContainer {
    @apply p-2 w-full h-full flex flex-col justify-center items-center;
  }
</style>
