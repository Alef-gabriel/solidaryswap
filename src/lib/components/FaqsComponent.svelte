<script>
  export let faqs;
</script>

{#if faqs}
 <div id="faq" class="flex flex-col items-center gap-4 pt-4">
  {#each faqs as faq}
    <div class="flex flex-col gap-8 w-2/4 border p-6 h-4/4 bg-gray-100 rounded-lg">
      <div>
        <label for="title" class="block mb-2 text-sm font-medium"
          >Question</label
        >
        <input
          type="text"
          id="subtitle"
          disabled={true}
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
          disabled={true}
          bind:value={faq.answer}
          class="w-full p-4 bg-white border focus:outline-none resize-none"
        />
      </div>
    </div>
  {/each}
</div>
{/if}
