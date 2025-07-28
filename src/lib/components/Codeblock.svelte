<script>
let { children } = $props()
</script>

<section class="Code region">
    {@render children()}
</section>

<style>
:global(.Code pre){
    background: white;
    padding: 10px 15px;
}
</style>