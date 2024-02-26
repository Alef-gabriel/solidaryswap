<script lang="ts">
  const circumference = 2 * Math.PI * 90;
  export let porcentage: number;
</script>

<div class="relative w-16 h-16">
  <svg class="w-full h-full" viewBox="0 0 100 100">
    <circle
      class="text-gray-200 stroke-current"
      stroke-width="10"
      cx="50"
      cy="50"
      r="40"
      fill="transparent"
    ></circle>
    <circle
      class="text-indigo-500 progress-ring__circle stroke-current"
      stroke-width="10"
      stroke-linecap="round"
      cx="50"
      cy="50"
      r="40"
      fill="transparent"
      stroke-dasharray={circumference}
      stroke-dashoffset={circumference - (porcentage / 100) * circumference}
    ></circle>

    <text
      x="50"
      y="50"
      font-family="Verdana"
      font-size="20"
      text-anchor="middle"
      alignment-baseline="middle">{porcentage}%</text
    >
  </svg>
</div>

<style>
  .progress-ring__circle {
    stroke-dasharray: 400, 400;
    transition: stroke-dashoffset 0.35s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
</style>
