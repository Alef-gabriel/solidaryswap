<script>
  import { businessAreas } from "$lib";
  import MainNavBar from "$lib/components/MainNavBar.svelte";
  import { goto } from "$app/navigation";
  import { contractBalance } from "$lib/contractBalance.js";
  import { fetchMidia, formatUSDPrice } from "$lib/ethUltils.js";
  export let data;
  let filters = [];
  let page = 0;

  const handlePageChange = (newPageNumber) => {
    const currentUrl = window.location.pathname + window.location.search;
    const newUrl = currentUrl.includes("?")
      ? `${currentUrl}&page=${newPageNumber}`
      : `${currentUrl}?page=${newPageNumber}`;
    goto(newUrl);
  };

  function manageFilters(subArea) {
    const index = filters.indexOf(subArea);
    if (index !== -1) {
      filters.splice(index, 1);
    } else {
      filters.push(subArea);
    }
    let newUrl;
    const currentUrl = window.location.pathname + window.location.search;
    if (filters.length == 0) {
      newUrl = "/projects";
    } else {
      newUrl = currentUrl.includes("?")
        ? `${currentUrl}&filters=${filters}`
        : `${currentUrl}?filters=${filters}`;
    }
    goto(newUrl);
  }

  function showFilter(id) {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.hidden = !targetElement.hidden;
    }
  }

  async function balanceInBtc(contractId) {
    const btcBalance = await contractBalance(contractId);
    return data.btcPrice * btcBalance;
  }

  function balanceToPercent(value, goal) {
    const totalGoal = data.btcPrice * goal;
    return ((value / totalGoal) * 100).toFixed(2);
  }
</script>

<MainNavBar isOnEditPage={false} />
<div class="flex w-full gap-8">
  <div class="flex flex-col p-4 w-1/4 gap-2">
    {#each businessAreas as area}
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        on:click={() => {
          showFilter(area.name);
        }}
        class="text-sm w-full p-2.5 border-b-2 focus:border-purple-400 focus:outline-none bg-white flex"
      >
        {area.name}
      </button>
      <div
        id={area.name}
        hidden={true}
        class="z-10 w-full p-3 bg-gray-50 rounded-lg shadow"
      >
        <ul class="space-y-2 text-sm" aria-labelledby="dropdownDefault">
          {#each area.subAreas as subArea}
            <li class="flex items-center" value={subArea}>
              <div class="flex">
                <input
                  on:click={() => {
                    manageFilters(subArea);
                  }}
                  type="checkbox"
                  id={subArea}
                  class="peer hidden"
                />
                <label
                  for={subArea}
                  class="select-none cursor-pointer rounded-lg border border-violet-400
					 py-2 px-3 font-bol transition-colors duration-200 ease-in-out peer-checked:bg-violet-200 peer-checked:border-violet-600"
                  >{subArea}</label
                >
              </div>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
  <div class="flex flex-col gap-2 p-4 w-3/4">
    <!-- each in projects to get all -->
    {#if data}
      {#each data.projects as project}
        <a href="/projects/{project.id}">
          <div class="flex items-start p-4 shadow">
            {#await fetchMidia(project.image) then image}
              <img id="pic-bunner" src={image} alt="" width="96" height="96" />
              {#if image}
                <div
                  class="flex flex-col justify-center pl-4 items-center w-3/4"
                >
                  <h1 class="text-2xl pb-2 font-semibold">
                    {project.title}
                  </h1>
                  <p class="text-gray-400 text-sm">
                    {project.description}
                  </p>
                </div>
                <div
                  class="flex flex-col w-1/4 border-l-2 gap-1 p-2 h-full border-violet-400"
                >
                  {#await balanceInBtc(project.project_contract_id) then balance}
                    <h2 class="text-xl text-violet-600 font-semibold">
                      US$ {formatUSDPrice(balance)} pledged
                    </h2>
                    <p class="text-gray-400 text-sm">
                      {balanceToPercent(balance, project.goal)}% funded
                    </p>
                  {/await}
                  <a href="" class="text-violet-500 text-sm underline"
                    >{project.category}</a
                  >
                  <div class="flex gap-1">
                    <div id="pic-location"></div>
                    <p class="text-violet-400 text-sm underline">
                      {project.location}
                    </p>
                  </div>
                </div>
              {/if}
            {/await}
          </div>
        </a>
      {/each}
    {/if}
    <div class="flex items-center justify-center mt-4">
      <nav aria-label="Page navigation example">
        <ul class="list-style-none flex">
          <li>
            <a
              on:click={() => {
                page--;
                if (page > 0) handlePageChange(page);
              }}
              class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
              href=""
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {#each [1, 2, 3] as i}
            <li>
              <a
                on:click={() => {
                  handlePageChange(i);
                }}
                class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:focus:text-primary-500 dark:active:bg-neutral-700 dark:active:text-primary-500"
                href="">{i}</a
              >
            </li>
          {/each}
          <li>
            <a
              on:click={() => {
                page++;
                handlePageChange(page);
              }}
              class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-neutral-100 focus:bg-neutral-100 focus:text-primary-700 focus:outline-none active:bg-neutral-100 active:text-primary-700"
              href=""
              aria-label="Next"
              ><span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</div>

<style>
  #pic-location {
    background-image: url("$lib/images/location.png");
    background-position: center;
    background-size: cover;
    width: 16px;
    height: 16px;
  }
</style>
