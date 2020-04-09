<template>
    <body class="container">
    <hr>
        <div class="row">
            <div class="col-md-1 col-lg-2"></div>
            <div class="col-12 col-md-10 col-lg-8" id="banner">
                <h1 class="text-darkblue hero" id="hero">{{this.$parent.$data.siteName}}</h1>
                <p class="text-dark hero">{{this.$parent.$data.siteDescription}}</p>
            </div>
            <div class="col-2"></div>
        </div>
    <hr>
    <petition-card></petition-card>
    </body>
</template>

<script>
    import PetitionCard from "@/components/PetitionCard";
    export default {
        name: "Home",
        components: {PetitionCard}
    }
</script>

<style scoped>

    #banner {
        padding-top: 30px;
        padding-bottom: 30px;
        /*border: solid black 1px;*/
    }

    .hero {
        margin-right: auto;
        margin-left: auto;
        text-align: center;
    }
</style>