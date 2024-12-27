<script>
    import { base } from '$app/paths'
    import jq from "jquery"
    let { data } = $props()
    const featured = data.posts.slice(0, 3)
    const posts = data.posts
    function navigate(event){
        document.location=event.target.value
    }

    function parseVideos(posts){
        let videos = []
        for(let post of posts){
            videos.push(post.videos)
        }

        return videos
    }

    let latestVideos = parseVideos(data.posts)
    let category1 = parseVideos(data.postsByCategory[0])

    function loadVideo(playlist){
        if(playlist[0][0].type === "YouTubePlaylist"){
           player.loadPlaylist({list:playlist[0][0].id,listType:'playlist',index:0})
        }else{
            player.loadVideoById(playlist[0][0].id)
        }
    }

    function onPlayerReady(event) {
        player.part = 0
        player.playlist = latestVideos 
        loadVideo(latestVideos )
    }

    function onPlayerStateChange(event) {       
        if(event.data === YT.PlayerState.ENDED){
            player.part += 1
            if(player.part === player.playlist.length){
                player.part = 0
            }

            if(player.playlist[player.part][0].type === "YouTubePlaylist"){
                player.loadVideoById(initialVideoId)
                player.loadPlaylist({list:player.playlist[player.part][0].id,listType:'playlist',index:0})
            }else{
                player.loadVideoById(player.playlist[player.part][0].id)
            }
        }
    }

    function onPlayerError(event){
        player.part += 1
        if(player.part === player.playlist.length){
            player.part = 0
        }

        if(player.playlist[player.part][0].type === "YouTubePlaylist"){
            player.loadVideoById(initialVideoId)
            player.loadPlaylist({list:player.playlist[player.part][0].id,listType:'playlist',index:0})
        }else{
            player.loadVideoById(player.playlist[player.part][0].id)
        }
    }

    function changeCategory(playlist, label) {
        player.part = 0
        player.playlist = playlist
        if(playlist[player.part][0].type === "YouTubePlaylist"){
            player.loadVideoById(initialVideoId)
            player.loadPlaylist({list:playlist[0][0].id,listType:'playlist',index:0})
            jq('.latest-video').html(label)
        }else{
            player.loadVideoById(playlist[0][0].id)
            jq('.latest-video').html(label)
        }
    }

    const ytPlayerId = 'youtube-player'
    let player = $state()
    const initialVideoId = 'cdwal5Kw3Fc'

    $effect(() => {
        function load() {
            player = new YT.Player(ytPlayerId, {
                height: '390',
                width: '640',
                videoId: initialVideoId,
                playerVars: {
                    'playsinline': 1,
                    "enablejsapi": 1,
                    "mute": 1,
                    "autoplay": 1,
                    "rel": 0,
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                    'onError': onPlayerError
                }
            })
        }

        window.YT.ready(function() {
            if (window.YT) {
                load()
            } else {
                window.onYouTubeIframeAPIReady = load
            }
        })
    })

</script>

<svelte:head>
    <script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

<section class="main region">
    <div class="feature-post">
        <div class="random-video">
            <span>
                <img alt='' onclick={()=>changeCategory(category1, 'ភាពយន្ត​​​ចុង​ក្រោយ')} src={data.postsByCategory[0][0].thumb} />
                <p class="news-label">ភាពយន្ត​</p>
            </span>
            <span>
                <img alt='' onclick={()=>changeCategory(category1, 'ដើរ​លេង​​​​​ចុង​ក្រោយ')} src={data.postsByCategory[0][0].thumb} />
                <p class="movies-label">ដើរ​លេង</p>
            </span>
            <span>
                <img alt='' onclick={()=>changeCategory(category1, '​ពិភព​និម្មិត​ចុង​ក្រោយ')} src={data.postsByCategory[0][0].thumb} />
                <p class="movies-label">ពិភព​និម្មិត</p>
            </span>
            <span>
                <img alt='' onclick={()=>changeCategory(category1, '​កីឡា​​​ចុង​ក្រោយ')} src={data.postsByCategory[0][0].thumb} />
                <p class="movies-label">កីឡា</p>
            </span>
            <span>
                <img alt='' onclick={()=>changeCategory(category1, 'ឯកសារ​​​​​ចុង​ក្រោយ')} src={data.postsByCategory[0][0].thumb} />
                <p class="movies-label">ឯកសារ</p>
            </span>
            <div class="wrapper">
                <div id={ytPlayerId}></div>
                <div class="latest-video">វីដេអូ​ចុង​ក្រោយ</div>
                <div class="channel-logo">
                <img src="{base}/images/siteLogo.png" alt=''/>
            </div>
            <div class="play-all">
                <a onclick={()=>changeCategory(latestVideos, 'វីដេអូ​ចុងក្រោយ')}>លេង​វីដេអូ​ចុង​ក្រោយ</a>
            </div>
        </div>
    </div>
</section>

<section class="latest">
    <div class="posts">
        {#each posts as post}
            <div class="post">
                <a class="thumb" href="{ base }/post/{post.slug}">
                    <img src={post.thumb} alt='' />
                    {#if post.videos.length>0 }
                    <img class="play-icon" src="{ base }/images/play.png"alt=''/>
                    {/if}
                </a>
                <div class="title-date">
                    <a href="{ base }/post/{post.slug}" class="title">{post.title}</a>
                    <div>{(new Date(post.date)).toLocaleDateString("it-IT")}</div>
                </div>
            </div>
        {/each}
    </div>
    {#if data.pageNumber>=1 }
    <div class="pagination">
        <span>​​​​​​​​​​​​​​​​​​​​​ទំព័រ</span> 
        <select onchange={navigate}> 
        {#each [...Array(data.pageNumber).keys()] as page}
            {#if page+1 == parseInt(data.navPage) }
                <option selected>{page+1}</option>
            {:else}
                <option>{page+1}</option>
            {/if}            
        {/each}	
        </select> 
        <span>នៃ {data.pageNumber}</span>
    </div>
    {/if}
</section>

<style>
.feature-post span img{
    width: 100%;
    float: left;
}
.random-video{
    display: grid;
    grid-template-columns: calc(33.33% - 6.66px) calc(33.33% - 6.66px) calc(33.33% - 6.66px);
    grid-gap: 10px;
    padding: 10px;
    margin-top: 10px;
    background: black;
}
.random-video .wrapper{
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
    position: relative;
    padding-top: 53.4%;
}
.random-video span{
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 53.4%;
}
.random-video span:hover{
    cursor: pointer;
}
.random-video span img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.random-video span p{
    position: absolute;
    top: 0;
    left: 0;
    background: var(--background-dark);
    color: white;
    text-align: center;
    padding: 5px;
    width: 90px;
}

.random-video .latest-video{
    position: absolute;
    top: 5px;
    left: 10px;
    color: orange;
}
.random-video .channel-logo img{
    position: absolute;
    top: 5px;
    right: 5px;
    width: 6%;
}
.random-video .play-all{
    position: relative;
    bottom: 10px;
    text-align: center;
    visibility: hidden;
}
.random-video .play-all a{
    color: orange;
}
.random-video .play-all:hover{
    cursor: pointer;
}
.random-video .wrapper:hover .play-all{
    visibility: visible;
}
.random-video .wrapper #youtube-player{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}


.latest .posts > .post .thumb{
    position: relative;
    padding-top: 56.25%;
    overflow: hidden;
    width: 100%;
}
.latest .posts > .post .thumb img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
}
.latest .posts > .post .thumb .play-icon{
    width: auto;
    min-height: auto;
    width: 15%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}

.latest .posts{
    display: grid;
    grid-template-columns: repeat(2, calc(100% / 2 - 5px));
    grid-gap: 10px;
    padding: 20px 0 0;
}
.latest .posts > .post{
    background:  #dbf188;
    display: grid;
    grid-template-columns: repeat(2, 50%);
}
.latest .posts > .post .title-date{
    padding: 5px;
}
.latest .posts > .post .title-date .title{
    color: black;
}
.latest .pagination{
    text-align: center;
    padding: 20px 0 0;
}
.latest .pagination > span{
    padding: 0 5px;
}

@media only screen and (max-width: 600px){  
    .random-video{
        grid-template-columns: 100%;
    }
    .random-video .wrapper{
        grid-column: 1 / span 1;
        grid-row: 1 / span 1;
    }
    .latest .posts{
        grid-template-columns: 100%;
        padding: 30px 10px 0;
    } 
}
</style>