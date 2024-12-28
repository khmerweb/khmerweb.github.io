<script>
    import Layout from "$lib/component/Layout.svelte"
    import Search from "$lib/component/Search.svelte"
    let { data } = $props()
</script>

<Layout {data} >
    <Search {data} />
</Layout>

