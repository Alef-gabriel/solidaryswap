<script>
  import * as navigation from "$app/navigation";
  let search;
  let isHiden = true;

  const handlePageChange = () => {
    navigation.goto(`/projects?search=${search}`);
  };
</script>

<div class="flex gap-4 flex-row-reverse">
  <a
    on:click={() => {
      if (!isHiden) {
        handlePageChange();
      }
      isHiden = false;
    }}
    href="#"
    class="text-gray-600 flex items-center gap-1"
  >
    Search
    <div id="pic-search"></div>
  </a>
  <input
    type="text"
    id="search-input"
    hidden={isHiden}
    placeholder=""
    bind:value={search}
    class="w-full p-1 bg-white border focus:outline-none rounded lg"
  />
</div>

<style>
  #pic-search {
    background-image: url("$lib/images/search.png");
    background-position: center;
    background-size: cover;
    width: 16px;
    height: 16px;
  }
</style>
