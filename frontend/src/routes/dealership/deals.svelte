<script>
  import { fetcher } from "../../db.js";
  import { onMount } from "svelte";

  let deals = [];

  onMount(async () => {
    try {
      deals = await fetcher("/deal/all");
    } catch (error) {
      console.error(error);
    }
  });
</script>

<main class="min-h-screen flex flex-col items-center">
  <h1 class="text-2xl mb-4">Deals</h1>
  <ul>
    {#each deals as deal}
      <li class="mb-2">
        {deal.deal_info.description} - {deal.car_id}
      </li>
    {/each}
  </ul>
</main>
