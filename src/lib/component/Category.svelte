<script>
	import { base } from '$app/paths'
    let { data } = $props()

    let url = ''
    if(data.category){
        url = `${ base }/${data.category}/`
    }else{
        url = `${ base }/`
    }
</script>

<section class="Category region">
    <div class="container">
        {#each data.posts as post}
            <div class="wrapper">
                <a href="{ base }/post/{post.slug}">
                    <img src={post.thumb} alt=''/>
                    {#if post.videos.length}
                    <img class="play-icon" src="{ base }/images/play.png" alt=''/>
                    {/if}
                </a>
                <div class="date">{(new Date(post.date)).toLocaleDateString('it-IT')}</div>
                <a class="title" href="{ base }/post/{post.slug}">
                    <div >{post.title}</div>
                </a>
                
            </div>
        {/each}
    </div>
    <div class="pagination">
        <span>ទំព័រ </span>
        <select onchange={(event)=>document.location = url + event.target.value}>
            {#each [...Array(data.pageNumber).keys()] as page}
                {#if page+1 == data.currentPage}
                <option selected>{page+1}</option>
                {:else}
                <option>{page+1}</option>
                {/if}
            {/each}
        </select>
        <span> នៃ {data.pageNumber}</span>
    </div>
</section>

<style>
.Category .container{
    display: grid;
    grid-template-columns: repeat(4, calc(100% / 4 - 11.25px));
    grid-gap: 30px 15px;
    padding: 15px 0 30px;
}
.Category .container .wrapper a{
    position: relative;
    padding-top: 56.25%;
    overflow: hidden;
    width: 100%;
    display: block;
}
.Category .container .wrapper a img{
    position: absolute;
    width: 100%;
    min-height: 100%;
    top: 0;
    left: 0;
}
.Category .container .wrapper a .play-icon{
    width: auto;
    min-height: auto;
    width: 15%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}
.Category .container .wrapper .title{
    padding-top: 0;
    color: black;
}
.Category .pagination{
    display: block;
    text-align: center;
    padding: 0 0 30px;
}
@media only screen and (max-width:600px){
    .Category .container{
        grid-template-columns: 100%;
        padding: 30px 10px;
    }
}
</style>