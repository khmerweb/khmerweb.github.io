import { getPosts } from '$lib/utils/get-posts';
import setup from '$lib/settings.js'

export async function load() {
	const settings = setup()
	const POSTS = await getPosts()
	const posts = POSTS.slice(0, settings.front)
	const count = await posts.length
	const pageNumber = Math.ceil(count/settings.front)

	const categories = ['doc']
    let postsByCategory = []
	for(let category of categories){
		let filteredPosts = POSTS.filter((post) => (post.categories.includes(category)))
		postsByCategory.push(filteredPosts.slice(0, settings.playlist))
	}
	
	const title = "ទំព័រដើម"
	const pageURL = '/'

	return { posts, count, settings, pageNumber, title, pageURL, postsByCategory }
}