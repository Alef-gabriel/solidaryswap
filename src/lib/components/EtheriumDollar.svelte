<script>
  import { onMount } from "svelte";
  export let ethValue;
  let dolValue;

  async function getEthPrice() {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      const data = await response.json();

      if (response.ok) {
        return data.ethereum.usd;
      } else {
        console.error(
          "Error fetching Ethereum price:",
          data.error || response.statusText
        );
        return null;
      }
    } catch (error) {
      console.error("Error fetching Ethereum price:", error);
      return null;
    }
  }

  onMount(async () => {
    const ethPrice = await getEthPrice();
    const eth = document.getElementById("etherium-input");
    eth.addEventListener("input", async () => {
      dolValue = ethValue * ethPrice;
      if (dolValue == 0) dolValue = "";
    });

    const dol = document.getElementById("dollar-input");
    dol.addEventListener("input", async () => {
      ethValue = (dolValue / ethPrice).toFixed(8);
      if (ethValue == 0) ethValue = "";
    });
  });
</script>

<div
  class="space-x-0 space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse flex items-center flex-col sm:flex-row mb-4"
>
  <div class="flex">
    <div class="relative w-full">
      <input
        bind:value={dolValue}
        type="number"
        id="dollar-input"
        class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        placeholder="421 USD"
        required
      />
    </div>
    <button
      disabled={true}
      id="dropdown-fiat-currency-button"
      data-dropdown-toggle="dropdown-fiat-currency"
      class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg"
      type="button"
    >
      <svg
        fill="none"
        aria-hidden="true"
        class="h-4 w-4 me-2"
        viewBox="0 0 20 15"
        ><rect width="19.6" height="14" y=".5" fill="#fff" rx="2" /><mask
          id="a"
          style="mask-type:luminance"
          width="20"
          height="15"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
          ><rect width="19.6" height="14" y=".5" fill="#fff" rx="2" /></mask
        ><g mask="url(#a)"
          ><path
            fill="#D02F44"
            fill-rule="evenodd"
            d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
            clip-rule="evenodd"
          /><path fill="#46467F" d="M0 .5h8.4v6.533H0z" /><g
            filter="url(#filter0_d_343_121520)"
            ><path
              fill="url(#paint0_linear_343_121520)"
              fill-rule="evenodd"
              d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
              clip-rule="evenodd"
            /></g
          ></g
        ><defs
          ><linearGradient
            id="paint0_linear_343_121520"
            x1=".933"
            x2=".933"
            y1="1.433"
            y2="6.1"
            gradientUnits="userSpaceOnUse"
            ><stop stop-color="#fff" /><stop
              offset="1"
              stop-color="#F0F0F0"
            /></linearGradient
          ><filter
            id="filter0_d_343_121520"
            width="6.533"
            height="5.667"
            x=".933"
            y="1.433"
            color-interpolation-filters="sRGB"
            filterUnits="userSpaceOnUse"
            ><feFlood
              flood-opacity="0"
              result="BackgroundImageFix"
            /><feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            /><feOffset dy="1" /><feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
            /><feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_343_121520"
            /><feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_343_121520"
              result="shape"
            /></filter
          ></defs
        ></svg
      >
      USD
    </button>
  </div>
  <button
    disabled={true}
    type="button"
    class="p-3 text-sm font-medium text-gray-500 focus:outline-none bg-gray-100 rounded-lg"
  >
    <svg
      class="w-4 h-4"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 14"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M11 10H1m0 0 3-3m-3 3 3 3m1-9h10m0 0-3 3m3-3-3-3"
      />
    </svg>
    <span class="sr-only">Convert currency</span>
  </button>
  <div class="flex">
    <div class="relative w-full">
      <input
        bind:value={ethValue}
        type="number"
        id="etherium-input"
        class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        placeholder="0.323 ETH"
        required
      />
    </div>
    <button
      id="dropdown-crypto-button"
      disabled={true}
      data-dropdown-toggle="dropdown-crypto"
      class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg focus:ring-4 focus:outline-none focus:ring-gray-100"
      type="button"
    >
      <svg class="h-4 w-4 me-2" fill="none" viewBox="0 0 10 17"
        ><path
          fill="#343434"
          d="M5 .5l-.11.364v10.582l.11.105 4.91-2.902L5 .5z"
        /><path fill="#8C8C8C" d="M5 .5L.086 8.65 5 11.55V.5z" /><path
          fill="#3C3C3B"
          d="M5 12.48l-.061.075v3.77L5 16.5l4.914-6.922L5 12.48z"
        /><path fill="#8C8C8C" d="M5 16.5v-4.02L.086 9.578 5 16.5z" /><path
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
</div>
