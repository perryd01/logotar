<script lang="ts">
  let count = 0;

  function handleClick() {
    count += 1;
  }
</script>

<button class="text-xl bg-red-500" on:click={handleClick}>
  clicks: {count}
</button>
