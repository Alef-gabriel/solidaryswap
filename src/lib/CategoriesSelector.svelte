<script lang="ts">
  import { businessAreas } from "$lib";
  import { type Writable } from "svelte/store";

  export let selectedCategory: Writable<{
    name: string;
    subAreas: string[];
  }>;
  export let selectedSubcategory: string;
  export let label:string;

  function setSubcategory(subCategory: string) {
    selectedSubcategory = subCategory;
  }

  function setCategory(category: { name: string; subAreas: string[] }) {
    selectedCategory.set(category);
  }
</script>

<div class="flex gap-8">
  <div class="w-2/4">
    <label for="" class="text-purple-400">{label}category</label>
    <select
      id="countries"
      class="text-sm block w-full p-2.5 border focus:border-purple-400 focus:outline-none"
    >
      {#each businessAreas as area}
        <option
          value={area.name}
          on:click={() => {
            setCategory(area);
          }}>{area.name}</option
        >
      {/each}
    </select>
  </div>
  <div class="w-2/4">
    <label for="" class="text-purple-400">{label}subcategory</label>
    <select
      id="countries"
      class="text-sm block w-full p-2.5 border focus:border-purple-400 focus:outline-none"
      disabled={!$selectedCategory}
    >
      {#if $selectedCategory}
        {#each $selectedCategory.subAreas as subAreas}
          <option
            value="{subAreas}"
            on:click={() => {
              setSubcategory(subAreas);
            }}>{subAreas}</option
          >
        {/each}
      {/if}
    </select>
  </div>
</div>
