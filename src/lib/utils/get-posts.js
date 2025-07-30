import matter from 'gray-matter'

export async function getPosts(order='desc') {
	let posts = []

	const paths = import.meta.glob('$lib/content/posts/*.md', { query: '?raw', import: 'default', eager: true })

	for (const path in paths) {
		const file = paths[path]

		const { data } = matter(file)
		posts.push({ ...data })
	}

	if(order === 'asc'){
		posts.sort((first, second) =>
    		new Date(first.date).getTime() - new Date(second.date).getTime()
		)
	}else{
		posts.sort((first, second) =>
    		new Date(second.date).getTime() - new Date(first.date).getTime()
		)
	}
	
	return posts
}