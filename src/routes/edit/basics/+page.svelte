<script>
  import CategoriesSelector from "$lib/CategoriesSelector.svelte";
  import EditProjectNavBar from "$lib/EditProjectNavBar.svelte";
  import MainProjectNavBar from "$lib/MainProjectNavBar.svelte";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import * as navigation from "$app/navigation";
  import { w3upDelegation } from "$lib/w3upDelegation.js";
  import { projectTableID } from "$lib/localStorage.js";
  import LoadingAnimation from "$lib/LoadingAnimation.svelte";

  let principalSelectedCategory = writable();
  let principalSelectedSubCategory = "";
  let selectedCategory = writable();
  let selectedSubCategory = "";
  let loading = false;
  export let data;

  let form = {
    title: "",
    description: "",
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
    const res = await fetchData();
    projectTableID.set(res.id);
    navigation.goto(`story?id=${res.id}`);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5173/api/project/basics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        return await response.json();
      } else {
        const error = new Error(await response.text());
        throw error;
      }
    } catch (error) {
      throw error;
    }
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
          selectedSubcategory={principalSelectedSubCategory}
        />
        <CategoriesSelector
          label=""
          {selectedCategory}
          selectedSubcategory={selectedSubCategory}
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
      <div
        class="space-x-0 space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse flex items-center flex-col sm:flex-row mb-4"
      >
        <div class="flex">
          <label
            for="fiat-currency-input"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >Your Email</label
          >
          <div class="relative w-full">
            <input
              type="number"
              id="fiat-currency-input"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="421 USD"
              required
            />
          </div>
          <button
            id="dropdown-fiat-currency-button"
            data-dropdown-toggle="dropdown-fiat-currency"
            class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
          >
            <svg
              fill="none"
              aria-hidden="true"
              class="h-4 w-4 me-2"
              viewBox="0 0 20 15"
              ><rect width="19.6" height="14" y=".5" fill="#fff" rx="2" /><mask
                id="a"
                style="mask-type:luminance"
                width="20"
                height="15"
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
                ><rect
                  width="19.6"
                  height="14"
                  y=".5"
                  fill="#fff"
                  rx="2"
                /></mask
              ><g mask="url(#a)"
                ><path
                  fill="#D02F44"
                  fill-rule="evenodd"
                  d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
                  clip-rule="evenodd"
                /><path fill="#46467F" d="M0 .5h8.4v6.533H0z" /><g
                  filter="url(#filter0_d_343_121520)"
                  ><path
                    fill="url(#paint0_linear_343_121520)"
                    fill-rule="evenodd"
                    d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                    clip-rule="evenodd"
                  /></g
                ></g
              ><defs
                ><linearGradient
                  id="paint0_linear_343_121520"
                  x1=".933"
                  x2=".933"
                  y1="1.433"
                  y2="6.1"
                  gradientUnits="userSpaceOnUse"
                  ><stop stop-color="#fff" /><stop
                    offset="1"
                    stop-color="#F0F0F0"
                  /></linearGradient
                ><filter
                  id="filter0_d_343_121520"
                  width="6.533"
                  height="5.667"
                  x=".933"
                  y="1.433"
                  color-interpolation-filters="sRGB"
                  filterUnits="userSpaceOnUse"
                  ><feFlood
                    flood-opacity="0"
                    result="BackgroundImageFix"
                  /><feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  /><feOffset dy="1" /><feColorMatrix
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                  /><feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_343_121520"
                  /><feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_343_121520"
                    result="shape"
                  /></filter
                ></defs
              ></svg
            >
            USD
          </button>
        </div>
        <button
          type="button"
          class="p-3 text-sm font-medium text-gray-500 focus:outline-none bg-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        >
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 10H1m0 0 3-3m-3 3 3 3m1-9h10m0 0-3 3m3-3-3-3"
            />
          </svg>
          <span class="sr-only">Convert currency</span>
        </button>
        <div class="flex">
          <label
            for="crypto-input"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >Your Email</label
          >
          <div class="relative w-full">
            <input
              type="number"
              id="crypto-input"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="0.323 BTC"
              required
            />
          </div>
          <button
            id="dropdown-crypto-button"
            data-dropdown-toggle="dropdown-crypto"
            class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
          >
            <svg class="h-4 w-4 me-2" fill="none" viewBox="0 0 10 17"
              ><path
                fill="#343434"
                d="M5 .5l-.11.364v10.582l.11.105 4.91-2.902L5 .5z"
              /><path fill="#8C8C8C" d="M5 .5L.086 8.65 5 11.55V.5z" /><path
                fill="#3C3C3B"
                d="M5 12.48l-.061.075v3.77L5 16.5l4.914-6.922L5 12.48z"
              /><path
                fill="#8C8C8C"
                d="M5 16.5v-4.02L.086 9.578 5 16.5z"
              /><path
                fill="#141414"
                d="M5 11.55L9.91 8.65 5 6.418v5.133z"
              /><path
                fill="#393939"
                d="M.086 8.649L5 11.551V6.418L.086 8.649z"
              /></svg
            >
            ETH
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
