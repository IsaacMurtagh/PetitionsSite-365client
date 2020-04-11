<template>
    <body class="card bg-info" style="width: auto">

    <div class="card-header">
        <h1 class="card-title text-center text-light font-weight-bold">{{petition.title}}</h1>
    </div>
    <img class="card-img-top" :src="image">
    <div class="card-body bg-light">
        <h4 class="card-text" id="category">{{petition.category}}</h4>
        <h5 class="card-text text-darkblue" id="author">By {{petition.authorName}}, {{petition.authorCity}}, {{petition.authorCountry}}</h5>
    </div>
    <div class="card-body bg-lightblue">
        <div class="card-text" id="description">{{petition.description}}</div>
    </div>
    <div class="card-footer text-light">
        <p class="card-text d-inline"  id="sigantures">Signed by {{petition.signatureCount}} people</p>
        <button class="float-right btn btn-light" id="sign-petition">Rate</button>
    </div>

    </body>
</template>

<script>
    export default {
        name: "PetitionFullCard",
        props: [ "petition" ],

        data() {
            return {
                "petitionId": this.petition.petitionId,
                "title": this.petition.title,
                "category": this.petition.category,
                "description": this.petition.description,
                "signatures": this.petition.signatureCount,

            }
        }
    }
</script>

<style scoped>

    .bg-lightblue {
        background: #D1FFE7;
    }

</style>