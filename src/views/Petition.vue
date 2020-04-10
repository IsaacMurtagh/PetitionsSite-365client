<template>
    <body class="container">
    <hr>
    <petition-full-card v-bind:title="petition.title" :category="petition.category"></petition-full-card>
    </body>
</template>

<script>
    import Api from "@/Api";
    import PetitionFullCard from "@/components/PetitionFullCard";

    export default {
        name: "Petition",
        components: {PetitionFullCard},
        data() {
            return {
                petitionId: this.$route.params.id,
                petition: {}
            }
        },

        created() {
            Api.getPetitionsById(this.$data.petitionId)
                .then(response => {
                    this.$data.petition = response.data
                })
        }
    }
</script>

<style scoped>

</style>