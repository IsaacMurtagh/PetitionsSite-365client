<template>
    <button class="btn btn-secondary delete-button" v-on:click="deletePetition">Delete</button>
</template>

<script>
    import Api from "@/Api";

    export default {
        name: "DeletePetitionButton",
        props: ["petitionId"],

        methods: {
            deletePetition: function() {
                if (confirm("Are you sure you want to permanently delete this petition?")) {
                    Api.deletePetition(this.petitionId)
                    .then(response => {
                        if (response.status === 200) {
                            this.$router.push("/petition")
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .delete-button {
        width: 150px;
    }

</style>