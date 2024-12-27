import { getPosts } from '$lib/utils/get-posts';
import setup from '$lib/settings.js'

export async function load({ params }) {
	const settings = setup()
    const posts = (await getPosts()).slice(0, settings.tag)
    const count = await posts.length
	const pageNumber = Math.ceil(count/settings.frontend)
	const title = params.category
	const pageURL = ''
	const category = params.category
	const page = params.page

	return { posts, count, settings, pageNumber, title, pageURL, category, page }
}

export async function entries() {
	const settings = setup()
    const posts = await getPosts()
	const categories = [...new Set(posts.map((post) => post.categories).flat())]

	let arr = []
	for(let category of categories){
		let posts_by_category = posts.filter((p) => (p.categories.includes(category)))
		for(let p of [...Array(Math.ceil(posts_by_category.length/settings.category)).keys()]){
			arr.push({category, page: (p+1)+''})
		}
	}

	return arr
}
