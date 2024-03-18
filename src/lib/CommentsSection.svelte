<script>
  export let comments;
  export let userId;
  export let tableName;

  let addComment = false;
  let val = "";

  console.log(comments);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5173/api/project/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: val, tableName, userId }),
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
</script>

<div class="flex w-full">
  <div class="flex flex-col p-4 gap-4 w-3/4 justify-center items-center">
    {#if addComment}
      <div class="flex flex-col gap-8 w-3/4 border p-6 h-4/4 bg-gray-100">
        <div>
          <h1 for="title" class="block mb-2 text-sm font-medium">
            Write your comment.
          </h1>
        </div>
        <div>
          <textarea
            id="subtitle"
            placeholder="nothing...."
            bind:value={val}
            class="w-full p-4 bg-white border focus:outline-none resize-none"
          />
        </div>
      </div>
    {/if}
    <button
      class="w-2/4 p-3 bg-gray-100 border focus:outline-none resize-none hover:border-gray-900"
      on:click={async () => {
        if (addComment) {
          console.log("This is value ", val);
          await fetchData();
        }
        addComment = !addComment;
      }}>Add comment</button
    >
    <div class="flex flex-col w-full gap-4 p-4 items-center">
      {#each comments as comment}
        <div class="flex items-start justify-center p-2 border-2 w-2/4">
          <div class="flex flex-col gap-6 w-full border-2">
            <div class="flex gap-2">
              <div id="pic-bunner"></div>
              <p class="font-semibold text-lg">User name</p>
            </div>
            <div class="p-3">
              {comment.val}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  <div class="w-1/4 flex items-center">
	<div class="border-l-4 h-26">
		<h2 class="text-lg p-2">
		  This is your space to offer support and feedback. Remember to be
		  constructive—there's a human behind this project. Have a question for the
		  creator? Check this project's FAQ
		</h2>
	</div>
  </div>
</div>
