<template>
    <body class="card bg-info" style="width: 36rem">

        <div class="card-header">
            <div class="card-title text-center text-light font-weight-bold">{{title}}</div>
        </div>
        <div class="card-body bg-light">
            <div class="card-text" id="category">Category: {{category}}</div>
            <div class="card-text" id="author">Authored by: {{author}}</div>
        </div>
        <img class="card-img-top" :src="image">
        <div class="card-footer text-light">
            <p class="card-text d-inline"  id="sigantures">Signed by {{signatures}} people</p>
            <button class="float-right btn btn-light" id="sign-petition">Rate</button>
        </div>

    </body>
</template>

<script>
    export default {
        name: "PetitionCard",
        props: ["id", "title", "category", "author", "signatures", "image"]
    }
</script>

<style scoped>

</style>