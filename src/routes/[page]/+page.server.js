import { getPosts } from '$lib/utils/get-posts';
import setup from '$lib/settings.js'

export async function load({ params }) {
	const settings = setup()
    const POSTS = await getPosts()
	const posts = POSTS.slice((params.page - 1) * settings.front, params.page * settings.front)
    const count = POSTS.length
	const pageNumber = Math.ceil(count/settings.front)
	const title = 'ទំព័រ​ដើម'
	const currentPage = params.page
	let pageURL = ''
    

	return { posts, count, settings, pageNumber, title, currentPage, pageURL }
}

export async function entries() {
	const settings = setup()
    const posts = await getPosts()

	let arr = []
	for(let p of [...Array(Math.ceil(posts.length/settings.front)).keys()]){
        arr.push({page: (p+1)+''})
    }

	return arr
}
