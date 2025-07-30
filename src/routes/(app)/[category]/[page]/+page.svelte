<script>
    import Layout from "$lib/components/Layout.svelte"
    import Category from "$lib/components/Category.svelte"
    let { data } = $props()
</script>

<Layout {data} >
    <Category {data} />
</Layout>

