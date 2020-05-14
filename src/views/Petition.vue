<template>
    <body class="container">
    <hr>
    <div class="row">
        <div class="col-12 col-lg-7 col-xl-8">
            <petition-full-card v-if="render" v-bind:petition="petition" :petition-image="petitionImage"
                                :user-image="userImage" :signed="signedPetition" :signature-count="signatureCount">
            </petition-full-card>
        </div>
        <div class="col-12 col-lg-5 col-xl-4">
            <div v-for="signature in signatures" v-bind:key="signature.signatoryId" class="row">
                <div class="col-12">
                    <signatories v-bind:signedUser="signature"></signatories>
                </div>
            </div>
        </div>
    </div>
    </body>
</template>

<script>
    import Api from "@/Api";
    import PetitionFullCard from "@/components/PetitionFullCard";
    import Images from "@/utils/Images";
    import Signatories from "@/components/Signatories";

    export default {
        name: "Petition",
        components: {Signatories, PetitionFullCard},
        data() {
            return {
                petitionId: this.$route.params.id,
                petition: {},
                petitionImage: null,
                userImage: null,
                signatures: [],
            }
        },
        computed: {
            render: function () {
                if (this.$data.petition.petitionId != undefined) {
                    return true;
                }
                return false;
            },

            signedPetition: function() {
                const userId = localStorage.getItem("user_id")
                if (userId) {
                    for (let signatory of this.signatures) {
                        if (Number(signatory.signatoryId) === Number(userId)) { // I have signed petition
                            return true
                        }
                    }
                }
                return false
            },

            signatureCount: function() {
                return this.signatures.length
            }
        },

        methods: {
            calculateDetails(city, country) {
                if (country && city) {
                    return ", " + city + ", " + country
                } else if (country) {
                    return ", " + country
                } else if (city) {
                    return ", " + city
                } else {
                    return ""
                }
            },

            getSignatures: function () {
                Api.getSignatures(this.$data.petitionId)
                    .then(response => {
                        if (response.status === 200) {
                            this.$data.signatures = response.data;
                        }
                    });
            }
        },

        created() {
            Api.getPetitionsById(this.$data.petitionId)
                .then(response => {
                    if (response.status === 200) {
                        this.$data.petition = response.data

                        Api.getUserImage(this.$data.petition.authorId)
                            .then(imageResponse => {
                                if (imageResponse.status === 200) {
                                    this.$data.userImage = Images.dataUrl(imageResponse.headers["content-type"], imageResponse.data);
                                }
                            })
                    }
                });

            Api.getPetitionImage(this.$data.petitionId)
                .then(response => {
                    if (response.status === 200) {
                        this.$data.petitionImage = Images.dataUrl(response.headers["content-type"], response.data);
                    }
                });

            this.getSignatures()
        }
    }
</script>

<style scoped>

</style>