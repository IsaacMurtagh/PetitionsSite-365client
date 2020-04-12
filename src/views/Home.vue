<template>
    <body class="container">
        <hr>
            <div class="row">
                <div class="col-md-1 col-lg-2"></div>
                <div class="col-12 col-md-10 col-lg-8" id="banner">
                    <h1 class="text-darkblue text-hero" id="hero">{{this.$parent.$data.siteName}}</h1>
                    <p class="text-dark text-hero">{{this.$parent.$data.siteDescription}}</p>
                </div>
                <div class="col-2"></div>
            </div>
        <hr>
    </body>
</template>

<script>
    export default {
        name: "Home",
    }
</script>

<style scoped>

</style>