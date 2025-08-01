<script>    
    import Layout from "$lib/components/Layout.svelte"
    let { data } = $props()
    let randomPosts = $state(data.randomBooks)
</script>

<Layout {data}>
<section class="Post region">
    <div class="main">
        <h3 class="title">{data.page.title}</h3>
        <div class="content">
            {@html data.page.content}
        </div>
    </div>
    <div class="sidebar">
        {#each randomPosts as post}
            <a  href="/post/{post.id}">
                <img src={post.bookThumb} alt=''/>
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
    background-color: var(--panel);
    padding: 15px;
}
.Post .main .title{
    font: 18px/1.5 Oswald, Koulen;
    margin-bottom: 20px;
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
    padding-bottom: 15px;
}
.Post .sidebar a:last-child{
    padding-bottom: 0;
}
.Post .sidebar a img{
    width: 100%;
    float: left;
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