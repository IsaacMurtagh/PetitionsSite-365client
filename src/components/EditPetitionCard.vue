<template>
    <div class="card mx-auto" @submit.prevent="submitPetition">
        <div class="card-header">
            <div>
                <h1 class="text-center">{{modeName}} petition</h1>
                <form class="card-body bg-lightblue">
                    <div v-if="errorMessage" class="alert alert-danger text-center" role="alert">
                        <p >{{ errorMessage }}</p>
                    </div>
                    <div class="row">
                        <!--Title-->
                        <div class="col form-group">
                            <label for="title">Title *</label>
                            <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><em class="fa fa-envelope"></em></span>
                            </div>
                            <input type="text" placeholder="Petition Title" id="title" maxlength="255" class="form-group form-control" v-model.lazy="petitionData.title" required>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <!--Category-->
                        <div class="col col-12 col-md-6 form-group">
                            <label for="selectCategory">Category *</label>
                            <select class="form-control" id="selectCategory" v-on:click="setCategory" ref="selectCategory" required>
                                <option value="" selected >Select Category</option>
                                <option v-for="category in this.categories" v-bind:key="category.categoryId" :value="category.categoryId">{{category.name}}</option>
                            </select>
                        </div>

                        <!--Date-->
                        <div class="col col-12 col-md-6 form-group">
                            <label for="closingDate">Closing date</label>
                            <input type="date" id="closingDate" class="form-control" v-model.lazy="petitionData.closingDate">
                        </div>
                    </div>
                    <!--Description-->
                    <div class="row">
                        <div class="col form-group">
                            <label for="description">Description *</label>
                            <textarea placeholder="Description" id="description" class="form-group form-control" v-model.lazy="petitionData.description" required></textarea>
                        </div>
                    </div>
                    <!--Submit category-->
                    <div class="row">
                        <button class="btn btn-info mx-auto w-25"> {{ modeName }} Petition</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Api from "@/Api";
    const moment = require('moment')

    export default {
        name: "EditPetitionCard",
        props: ["editing", "petition", "categories", "petitionImage"],
        data() {
            return {
                petitionData: {
                    title: null,
                    description: null,
                    categoryId: null,
                    closingDate: null
                },
                petitionErrorMessages: {
                    title: "",
                    description: "",
                    categoryId: "",
                    closingDate: ""
                },
                errorMessage: ""
            }
        },

        computed: {
            modeName: function() {
                if (this.editing) {
                    return "Edit"
                }
                return "Create"
            },

            categoryId: function() {
                return this.petitionData.categoryId
            }
        },

        created() {
            this.initialiseData()
        },

        methods: {
            submitPetition: function() {
                if (!this.editing) { // Creating
                    this.postPetition()
                } else {
                    this.editPetition()
                }
            },

            initialiseData: function() {
                if (this.editing && this.petition) {
                    this.petitionData.title = this.petition.title
                    this.petitionData.description = this.petition.description
                    if (this.petition.closingDate) {
                        this.petitionData.closingDate = moment(this.petition.closingDate).format("YYYY-MM-DD")
                    }
                }
            },

            composeBody: function() {
                let body = {};
                body.title = this.petitionData.title;
                body.categoryId = this.petitionData.categoryId;
                body.description = this.petitionData.description;
                if (this.petitionData.closingDate) {
                    body.closingDate = this.petitionData.closingDate;
                }

                return body
            },

            // When mode is create
            postPetition: function() {
                Api.postPetition(this.composeBody())
                .then(response => {
                    if (response.status === 201) {
                        this.errorMessage = ""
                        Api.signPetition(response.data.petitionId)
                        .then(() => {
                            this.$router.push("/petition")
                        })
                    } else {
                        this.errorMessage = response.statusText
                    }
                })
            },

            // When mode is create
            editPetition: function() {
                console.log("hello")
                Api.editPetition(this.composeBody(), this.petition.petitionId)
                    .then(response => {
                        if (response.status === 200) {
                            this.errorMessage = ""
                            this.$router.push("/petition")
                        } else {
                            this.errorMessage = response.statusText
                        }
                    })
            },

            setCategory() {
                const e = document.getElementById("selectCategory");
                const value = e.options[e.selectedIndex].value;
                this.petitionData.categoryId = Number(value);
            },
        }

    }
</script>

<style scoped>

    .card {
        width: 70%;
    }

    textarea {
        min-height: 200px;
    }

</style>