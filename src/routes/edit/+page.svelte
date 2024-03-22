<script>
  import MainNavBar from "$lib/components/MainNavBar.svelte";
  import RoundProgress from "$lib/components/RoundProgress.svelte";
</script>

<MainNavBar isOnEditPage={true}/>
<div class="flex flex-col p-8">
  <h2 class="text-2xl pb-4">Project overview</h2>
  <a href="#">
    <div class="flex p-4 items-center border gap-2">
      <RoundProgress porcentage={50} />
      <div>
        <h2 class="text-xl">Basics</h2>
        <p class="text-gray-400 text-lg">
          Name your project, upload an image or video, and estabilish your
          campaing details.
        </p>
      </div>
    </div>
  </a>
  <a href="#">
    <div class="flex p-4 items-center border gap-2">
      <RoundProgress porcentage={90} />
      <div>
        <h2 class="text-xl">Story</h2>
        <p class="text-gray-400 text-lg">
          Add a detalied project description and convey your risks and
          challenges.
        </p>
      </div>
    </div>
  </a>
  <a href="#">
    <div class="flex p-4 items-center border gap-2">
      <RoundProgress porcentage={20} />
      <div>
        <h2 class="text-xl">People</h2>
        <p class="text-gray-400 text-lg">
          Edit your solidaryswap profile and add collaborators.
        </p>
      </div>
    </div>
  </a>
</div>
