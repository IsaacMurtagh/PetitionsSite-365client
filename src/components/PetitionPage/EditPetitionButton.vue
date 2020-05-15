<template>
    <div>
        <router-link :to="this.routeLink" class="btn btn-outline-light edit-button" id="sign-petition">
            Edit
        </router-link>
    </div>

</template>

<script>
    export default {
        name: "EditPetitionButton",
        props: ["petition", "petitionImage"],
        computed: {
            routeLink: function() {
                return {
                    name: "edit",
                    params: {
                        petition: this.petition,
                        petitionImage: this.petitionImage
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .edit-button {
        width: 150px;
    }

</style>