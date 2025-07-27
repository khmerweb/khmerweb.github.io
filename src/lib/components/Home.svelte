<script>
    import Ad from "$lib/components/Ad.svelte"
    import jq from 'jquery'
    let { data } = $props()
    
    //const pageAmount = Math.ceil(data.count/data.settings.frontend)

    $effect(() => {
        CKEDITOR.replace( 'editor1' );
    })
</script>

<style>
    
</style>