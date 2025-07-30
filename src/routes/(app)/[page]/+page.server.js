import { getPosts } from '$lib/utils/get-posts'
import setup from '$lib/settings.js'

export async function load({ params }) {
	const settings = await setup()
    const POSTS = await getPosts()
	let bookTitles = [...new Set(POSTS.map((post) => (post.bookTitle)))]
    let postByBooks = []
    for(const title of bookTitles){
        let posts = POSTS.filter((post) => (post.bookTitle.includes(title)))
        posts = posts.filter((post) => (post.bookThumb !== ''))
        postByBooks.push(posts[0])
    }

	const posts = postByBooks.slice((params.page - 1) * settings.frontend, params.page * settings.frontend)
    const count = postByBooks.length
	const lastPage = Math.ceil(count/settings.frontend)
	const title = 'ទំព័រ​ដើម'
	const currentPage = params.page
	let pageURL = ''

	return { posts, count, settings, lastPage, title, currentPage, pageURL }
}

export async function entries() {
	const settings = await setup()
    const POSTS = await getPosts()
	let bookTitles = [...new Set(POSTS.map((post) => (post.bookTitle)))]
    let postByBooks = []
    for(const title of bookTitles){
        let posts = POSTS.filter((post) => (post.bookTitle.includes(title)))
        posts = posts.filter((post) => (post.bookThumb !== ''))
        postByBooks.push(posts[0])
    }
	let arr = []
	for(let p of [...Array(Math.ceil(postByBooks.length/settings.frontend)).keys()]){
        arr.push({page: (p+1).toString()})
    }

	return arr
}
