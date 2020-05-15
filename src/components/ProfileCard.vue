<template>
    <body class="card">
    <div v-if="profile" class="card-body m-auto">
        <!--success Message-->
        <div v-if="successMessage" class="alert alert-success text-center">
            <p>{{successMessage}}</p>
        </div>

        <!--error Message-->
        <div v-if="errorMessage" class="alert alert-danger text-center">
            <p>{{errorMessage}}</p>
        </div>

        <!--Profile Image-->
        <div class="image">
            <img class="mx-auto d-block" v-if="image.url" v-bind:src="image.url">
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
            <input v-if="editing" type="text" placeholder="Edit Name" id="editName" maxlength="255"
                   class="form-group form-control" v-model.lazy="user.name">
            <input v-else type="text" disabled placeholder="Name" id="name" maxlength="255"
                   class="form-group form-control" v-model.lazy="user.name">
        </div>

        <!--Name-->
        <div class="form-group input-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><em class="fa fa-envelope"></em></span>
            </div>
            <input v-if="editing" type="email" placeholder="Edit Email" id="editEmail" maxlength="255"
                   class="form-group form-control" v-model.lazy="user.email">
            <input v-else type="email" disabled placeholder="Email" id="email" maxlength="255"
                   class="form-group form-control" v-model.lazy="user.email">
        </div>

        <!--City-->
        <div class="form-group input-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><em class="fa fa-building"></em></span>
            </div>
            <input v-if="editing" type="text" placeholder="Edit City" id="editCity" maxlength="255"
                   class="form-group form-control" v-model.lazy="user.city">
            <input v-else type="text" disabled placeholder="No city specified" id="city" maxlength="255"
                   class="form-group form-control" v-model.lazy="user.city">
        </div>

        <!--Country-->
        <div class="form-group input-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><em class="fa fa-globe"></em></span>
            </div>
            <input v-if="editing" type="text" placeholder="Edit Country" id="editCountry" maxlength="255"
                   class="form-group form-control" v-model.lazy="user.country">
            <input v-else type="text" disabled placeholder="No country specified" id="country" maxlength="255"
                   class="form-group form-control" v-model.lazy="user.country">
        </div>

        <!--Edit password-->
        <div v-if="editing">
            <div class="form-group input-group">
                <button class="btn btn-primary btn-block" data-toggle="collapse" href="#changePassword"
                        v-on:click="resetChangePassword">Change Password
                </button>
            </div>
            <div id="changePassword" class="collapse">
                <!--Current password-->
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><em class="fa fa-key"></em></span>
                    </div>
                    <input class="form-control" ref="currentPassword"
                           v-bind:type="showPassword.currentPassword ? 'text': 'password'" placeholder="Current Password"
                           v-model.lazy="passwordInput.currentPassword"
                           id="currentPassword">
                    <div class="input-group-append">
                            <span class="input-group-text">
                                <em v-bind:class="showPassword.currentPassword ? 'fa-eye': 'fa-eye-slash'"
                                    class="fa clickable"
                                    v-on:click="togglePassword('currentPassword')"></em>
                            </span>
                    </div>
                </div>

                <!--New password-->
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><em class="fa fa-key"></em></span>
                    </div>
                    <input class="form-control" ref="newPassword"
                           v-bind:type="showPassword.newPassword ? 'text': 'password'" placeholder="New Password"
                           v-model.lazy="passwordInput.newPassword"
                           id="newPassword">
                    <span class="input-group-text">
                                <em v-bind:class="showPassword.newPassword ? 'fa-eye': 'fa-eye-slash'" class="fa clickable"
                                    v-on:click="togglePassword('newPassword')"></em>
                            </span>
                </div>
                <!--Repeat password-->
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><em class="fa fa-key"></em></span>
                    </div>
                    <input class="form-control" ref="confirmPassword"
                           v-bind:type="showPassword.confirmPassword ? 'text': 'password'"
                           placeholder="Confirm Password" v-model.lazy="passwordInput.confirmPassword"
                           id="confirmPassword">
                    <div class="input-group-append">
                            <span class="input-group-text">
                                <em v-bind:class="showPassword.confirmPassword ? 'fa-eye': 'fa-eye-slash'"
                                    class="fa clickable"
                                    v-on:click="togglePassword('confirmPassword')"></em>
                            </span>
                    </div>
                </div>
            </div>
        </div>
        <!--Edit button-->
        <div v-if="!editing" class="form-group input-group">
            <button class="btn btn-info btn-block" v-on:click="editing = true">Edit</button>
        </div>
        <!--Save changes/discard-->
        <div v-else class="btn-toolbar">
            <button class="btn btn-success mr-1 flex-fill" v-on:click="submitChanges">Save Changes</button>
            <button class="btn btn-outline-danger ml-1 flex-fill" v-on:click="discardChanges">Discard Changes
            </button>
        </div>
    </div>
    </body>
</template>

<script>
    import Validation from "@/utils/Validation";
    import Api from "@/Api";
    import Images from "@/utils/Images";

    export default {
        name: "ProfileCard",
        props: ["profile", "profileImage"],

        data() {
            return {
                user: null,
                editing: false,
                editingPassword: false,
                imageSet: false,
                image: {
                    file: null,
                    imageName: "Upload profile image",
                    type: null,
                    url: null
                },
                showPassword: {
                    currentPassword: false,
                    newPassword: false,
                    confirmPassword: false
                },
                passwordInput: {
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                },
                successMessage: "",
                errorMessage: ""
            }
        },

        created() {
            this.fetchData();
        },

        watch: {
            profile: function () {
                this.fetchData();
            },

            editingPassword: function () {
                this.resetInput("currentPassword")
                this.resetInput("newPassword")
                this.resetInput("confirmPassword")
            },

            profileImage: function() {
                this.image.url = this.profileImage
            }
        },

        methods: {
            togglePassword(inputName) {
                this.showPassword[inputName] = !this.showPassword[inputName]
            },

            resetChangePassword() {
                this.editingPassword = !this.editingPassword;
                this.showPassword = {
                    currentPassword: false,
                    newPassword: false,
                    confirmPassword: false
                }
                this.passwordInput = {
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                }
            },

            fetchData() {
                if (this.profile) {
                    this.user = {
                        name: this.profile.name,
                        email: this.profile.email,
                        city: this.profile.city,
                        country: this.profile.country,
                    }
                }
            },

            setBannerMessage(message, success) {
                if (success) {
                    this.successMessage = message
                    this.errorMessage = ""
                } else {
                    this.successMessage = ""
                    this.errorMessage = message
                }
            },

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

            checkEmailInput() {
                const email = this.user.email;
                if (Validation.validEmail(email)) {
                    this.resetInput("editEmail")
                    return true
                } else {
                    this.unsuccessfulInput("editEmail")
                    return false
                }
            },

            checkNameInput() {
                const name = this.user.name;
                if (Validation.validName(name)) {
                    this.resetInput("editName")
                    return true
                } else {
                    this.unsuccessfulInput("editName")
                    return false
                }
            },

            checkPasswordInput(id) {
                const password = this.passwordInput[id];
                if (Validation.validPassword(password)) {
                    this.successfulInput(id)
                    return true
                } else {
                    this.unsuccessfulInput(id)
                    return false
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

                this.checkProfileUpload();
            },

            discardChanges() {
                this.user = {
                    name: this.profile.name,
                    email: this.profile.email,
                    city: this.profile.city,
                    country: this.profile.country,
                }
                this.resetValidation()
                this.imageSet = false;
                this.editing = false;
                this.editingPassword = false;
                this.successMessage = "";
                this.errorMessage = "";
                this.image.url = this.profileImage
                this.checkProfileUpload()
            },

            resetValidation() {
                this.resetInput("editName");
                this.resetInput("editEmail");
                this.resetInput("changePassword");
                this.resetInput("newPassword");
                this.resetInput("confirmPassword");
            },

            composeEditBody() {
                let body = {};
                if (this.user.name !== this.profile.name) {
                    body.name = this.user.name;
                }
                if (this.user.email !== this.profile.email) {
                    body.email = this.user.email;
                }
                if (this.user.city !== this.profile.city) {
                    body.city = this.user.city;
                }
                if (this.user.country !== this.profile.country) {
                    body.country = this.user.country;
                }
                if (this.editingPassword) {
                    body.currentPassword = this.passwordInput.currentPassword;
                    body.password = this.passwordInput.newPassword;
                }

                return body;
            },

            checkInputs() {
                let success = true;
                if (this.editing) {
                    if (!this.checkNameInput()) {success = false}
                    if (!this.checkEmailInput()) {success = false}

                    if (this.editingPassword) {
                        if (!this.checkPasswordInput("currentPassword")) {success = false}
                        if (!this.checkPasswordInput("newPassword")) {success = false}
                        if (!this.checkPasswordInput("confirmPassword")) {success = false}
                    }

                    if (!this.checkProfileUpload()) {success = false}
                }

                return success
            },

            submitChanges() {
                if(this.checkInputs()) {
                    const userId = localStorage.getItem("user_id");
                    const body = this.composeEditBody();
                    let successfulRequests = true;
                    if (Object.keys(body).length !== 0) {
                        Api.editAccount(body, userId)
                            .then(response => {
                                if (response.status === 200) {
                                    this.$parent.$parent.getUserDetails();
                                    this.resetChangePassword()
                                    this.setBannerMessage("Success: User details saved", true)
                                } else {
                                    successfulRequests = false;
                                    this.setBannerMessage(response.statusText, false)
                                }
                            })
                    }
                    if (successfulRequests && this.imageSet) { // Then upload the profile image
                        Images.convertBlobToBase64(this.image.file)
                            .then(data => {
                                Api.uploadProfileImage(userId, data, this.image.type)
                                    .then(response => {
                                        if (response.status === 200 || response.status === 201) {
                                            this.setBannerMessage("Success: User details saved", true)
                                        } else {
                                            this.setBannerMessage(response.statusText, false)
                                        }
                                    })
                            })
                    }
                }
            }
        }

    }
</script>

<style scoped>

    img {
        height: auto;
        width: 250px;
        padding: 2px;
        margin-bottom: 10px;
    }

    .card-body {
        min-width: 400px;
    }

    .clickable {
        cursor: pointer;
    }


</style>