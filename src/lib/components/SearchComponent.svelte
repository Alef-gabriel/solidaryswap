<script>
  import { goto } from "$app/navigation";
  let search = "";
  let isHidden = true;

  const handlePageChange = () => {
    const currentUrl = window.location.pathname + window.location.search;
    const newUrl = currentUrl.includes("?")
      ? `${currentUrl}&search=${search}`
      : `${currentUrl}?search=${search}`;
    goto(newUrl);
  };
</script>

<div class="flex gap-4 flex-row-reverse">
  <a
    on:click={(event) => {
      if (!isHidden) {
        handlePageChange();
      }
      isHidden = false;
      event.preventDefault(); // Prevent the default behavior of anchor tag
    }}
    href=""
    class="text-gray-600 flex items-center gap-1"
  >
    Search
    <div id="pic-search"></div>
  </a>
  <input
    type="text"
    id="search-input"
    hidden={isHidden}
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
