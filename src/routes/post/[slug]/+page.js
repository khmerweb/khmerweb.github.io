import { error } from '@sveltejs/kit'
import { getPosts } from '$lib/utils/get-posts'
import setup from '$lib/settings';

export async function load({ params }) {
	try {
		const settings = setup()
		let post = await import(`$lib/content/posts/${params.slug}.md`)
		post = { ...post.metadata, content: post.default, slug: params.slug }
    	
		const Posts = await getPosts()
		let posts = []
		if((post.categories.includes("news")) && !(post.categories.includes("doc"))){
			posts = Posts.filter((p) => ((p.categories.includes("news")) && !(p.slug === post.slug ) && !(p.categories.includes("doc"))))
		}else if(post.categories.includes("doc")){
			posts = Posts.filter((p) => ((p.categories.includes("doc")) && !(p.slug === post.slug )))
		}else{
			posts = Posts.filter((p) => (!(p.categories.includes("news")) && !(p.slug === post.slug )))
		}

		let POSTS = []

		function randomPost(){
			let indexes = []
			const randomPosts = []
			let maxPosts = 6
			if(posts.length < 6){
				maxPosts = posts.length
			}

			while(true){
    			const ranIndex = Math.floor(Math.random()*posts.length)
    			if(!(indexes.includes(ranIndex))){
        			if(post.slug !== posts[ranIndex].slug){
            			indexes.push(ranIndex)
            			randomPosts.push(posts[ranIndex])
            			if(randomPosts.length === maxPosts){
                			break
            			}
        			}
    			}
    			continue
			}

			return randomPosts
		}

		if((posts[0].categories.includes("news")) && !(posts[0].categories.includes("doc"))){
            POSTS = posts.slice(0,6)
        }else{
            POSTS = randomPost()
        }
		
		const title = post.title

		return { post, settings, POSTS, title }
	} catch (e) {
		error(404, `Could not find ${params.slug}`)
	}
}

export async function entries() {
    const posts = await getPosts()
	const slugs = posts.map(post => ({slug: post.slug}))
	return slugs
}
