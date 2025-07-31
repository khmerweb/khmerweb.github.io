import { getPosts } from '$lib/utils/get-posts';
import setup from '$lib/settings.js'

export async function load({ url }) {
	const settings = await setup()
    const posts = await getPosts()
	const title = 'ទំព័រ​ស្វែង​រក'
	let pageURL = ''

	return { posts, settings, title, pageURL }
}

