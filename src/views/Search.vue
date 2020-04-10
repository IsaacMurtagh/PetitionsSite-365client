<template>
    <body class="container">
    <hr>
    <button v-on:click="getAllPetitions">click</button>
        <div class="row">
            <div class="col-1"></div>
<!--            Left Toolbar-->
            <div class="col col-12 col-md-2">
                {{petitions}}
            </div>
<!--            Petition cards-->
            <div class="col col-12 col-md-8">
                <div class="row justify-content-center">
                    <petition-card v-for="petition in petitions" :key="petition.petitionId" :author="petition.authorName"
                                   :title="petition.title" :category="petition.category" :signatures="petition.signatureCount"
                                   :id="petition.petitionId"
                                   style="margin-bottom: 20px">
                    </petition-card>
                </div>
            </div>
            <div class="col-1"></div>
        </div>
    </body>
</template>

<script>
    import PetitionCard from "@/components/PetitionBasicCard";
    import Api from "@/Api";

    export default {
        name: "Search",
        components: {PetitionCard},

        data() {
            return {
                petitions: []
            }
        },

        created() {
            this.getAllPetitions({});
        },

        methods: {
            getAllPetitions (params) {
                Api.getPetitions(params)
                .then(response => {
                    this.$data.petitions = response.data
                })
            }
        }
    }
</script>

<style scoped>

    .col {
        border: solid black 1px;
    }


</style>