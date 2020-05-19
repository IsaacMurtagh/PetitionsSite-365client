<template>
    <body class="container">
    <hr>
        <div class="row">
    <!--            Left Toolbar-->
            <div class="col col-12 col-md-3">
                <advanced-search-bar v-bind:categories="categories" :current-page="currentPage"></advanced-search-bar>
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
                categories: [],
                numPetitions: null
            }
        },

        computed: {
            query: function() {
                return this.$route.query
            },

            currentPage: function() {
                if (this.query.count && this.query.startIndex) {
                    return Math.floor(this.query.count / this.query.startIndex) + 1
                } else {
                    return 1
                }
            }
        },

        watch: {
            query: function() {
                this.getNumPetitions(this.query);
                this.getAllPetitions(this.query);
            }
        },

        created() {
            this.getNumPetitions(this.$route.query);
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

            getNumPetitions(params) {
                let newParams = JSON.parse(JSON.stringify(params)); // Deep copy
                console.log(newParams)
                delete newParams.count;
                delete newParams.startIndex;
                Api.getPetitions(newParams)
                    .then(response => {
                        if (response.status == 200) {
                            this.numPetitions = response.data.length
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