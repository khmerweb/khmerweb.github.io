<script>
    import Layout from "$lib/components/Layout.svelte"
    import Search from "$lib/components/Search.svelte"
    let { data } = $props()
</script>

<Layout {data} >
    <Search {data} />
</Layout>

