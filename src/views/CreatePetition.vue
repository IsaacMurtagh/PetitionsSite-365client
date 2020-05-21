<template>
    <body class="container">
    <hr>
    <edit-petition-card :categories="categories" :petition="petition"
                        :petitionImage="petitionImage" :editing="editing">
    </edit-petition-card>
    </body>
</template>

<script>
    import EditPetitionCard from "@/components/EditPetitionCard";
    import Api from "@/Api";
    export default {
        name: "CreatePetition",
        components: {EditPetitionCard},
        props: ["petition", "petitionImage"],
        data() {
            return {
                categories: []
            }
        },

        computed: {
            editing: function () {
                return this.petition !== undefined
            }
        },

        created() {
            this.getAllCategories()
        },

        methods: {
            getAllCategories() {
                Api.getCategories()
                    .then(response => {
                        if (response.status === 200) {
                            this.categories = response.data
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>