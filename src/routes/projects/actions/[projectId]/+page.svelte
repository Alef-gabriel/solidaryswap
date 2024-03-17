<script>
  import MainNavBar from "$lib/MainNavBar.svelte";
  import * as navigation from "$app/navigation";
  import EtheriumInput from "../../../../lib/EtheriumInput.svelte";
  import { deposit } from "$lib/walletConnect.js";
  export let data;

  let withdraw = false;
  let amount;

  const depositSubmit = async () => {
	deposit(data.project[0].project_contract_id, amount);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5173/api/user-update/${data?.authedUser.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      if (response.ok) {
        return await response.json();
      } else {
        const error = new Error(await response.text());
        throw error;
      }
    } catch (error) {
      throw error;
    }
  };
</script>

<MainNavBar isOnEditPage={false} />
<div class="w-full border-b items-center">
  <div class="w-full flex items-center p-8">
    <h1 class="text-5xl">Project actions</h1>
  </div>
  <div class="flex flex-row">
    <div
      class="flex flex-col w-1/6 gap-1 p-4 items-center hover:border-b-2 border-violet-600"
    >
      <a
        href="#deposit"
        on:click={() => {
          withdraw = false;
        }}
      >
        <p class="text-lg text-gray-600">Deposit</p>
      </a>
    </div>
    <div
      class="flex flex-col w-1/6 gap-1 p-4 items-center hover:border-b-2 border-violet-600"
    >
      <a
        href="#withdraw"
        on:click={() => {
          withdraw = true;
        }}
      >
        <p class="text-lg text-gray-600">Withdraw</p>
      </a>
    </div>
  </div>
</div>
{#if withdraw}
  <div
    id="withdraw"
    class="flex gap-16 w-full h-86 items-center justify-center p-8"
  >
    <div class="w-1/4">
      <h2 class="text-xl pb-4">Withdraw</h2>
      <p class="text-gray-400 text-lg">
        Trigger the withdrawal process to reclaim funds designated for project
        investment.
      </p>
    </div>
    <div class="flex flex-col gap-4 w-3/4 items-center">
      <!-- TODO:Use user wallet or create a connect wallet button here -->
      <div class="mb-6 w-3/4 flex flex-col">
        <EtheriumInput bind:amount />
      </div>
      <button
        class="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 w-2/4"
      >
        Withdraw funds
      </button>
    </div>
  </div>
{/if}
{#if !withdraw}
  <div
    id="deposit"
    class="flex gap-16 w-full h-86 items-center justify-center p-8"
  >
    <div class="w-1/4">
      <h2 class="text-xl pb-4">Deposit</h2>
      <p class="text-gray-400 text-lg">
        Initiate the deposit of project profits. The deposited funds are
        earmarked for redistribution among stakeholders or designated
        beneficiaries. The deposit function streamlines the aggregation of
        funds, enabling subsequent redistribution based on token balances.
      </p>
    </div>
    <div class="flex flex-col gap-4 w-3/4 items-center">
      <div class="mb-6 w-3/4 flex flex-col">
        <EtheriumInput bind:amount />
      </div>
      <button
	  on:click={depositSubmit}
        class="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 w-2/4"
      >
        Deposit profits
      </button>
    </div>
  </div>
{/if}
