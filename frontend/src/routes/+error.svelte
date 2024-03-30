<script>
  import {page} from '$app/stores';
  let message = $page.message;

  if ($page.status == 404) message = "Page not found";
  if ($page.status == 400) message = "Bad Request";
  if ($page.status == 401) message = "Ooops unauthorized";
  if ($page.status == 403) message = "Forbidden operation";
  if ($page.status == 500) message = " Server error";
</script>

<div class="flex flex-col items-center justify-center h-[100vh] gap-2">
  <h1 class="text-violet-600 text-8xl">{$page.status}</h1>
  <p class="text-2xl">{message}</p>
</div>
