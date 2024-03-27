<script lang="js">
  export let pagination;
  export let backerFunction = () => {};
</script>

<div class="sticky top-0 w-full h-20 bg-white flex border">
  <div class="flex w-2/4 gap-4 items-center">
    <div
      class=" p-4 flex flex-col w-1/6 gap-1 items-center hover:border-b-2 border-gray-800"
    >
      <a
        on:click={() => {
          pagination = "campaign";
        }}
        href="#campaign"
        class="hover:no-underline"
      >
        <div id="pic-basic"></div>
        <p class="text-lg text-gray-600">Campaign</p>
      </a>
    </div>
    <div
      class="p-4 flex flex-col w-1/6 gap-1 items-center hover:border-b-2 border-gray-800"
    >
      <a
        on:click={() => {
          pagination = "faq";
        }}
        href="#faq"
        class="hover:no-underline"
      >
        <div id="pic-story"></div>
        <p class="text-lg text-gray-600">FAQ</p>
      </a>
    </div>
    <div
      class="p-4 flex flex-col w-1/6 gap-1 items-center hover:border-b-2 border-gray-800"
    >
      <a
        on:click={() => {
          pagination = "comments";
        }}
        href="#comments"
        class="hover:no-underline"
      >
        <div id="pic-people"></div>
        <p class="text-lg text-gray-600">Comments</p>
      </a>
    </div>
    <div
      class="p-4 flex flex-col w-1/6 gap-1 items-center hover:border-b-2 border-gray-800"
    >
      <a
        on:click={() => {
          pagination = "updates";
        }}
        href=""
        class="hover:no-underline"
      >
        <div id="pic-people"></div>
        <p class="text-lg text-gray-600">Updates</p>
      </a>
    </div>
  </div>
  <div class="flex w-2/4 items-center justify-end p-8 gap-8">
    <button
      on:click={backerFunction}
      class="bg-violet-600 hover:bg-violet-700 text-white py-2 px-3 w-1/4"
    >
      Back this project
    </button>
    <button
      class="bg-white border text-gray-600 py-2 px-3 w-1/4 flex items-center justify-center gap-2"
    >
      <div id="pic-remind"></div>
      Remind me
    </button>
  </div>
</div>

<style>
  #pic-remind {
    background-image: url("$lib/images/remind.png");
    background-position: center;
    background-size: cover;
    width: 16px;
    height: 16px;
  }
</style>
