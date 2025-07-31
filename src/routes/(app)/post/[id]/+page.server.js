import { error } from '@sveltejs/kit'
import { getPosts } from '$lib/utils/get-posts'
import setup from '$lib/settings'
import matter from 'gray-matter'

export async function load({ params }) {
	try {
		const settings = await setup()
		const postModule = await import(`$lib/content/posts/${params.id}.md?raw`)
		const { data, content } = matter(postModule.default)
		const post = { ...data, content}
		const Posts = await getPosts('asc')
		
		const posts = Posts.filter((p) => (p.bookTitle === post.bookTitle)&&(p.categories.includes(post.categories)||post.categories.includes(p.categories)))
		let chapters = posts.map((p) => (p.bookChapter))
		const setChapter = new Set(chapters)
		const postsByChapter = new Map()
		for(const chapter of setChapter){
			let _posts_ = posts.filter((p) => (p.bookChapter === chapter))
			postsByChapter.set(chapter, _posts_)
		}
		
		const title = post.bookTitle

		return { post, postsByChapter, settings, title }
	} catch (e) {
		error(404, `Could not find ${params.id}`)
	}
}

export async function entries() {
    const posts = await getPosts()
	const ids = posts.map(post => ({id: post.id}))
	return ids
}
