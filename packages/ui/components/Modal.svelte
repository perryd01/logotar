<script>
  export let showModal;

  let dialog;

  $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    <slot name="header" />
    <hr />
    <div class="my-4">
      <slot />
    </div>
    <hr />
    <!-- svelte-ignore a11y-autofocus -->
    <div class="flex flex-row justify-end">
      <button autofocus on:click={() => dialog.close()}>bezárás</button>
    </div>
  </div>
</dialog>

<style lang="postcss">
  hr {
    @apply my-2;
  }
  dialog {
    @apply p-1 border-0 rounded-lg shadow-md max-w-[32em];
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  button {
    @apply block px-4 py-2 text-sm font-medium text-white bg-logotar-primary border-0 rounded-lg;
  }
</style>
