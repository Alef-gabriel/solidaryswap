<script>
  import MainNavBar from "$lib/components/MainNavBar.svelte";
  import BtcInput from "$lib/components/BtcInput.svelte";
  import ConfirmationModal from "$lib/components/ConfirmationModal.svelte";
  import { deposit } from "$lib/walletConnect.js";
  import { fetchData } from "$lib/fetchData.js";
  export let data;

  let page = 1;
  let endPoint = "";
  let amount;
  let walletToRecive;
  let confirmation = false;
  let phrase = "";

  const depositSubmit = async () => {
    await deposit(data.project[0].project_contract_id, amount);
    confirmation = true;
    phrase = "deposit aproved";
  };

  const withdrawSubmit = async () => {
    endPoint = "withdraw";
    await fetchData(
      {
        amount,
        walletToRecive,
        contractAddress: data.project[0].project_contract_id,
        project_user_id: data.project[0].user_contract_id,
      },
      `http://localhost:5173/api/project/${endPoint}`
    );
    confirmation = true;
    phrase = "withdraw aproved";
  };

  const profitSubmit = async () => {
    endPoint = "profit-sharing";
    await fetchData(
      {
        amount,
        contractAddress: data.project[0].project_contract_id,
        project_user_id: data.project[0].user_contract_id,
      },
      `http://localhost:5173/api/project/${endPoint}`
    );
    confirmation = true;
    phrase = "profit-sharing complete";
  };
</script>

<MainNavBar isOnEditPage={false} userImage={data.authedUser.image} />
<ConfirmationModal phrase=" backer this project" show={confirmation} />
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
          page = 1;
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
          page = 2;
        }}
      >
        <p class="text-lg text-gray-600">Withdraw</p>
      </a>
    </div>
    <div
      class="flex flex-col w-1/6 gap-1 p-4 items-center hover:border-b-2 border-violet-600"
    >
      <a
        href="#profit"
        on:click={() => {
          page = 3;
        }}
      >
        <p class="text-lg text-gray-600">Profit</p>
      </a>
    </div>
  </div>
</div>
{#if page == 2}
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
      <div class="mb-6 w-3/4 flex flex-col gap-4">
        <input
          id="location"
          name="location"
          bind:value={walletToRecive}
          placeholder="wallet address..."
          class="w-full p-3 bg-white border focus:outline-none resize-none"
        />
        <BtcInput bind:amount />
      </div>
      <button
        on:click={withdrawSubmit}
        class="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 w-2/4"
      >
        Withdraw funds
      </button>
    </div>
  </div>
{/if}
{#if page == 1}
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
        <BtcInput bind:amount />
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
{#if page == 3}
  <div
    id="profits"
    class="flex gap-16 w-full h-86 items-center justify-center p-8"
  >
    <div class="w-1/4">
      <h2 class="text-xl pb-4">Profits</h2>
      <p class="text-gray-400 text-lg">
        Initiate Profit Distribution for the Project. This action facilitates
        the redistribution among stakeholders or designated beneficiaries, based
        on their token balances.
      </p>
    </div>
    <div class="flex flex-col gap-4 w-3/4 items-center">
      <div class="mb-6 w-3/4 flex flex-col">
        <BtcInput bind:amount />
      </div>
      <button
        on:click={profitSubmit}
        class="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 w-2/4"
      >
        Distribute profits
      </button>
    </div>
  </div>
{/if}
