<script>
  export let saveFunction = () => {};
  export let previewFunction = () => {
    hidden = false;
  };
  let hidden = true;
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
      on:click={previewFunction}
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
<div
  hidden={hidden}
  class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
  role="alert"
>
  <svg
    class="fill-current w-4 h-4 mr-2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    ><path
      d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"
    /></svg
  >
  <p>Something happened that you should know about.</p>
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
