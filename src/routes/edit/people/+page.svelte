<script>
  import MainProjectNavBar from "$lib/components/MainProjectNavBar.svelte";
  import EditProjectNavBar from "$lib/components/EditProjectNavBar.svelte";
</script>

<MainProjectNavBar />
<EditProjectNavBar />
<div class="flex flex-col justify-center items-center w-full h-36">
  <h1 class="text-3xl pb-4">Introduce yourself</h1>
  <p class="text-gray-400 text-lg">
    Give backers an idea of who you are, and add collaborators if you work with
    a team.
  </p>
</div>
<hr />
<div class="flex gap-16 w-full h-86 items-center justify-center p-8">
  <div class="w-2/6 p-8">
    <h2 class="text-xl pb-4">Your profile</h2>
    <p class="text-gray-400 text-sm">
      This will appear on your project page and must include your name, photo,
      and biography.
    </p>
  </div>
  <div class="flex flex-col gap-4 w-2/4">
    <div class="w-full border p-8">
      <div class="flex items-center justify-center">
        <div id="pic-user"></div>
      </div>
      <div class="w-full felx flex-col gap-4 pb-8">
        <h2 class="text-xl pb-4">Alef Gabriel</h2>
        <p class="text-gray-400 text-lg">Project creator</p>
      </div>
      <button
        class="bg-gray-600 hover:bg-gray-900 border text-white py-2 px-4 w-full flex items-center justify-center gap-2"
      >
        <div id="pic-next"></div>
        Complete your profile
      </button>
    </div>
  </div>
</div>
<hr />
<div class="flex gap-16 w-full h-86 items-center justify-center p-8">
  <div class="w-2/6 p-8">
    <h2 class="text-xl pb-4">Vanity URL</h2>
    <p class="text-gray-400 text-sm">
      Create a custom URL for your profile page with at least three characters.
      This will also be the beginning of your project URL—we’ll generate that
      later.
    </p>
  </div>
  <div class="flex flex-col gap-4 w-2/4">
    <div class="w-full felx flex-col gap-4 pb-8">
      <label for="title" class="block mb-2 text"
        >https://solidarityswap.com/profile/</label
      >
      <input
        type="text"
        id="subtitle"
        class="w-3/4 p-2 bg-white border focus:outline-none"
      />
    </div>
    <button
      class="bg-gray-600 hover:bg-gray-900 border text-white py-2 px-4 w-full flex items-center justify-center gap-2"
    >
      Confirm
    </button>
  </div>
</div>
<hr />
<div class="flex gap-16 w-full h-86 items-center justify-center p-8">
  <div class="w-2/6 p-8">
    <h2 class="text-xl pb-4">Collaborators (optional)</h2>
    <p class="text-gray-400 text-sm">
      If you're working with others, you can grant them permission to edit this
      project, communicate with backers, and coordinate reward fulfillment.
    </p>
  </div>
  <div class="flex flex-col gap-4 w-2/4">
    <button
      class="bg-gray-300 hover:bg-gray-500 border py-2 px-4 w-full flex items-center justify-center gap-2"
    >
      Add your first collaborators
    </button>
  </div>
</div>

<style>
  #pic-next {
    background-image: url("$lib/images/link.png");
    background-position: center;
    background-size: cover;
    width: 16px;
    height: 16px;
  }

  #pic-user {
    background-image: url("$lib/images/user.png");
    background-position: center;
    background-size: cover;
    width: 66px;
    height: 66px;
  }
</style>
