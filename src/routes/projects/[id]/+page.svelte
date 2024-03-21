<script>
  import MainNavBar from "$lib/MainNavBar.svelte";
  import StoryNavBar from "$lib/StoryNavBar.svelte";
  import { json } from "@sveltejs/kit";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import BackerModal from "$lib/BackerModal.svelte";
  import CommentsSection from "$lib/CommentsSection.svelte";
  import ConfirmationModal from "$lib/ConfirmationModal.svelte";
  import LoadingAnimation from "../../../lib/LoadingAnimation.svelte";
  export let data;

  const project = data.project[0];
  const owner = data.owner[0];
  let storyHtml = writable("");
  let video = null;
  let campaign = true;
  let image;
  let backed = false;
  let confirmation = false;
  let loading = true;
  let page = "campaign";

  async function fetchMidia(link) {
    const response = await fetch(`https://${link}.ipfs.w3s.link/`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }

  async function fetchData(link) {
    const response = await fetch(`https://${link}.ipfs.w3s.link/`);
    return await response.json();
  }
  //TODO: create a load
  onMount(async () => {
    loading = true;
    if (project.video != "null") {
      video = await fetchMidia(project.video);
    }
    image = await fetchMidia(project.image);
    loading = false;
    storyHtml.set(await fetchData(project.data));
  });
</script>

<MainNavBar isOnEditPage={false} />
<BackerModal
  bind:isActivated={backed}
  {project}
  userId={data?.authedUser.id}
  bind:isConfirmed={confirmation}
/>
<ConfirmationModal phrase=" backer this project" show={confirmation} />
<LoadingAnimation bind:isLoading={loading} />
{#if data && !loading}
  <div class="bg-gray-50 flex flex-col">
    <div class="flex flex-col justify-center p-8 items-center w-full h-36">
      <h1 class="text-3xl pb-4">{project.title}</h1>
      <p class="text-gray-400 text-lg">{project.description}</p>
    </div>
    <div class="flex gap-8 w-full h-86 p-8">
      <div class="flex">
        <!-- if have video do video else do image -->
        {#if video}
          <video width="750" height="450" controls>
            <source src={video} type="video/mp4" />
            <track kind="captions" srclang="en" label="english_captions" />
          </video>
        {:else}
          <img id="pic-bunner" src={image} alt="" width="750" height="450" />
        {/if}
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
          <!-- <WalletConnect buttonLabel={"Back this project"} /> -->
          <button
            on:click={() => {
              backed = true;
            }}
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
  <StoryNavBar bind:pagination={page} />
  {#if page == "comments"}
    <CommentsSection
      id="comments"
      comments={data.comments}
      userId={data.authedUser.id}
      tableName={data.project[0].comments_table_name}
    />
  {:else if page == "campaign"}
    <div id="campaign" class="flex w-full">
      <div class="sticky top-24 flex flex-col gap-4 w-1/4 p-4 h-56">
        <a
          href="#campaign"
          on:click={() => {
            campaign = true;
          }}
        >
          <div class="flex items-center p-2 border-violet-600 hover:border-l-4">
            <p class="text-lg text-gray-600 font-semibold">Story</p>
          </div>
        </a>
        <a
          href="#campaign"
          on:click={() => {
            campaign = false;
          }}
        >
          <div class="flex items-center p-2 border-violet-600 hover:border-l-4">
            <p class="text-lg text-gray-600 font-semibold">Risks</p>
          </div>
        </a>
      </div>
      <div class="w-2/4" id="campaign">
        {#if campaign}
          {@html $storyHtml.story}
        {:else}
          {$storyHtml.risks}
        {/if}
      </div>
      <div class="sticky top-24 flex flex-col w-1/4 p-4 h-56">
        <div class="w-full h-46 flex flex-col gap-4 border p-4">
          <div id="pic-user" class=""></div>
          <div>
            <p class="text-lg text-gray-600 font-bold">{owner.name}</p>
            <p class="text-gray-400">85 created . 165 backed</p>
          </div>
          <div>
            <p class="text-gray-400">
              {owner.biography}
            </p>
          </div>
        </div>
      </div>
    </div>
  {/if}
{/if}

<style>
  #pic-bunner {
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
