<!--src/layouts/Menu.astro-->
<script>
let { data } = $props()
let isresponsive = $state(false)

let home = $state('')
let news = $state('')
let opinion = $state('')
let doc = $state('')
let sport = $state('')
let movie = $state('')
let travel = $state('')
let contact = $state('')
let about = $state('')
let game = $state('')
let entertainment = $state('')

if(data.pageURL === '/'){
    home = 'active'
}else if(data.pageURL === 'news'){
    news = 'active'
}else if(data.pageURL === 'opinion'){
  opinion = 'active'
}else if(data.pageURL === 'doc'){
    doc = 'active'
}else if(data.pageURL === 'sport'){
    sport = 'active'
}else if(data.pageURL === 'movie'){
    movie = 'active'
}else if(data.pageURL === 'trvel'){
    travel = 'active'
}else if(data.pageURL === 'contact'){
    contact = 'active'
}else if(data.pageURL === 'about'){
    about = 'active'
}else if(data.pageURL === 'travel'){
    travel = 'active'
}else if(data.pageURL === 'game'){
    game = 'active'
}else if(data.pageURL === 'entertainment'){
  entertainment = 'active'
}

function myFunction() {
  isresponsive = !isresponsive
}

</script>

<section class='menu'>
    <nav class="nav">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <div class="region">
            <div data-sveltekit-reload class="topnav" class:responsive={isresponsive} id="myTopnav">
                <a href="/" class="home {home}">ទំព័រ​ដើម</a>
                <div class="dropdown {news}">
                  <button class={`dropbtn ${news}`}>ព័ត៌មាន
                    <i class="fa fa-caret-down"></i>
                  </button>
                  <div class="dropdown-content">
                    <a href="/">ក្នុង​ប្រទេស</a>
                    <a href="/">ក្រៅ​ប្រទេស</a>
                  </div>
                </div>
                <a href="/" class={`opinion ${opinion}`}>មតិ​យោបល់</a>
                <a href="/" class={`doc ${doc}`}>ឯកសារ</a>
                <a href="/" class={`sport ${sport}`}>កីឡា</a>
                <div class={`dropdown ${movie}`}>
                  <button class={`dropbtn ${movie}`}>ភាពយន្ត
                    <i class="fa fa-caret-down"></i>
                  </button>
                  <div class="dropdown-content">
                    <a href="/">រឿង​ខ្មែរ</a>
                    <a href="/">រឿង​ថៃ</a>
                    <a href="/">រឿង​ចិន</a>
                    <a href="/">រឿង​កូរ៉េ</a>
                    <a href="/">​រឿង​បរទេស</a>
                    <a href="/">​ឥត​ព្រៀង​ទុក</a>
                  </div>
                </div>
                <a href="/" class={`travel ${travel}`}>ដើរ​លេង</a>
                <a href="/" class={`game ${game}`}>ពិភព​និមិ្មត</a>
                <div class={`dropdown ${entertainment}`}>
                  <button class={`dropbtn ${entertainment}`}>កំសាន្ត
                    <i class="fa fa-caret-down"></i>
                  </button>
                  <div class="dropdown-content">
                    <a href="/">មុខ​ម្ហូប</a>
                    <a href="/">របាំតន្ត្រី</a>
                    <a href="/">ល្បែង​កំសាន្ត</a>
                  </div>
                </div>
                <a href="/" class={`contact ${contact}`}>ទំនាក់ទំនង</a>
                <a href="/" class={`about ${about}`}>អំពីយើង​ខ្ញុំ</a>
                <a href="javascript:void(0);" class="icon" onclick={myFunction}>
                    <i class="fa fa-bars"></i>
                </a>
            </div>
        </div>
    </nav>   
</section>

<style>
nav{
    background-color: var(--menu);
}
.topnav {
    background-color: var(--menu);
    overflow: hidden;
}
  .topnav a {
    float: left;
    display: block;
    text-align: center;
    padding: 9px 16px;
    text-decoration: none;
    font-size: 14px;
    color: black;
  }
  .topnav a:hover {
    background-color: rgb(44, 44, 44);
    color: white;
  }
  .topnav a.active, div.active, .dropbtn.active {
    background-color: rgb(44, 44, 44);
    color: white;
  }
  .topnav .icon {
    display: none;
  }
  .dropdown {
    float: left;
    overflow: hidden;
  }
  .dropdown .dropbtn {
  font-size: 14px;
  border: none;
  outline: none;
  padding: 7px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}
.dropdown-content a {
  float: none;
  padding: 9px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}
.topnav a:hover, .dropdown:hover .dropbtn {
  background-color: var(--background-dark);
  color: white;
}
.dropdown-content a:hover {
  background-color: #ddd;
  color: black;
}
.dropdown:hover .dropdown-content {
  display: block;
}

@media screen and (max-width: 600px) {
    .topnav a:not(:first-child), .dropdown .dropbtn{
      display: none;
    }
    .topnav a.icon {
      float: right;
      display: block;
    }
}
  
@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive a.icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
  .topnav.responsive .dropdown {float: none;}
  .topnav.responsive .dropdown-content {position: relative;}
  .topnav.responsive .dropdown .dropbtn {
    display: block;
    width: 100%;
    text-align: left;
  }
}
</style>