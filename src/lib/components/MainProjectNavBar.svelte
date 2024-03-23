<script>
	export let saveFunction = () => {};
</script>

<div class="sticky top-0 w-full h-20 bg-white flex border-b">
  <div class="flex w-2/4 gap-4 items-center">
    <a href="/">
      <div id="pic-logo"></div>
    </a>
    <a href="/edit" class="text-gray-600">Small Batch Project</a>
  </div>
  <div class="flex w-2/4 items-center justify-end p-8 gap-8">
    <button
      class="bg-white border text-gray-600 py-2 px-4 w-1/4 flex items-center justify-center gap-2"
    >
      <div id="pic-preview"></div>
      Preview
    </button>
    <button
      class="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 w-1/4"
	  on:click={saveFunction}
    >
      Save
    </button>
  </div>
</div>

<style>
  #pic-preview {
    background-image: url("$lib/images/preview.png");
    background-position: center;
    background-size: cover;
    width: 16px;
    height: 16px;
  }

  #pic-logo {
    background-image: url("$lib/images/logo.png");
    background-position: center;
    background-size: cover;
    width: 186px;
    height: 36px;
  }
</style>
