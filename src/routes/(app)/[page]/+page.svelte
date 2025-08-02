<!--src/components/Pagination.astro-->
<script>
    import Layout from "$lib/components/Layout.svelte"
    let { data } = $props()
</script>

<Layout {data}>
<section class="Home region">
    <div class="container">
        {#each data.posts as post}
            <div class="wrapper">
                <a href={`/post/${post.id}`}>
                    <img src={post.bookThumb} alt=""/>
                </a>
            </div>
        {/each}
    </div>
    <div class="pagination">
        <span>ទំព័រ </span>
        <select onchange={(event)=>{document.location = `/${event.target.value}`}}>
            {#each [...Array(data.lastPage).keys()] as pageNumber}
                {#if pageNumber+1 == data.currentPage}
                <option selected>{pageNumber+1}</option>
                {:else}
                <option>{pageNumber+1}</option>
                {/if}
            {/each}
        </select>
        <span> នៃ {data.lastPage}</span>
    </div>
</section>
</Layout>

<style>
.Home .container{
    display: grid;
    grid-template-columns: repeat(4, calc(100% / 4 - 11.25px));
    grid-gap: 30px 15px;
    padding: 15px 0 30px;
}
.Home .container .wrapper a{
    width: 100%;
    display: block;
}
.Home .container .wrapper a img{
    width: 100%;
}

.Home .pagination{
    display: block;
    text-align: center;
    padding-bottom: 30px;
}
@media only screen and (max-width:600px){
    .Home .container{
        grid-template-columns: 100%;
        padding: 30px 10px;
    }
}
</style>