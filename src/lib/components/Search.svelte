<script>
    import Fuse from 'fuse.js'
    let { data } = $props()
    let posts = $state(data.posts)
    let items = $state(data.items)
    let pageNumber = $state(data.pageNumber)

    function updatePage(page){
        items = posts.slice((page - 1) * data.settings.category, page * data.settings.category)
    }
    
</script>

<section class="Category region">
    <div class="container">
        {#each items as post}
        <div class="wrapper">
            <a href="/post/{post.id}">
                {#if post.thumb === ''}
                <img src="/images/noimage.png" alt=''/>
                {:else}
                <img src={post.thumb} alt=''/>
                {/if}
                {#if post.videos.length}
                <img class="play-icon" src="/images/play.png" alt=''/>
                {/if}
            </a>
            <div class="date">{(new Date(post.date)).toLocaleDateString('it-IT')}</div>
            <a class="title" href="/post/{post.id}">
                <div >{post.title}</div>
            </a>
        </div>
        {/each}
    </div>
    <div class="pagination">
        <span>ទំព័រ </span>
        <select onchange={(event)=>updatePage(event.target.value)}>
            {#each [...Array(pageNumber).keys()] as page}
                <option>{page+1}</option>
            {/each}
        </select>
        <span> នៃ {pageNumber}</span>
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