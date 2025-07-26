
import setup from "$lib/settings.js"

export async function handle({ event, resolve  }) {
    event.locals.setup = setup
    
    return await resolve(event)
}