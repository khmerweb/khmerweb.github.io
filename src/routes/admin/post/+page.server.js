import fs from 'fs'
import { getPosts } from '$lib/utils/get-posts';
import setup from '$lib/settings.js'
import { ulid } from "ulid"
import urid from 'urid'
const enc = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
function rev(ulid) { return [...ulid].map(x => enc[31 - enc.indexOf(x)]).join('')}

export async function load({ locals, url }) {
    const settings = await setup()
	const POSTS = await getPosts()
	const items = POSTS.slice(0, settings.frontend)
	const count = await POSTS.length
	const pageNumber = Math.ceil(count/settings.frontend)
    
    const delObj = { success: url.searchParams.get('success'), type: url.searchParams.get('type') }
    const title = 'ទំព័រ​ការផ្សាយ'

    return { count, settings, items, title, info:"ការផ្សាយ", type:"post", pageNumber, delObj }
}

export const actions = {
	create: async ({ request, locals, cookies }) => {
        
		const data = await request.formData()
        
        const title = data.get('title')
        const content = data.get('content')
        const categories = data.get('categories')
        const thumb = data.get("thumb")
        const date = data.get("datetime")
        const videos = data.get("videos")

        const validate = (
            typeof title === 'string' && title !== '' &&
            typeof content === 'string' &&
            typeof categories === 'string' && categories !== '' &&
            typeof thumb === 'string' && thumb !== '' &&
            typeof date === 'string' && date !== '' &&
            typeof videos === 'string'
        )
        
		if(validate){
            const fileName = rev(ulid())
            const id = urid(8, 'num')
            const filePath = `./src/lib/content/posts/${fileName}.md`
            const frontMatter = {id, title, categories, thumb, date, videos}
            const yamlFrontMatter = Object.entries(frontMatter)
                .map(([key, value]) => {
                    if (Array.isArray(value)) {
                        return `${key}: [${value.map(item => `'${item}'`).join(', ')}]`
                    }
                    return `${key}: '${value}'`
                })
                .join('\n')

            const fileContent = `---\n${yamlFrontMatter}\n---\n${content}`
            
            fs.writeFile(filePath, fileContent, (err) => {
                if (err) {
                    console.error('Error writing file:', err)
                } else {
                    console.log('1 md file has been create!')
                }
            })

            return {success: true, message: 'ការផ្សាយ​មួយ​ត្រូវ​បាន​បង្កើត​ឡើង'}

        }else{
            return {success: false, message: "ទិន្នន័យ​បញ្ជូន​មក​មិន​ត្រឹមត្រូវ​ទេ!"}
        }
	}
}