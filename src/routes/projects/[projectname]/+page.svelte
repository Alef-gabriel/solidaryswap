<script>
  import MainNavBar from "$lib/MainNavBar.svelte";
  import StoryNavBar from "$lib/StoryNavBar.svelte";
</script>

<MainNavBar />
<div class="bg-gray-50 flex flex-col">
  <div class="flex flex-col justify-center p-8 items-center w-full h-36">
    <h1 class="text-3xl pb-4">
      Combat Banes and Boons 2, Crits for Ampersand Fantasy RPGs
    </h1>
    <p class="text-gray-400 text-lg">
      Drive your ampersand RPG players wild with these new critical success and
      failure cards. Designed by Lex Morgan and Philip Reed.
    </p>
  </div>
  <div class="flex gap-8 w-full h-86 p-8">
    <div class="flex">
      <!-- if have video do video else do image -->
      <div id="pic-bunner"></div>
    </div>
    <div class="flex flex-col gap-6 w-2/6">
      <div class="w-full h-2.5 bg-gray-200">
        <div class="h-2.5 bg-violet-600" style="width: 45%"></div>
      </div>
      <div>
        <h2 class="text-3xl text-violet-600 font-semibold">US$ 1,745</h2>
        <p class="text-gray-500">pledged of US$ 250 goal</p>
      </div>
      <div>
        <h2 class="text-3xl text-violet-600 font-semibold">161</h2>
        <p class="text-gray-500">backers</p>
      </div>
      <div>
        <h2 class="text-3xl text-violet-600 font-semibold">4</h2>
        <p class="text-gray-500">proposals</p>
      </div>
      <div class="flex flex-col gap-4">
        <button
          class="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 w-full"
        >
          Back this project
        </button>
        <button
          class="bg-white border text-gray-600 py-2 px-4 w-2/4 flex items-center justify-center gap-2"
        >
          <div id="pic-remind"></div>
          Remind me
        </button>
      </div>
    </div>
  </div>
</div>
<StoryNavBar />
<div class="flex w-full">
  <div class="sticky top-24 flex flex-col gap-4 w-1/4 p-4 h-56">
    <a href="#">
      <div class="flex items-center p-2 border-violet-600 hover:border-l-4">
        <p class="text-lg text-gray-600 font-semibold">Story</p>
      </div>
    </a>
    <a href="#">
      <div class="flex items-center p-2 border-violet-600 hover:border-l-4">
        <p class="text-lg text-gray-600 font-semibold">Risks</p>
      </div>
    </a>
  </div>
  <div class="w-2/4">
    <!-- create a quill render here to show the story -->
  </div>
  <div class="sticky top-24 flex flex-col w-1/4 p-4 h-56">
    <div class="w-full h-46 flex flex-col gap-4 border p-4">
      <div id="pic-user"></div>
      <div>
        <p class="text-lg text-gray-600 font-bold">Alef Gabriel</p>
        <p class="text-gray-400">85 created . 165 backed</p>
      </div>
      <div>
        <!-- biography -->
        <p class="text-gray-400">
          Philip Reed loves to create stuff and things, from roleplaying game
          supplements to music to whatever sounds fun at that exact moment in
          time. He can often be found working when he should be sleeping.
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  #pic-bunner {
    background-image: url("$lib/images/bunner_teste.jpg");
    background-position: center;
    background-size: cover;
    width: 750px;
    height: 450px;
  }

  #pic-remind {
    background-image: url("$lib/images/remind.png");
    background-position: center;
    background-size: cover;
    width: 16px;
    height: 16px;
  }

  #pic-user {
    background-image: url("$lib/images/user.png");
    background-position: center;
    background-size: cover;
    width: 76px;
    height: 76px;
  }
</style>
