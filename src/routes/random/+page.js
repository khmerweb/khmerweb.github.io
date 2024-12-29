import { getPosts } from '$lib/utils/get-posts';
import setup from '$lib/settings.js'

export async function load({ params }) {
	const settings = setup()
    const POSTS = await getPosts()
	let postsByCategory = []
    let posts = []

    function randomPost(posts){
        let indexes = []
        const randomPosts = []
        let maxPosts = settings.category
        if(posts.length < settings.category){
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

    postsByCategory = POSTS.filter((p) => (p.categories.includes('movie')))
    posts = randomPost(postsByCategory)
    
    const count = postsByCategory.length
	const pageNumber = Math.ceil(count/settings.category)
	const title = "ឥត​ព្រៀង​ទុក"
	const category = "random"
	const currentPage = 1
	let pageURL = "movie"

	return { posts, count, settings, pageNumber, title, pageURL, category, currentPage }
}