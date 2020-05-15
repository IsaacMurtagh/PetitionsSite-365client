<template>
    <body class="container">
    <edit-petition-card :categories="categories"></edit-petition-card>
    </body>
</template>

<script>
    import EditPetitionCard from "@/components/EditPetitionCard";
    import Api from "@/Api";
    export default {
        name: "CreatePetition",
        components: {EditPetitionCard},
        data() {
            return {
                categories: []
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