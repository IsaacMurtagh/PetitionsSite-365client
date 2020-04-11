<template>
    <body class="card bg-info" style="width: 36rem">

        <div class="card-header">
            <div class="card-title text-center text-light font-weight-bold">
                <router-link v-bind:to="petitionUrl" class="text-decoration-none text-light">{{title}}</router-link>
            </div>
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
        props: ["id", "title", "category", "author", "signatures", "image"],

        data() {
            return {
                petitionUrl: "/petition/" + this.id
            }
        }
    }


</script>

<style scoped>

</style>