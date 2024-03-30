import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    env: {
      dir: "./",
    },

    adapter: adapter(),
    prerender: {
      entries: [
        "/projects",
        "/settings",
        "/edit",
        "/edit/people",
        "/edit/story",
        "/projects/actions/[projectId]",
        "/projects/[id]",
      ],
      handleHttpError: ({ path, message }) => {
        // Check if the error is related to the /projects/[id]/ route
        if (
          path.startsWith("/projects/") &&
          message.includes("linked from /projects/")
        ) {
          // Handle the error for the /projects/[id]/ route
          console.error(`HTTP error for route ${path}: ${message}`);
          // Return an appropriate response if needed
          return {
            status: 500,
            body: "Internal Server Error: Unable to prerender /projects/[id]/",
          };
        }
      },
    },
  },
};

export default config;
