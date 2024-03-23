<script>
  import CategoriesSelector from "$lib/components/CategoriesSelector.svelte";
  import EditProjectNavBar from "$lib/components/EditProjectNavBar.svelte";
  import MainProjectNavBar from "$lib/components/MainProjectNavBar.svelte";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import * as navigation from "$app/navigation";
  import { w3upDelegation } from "$lib/w3upDelegation.js";
  import { projectTableID } from "$lib/localStorage.js";
  import LoadingAnimation from "$lib/components/LoadingAnimation.svelte";
  import { fetchData } from "$lib/fetchData.js";
  import EtheriumDollar from "$lib/components/EtheriumDollar.svelte";

  let principalSelectedCategory = writable();
  let principalSelectedSubCategory = "";
  let selectedCategory = writable();
  let selectedSubCategory = "";
  let loading = false;
  export let data;

  let form = {
    title: "",
    description: "",
    goal: "",
    image: null,
    video: null,
    location: "",
    user_contract_id: "",
  };

  const w3uploadFile = async (file) => {
    const web3Client = await w3upDelegation();
    const cid = await web3Client.uploadFile(file);
    return cid.toString();
  };

  //TODO:create a loading
  const handleSubmit = async () => {
    loading = true;
    form.image = await w3uploadFile(form.image);
    form.user_contract_id = data?.authedUser.id;
    if (form.video) {
      form.video = await w3uploadFile(form.video);
    }
    const res = await fetchData(
      {
        ...form,
        category: principalSelectedSubCategory,
        subCategory: selectedSubCategory,
      },
      "http://localhost:5173/api/project/basics"
    );
    projectTableID.set(res.id);
    navigation.goto(`story?id=${res.id}`);
  };

  onMount(() => {
    const image = document.getElementById("image");
    image.addEventListener("change", async (event) => {
      form.image = event.target.files[0];
    });

    const video = document.getElementById("video");
    video.addEventListener("change", async (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        form.video = selectedFile;
      }
    });
  });
</script>

<MainProjectNavBar saveFunction={handleSubmit} />
<EditProjectNavBar />
<LoadingAnimation bind:isLoading={loading} />
{#if !loading}
  <div class="w-full">
    <div class="flex flex-col justify-center items-center w-full h-36">
      <h1 class="text-3xl pb-4">Start with the basics</h1>
      <p class="text-gray-400 text-lg">
        Make it easy for people to learn about your project.
      </p>
    </div>
    <hr />
    <div class="flex gap-16 w-full h-86 items-center justify-center p-8">
      <div class="w-1/4">
        <h2 class="text-xl pb-4">Project title</h2>
        <p class="text-gray-400 text-sm">
          Write a clear, brief title and subtitle to help people quickly
          understand your project. Both will appear on your project and
          pre-launch pages.
        </p>
        <br />
        <p class="text-gray-400 text-sm">
          Potential backers will also see them if your project appears on
          category pages, search results, or in emails we send to our community.
        </p>
      </div>
      <div class="flex flex-col gap-8 w-3/4">
        <div>
          <label for="title" class="block mb-2 text-lg">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            bind:value={form.title}
            class="w-3/4 p-2 bg-white border focus:outline-none"
          />
        </div>
        <div class="mb-6">
          <label for="subtitle" class="block mb-2 text-lg">Subtitle</label>
          <textarea
            id="subtitle"
            name="subtitle"
            bind:value={form.description}
            class="w-3/4 p-4 bg-white border focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
    <hr />
    <div class="flex gap-16 w-full h-86 items-center justify-center p-8">
      <div class="w-1/4">
        <h2 class="text-xl pb-4">Project category</h2>
        <p class="text-gray-400 text-sm">
          Choose a primary category and subcategory to help backers find your
          project.
        </p>
        <br />
        <p class="text-gray-400 text-sm">
          Your second subcategory will help us provide more relevant guidance
          for your project. It won’t display on your project page or affect how
          it appears in search results.
        </p>
        <br />
        <p class="text-gray-400 text-sm">
          You can change these anytime before and during your campaign.
        </p>
      </div>
      <div class="flex flex-col gap-8 w-3/4">
        <CategoriesSelector
          label="Primary "
          selectedCategory={principalSelectedCategory}
          bind:selectedSubcategory={principalSelectedSubCategory}
        />
        <CategoriesSelector
          label=""
          {selectedCategory}
          bind:selectedSubcategory={selectedSubCategory}
        />
      </div>
    </div>
    <hr />
    <div class="flex gap-16 w-full h-86 items-center justify-center p-8">
      <div class="w-1/4">
        <h2 class="text-xl pb-4">Project image</h2>
        <p class="text-gray-400 text-sm">
          Add an image that clearly represents your project. Choose one that
          looks good at different sizes—it’ll appear on your project page,
          across the website and mobile apps, and (when shared) on social
          channels.
        </p>
        <br />
        <p class="text-gray-400 text-sm">
          Your image should be at least 1024x576 pixels. It will be cropped to a
          16:9 ratio.
        </p>
        <br />
        <p class="text-gray-400 text-sm">
          Avoid images with banners, badges, or text—they are illegible at
          smaller sizes, can be penalized by the Facebook algorithm, and
          decrease your chances of getting homepage and newsletter features.
        </p>
      </div>
      <div class="flex flex-col gap-8 w-3/4">
        <div class="flex items-center justify-center w-full">
          <label
            for="image"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="image" name="image" type="file" class="hidden" />
          </label>
        </div>
      </div>
    </div>
    <hr />
    <div class="flex gap-16 w-full h-86 items-center justify-center p-8">
      <div class="w-1/4">
        <h2 class="text-xl pb-4">Project location</h2>
        <p class="text-gray-400 text-sm">
          Enter the location that best describes where your project is based.
        </p>
      </div>
      <div class="flex flex-col gap-8 w-3/4">
        <div class="mb-6">
          <input
            id="location"
            name="location"
            bind:value={form.location}
            placeholder="Start typing your location..."
            class="w-3/4 p-3 bg-white border focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="flex gap-16 w-full h-86 items-center justify-center p-8">
    <div class="w-1/4">
      <h2 class="text-xl pb-4">Project video (optional)</h2>
      <p class="text-gray-400 text-sm">
        Add a video that describes your project.
      </p>
      <br />
      <p class="text-gray-400 text-sm">
        Tell people what you’re raising funds to do, how you plan to make it
        happen, who you are, and why you care about this project.
      </p>
      <br />
      <p class="text-gray-400 text-sm">
        After you’ve uploaded your video, use our editor to add captions and
        subtitles so your project is more accessible to everyone.
      </p>
    </div>
    <div class="flex flex-col gap-8 w-3/4">
      <div class="flex items-center justify-center w-full">
        <label
          for="video"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input id="video" name="video" type="file" class="hidden" />
        </label>
      </div>
    </div>
  </div>
  <hr />
  <div class="flex gap-16 w-full h-86 items-center justify-center p-8">
    <div class="w-1/4">
      <h2 class="text-xl pb-4">Funding goal</h2>
      <p class="text-gray-400 text-sm">
        Set an achievable goal that covers what you need to complete your
        project.
      </p>
      <br />
      <p class="text-gray-400 text-sm">
        Funding is all-or-nothing. If you don’t meet your goal, you won’t
        receive any money.
      </p>
    </div>
    <div class="flex flex-col gap-8 w-3/4">
		<EtheriumDollar bind:ethValue={form.goal} />
	</div>
  </div>
{/if}
