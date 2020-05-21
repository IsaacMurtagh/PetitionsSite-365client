<template>
    <div class="card mx-auto mt-2" @submit.prevent="submitPetition">
        <div class="card-header">
            <div>
                <h1 class="text-center text-darkblue">{{modeName}} petition</h1>
                <form class="card-body bg-lightblue">
                    <div v-if="errorMessage" class="alert alert-danger text-center" role="alert">
                        <p>{{ errorMessage }}</p>
                    </div>

                    <div class="row">
                        <!--Profile Image-->
                        <div class="col image">
                            <img class="mx-auto w-100 mb-2" v-if="image.url" v-bind:src="image.url">
                        </div>

                        <!--Upload image [edit only]-->
                        <div class="form-group input-group">
                            <div class="custom-file">
                                <input type="file" id="profileImage" class="custom-file-input" v-on:change="uploadFile">
                                <label class="custom-file-label" for="profileImage">{{image.imageName}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <!--Title-->
                        <div class="col form-group">
                            <label for="title">Title *</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><em class="fa fa-envelope"></em></span>
                                </div>
                                <input type="text" placeholder="Petition Title" id="title" maxlength="255"
                                       class="form-group form-control" v-model.lazy="petitionData.title" required>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <!--Category-->
                        <div class="col col-12 col-md-6 form-group">
                            <label for="selectCategory">Category *</label>
                            <select class="form-control" id="selectCategory" v-on:click="setCategory"
                                    ref="selectCategory" required>
                                <option value="" selected>Select Category</option>
                                <option v-for="category in this.categories" v-bind:key="category.categoryId"
                                        :value="category.categoryId">{{category.name}}
                                </option>
                            </select>
                        </div>

                        <!--Date-->
                        <div class="col col-12 col-md-6 form-group">
                            <label for="closingDate">Closing date</label>
                            <input type="date" id="closingDate" class="form-control"
                                   v-model.lazy="petitionData.closingDate">
                        </div>
                    </div>
                    <!--Description-->
                    <div class="row">
                        <div class="col form-group">
                            <label for="description">Description *</label>
                            <textarea placeholder="Description" id="description" class="form-group form-control"
                                      v-model.lazy="petitionData.description" required></textarea>
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
    import Validation from "@/utils/Validation";
    import Images from "@/utils/Images";

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
                errorMessage: "",
                imageSet: false,
                image: {
                    file: null,
                    imageName: "Upload profile image",
                    type: null,
                    url: this.petitionImage
                },
                petitionId: null
            }
        },

        computed: {
            modeName: function () {
                if (this.editing) {
                    return "Edit"
                }
                return "Create"
            },

            categoryId: function () {
                return this.petitionData.categoryId
            }
        },

        created() {
            this.initialiseData()
        },

        methods: {
            successfulInput(elementId) {
                const element = document.getElementById(elementId);
                element.classList.add("is-valid");
                element.classList.remove("is-invalid")
            },

            unsuccessfulInput(elementId) {
                const element = document.getElementById(elementId);
                element.classList.add("is-invalid");
                element.classList.remove("is-valid");
            },

            resetInput(elementId) {
                const element = document.getElementById(elementId);
                element.classList.remove("is-invalid");
                element.classList.remove("is-valid");
            },

            checkUpload() {
                if (!this.imageSet && !this.profileImage) {
                    this.unsuccessfulInput("profileImage");
                    this.image.url = null;
                    return false
                } else if (!this.imageSet) {
                    this.resetInput("profileImage")
                    this.image.url = this.profileImage;
                    return true
                } else if (!Validation.validImage(this.image.type)) {
                    this.unsuccessfulInput("profileImage");
                    this.image.url = null;
                    return false
                } else {
                    this.successfulInput("profileImage");
                    this.image.url = URL.createObjectURL(this.image.file);
                    return true
                }
            },

            uploadFile(e) {
                if (e != null && e.target.files.length > 0) {
                    const file = e.target.files[0]
                    this.imageSet = true;
                    this.image.file = file;
                    this.image.imageName = file.name;
                    this.image.type = file.type

                } else { // Reset values
                    this.imageSet = false;
                    this.image.file = null;
                    this.image.url = null;
                    this.image.type = null;
                    this.image.imageName = "Upload profile image"
                }

                this.checkUpload();
            },

            submitPetition() {
                if (this.checkUpload()) {
                    if (!this.editing) { // Creating
                        this.postPetition()
                    } else {
                        this.editPetition()
                    }
                }
            },

            initialiseData() {
                if (this.editing && this.petition) {
                    this.petitionData.title = this.petition.title
                    this.petitionData.description = this.petition.description
                    if (this.petition.closingDate) {
                        this.petitionData.closingDate = moment(this.petition.closingDate).format("YYYY-MM-DD")
                    }
                    this.petitionId = this.petition.petitionId
                }
            },

            composeBody() {
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
            postPetition() {
                Api.postPetition(this.composeBody())
                    .then(response => {
                        if (response.status === 201) {
                            this.petitionId = response.data.petitionId
                            this.errorMessage = ""
                            Api.signPetition(response.data.petitionId)
                                .then(() => {
                                    this.postPetitionImage()
                                })
                        } else {
                            this.errorMessage = response.statusText
                        }
                    })
            },

            // When mode is create
            editPetition() {
                console.log("hello")
                Api.editPetition(this.composeBody(), this.petition.petitionId)
                    .then(response => {
                        if (response.status === 200) {
                            this.postPetitionImage()
                        } else {
                            this.errorMessage = response.statusText
                        }
                    })
            },

            postPetitionImage() {
                Images.convertBlobToBase64(this.image.file)
                    .then(data => {
                        Api.uploadPetitionImage(this.petitionId, data, this.image.type)
                            .then(response => {
                                if (response.status === 200 || response.status === 201) {
                                    this.$router.push("/petition")
                                } else {
                                    this.errorMessage = response.statusText
                                }
                            })
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

    .image {
        max-width: 100%;
    }

</style>