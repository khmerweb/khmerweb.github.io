export async function load({ locals }) {
    const settings = await locals.setup(locals)
    const data = {}

    data.settings = settings
    data.pageURL = '/'
    data.title = 'ទំព័រដើម'

    return data
}