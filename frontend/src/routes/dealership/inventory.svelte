<script>
  import { fetcher } from "../../db.js";
  import { onMount } from "svelte";

  let cars = [];

  onMount(async () => {
    try {
      cars = await fetcher("/car/all");
    } catch (error) {
      console.error(error);
    }
  });
</script>

<main class="min-h-screen flex flex-col items-center">
  <h1 class="text-2xl mb-4">Inventory</h1>
  <ul>
    {#each cars as car}
      <li class="mb-2">
        {car.name} - {car.model}
      </li>
    {/each}
  </ul>
</main>
