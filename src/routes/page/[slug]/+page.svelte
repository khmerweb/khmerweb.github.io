<script>    
    import { base } from '$app/paths'
    import Layout from "$lib/component/Layout.svelte"
    let { data } = $props()
    let randomPosts = $state([])

    $effect(() => {
        randomPosts = data.POSTS
    })

</script>

<Layout {data}>
<section class="Post region">
    <div class="main">
        <h3 class="title">{data.page.title}</h3>
        <div class="author">
            <span>​​​​​​​​​​ចុះ​ផ្សាយ​ដោយៈ {data.page.author}</span>
        </div>
        <div class="content">
            <data.page.content />
        </div>
    </div>
    <div class="sidebar">
        {#each randomPosts as post}
            <a  href="{ base }/post/{post.slug}">
                <img src={post.thumb} alt=''/>
                {#if post.videos.length>0}
                <img class="play-icon" src="{ base }/images/play.png" alt=''/>
                {/if}
                <div class="title">{post.title}</div>
            </a>
        {/each}
        
    </div>

</section>
</Layout>

<style>
.Post{
    margin-top: 15px;
    display: grid;
    grid-template-columns: 70% auto;
    grid-gap: 15px;
    padding-bottom: 30px;
}
.Post .main{
    background-color: #e2f3a6;
    color: rgb(22, 22, 22);
    padding: 15px;
}
.Post .main .title{
    font: 18px/1.5 Oswald, Koulen;
    margin-bottom: 20px;
}
.Post .main .categories span:nth-child(2){
    float: right;
}
.Post .main .author{
    padding-bottom: 0px;
}
.Post .main .content{
    margin: 20px 0;
    font: 14px/1.5 Courgette, Nokora;
}
:global(.Post .main .content img){
    width: 100%;
}
.Post .sidebar a{
    display: block;
    color: white;
    position: relative;
    padding-top: 56.25%;
    overflow: hidden;
    margin-bottom: 15px;
}
.Post .sidebar a:last-child{
    margin-bottom: 0;
}
.Post .sidebar a img{
    position: absolute;
    width: 100%;
    min-height: 100%;
    top: 0;
    left: 0;
}
.Post .sidebar a .play-icon{
    width: auto;
    min-height: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 15%;
}
.Post .sidebar a .title{
    position: absolute;
    bottom: 0;
    padding: 5px 10px;
    font: 16px/1.5 Oswald, Bayon;
    text-shadow: 2px 2px 4px #000000;
    background: -webkit-linear-gradient(bottom, black,transparent);
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.Post .main .post-bottom{
    display: grid;
    grid-template-columns: auto auto;
}

.Post .main .social-media{
    width: 50px;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 5px;
    align-items: center;
}

@media only screen and (max-width:600px){
    .Post{
        grid-template-columns: 100%;
    }
    .Post .sidebar{
        padding: 0 15px;
    }
}
</style>