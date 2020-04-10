<template>
    <body class="card bg-info" style="width: auto">

    <div class="card-header">
        <h1 class="card-title text-center text-light font-weight-bold">{{title}}</h1>
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
        name: "PetitionFullCard",
        props: [
            "petitionId",
            "title",
            "category",
            "description",
            "signatures",
            "petitionImage",
            "authorId",
            "authorName",
            ]
    }
</script>

<style scoped>

</style>