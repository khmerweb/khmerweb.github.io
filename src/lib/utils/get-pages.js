import matter from 'gray-matter'

export async function getPages(order='desc') {
	let pages = []

	const paths = import.meta.glob('$lib/content/pages/*.md', { query: '?raw', import: 'default', eager: true })

	for (const path in paths) {
		const file = paths[path]

		const { data } = matter(file)
		pages.push({ ...data })
	}

	if(order === 'asc'){
		pages.sort((first, second) =>
    		new Date(first.date).getTime() - new Date(second.date).getTime()
		)
	}else{
		pages.sort((first, second) =>
    		new Date(second.date).getTime() - new Date(first.date).getTime()
		)
	}
	
	return pages
}