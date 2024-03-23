<script lang="ts">
  import SearchComponent from "./SearchComponent.svelte";

  export let isOnEditPage: boolean;
</script>

<div class="top-0 w-full h-16 bg-white flex border-b">
  <div class="flex w-1/4 items-center p-4 gap-4">
    {#if !isOnEditPage}
      <a href="#" class="text-gray-600">Discover</a>
      <a href="#" class="text-gray-600">Start a project</a>
    {/if}
  </div>
  <div class="flex w-3/4 gap-4 items-center justify-center">
    <a href="#">
      <div id="pic-logo"></div>
    </a>
  </div>
  <div class="flex w-1/4 items-center justify-end p-4 gap-4">
    <SearchComponent />
    <a href="/settings">
      <div id="pic-user"></div>
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
