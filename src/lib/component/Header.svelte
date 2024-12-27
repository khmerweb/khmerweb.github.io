<!--src/lib/component/Header.svelte-->
<script>
    import { base } from '$app/paths'
    let { data } = $props()
    let date = $state('')

    function startTime() {
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        date =  h + ":" + m + ":" + s;
        setTimeout(startTime, 1000);
    }

    function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }

    $effect(() => (
        startTime()
    ))
</script>

<svelte:head>
    <title>{ data.title }</title>
    <link href="{base}/images/siteLogo.png" rel="icon" />
	<link href="{base}/fonts/setup.css" rel="stylesheet" />
	<link href="{base}/styles/base-frontend.css" rel="stylesheet" />
</svelte:head>

<link href="{base}/styles/base-frontend.css" rel="stylesheet" />
<section class="header">
    <header class='wrapper region'>
        <div class='logo'>
            <a href='{base}/'><img src='{base}/images/siteLogo.png' alt='' /></a>
            <a href='{base}/'>{ data.settings.siteTitle }</a>
        </div>
        <form class='search' action="{base}/search?/search" method="post">
            <select name='category'>
                <option>ទាំងអស់</option>
            </select>
            <input type='text' name='q' placeholder='សរសេរ​ពាក្យ​ត្រូវ​ស្វែងរក...' required />
            <input type='submit' value='ស្វែងរក' /> 
        </form>
        <div class='login'>
            {date}
        </div>
    </header>
</section>

<style>
    .header{
        background: var(--background-dark);
    }
    .wrapper{
        display: grid;
        grid-template-columns: auto auto 20%;
        align-items: center;
        padding: 10px 0;
    }
    .wrapper .logo{
        display: grid;
        grid-template-columns: 60px auto;
        align-items: center;
        grid-gap: 10px;
    }
    .wrapper .logo img{
        width: 60px;
    }
    .wrapper .logo a{
        font: 40px/1.5 StardosStencul, Limonf3;
        color: white;
    }
    .wrapper .search{
        display: grid;
        grid-template-columns: 70px auto 15%;
    }
    .wrapper .search input, .wrapper .search select{
        font: var(--body-font);
    }
    .wrapper .search [name='q']{
        padding: 0 5px;
    }
    .wrapper .login{
        text-align: right;
        color: white;
        font-size: 20px;
    }

    @media only screen and (max-width: 600px){
        .wrapper{
            grid-template-columns: 100%;
            padding: 0 10px;
            text-align: center;
        }
        .wrapper .logo{
            grid-template-columns: 100%;
        }
        .wrapper .login{
            text-align: center;
            padding: 10px 0;
        }
    }
</style>