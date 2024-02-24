<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import MainProjectNavBar from "$lib/MainProjectNavBar.svelte";
  import EditProjectNavBar from "$lib/EditProjectNavBar.svelte";

  export let toolbarOptions = [
    [{ header: 1 }, { header: 2 }, "blockquote", "link", "image", "video"],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "ordered" }],
    [{ align: [] }],
    ["clean"],
  ];

  onMount(async () => {
    if (browser) {
      let editor = document.getElementById("editor");
      const { default: Quill } = await import("quill");

      if (editor) {
        let quill = new Quill(editor, {
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

<MainProjectNavBar />
<EditProjectNavBar />
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
      Be honest about the potential risks and challenges of this project and how
      you plan to overcome them to complete it.
    </p>
  </div>
  <div class="flex items-center gap-8 w-3/4 justify-center">
    <textarea
      id="subtitle"
      placeholder="nothing...."
      class="w-3/4 p-4 bg-white border focus:outline-none resize-none"
    />
  </div>
</div>
<hr>
<div class="flex gap-16 w-full h-86 p-8">
	<div class="w-1/4 items-center">
	  <h2 class="text-xl pb-4">Frequently Asked Questions</h2>
	  <p class="text-gray-400 text-sm">
		Post answers to frequently asked questions
	  </p>
	</div>
	<div class="flex items-center gap-8 w-3/4 justify-center">
	  <button
		class="w-3/4 p-3 bg-white border focus:outline-none resize-none hover:border-gray-900 "
	  >Add another FAQ</button>
	</div>
  </div>
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
</style>
