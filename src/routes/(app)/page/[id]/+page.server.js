import { error } from '@sveltejs/kit'
import { getPages } from '$lib/utils/get-pages'
import { getPosts } from '$lib/utils/get-posts'
import setup from '$lib/settings'
import matter from 'gray-matter'

export async function load({ params }) {
	try {
		const settings = await setup()
		const pageModule = await import(`$lib/content/pages/${params.id}.md?raw`)
		const { data, content } = matter(pageModule.default)
    	const page = { ...data, content}
		const POSTS = await getPosts()
		let bookTitles = [...new Set(POSTS.map((post) => (post.bookTitle)))]
    	let postByBooks = []
    	for(const title of bookTitles){
        	let posts = POSTS.filter((post) => (post.bookTitle.includes(title)))
        	posts = posts.filter((post) => (post.bookThumb !== ''))
        	postByBooks.push(posts[0])
    	}
        
		function randomPost(){
			let indexes = []
			const randomPosts = []
			let maxPosts = 1
			if(postByBooks.length < maxPosts){
				maxPosts = postByBooks.length
			}

			while(true){
    			const ranIndex = Math.floor(Math.random()*postByBooks.length)
    			if(!(indexes.includes(ranIndex))){
            		indexes.push(ranIndex)
            		randomPosts.push(postByBooks[ranIndex])
            		if(randomPosts.length === maxPosts){
                		break
            		}
    			}
    			continue
			}
//
			return randomPosts
		}

		const randomBooks = randomPost()
		const title = page.title
		let pageURL = ''
		if(params.id === '46644228'){
			pageURL = 'contact'
		}
        
		return { page, settings, randomBooks, title, pageURL }
	} catch (e) {
		error(404, `Could not find ${params.id}`)
	}
}

export async function entries() {
    const pages = await getPages()
	const ids = pages.map(page => ({id: page.id}))
	return ids
}
