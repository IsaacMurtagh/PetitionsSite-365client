<template>
    <div class="container">
        <hr>
        <div class="row">
<!--            Side bar-->
            <div class="col col-sm-12 col-md-4">
                <div class="card">
                    <div class="card-body">
                        <button class="btn btn-info btn-block">My Petitions</button>
                        <router-link to="/create" class="btn btn-outline-info btn-block">Create Petition</router-link>
                    </div>
                </div>
            </div>
<!--            My petitions-->
            <div class="col col-sm-12 col-md-8">
                <div class="card">
                    <div class="card-header text-center">
                        <h1 class="card-text">My Petitions</h1>
                    </div>
                    <div class="card-body">
                        <div class="row justify-content-center">
                            <petition-card v-for="petition in petitions" :key="petition.petitionId" :author="petition.authorName"
                                           :title="petition.title" :category="petition.category" :signatures="petition.signatureCount"
                                           :id="petition.petitionId">
                            </petition-card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Api from "@/Api";
    import PetitionCard from "@/components/PetitionPage/PetitionBasicCard";

    export default {
        name: "PetitionsDashboard",
        components: {PetitionCard},
        data() {
            return {
                userId: localStorage.getItem("user_id"),
                petitions: []
            }
        },

        created() {
            this.getAllPetitions()
        },

        methods: {
            getAllPetitions: function() {
                const params = {"authorId": this.userId}
                Api.getPetitions(params)
                    .then(response => {
                        if (response.status === 200) {
                            this.petitions = response.data
                        }
                    })
            },
        }
    }
</script>

<style scoped>

</style>