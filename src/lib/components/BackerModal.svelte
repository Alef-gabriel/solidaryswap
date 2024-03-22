<script>
  import EtheriumInput from "./EtheriumInput.svelte";
  import { buyTokens } from "$lib/walletConnect.js";
  import { fetchData } from "$lib/fetchData.js"
  export let project;
  export let isActivated;
  export let userId;
  export let isConfirmed;

  let form = {
    transaction: "",
    userId: userId,
    tableName: project.backers_table_name,
  };

  let amount;
  async function handleSubmit() {
    form.transaction = await buyTokens(project.project_contract_id, amount);
    if(form.transaction){
		await fetchData(form, "http://localhost:5173/api/project/backer");
		isActivated = false;
		isConfirmed = true;
	}
  }
</script>

{#if isActivated}
  <div
    id="popup-modal"
    tabindex="-1"
    class="overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-lg rounded-lg shadow bg-white"
  >
    <div class="relative w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          on:click={() => {
            isActivated = false;
          }}
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="popup-modal"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-4 md:p-5 text-center">
          <svg
            class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to backer this project?
          </h3>
          <div class="flex gap-24 items-center justify-center pb-10">
            <h3 class="mb-5 text-lg font-semibold text-gray-600">
              Token: <span class="text-violet-500">Avex</span>
            </h3>
            <h3 class="mb-5 text-lg font-semibold text-gray-600">
              symbol: <span class="text-violet-500">AVX</span>
            </h3>
          </div>
          <EtheriumInput bind:amount />
          <div class="flex gap-8 items-center justify-center pt-8">
            <button
              on:click={() => {
                isActivated = false;
              }}
              data-modal-hide="popup-modal"
              type="button"
              class="py-2.5 px-5 ms-3 text-lg font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-2/4"
              >No, cancel</button
            >
            <button
              on:click={handleSubmit}
              data-modal-hide="popup-modal"
              type="button"
              class="text-white bg-violet-600 hover:bg-violet-800 font-medium text-lg inline-flex items-center justify-center px-5 py-2.5 w-2/4"
            >
              Yes, I'm sure
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
