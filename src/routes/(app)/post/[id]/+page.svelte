<script>    
    import { base } from '$app/paths'
    import Layout from "$lib/components/Layout.svelte"
    import Video from "$lib/components/Video.svelte"
    import { browser } from '$app/environment'
    import jq from 'jquery';
    let { data } = $props()
    let randomPosts = $state([])
    
    $effect(() => {
        randomPosts = data.POSTS

        var disqus_config = function () {
            this.page.url = `https://khmerweb.github.io/post/${data.post.id}`;  // Replace PAGE_URL with your page's canonical URL variable
            this.page.identifier = `${data.post.id}`; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        };
    
        (function() { // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');
            s.src = 'https://khmerweb-live.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();

        hljs.highlightAll()
        hljs.initLineNumbersOnLoad()

        jq('.Post .main .content input').attr('value','Run this code')
    })

</script>

<svelte:head>
    <link rel="stylesheet" href="/scripts/pyscript/core.css">
    <script type="module" src="/scripts/pyscript/core.js"></script>
    <link rel="stylesheet" href="/scripts/highlight/styles/default.css">
    <script src="/scripts/highlight/highlight.min.js"></script>
    <script src="/scripts/highlightjs-line-numbers.min.js"></script>
</svelte:head>

<Layout {data}>
<section class="Post region">
    <div class="sidebar">
        {#each randomPosts as post}
            <a  href="{ base }/post/{post.id}">
                <img src={post.thumb} alt=''/>
                {#if post.videos.length>0}
                <img class="play-icon" src="{ base }/images/play.png" alt=''/>
                {/if}
                <div class="title">{post.title}</div>
            </a>
        {/each}
    </div>

    <div class="main">
        <h3 class="title">{data.post.title}</h3>
        <div class="categories">
            <span>​​​​​​​​​ជំពូកៈ {data.post.categories.toString().replace(',', ', ')}</span>
            <span>{(new Date(data.post.date)).toLocaleDateString('it-IT')}</span>
        </div>
        
        {#if data.post.videos.length > 0}
            <Video {data} />
        {/if}
        {#if browser}
            <div class="content">
                {@html data.post.content }
            </div>
        {/if}
        
        <div class='post-bottom'>
            
        </div>
        <div id="disqus_thread"></div>
        <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    </div>

</section>
</Layout>

<style>
.Post{
    margin-top: 15px;
    display: grid;
    grid-template-columns: auto 70%;
    grid-gap: 15px;
    padding-bottom: 30px;
}
.Post .main{
    background-color: var(--panel);
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

.Post .main .content{
    margin: 20px 0;
    font: 14px/1.5 Courgette, Handwriting;
}
:global(.Post .main .content img){
    width: 100%;
}
:global(.Post .main .content .code){
    background: white;
    padding: 10px 15px;
}
:global(.Post .main .content input){
    width: 100%;
    text-align: center;
    padding: 5px;
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
:global(.hljs-ln-numbers) { /* Target the line number container */
    padding-right: 10px !important; /* Adjust as needed */
}
:global(.hljs-ln-code)  { /* Target the code container */
    margin-left: 10px !important; /* Adjust as needed */
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