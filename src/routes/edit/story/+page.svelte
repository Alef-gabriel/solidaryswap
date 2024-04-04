<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import MainProjectNavBar from "$lib/components/MainProjectNavBar.svelte";
  import EditProjectNavBar from "$lib/components/EditProjectNavBar.svelte";
  import { writable } from "svelte/store";
  import * as navigation from "$app/navigation";
  import { page } from "$app/stores";
  import { w3upDelegation } from "$lib/w3upDelegation.js";
  import { projectTableID } from "$lib/localStorage.js";
  import LoadingAnimation from "$lib/components/LoadingAnimation.svelte";
  import { fetchData } from "$lib/fetchData.js";

  let faqs = writable([]);
  const params = $page.url.searchParams.get("id");
  const id = params ? params : $projectTableID;
  let loading = false;

  function addNewFAQ() {
    faqs.update((existingFAQs) => {
      return [...existingFAQs, { question: "", answer: "" }];
    });
  }

  function removeFAQ(index) {
    faqs.update((existingFAQs) => {
      return existingFAQs.filter((_, i) => i !== index);
    });
  }

  export let toolbarOptions = [
    [{ header: 1 }, { header: 2 }, "blockquote", "link", "image", "video"],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "ordered" }],
    [{ align: [] }],
    ["clean"],
  ];

  //TODO: all togheter just wait save on web3 and save all,make a parser to do it
  let quill;

  let data = {
    story: "",
    faqs: [],
    risks: "",
  };

  const w3uploadFile = async (file) => {
    const web3Client = await w3upDelegation();
    const cid = await web3Client.uploadFile(file);
    return cid.toString();
  };

  const handleSubmit = async () => {
    if (id) {
      loading = true;
      data.story = quill.container.innerHTML;
      data.faqs = $faqs;
      const jsonString = JSON.stringify(data);
      const blob = new Blob([jsonString], { type: "application/json" });
      const cid = await w3uploadFile(blob);
      const res = await fetchData(
        { data: cid },
        `http://localhost:3000/api/project/story/${id}`
      );
      navigation.goto(`/projects/${res.id}`);
    }
  };

  const handlePreview = async () => {
    if (id) {
      navigation.goto(`/projects/${id}`);
    }
  };

  onMount(async () => {
    if (browser) {
      let editor = document.getElementById("editor");
      const { default: Quill } = await import("quill");

      if (editor) {
        quill = new Quill(editor, {
          modules: {
            toolbar: toolbarOptions,
          },
          theme: "snow",
          placeholder: "Write your story...",
        });
      }
    }
  });
</script>

<MainProjectNavBar
  previewFunction={handlePreview}
  saveFunction={handleSubmit}
/>
<EditProjectNavBar />
<LoadingAnimation bind:isLoading={loading} />
{#if !loading}
  <div class="w-full">
    <div class="flex flex-col justify-center items-center w-full h-36">
      <h1 class="text-3xl pb-4">Introduce your project</h1>
      <p class="text-gray-400 text-lg">
        Tell people why they should be excited about your project. Get specific
        but be clear and be brief.
      </p>
    </div>
  </div>
  <hr />
  <div class="w-full h-3/4 p-8 flex flex-col gap-4">
    <div>
      <h3 class="text-lg font-medium">Project story</h3>
      <p class="text-gray-600 text-lg">
        Describe what you're raising funds to do, why you care about it, how you
        plan to make it
        <br />
        happen, and who you are. Read more about telling your story.
      </p>
    </div>
    <div class="w-full h-16 border flex items-center gap-2 p-4">
      <div id="pic-icon"></div>
      <p class="text-gray-600 text-sm">Welcome to our improved story editor</p>
    </div>
    <div id="editor" />
  </div>
  <hr />
  <div class="flex gap-16 w-full h-86 p-8">
    <div class="w-1/4 items-center">
      <h2 class="text-xl pb-4">Risks and challenges</h2>
      <p class="text-gray-400 text-sm">
        Be honest about the potential risks and challenges of this project and
        how you plan to overcome them to complete it.
      </p>
    </div>
    <div class="flex items-center gap-8 w-3/4 justify-center">
      <textarea
        id="risks"
        bind:value={data.risks}
        placeholder=""
        class="w-3/4 p-4 bg-white border focus:outline-none resize-none"
      />
    </div>
  </div>
  <hr />
  <div class="flex gap-16 w-full h-86 p-8">
    <div class="w-1/4 items-center">
      <h2 class="text-xl pb-4">Frequently Asked Questions</h2>
      <p class="text-gray-400 text-sm">
        Post answers to frequently asked questions
      </p>
    </div>
    <div class="flex flex-col items-center gap-4 w-3/4 justify-center">
      {#if $faqs.length > 0}
        {#each $faqs as faq, index}
          <div class="flex flex-col gap-8 w-3/4 border p-6 h-4/4 bg-gray-100">
            <div>
              <label for="title" class="block mb-2 text-sm font-medium"
                >Question</label
              >
              <input
                type="text"
                id="subtitle"
                placeholder="nothing...."
                bind:value={faq.question}
                class="w-full p-2 bg-white border focus:outline-none"
              />
            </div>
            <div>
              <label for="subtitle" class="block mb-2 text-sm font-medium"
                >Answer</label
              >
              <textarea
                id="subtitle"
                placeholder="nothing...."
                bind:value={faq.answer}
                class="w-full p-4 bg-white border focus:outline-none resize-none"
              />
            </div>
            <div class="w-full flex justify-end">
              <button
                on:click={() => {
                  removeFAQ(index);
                }}
                class="bg-white border text-sm text-gray-600 h-8 w-1/6 flex items-center justify-center gap-2"
              >
                <div id="pic-trash"></div>
                Delete
              </button>
            </div>
          </div>
        {/each}
      {/if}
      <button
        class="w-3/4 p-3 bg-white border focus:outline-none resize-none hover:border-gray-900"
        on:click={() => {
          addNewFAQ();
        }}>Add another FAQ</button
      >
    </div>
  </div>
{/if}

<style>
  @import "https://cdn.quilljs.com/1.3.6/quill.snow.css";

  #editor {
    height: 450px;
  }

  #pic-icon {
    background-image: url("$lib/images/icon.png");
    background-position: center;
    background-size: cover;
    width: 46px;
    height: 46px;
  }

  #pic-trash {
    background-image: url("$lib/images/trash.png");
    background-position: center;
    background-size: cover;
    width: 16px;
    height: 16px;
  }
</style>
