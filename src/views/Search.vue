<template>
    <body class="container">
    <hr>
        <div class="row">
    <!--            Left Toolbar-->
            <div class="col col-12 col-md-3">
                <advanced-search-bar v-bind:categories="categories"></advanced-search-bar>
            </div>

    <!--            Petition cards-->
            <div class="col col-12 col-md-7">
                <div class="row justify-content-center">
                    <petition-card v-for="petition in petitions" :key="petition.petitionId" :author="petition.authorName"
                                   :title="petition.title" :category="petition.category" :signatures="petition.signatureCount"
                                   :id="petition.petitionId"
                                   style="margin-bottom: 20px">
                    </petition-card>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
    import PetitionCard from "@/components/PetitionBasicCard";
    import Api from "@/Api";
    import AdvancedSearchBar from "@/components/AdvancedSearchBar";

    export default {
        name: "Search",
        components: {AdvancedSearchBar, PetitionCard},

        data() {
            return {
                petitions: [],
                categories: []
            }
        },

        computed: {
            query: function() {
                return this.$route.query
            }
        },

        watch: {
            query: function() {
                this.getAllPetitions(this.query);
            }
        },

        created() {
            this.getAllPetitions(this.$route.query);
            this.getAllCategories();
        },

        methods: {
            getAllPetitions (params) {
                Api.getPetitions(params)
                .then(response => {
                    if (response.status == 200) {
                        this.petitions = response.data
                    }
                })
            },

            getAllCategories() {
                Api.getCategories()
                .then(response => {
                    if (response.status == 200) {
                        this.$data.categories = response.data
                    }
                })
            }
        }
    }
</script>

<style scoped>



</style>