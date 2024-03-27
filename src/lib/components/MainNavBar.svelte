<script>
  import SearchComponent from "./SearchComponent.svelte";
  import { fetchMidia } from "$lib/ethUltils.js";

  export let isOnEditPage;
  export let userImage;
</script>

<div class="top-0 w-full h-16 bg-white flex border-b">
  <div class="flex w-1/4 items-center p-4 gap-4">
    {#if !isOnEditPage}
      <a href="/projects" class="text-gray-600">Discover</a>
      <a href="/edit/basics" class="text-gray-600">Start a project</a>
    {/if}
  </div>
  <div class="flex w-3/4 gap-4 items-center justify-center">
    <a href="/">
      <div id="pic-logo"></div>
    </a>
  </div>
  <div class="flex w-1/4 items-center justify-end p-4 gap-4">
    <SearchComponent />
    <a href="/settings">
      {#await fetchMidia(userImage) then image}
        {#if image}
          <img
            id="pic-user-image"
            src={image}
            alt=""
            class="rounded-full w-10 h-10"
          />
        {:else}
          <div id="pic-user"></div>
        {/if}
      {/await}
    </a>
  </div>
</div>

<style>
  #pic-logo {
    background-image: url("$lib/images/logo.png");
    background-position: center;
    background-size: cover;
    width: 186px;
    height: 36px;
  }

  #pic-user {
    background-image: url("$lib/images/user.png");
    background-position: center;
    background-size: cover;
    width: 36px;
    height: 36px;
  }
</style>
