<script>
  import { businessAreas } from "$lib";
  import MainNavBar from "$lib/MainNavBar.svelte";

  export let data;

  function showFilter(id) {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.hidden = !targetElement.hidden;
    }
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
          {#each area.subAreas as subAreas}
            <li class="flex items-center" value={subAreas}>
              <div class="flex">
                <input type="checkbox" id={subAreas} class="peer hidden" />
                <label
                  for={subAreas}
                  class="select-none cursor-pointer rounded-lg border border-violet-400
					 py-2 px-3 font-bol transition-colors duration-200 ease-in-out peer-checked:bg-violet-200 peer-checked:border-violet-600"
                  >{subAreas}</label
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
        <a href="#">
          <div class="flex items-start p-4 shadow">
            <div id="pic-bunner"></div>
            <div class="flex flex-col justify-center pl-4 items-center w-3/4">
              <h1 class="text-2xl pb-2 font-semibold">
                {project.title}
              </h1>
              <p class="text-gray-400 text-sm">
                Drive your ampersand RPG players wild with these new critical
                success and failure cards. Designed by Lex Morgan and Philip
                Reed.
              </p>
            </div>
            <div
              class="flex flex-col w-1/4 border-l-2 gap-1 p-2 h-full border-violet-400"
            >
              <h2 class="text-xl text-violet-600 font-semibold">
                US$ 1,745 pledged
              </h2>
              <p class="text-gray-400 text-sm">148% funded</p>
              <a href="#" class="text-violet-500 text-sm underline"
                >Video Games</a
              >
              <div class="flex gap-1">
                <div id="pic-location"></div>
                <p class="text-violet-400 text-sm underline">
                  Sao Paulo, Brazil
                </p>
              </div>
            </div>
          </div>
        </a>
      {/each}
    {/if}
  </div>
</div>

<style>
  #pic-bunner {
    background-image: url("$lib/images/bunner_teste.jpg");
    background-position: center;
    background-size: cover;
    width: 96px;
    height: 96px;
  }

  #pic-location {
    background-image: url("$lib/images/location.png");
    background-position: center;
    background-size: cover;
    width: 16px;
    height: 16px;
  }
</style>
