<template>
    <body class="container">
    <hr>
    <petition-full-card v-if="render" v-bind:petition="petition"></petition-full-card>
    <h2 v-if="!render">Not found</h2>
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
        computed: {
            render: function () {
                if (this.$data.petition.petitionId != undefined) {
                    return true;
                } else {
                    return false;
                }
            }
        },

        created() {
            Api.getPetitionsById(this.$data.petitionId)
                .then(response => {
                    if(response){
                        this.$data.petition = response.data
                    }
                })
        }
    }
</script>

<style scoped>

</style>