<script>
	import Layout from "$lib/component/Layout.svelte";
	//import Latest from '$lib/component/Latest.svelte'
	let { data } = $props()
</script>

<Layout {data}>
<section class="Index region">
	{ data.category }
	{ data.page }
</section>
</Layout>