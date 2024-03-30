<script>
  import { businessAreas } from "$lib";

  export let selectedCategory;
  export let selectedSubcategory
  export let label

  function setSubcategory(subCategory) {
    selectedSubcategory = subCategory;
  }

  function setCategory(category) {
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
