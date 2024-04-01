import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { join } from 'path';

export default defineConfig({
	server: {
		fs: {
		  allow: [
			'../artifacts/contracts/Project.sol/Project.json',
		  ],
		},
	  },
	resolve: {
		alias: {
		  '@': join(__dirname, ''), // Alias for entire src directory
		},
	  },
	plugins: [sveltekit()]
});
