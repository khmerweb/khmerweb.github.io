//import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static'
import {mdsvex} from 'mdsvex'
/** @type {import('@sveltejs/kit').Config} */
const config = {
	
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [
        mdsvex({
            extensions: ['.md', '.svx'],
        })
    ],
	
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		/*
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		}
		*/
	}
};

export default config;
