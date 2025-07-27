import { redirect } from '@sveltejs/kit'
export const prerender = false

export async function load({ locals }) {
    redirect(303, '/admin/post')
}