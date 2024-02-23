<script lang="ts">
  import CategoriesSelector from "$lib/CategoriesSelector.svelte";
  import { writable, type Writable } from "svelte/store";

  let principalSelectedCategory: Writable<{
    name: string;
    subAreas: string[];
  }> = writable();
  let principalSelectedSubCategory: string = "";
  let selectedCategory: Writable<{ name: string; subAreas: string[] }> =
    writable();
  let selectedSubCategory: string = "";
</script>

<div class="w-full">
  <div class="flex flex-col justify-center items-center w-full h-56">
    <h1 class="text-2xl font-semibold">Start with the basics</h1>
    <p class="text-gray-400 text-sm">
      Make it easy for people to learn about your project.
    </p>
  </div>
  <hr />
  <div class="flex gap-16 w-full h-86 items-center justify-center p-8">
    <div class="w-1/4">
      <h2 class="text-xl pb-4">Project title</h2>
      <p class="text-gray-400 text-sm">
        Write a clear, brief title and subtitle to help people quickly
        understand your project. Both will appear on your project and pre-launch
        pages.
      </p>
      <br />
      <p class="text-gray-400 text-sm">
        Potential backers will also see them if your project appears on category
        pages, search results, or in emails we send to our community.
      </p>
    </div>
    <div class="flex flex-col gap-8 w-3/4">
      <div>
        <label for="title" class="block mb-2 text-lg">Title</label>
        <input
          type="text"
          id="subtitle"
          placeholder="nothing...."
          class="w-3/4 p-2 bg-white border focus:outline-none"
        />
      </div>
      <div class="mb-6">
        <label for="subtitle" class="block mb-2 text-lg">Subtitle</label>
        <textarea
          id="subtitle"
          placeholder="nothing...."
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
        Your second subcategory will help us provide more relevant guidance for
        your project. It won’t display on your project page or affect how it
        appears in search results.
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
        Add an image that clearly represents your project. Choose one that looks good at different sizes—it’ll appear on your project page, across the Kickstarter website and mobile apps, and (when shared) on social channels.
      </p>
	  <br>
	  <p class="text-gray-400 text-sm">
        Your image should be at least 1024x576 pixels. It will be cropped to a 16:9 ratio.
      </p>
	  <br>
	  <p class="text-gray-400 text-sm">
        Avoid images with banners, badges, or text—they are illegible at smaller sizes, can be penalized by the Facebook algorithm, and decrease your chances of getting Kickstarter homepage and newsletter features.
      </p>
    </div>
    <div class="flex flex-col gap-8 w-3/4">
      <div class="flex items-center justify-center w-full">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" />
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
          id="subtitle"
          placeholder="Start typing your location..."
          class="w-3/4 p-3 bg-white border focus:outline-none resize-none"
        />
      </div>
    </div>
  </div>
</div>
