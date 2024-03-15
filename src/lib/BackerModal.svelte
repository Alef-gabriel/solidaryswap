<script>
</script>

<div
  id="popup-modal"
  tabindex="-1"
  class="overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-white"
>
  <div class="relative p-4 w-full max-w-md max-h-full">
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <button
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
        <div class="flex">
          <div class="relative w-full">
            <input
              type="number"
              id="crypto-input"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="0.323 ETH"
              required
            />
          </div>
          <button
            id="dropdown-crypto-button"
            data-dropdown-toggle="dropdown-crypto"
            class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
          >
            <svg class="h-4 w-4 me-2" fill="none" viewBox="0 0 10 17"
              ><path
                fill="#343434"
                d="M5 .5l-.11.364v10.582l.11.105 4.91-2.902L5 .5z"
              /><path fill="#8C8C8C" d="M5 .5L.086 8.65 5 11.55V.5z" /><path
                fill="#3C3C3B"
                d="M5 12.48l-.061.075v3.77L5 16.5l4.914-6.922L5 12.48z"
              /><path
                fill="#8C8C8C"
                d="M5 16.5v-4.02L.086 9.578 5 16.5z"
              /><path
                fill="#141414"
                d="M5 11.55L9.91 8.65 5 6.418v5.133z"
              /><path
                fill="#393939"
                d="M.086 8.649L5 11.551V6.418L.086 8.649z"
              /></svg
            >
            ETH
          </button>
        </div>
        <div class="flex gap-8 items-center justify-center pt-8">
          <button
            data-modal-hide="popup-modal"
            type="button"
            class="py-2.5 px-5 ms-3 text-lg font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-2/4"
            >No, cancel</button
          >
          <button
            data-modal-hide="popup-modal"
            type="button"
            class="text-white bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium text-lg inline-flex items-center justify-center px-5 py-2.5 w-2/4"
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
