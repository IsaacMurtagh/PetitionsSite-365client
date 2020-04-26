<template>
    <body class="card">
        <div class="card-body m-auto">
            <div class="image">
                <img class="rounded-circle img-fluid mx-auto d-block" v-if="image.url" v-bind:src="image.url">
                <img class="mx-auto d-block" v-else src="../assets/defaultprofile.png">
            </div>

            <!--Upload image [edit only]-->
            <div v-if="editing" class="form-group input-group">
                <div class="custom-file">
                    <input type="file" id="profileImage" class="custom-file-input" v-on:change="uploadFile">
                    <label class="custom-file-label" for="profileImage">{{image.imageName}}</label>
                </div>
            </div>


            <!--Name-->
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><em class="fa fa-user"></em></span>
                </div>
                <input v-if="editing" type="text" placeholder="Edit Name" id="editName" maxlength="255" class="form-group form-control" v-model.lazy="user.name">
                <input v-else type="text" disabled placeholder="Name" id="name" maxlength="255" class="form-group form-control" v-model.lazy="user.name">
            </div>

            <!--Name-->
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><em class="fa fa-envelope"></em></span>
                </div>
                <input v-if="editing" type="email" placeholder="Edit Email" id="editEmail" maxlength="255" class="form-group form-control" v-model.lazy="user.email">
                <input v-else type="email" disabled placeholder="Email" id="email" maxlength="255" class="form-group form-control" v-model.lazy="user.email">
            </div>

            <!--City-->
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><em class="fa fa-building"></em></span>
                </div>
                <input v-if="editing" type="text" placeholder="Edit City" id="editCity" maxlength="255" class="form-group form-control" v-model.lazy="user.city">
                <input v-else type="text" disabled placeholder="No city specified" id="city" maxlength="255" class="form-group form-control" v-model.lazy="user.city">
            </div>

            <!--Country-->
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><em class="fa fa-globe"></em></span>
                </div>
                <input v-if="editing" type="text" placeholder="Edit Country" id="editCountry" maxlength="255" class="form-group form-control" v-model.lazy="user.country">
                <input v-else type="text" disabled placeholder="No country specified" id="country" maxlength="255" class="form-group form-control" v-model.lazy="user.country">
            </div>

            <!--Edit button-->
            <div v-if="!editing" class="form-group input-group">
               <button class="btn btn-info btn-block m-1" v-on:click="editing = true">Edit</button>
            </div>
            <div v-else class="form-group input-group">
                <button class="btn btn-success d-inline flex-fill m-1">Save Changes</button>
                <button class="btn btn-outline-danger d-inline flex-fill m-1" v-on:click="discardChanges">Discard Changes</button>
            </div>

        </div>
    </body>
</template>

<script>
    export default {
        name: "ProfileCard",
        props: ["profile"],

        data() {
            return {
                user: {
                    name: this.profile.name,
                    email: this.profile.email,
                    city: this.profile.city,
                    country: this.profile.country,
                },
                editing: false,
                "imageSet": false,
                "image": {
                    "file": null,
                    "imageName": "Upload profile image",
                    "type": null,
                    "url": false
                }
            }
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

            checkProfileUpload() {
                if (!this.imageSet) {
                    this.resetInput("profileImage")
                    this.image.url = null;
                    return true
                } else if (this.image.type !== "image/png") {
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
                if (e.target.files.length > 0) {
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

                this.checkProfileUpload();
            },

            discardChanges() {
                this.user = {
                    name: this.profile.name,
                    email: this.profile.email,
                    city: this.profile.city,
                    country: this.profile.country,
                }
                this.editing = false
            }
        }

    }
</script>

<style scoped>
    .card {
        border: 1px black solid;
    }

    img {
        height: auto;
        width: 200px;
        padding: 2px;
        margin-bottom: 10px;
    }


</style>