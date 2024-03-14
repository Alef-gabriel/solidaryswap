<script>
  import MainNavBar from "$lib/MainNavBar.svelte";
  import { onMount } from "svelte";
  import * as navigation from "$app/navigation";
  import { w3upDelegation } from "$lib/w3upDelegation.js";
  export let data;

  let editProfile = false;
  let account = true;
  let changePassword = false;

  //   $:User = data?.authedUser;

  let form = {
    name: "",
    biography: "",
    image: null,
    location: "",
  };

  const w3uploadFile = async (file) => {
    const web3Client = await w3upDelegation();
    console.log("before delegation");
    const cid = await web3Client.uploadFile(file);
    return cid.toString();
  };

  //TODO:create a loading
  const handleSubmit = async () => {
    console.log("Here a'im here ");
    if (form.image) {
      form.image = await w3uploadFile(form.image);
    }
    console.log("Before image ");
    const res = await fetchData();
    //navigation.goto(`story?id=${res.id}`);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5173/api/user-update/${data?.authedUser.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
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
  });
</script>

<MainNavBar isOnEditPage={false} />
<div class="w-full border-b items-center">
  <div class="w-full flex items-center p-8">
    <h1 class="text-5xl">Settings</h1>
  </div>
  <div class="flex flex-row">
    <div
      class="flex flex-col w-1/6 gap-1 p-4 items-center hover:border-b-2 border-violet-600"
    >
      <a href="#">
        <p class="text-lg text-gray-600">Account</p>
      </a>
    </div>
    <div
      class="flex flex-col w-1/6 gap-1 p-4 items-center hover:border-b-2 border-violet-600"
    >
      <a
        href="#"
        on:click={() => {
          editProfile = !editProfile;
        }}
      >
        <p class="text-lg text-gray-600">Edit profile</p>
      </a>
    </div>
  </div>
</div>
{#if editProfile}
  <div class="flex gap-16 w-full h-86 p-8">
    <div class="flex flex-col gap-8 w-2/4">
      <div>
        <label for="name" class="block mb-2 text-lg">Name</label>
        <input
          type="text"
          bind:value={form.name}
          id="name"
          class="w-3/4 p-2 bg-white border focus:outline-none"
        />
      </div>
      <div>
        <div class="flex items-center justify-center w-full">
          <label
            for="image"
            class="flex flex-col items-center justify-center w-full h-46 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
            <input id="image" type="file" class="hidden" />
          </label>
        </div>
      </div>
      <div>
        <label for="biography" class="block mb-2 text-lg">Biography</label>
        <textarea
          id="biography"
          bind:value={form.biography}
          class="w-3/4 p-4 bg-white border focus:outline-none resize-none"
        />
        <p class="text-sm text-gray-600">
          We suggest a short bio. If it's 300 characters or less it'll look
          great on your profile.
        </p>
      </div>
    </div>
    <div class="flex flex-col gap-8 w-2/4">
      <div>
        <label for="location" class="block mb-2 text-lg">Location</label>
        <input
          type="text"
          id="location"
          bind:value={form.location}
          placeholder="E.g. Brooklyn, NY"
          class="w-3/4 p-2 bg-white border focus:outline-none"
        />
      </div>
      <div>
        <label for="title" class="block mb-2 text-lg">Time zone</label>
        <input
          type="text"
          id="subtitle"
          class="w-3/4 p-2 bg-white border focus:outline-none"
        />
        <p class="text-sm text-gray-600">
          Most time zones are automatically adjusted for you. We'll use this
          setting for emails.
        </p>
      </div>
      <div>
        <button
          on:click={handleSubmit}
          class="bg-gray-600 hover:bg-gray-900 border text-white py-2 px-4 w-full flex items-center justify-center gap-2"
        >
          <div id="pic-next"></div>
          Update your profile
        </button>
      </div>
    </div>
  </div>
{/if}
{#if account}
  <div class="flex flex-col gap-8 w-2/4 p-8">
    <div>
      <label for="email" class="block mb-2 text-lg">Email</label>
      <input
        type="text"
        id="email"
        class="w-3/4 p-2 bg-white border focus:outline-none"
      />
    </div>
    <div>
      <label for="password" class="block mb-2 text-lg">Password</label>
      <button
        class="bg-violet-800 text-white py-2 px-4 w-2/6"
        on:click={() => {
          changePassword = true;
        }}
      >
        Change password
      </button>
    </div>
    {#if changePassword}
      <div>
        <label for="title" class="block mb-2 text-lg">New Password</label>
        <input
          type="text"
          id="subtitle"
          class="w-3/4 p-2 bg-white border focus:outline-none"
        />
        <label for="title" class="block mb-2 text-lg pt-8"
          >Confirm Password</label
        >
        <input
          type="text"
          id="subtitle"
          class="w-3/4 p-2 bg-white border focus:outline-none"
        />
      </div>
    {/if}
    <div>
      <label for="title" class="block mb-2 text-lg">Current Password</label>
      <input
        type="text"
        id="subtitle"
        class="w-3/4 p-2 bg-white border focus:outline-none"
      />
      <p class="text-sm text-gray-600">
        Enter your current password to save these changes.
      </p>
    </div>
  </div>
{/if}
