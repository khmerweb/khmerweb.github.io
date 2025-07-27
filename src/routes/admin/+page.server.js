import { redirect } from '@sveltejs/kit'

export async function load({ locals }) {
    redirect(303, '/admin/post')
}