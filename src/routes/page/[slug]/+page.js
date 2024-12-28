import { error } from '@sveltejs/kit'
import { getPosts } from '$lib/utils/get-posts'
import setup from '$lib/settings';

export async function load({ params }) {
	try {
		const settings = setup()
		let page = await import(`$lib/content/pages/${params.slug}.md`)
		page = { ...page.metadata, content: page.default, slug: params.slug }
    	
		const Posts = await getPosts()
		let posts = []
		posts = Posts.filter((p) => (!(p.categories.includes("news"))))

		let POSTS = []
        
		function randomPost(){
			let indexes = []
			const randomPosts = []
			let maxPosts = 3
			if(posts.length < 3){
				maxPosts = posts.length
			}

			while(true){
    			const ranIndex = Math.floor(Math.random()*posts.length)
    			if(!(indexes.includes(ranIndex))){
            		indexes.push(ranIndex)
            		randomPosts.push(posts[ranIndex])
            		if(randomPosts.length === maxPosts){
                		break
            		}
    			}
    			continue
			}

			return randomPosts
		}

		POSTS = randomPost()
		
		const title = page.title
        const pageURL = params.slug
        
		return { page, settings, POSTS, title, pageURL }
	} catch (e) {
		error(404, `Could not find ${params.slug}`)
	}
}

export async function entries() {
	return [
        {slug: 'contact'},
        {slug: 'about'}
    ]
}
