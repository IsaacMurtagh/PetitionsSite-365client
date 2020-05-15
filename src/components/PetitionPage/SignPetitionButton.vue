<template>
    <div>
        <button v-if="!signed" v-on:click="makeRequest" class="btn btn-light">{{ notSignedText }}</button>
        <button v-else v-on:click="makeRequest" class="btn btn-secondary"
        v-on:mouseover="haveSignedText = 'Maybe not...'"
        v-on:mouseleave="haveSignedText = 'I slap that!'">{{ haveSignedText }}</button>
    </div>
</template>

<script>
    import Api from "@/Api";

    export default {
        name: "SignPetitionButton",
        props: ["signed", "petitionId"],
        data() {
            return {
                haveSignedText: "I slap that!",
                notSignedText: "Slap that!"
            }
        },

        methods: {
            makeRequest: function() {
                if (!this.signed) { // Have not signed the petition
                    Api.signPetition(this.petitionId)
                    .then(response => {
                        if (response.status === 201) {
                            this.$parent.$parent.getSignatures();
                        }
                    })
                } else {
                    Api.deleteSignature(this.petitionId)
                        .then(response => {
                            if (response.status === 200) {
                                this.$parent.$parent.getSignatures();
                            }
                        })
                }
            }
        }
    }

</script>

<style scoped>

    button {
        width: 150px;
    }
</style>