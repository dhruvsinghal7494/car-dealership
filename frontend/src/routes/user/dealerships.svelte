<script>
  import { fetcher } from "../../db.js";
  import { onMount } from "svelte";

  let dealerships = [];
  let car_id = "";

  const searchDealerships = async () => {
    try {
      dealerships = await fetcher(`/user/dealerships?car_id=${car_id}`);
    } catch (error) {
      console.error(error);
    }
  };
</script>

<main class="min-h-screen flex flex-col items-center">
  <h1 class="text-2xl mb-4">Dealerships</h1>
  <input
    type="text"
    bind:value={car_id}
    class="input"
    placeholder="Enter Car ID"
  />
  <button on:click={searchDealerships} class="btn">Search</button>
  <ul>
    {#each dealerships as dealership}
      <li class="mb-2">
        {dealership.dealership_name} - {dealership.dealership_location}
      </li>
    {/each}
  </ul>
</main>
