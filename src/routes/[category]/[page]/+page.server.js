import { getPosts } from '$lib/utils/get-posts';
import setup from '$lib/settings.js'

export async function load({ params }) {
	const settings = setup()
    const POSTS = await getPosts()
	let postsByCategory = []
    let posts = []

    postsByCategory = POSTS.filter((p) => (p.categories.includes(params.category)))
	posts = postsByCategory.slice((params.page - 1) * settings.category, params.page * settings.category)
    
    const count = postsByCategory.length
	const pageNumber = Math.ceil(count/settings.category)
	const title = params.category
	const category = params.category
	const currentPage = params.page
	
	let pageURL
    if(params.category === 'news'){
        pageURL = 'news'
    }else if(params.category === 'national'){
        pageURL = 'news'
    }else if(params.category === 'global'){
        pageURL = 'news'
    }else if(params.category === 'opinion'){
        pageURL = 'opinion'
    }else if(params.category === 'doc'){
        pageURL = 'doc'
    }else if(params.category === 'sport'){
        pageURL = 'sport'
    }else if(params.category === 'Khmer'){
        pageURL = 'movie'
    }else if(params.category === 'Thai'){
        pageURL = 'movie'
    }else if(params.category === 'Chinese'){
        pageURL = 'movie'
    }else if(params.category === 'Korean'){
        pageURL = 'movie'
    }else if(params.category === 'world'){
        pageURL = 'movie'
    }else if(params.category === 'movie'){
        pageURL = 'movie'
    }else if(params.category === 'random'){
        pageURL = 'movie'
    }else if(params.category === 'travel'){
        pageURL = 'travel'
    }else if(params.category === 'game'){
        pageURL = 'game'
    }

	return { posts, count, settings, pageNumber, title, pageURL, category, currentPage }
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
