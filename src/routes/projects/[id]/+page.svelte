<script>
  import MainNavBar from "$lib/components/MainNavBar.svelte";
  import StoryNavBar from "$lib/components/StoryNavBar.svelte";
  import { json } from "@sveltejs/kit";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import BackerModal from "$lib/components/BackerModal.svelte";
  import CommentsSection from "$lib/components/CommentsSection.svelte";
  import ConfirmationModal from "$lib/components/ConfirmationModal.svelte";
  import LoadingAnimation from "$lib/components/LoadingAnimation.svelte";
  import { getBTCPrice, fetchMidia, formatUSDPrice } from "$lib/ethUltils.js";
  import FaqsComponent from "../../../lib/components/FaqsComponent.svelte";
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
  let balance;
  let goal;

  async function fetchData(link) {
    const response = await fetch(`https://${link}.ipfs.w3s.link/`);
    return await response.json();
  }

  onMount(async () => {
    const ethPrice = await getBTCPrice();
    balance = formatUSDPrice(ethPrice * data.balance);
    goal = formatUSDPrice(project.goal * ethPrice);

    loading = true;
    if (project.video != "null") {
      video = await fetchMidia(project.video);
    }
    image = await fetchMidia(project.image);
    loading = false;
    storyHtml.set(await fetchData(project.data));
  });
</script>

<MainNavBar isOnEditPage={false} userImage={data.authedUser.image} />
<BackerModal
  bind:isActivated={backed}
  {project}
  userId={data.authedUser.id}
  bind:isConfirmed={confirmation}
/>
<ConfirmationModal phrase=" backer this project" show={confirmation} />
<LoadingAnimation bind:isLoading={loading} />
{#if data && !loading}
  <div class="bg-gray-50 flex flex-col">
    <div class="flex flex-col justify-center p-8 items-center w-full h-36">
      <h1 class="text-3xl pb-4">{project.title}</h1>
      <p class="text-gray-400 text-lg w-3/4 text-center">
        {project.description}
      </p>
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
          <div
            class="h-2.5 bg-violet-600"
            style="width: {(balance / goal) * 100}%"
          ></div>
        </div>
        <div>
          <h2 class="text-3xl text-violet-600 font-semibold">US$ {balance}</h2>
          <p class="text-gray-500">pledged of US$ {goal} goal</p>
        </div>
        <div>
          <h2 class="text-3xl text-violet-600 font-semibold">{data.backers}</h2>
          <p class="text-gray-500">backers</p>
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
  <StoryNavBar
    backerFunction={() => {
      backed = true;
    }}
    bind:pagination={page}
  />
  {#if page == "comments"}
    <CommentsSection
      id="comments"
      initialComments={data.comments}
      userId={data.authedUser.id}
      tableName={project.comments_table_name}
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
        {#if $storyHtml}
          {#if campaign}
            {@html $storyHtml.story}
          {:else}
            {$storyHtml.risks}
          {/if}
        {:else}
          <h1 class="text-2xl text-violet-400 pt-8">Owner don't set it</h1>
        {/if}
      </div>
      <div class="sticky top-24 flex flex-col w-1/4 p-4 h-56">
        <div class="w-full h-46 flex flex-col gap-4 border p-4">
          {#await fetchMidia(owner.image) then userImage}
            {#if userImage}
              <img
                id="pic-user-image"
                src={userImage}
                alt=""
                width="76"
                height="76"
              />
            {:else}
              <div id="pic-user"></div>
            {/if}
          {/await}
          <div>
            <p class="text-lg text-gray-600 font-bold">{owner.name}</p>
            <!-- <p class="text-gray-400">85 created . 165 backed</p> -->
          </div>
          <div>
            <p class="text-gray-400">
              {#if owner.biography}
                {owner.biography}
              {:else}
                User don't have biography
              {/if}
            </p>
          </div>
        </div>
      </div>
    </div>
  {:else if page == "faq"}
    <FaqsComponent faqs={$storyHtml.faqs} />
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
