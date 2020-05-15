<template>
    <div class="card mx-auto" @submit.prevent="submitPetition">
        <div class="card-header">
            <div class="text-center">
                <h1>{{modeName}} petition</h1>
                <form class="card-body bg-lightblue">
                    <div v-if="errorMessage" class="alert alert-danger" role="alert">
                        <p >{{ errorMessage }}</p>
                    </div>
                    <div class="row">
                        <!--Title-->
                        <div class="col form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><em class="fa fa-envelope"></em></span>
                            </div>
                            <input type="text" placeholder="Petition Title" id="title" maxlength="255" class="form-group form-control" v-model.lazy="petitionData.title" required>
                        </div>
                    </div>
                    <div class="row">
                        <!--Category-->
                        <div class="col col-12 col-md-6 form-group input-group">
                            <select class="form-control" id="selectCategory" v-on:click="setCategory">
                                <option value="" selected >Select Category</option>
                                <option v-for="category in this.categories" v-bind:key="category.categoryId" :value="category.categoryId">{{category.name}}</option>
                            </select>
                        </div>

                        <!--Date-->
                        <div class="col col-12 col-md-6 form-group input-group">
                            <input type="date" id="closingDate" class="form-group form-control" v-model.lazy="petitionData.closingDate">
                        </div>
                    </div>
                    <!--Description-->
                    <div class="row">
                        <div class="col form-group input-group">
                            <textarea placeholder="Description" id="description" class="form-group form-control" v-model.lazy="petitionData.description"></textarea>
                        </div>
                    </div>
                    <!--Submit category-->
                    <button class="btn btn-info"> {{ modeName }} Petition</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Api from "@/Api";

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
            }
        },

        created() {
            this.initialiseData()
        },

        methods: {
            submitPetition: function() {
                if (!this.editing) { // Creating
                    this.postPetition()
                }
            },

            initialiseData: function() {
                if (this.editing && this.petition) {
                    this.petitionData.title = this.petition.title
                    this.petitionData.description = this.petition.description
                    this.petitionData.closingDate = this.petition.closingDate
                    this.petitionData.categoryId = this.petition.categoryId
                }
            },

            // When mode is create
            postPetition: function() {
                Api.postPetition(this.petitionData)
                .then(response => {
                    if (response.status === 201) {
                        this.errorMessage = ""
                        Api.signPetition(response.data.petitionId)
                        .then(() => {
                            this.$router.push("/petiition")
                        })
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