<template>
    <div class="card bg-info" style="width: auto">
        <div class="card-header">
            <h1 class="card-title text-center text-light font-weight-bold">{{petition.title}}</h1>
        </div>
        <img class="card-img-top petition-image" v-bind:src="petitionImage">

        <div class="card-body bg-light">
            <h4 class="card-text" id="category">{{petition.category}}</h4>
            <div class="d-flex">
                <div>
                    <img v-if="userImage" class="profile-image" v-bind:src="userImage">
                    <img v-else class="profile-image" src="../../assets/defaultprofile.png">
                </div>
                <div class="">
                    <h5 class="card-text text-darkblue d-inline align-middle" id="author">By {{petition.authorName}}{{userDetails}}</h5>
                    <span class="d-block small">{{openDate}}</span>
                    <span class="d-block small">{{closeDate}}</span>
                </div>
            </div>
        </div>

        <div class="card-body bg-lightblue">
            <div class="card-text" id="description">{{petition.description}}</div>
        </div>

        <div class="card-footer text-light">
            <p class="card-text d-inline"  id="sigantures">Signed by {{signatureCount}} people</p>
            <div class="float-right">
                <delete-petition-button v-if="isAuthor" :petition-id="petitionId"></delete-petition-button>
                <sign-petition-button v-if="!isAuthor" :petition-id="petitionId" :signed="signed"></sign-petition-button>
                <edit-petition-button class="d-inline ml-2" v-else-if="canEdit" :petition="petition" :petition-image="petitionImage"></edit-petition-button>
            </div>
        </div>

    </div>
</template>

<script>
    import SignPetitionButton from "@/components/PetitionPage/SignPetitionButton";
    import EditPetitionButton from "@/components/PetitionPage/EditPetitionButton";
    import DeletePetitionButton from "@/components/PetitionPage/DeletePetitionButton";
    const moment = require('moment')

    export default {
        name: "PetitionFullCard",
        components: {DeletePetitionButton, EditPetitionButton, SignPetitionButton},
        props: [ "petition", "petitionImage", "userImage", "signed", "signatureCount", "isAuthor"],

        data() {
            return {
                "petitionId": this.petition.petitionId,
                "title": this.petition.title,
                "category": this.petition.category,
                "description": this.petition.description,
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
                if (this.petition.closingDate) {
                    if (Date.parse(this.petition.closingDate) > moment.now()){ // Future tense
                        return "Closes on: " + moment(this.petition.closingDate).format('LLLL')
                    } else { // Passed tense
                        return "Closed on: " + moment(this.petition.closingDate).format('LLLL')
                    }
                } else {
                    return "Closing date is undecided"
                }
            },

            canEdit: function () {
                return this.isAuthor && (
                    !this.petition.closeDate ||
                    Date.parse(this.petition.closingDate) > moment.now()
                )
            },
        }
    }
</script>

<style scoped>

    .petition-image {
        max-width: 100%;
        max-height: 600px;
    }

    .profile-image {
        max-width: 80px;
        max-height: 80px;
        margin-right: 10px;
    }

</style>