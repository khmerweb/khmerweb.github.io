//settings.js

async function setup(locals){
    //const response = await fetch(`${locals.apiUrl}/api/setting?amount=1`)
    //const { items } = await response.json()
    
    let setting = false //items[0]
    let settings = {}

    if(setting){
        settings = {
            siteTitle: setting.title,
            description: setting.description,
            dashboard: setting.dashboard,
            frontend: setting.frontend,
            category: setting.categories,
            thumb: '',
            date: ''
        }
    }else{
        settings = {
            siteTitle: 'កំរង​ឯកសារ​',
            description: 'description',
            dashboard: 2,
            frontend: 20,
            category: 20,
            thumb: '',
            date: ''
        }
    }
    
    return settings
}
 
export default setup