import { getPosts } from '$lib/utils/get-posts';
import setup from '$lib/settings.js'

export async function load({ locals }) {
    const settings = await setup()
    const POSTS = await getPosts()
    let bookTitles = [...new Set(POSTS.map((post) => (post.bookTitle)))]
    let postByBooks = []
    for(const title of bookTitles){
        let posts = POSTS.filter((post) => (post.bookTitle.includes(title)))
        posts = posts.filter((post) => (post.bookThumb !== ''))
        postByBooks.push(posts[0])
    }

    const recentPosts = POSTS.slice(0, 20)
    let posts = postByBooks.slice(0, settings.frontend)
    const lastPage = Math.ceil(postByBooks.length/settings.frontend)

    const data = {}
    data.currentPage = 1
    data.lastPage = lastPage
    data.posts = posts
    data.recentPosts = recentPosts
    data.settings = settings
    data.pageURL = '/'
    data.title = 'ទំព័រដើម'

    return data
}