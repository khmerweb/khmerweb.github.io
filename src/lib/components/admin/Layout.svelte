<script>
    let { data, editor, items } = $props()
    import Header from "$lib/components/admin/Header.svelte"
    import Footer from "$lib/components/Footer.svelte"
</script>

<svelte:head>
    <title>{ data.title }</title>
    <script src="/scripts/ckeditor/ckeditor.js"></script>
    <link href="/fonts/setup.css" rel="stylesheet" />
    <link href="/styles/base-frontend.css" rel="stylesheet" />
</svelte:head>

<section class="Admin">
	<Header { data } />
	<main class="region">
		<div class="wrapper">
			<aside>
				<div class='inner'>
					<a href="/amin/post"><img src="/images/movie.png" alt='' /></a>
					<span><a href="/admin/post">ការផ្សាយ</a></span>
					<a href="/admin/page"><img src="/images/page.png" alt=''/></a>
					<span><a href="/admin/page">ទំព័រ​ស្តាទិក</a></span>
				</div>
			</aside>
			<div>
				{@render editor()}
			</div>
		</div>
		{#if items && data?.items}
			{@render items(data)}
		{/if}
	</main>
	<Footer />
</section>

<style>
	.Admin main{
		margin-top: 10px;
		margin-bottom: 30px;
	}
	.Admin main .wrapper{
		display: grid;
		grid-template-columns: 25% auto;
		grid-gap: 10px;
	}
	.Admin main .wrapper aside, 
	.Admin main .wrapper aside .inner{
		background-color: var(--background);
	}
	.Admin main .wrapper aside .inner{
		display: grid;
		grid-template-columns: 50px auto;
		align-items: center;
		grid-gap: 20px 10px;
		padding: 15px;
	}
	.Admin main .wrapper aside img{
		width: 100%;
		float: left;
	}
	.Admin main .wrapper aside a{
		font: 18px/1.5 Oswald, Bayon;
		color: var(--color);
	}

	@media only screen and (max-width: 600px){
		.Admin{
			padding: 10px;
		}
		.Admin main .wrapper{
			grid-template-columns: 100%;
		}
	}
</style>