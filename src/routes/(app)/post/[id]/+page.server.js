import { error } from '@sveltejs/kit'
import { getPosts } from '$lib/utils/get-posts'
import setup from '$lib/settings'
import matter from 'gray-matter'

export async function load({ params }) {
	try {
		const settings = setup()
		const postModule = await import(`$lib/content/posts/${params.id}.md?raw`)
		const { data, content } = matter(postModule.default)
		const post = { ...data, content}
		const Posts = await getPosts()
		let POSTS = []
		
		const title = post.title

		return { post, settings, POSTS, title }
	} catch (e) {
		error(404, `Could not find ${params.id}`)
	}
}

export async function entries() {
    const posts = await getPosts()
	const ids = posts.map(post => ({id: post.id}))
	return ids
}
