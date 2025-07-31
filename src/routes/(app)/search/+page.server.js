import { getPosts } from '$lib/utils/get-posts';
import setup from '$lib/settings.js'
import Fuse from 'fuse.js'

export async function load({ url }) {
	const settings = await setup()
    const POSTS = await getPosts()
	const q = url.searchParams.get('q')
	const options = {
	    keys: ['title'],
	    includeMatches: true,
	    minMatchCharLength: 2,
	    threshold: 0.4,
    }

	const fuse = new Fuse(POSTS, options)
    let posts = await fuse
                    .search(q)
                    .map((result) => result.item)

    posts.sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime())
    let pageNumber = Math.ceil(posts.length/settings.category)
    let items = posts.slice(0, settings.category)
	const title = 'ទំព័រ​ស្វែង​រក'
	let pageURL = ''

	return { posts, items, pageNumber, settings, title, pageURL }
}

