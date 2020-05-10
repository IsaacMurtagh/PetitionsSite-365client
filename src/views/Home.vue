<template>
    <div >
        <div id="cloud-container" class="gradiant-background">
        </div>
        <div class="container">
            <div class="row" id="padding">

            </div>
            <hr>
            <div class="row">
                <div class="col" id="banner">
                    <h1 class="text-darkblue text-hero" id="hero">{{this.$parent.$data.siteName}}</h1>
                    <p class="text-dark text-hero">{{this.$parent.$data.siteDescription}}</p>
                </div>
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
    }
</script>

<style scoped>
    [v-cloak] {
        display: none;
    }

    .gradiant-background {
        background-image: linear-gradient(#17a2b8 20%, white 100%);
        z-index: -1;
    }

    #cloud-container{
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        width: XXXpx; /*otherwise div defaults to page width*/
        margin: 0 auto; /*horizontally centers div*/
    }
    #padding {
        padding-bottom: 100px;
    }

</style>