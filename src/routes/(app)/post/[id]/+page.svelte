<script>    
    import { base } from '$app/paths'
    import Layout from "$lib/components/Layout.svelte"
    import Video from "$lib/components/Video.svelte"
    import { browser } from '$app/environment'
    import jq from 'jquery';
    let { data } = $props()
    let posts = data.posts
    
    $effect(() => {
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
    <link rel="stylesheet" href="/styles/highlight.css">
    <script src="/scripts/highlight.js"></script>
    <script src="/scripts/highlightjs-line-numbers.min.js"></script>
</svelte:head>

<Layout {data}>
<section class="Post region">
    <div class="sidebar">
        <h2 class='title'>{data.post.bookTitle}</h2>
            {#each [...data.postsByChapter] as [key, value]}
            <details open>
                <summary>{key}</summary>
                <ol>
                    {#each value as post}
                        {#if data.post.id === post.id}
                        <li class="active"><a href="/post/{post.id}">{post.title}</a></li>
                        {:else}
                        <li><a href="/post/{post.id}">{post.title}</a></li>
                        {/if}
                    {/each}
                </ol>
            </details>
            {/each}
        
    </div>

    <div class="main">
        <h3 class="title">{data.post.title}</h3>
        <div class="categories">
            {(new Date(data.post.date)).toLocaleDateString('it-IT')}
        </div>
        
        {#if (data.post.videos !=='')&&(data.post.videos !=='[]')}
            <Video {data} />
        {/if}
        
        {#if browser}
            <div class="content">
            {@html data.post.content }
            </div>
        {/if}
        
        <div id="disqus_thread"></div>
        <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    </div>

</section>
</Layout>

<style>
.Post{
    margin-top: 10px;
    display: grid;
    grid-template-columns: 30% 70%;
    grid-gap: 0;
    padding-bottom: 30px;
}
.Post .sidebar{
    background: rgb(221, 221, 221);
    padding: 10px;
}
.Post .sidebar .title{
    font: 20px / 1.5 Oswald, Koulen; 
    padding: 5px 0 10px; 
    color: darkgreen;
    text-align: center;
}
.Post .sidebar details summary{
    font: 18px / 1.5 Oswald, Bayon;
    padding-top: 10px;
}
.Post .sidebar details ol li{
    padding-left: 15px;
    list-style-type: decimal;
    list-style-position: inside;
    font: italic 16px / 1.75 StardosStencil, Limonf3;
}
.Post .sidebar details ol li.active,
.Post .sidebar details ol li.active a{
    color: var(--link)
}
.Post .sidebar details ol li a{
    color: var(--color);
}
.Post .sidebar a:last-child{
    margin-bottom: 0;
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
.Post .main .content{
    padding: 20px 0;
    font: 14px/1.5 Courgette, Handwriting;
}
:global(.Post .main .content img){
    width: 100%;
}
:global(.Post .main .content mark){
    background: lightgreen;
}
:global(.hljs-ln-numbers) { /* Target the line number container */
    padding-right: 10px !important; /* Adjust as needed */
}
:global(.hljs-ln-code)  { /* Target the code container */
    margin-left: 10px !important; /* Adjust as needed */
}
:global(.Post .main .content pre){
    padding: 15px 0 0 !important;
}
:global(.Post .main .content pre code){
    font-family: Nokora;
}
:global(.Post .main .content pre .py-editor-box){
    background: white;
    padding: 0;
    margin: 15px 0 0;
}
:global(.Post .main .content input){
    width: 100%;
    text-align: center;
    padding: 5px;
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