<script>
    import Layout from "$lib/component/Layout.svelte"
    import Category from "$lib/component/Category.svelte"
    let { data } = $props()
</script>

<Layout {data} >
    <Category {data} />
</Layout>

