import { getPosts } from '$lib/utils/get-posts';
import setup from '$lib/settings.js'

export async function load({ params }) {
	const settings = await setup()
    const POSTS = await getPosts()

    let postsByCategory = POSTS.filter((post) => (post.categories.includes(params.category)))
    let bookTitles = [...new Set(postsByCategory.map((post) => (post.bookTitle)))]
    let postByBooks = []
    for(const title of bookTitles){
        let posts = postsByCategory.filter((post) => (post.bookTitle.includes(title)))
        posts = posts.filter((post) => (post.bookThumb !== ''))
        postByBooks.push(posts[0])
    }
    
   	let posts = postByBooks.slice((params.page - 1) * settings.category, params.page * settings.category)
    
    const count = postByBooks.length
	const lastPage = Math.ceil(count/settings.category)
	const title = params.category
	const category = params.category
	const currentPage = params.page
	const pageURL = params.category

	return { posts, count, settings, lastPage, title, pageURL, category, currentPage }
}

export async function entries() {
	const settings = await setup()
    const posts = await getPosts()
	const categories = [...new Set(posts.map((post) => post.categories))]

	let arr = []
	for(let category of categories){
		let posts_by_category = posts.filter((p) => (p.categories.includes(category)))
        let bookTitles = [...new Set(posts_by_category.map((post) => (post.bookTitle)))]
        let postByBooks = []
        for(const title of bookTitles){
            let posts = posts_by_category.filter((post) => (post.bookTitle.includes(title)))
            posts = posts.filter((post) => (post.bookThumb !== ''))
            postByBooks.push(posts[0])
        }
		for(let p of [...Array(Math.ceil(postByBooks.length/settings.category)).keys()]){
			arr.push({category, page: (p+1).toString()})
		}
	}

	return arr
}
