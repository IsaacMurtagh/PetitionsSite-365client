<template>
    <body class="card bg-info" style="width: auto">

        <div class="card-header">
            <h1 class="card-title text-center text-light font-weight-bold">{{petition.title}}</h1>
        </div>

        <img class="card-img-top petition-image" v-bind:src="petitionImage">

        <div class="card-body bg-light">
            <h4 class="card-text" id="category">{{petition.category}}</h4>
            <img v-if="userImage != ''" class="profile-image" v-bind:src="userImage">
            <img v-else class="profile-image" src="../assets/defaultprofile.png">
            <h5 class="card-text text-darkblue d-inline align-middle" id="author">By {{petition.authorName}}{{userDetails}}</h5>
            <span class="d-block small">{{openDate}}</span>
            <span class="d-block small">{{closeDate}}</span>
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
    const moment = require('moment')

    export default {
        name: "PetitionFullCard",
        props: [ "petition", "petitionImage", "userImage" ],

        data() {
            return {
                "petitionId": this.petition.petitionId,
                "title": this.petition.title,
                "category": this.petition.category,
                "description": this.petition.description,
                "signatures": this.petition.signatureCount,
                "country": this.petition.authorCountry,
                "city": this.petition.authorCity,
            }
        },

        computed: {
            userDetails: function () {
                return this.$parent.calculateDetails(this.city, this.country)
            },

            openDate: function () {
                return "Created on: " + moment(this.petition.createdDate).format('LLLL')
            },

            closeDate: function () {
                console.log(moment.now())
                console.log(Date.parse(this.petition.closingDate))
                if (this.petition.closingDate) {
                    if (Date.parse(this.petition.closingDate) > moment.now()){ // Future tense
                        return "Closes on: " + moment(this.petition.closingDate).format('LLLL')
                    } else { // Passed tense
                        return "Closed on: " + moment(this.petition.closingDate).format('LLLL')
                    }
                } else {
                    return "Closing date is undecided"
                }
            }
        }
    }
</script>

<style scoped>

    .petition-image {
        max-width: 100%;
        max-height: 750px;
    }

    .profile-image {
        max-width: 60px;
        max-height: 60px;
        margin-right: 10px;
    }

</style>