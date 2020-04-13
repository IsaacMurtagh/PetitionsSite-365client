<template>
    <body class="card" @submit="submitRegistration">
    <div v-if="badForm" class="alert alert-danger m-3">
        {{alertMessage}}
    </div>
        <div class="card-body mx-auto">
            <h4 class="card-title text-center">Create Account</h4>

            <form>
                <!--Name-->
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-user"></i></span>
                    </div>
                    <input type="text" placeholder="Name*" id="name" class="form-group form-control" maxlength="255" v-model.lazy="name">
                </div>

                <!--Email-->
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-envelope"></i></span>
                    </div>
                    <input type="email" placeholder="Email*" id="email" maxlength="255" class="form-group form-control" v-model.lazy="email">
                </div>

                <!--Password-->
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-key"></i></span>
                    </div>
                    <input type="password" placeholder="Password*" id="password" maxlength="255" class="form-group form-control" v-model.lazy="password">
                </div>

                <!--Confirm Password-->
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-key"></i></span>
                    </div>
                    <input type="password" placeholder="Confirm Password*" id="confirmPassword" maxlength="255" class="form-group form-control" v-model.lazy="confirmPassword">
                </div>

                <!--City-->
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-building"></i></span>
                    </div>
                    <input type="text" placeholder="City" id="city" maxlength="255" class="form-group form-control" v-model.lazy="city">
                </div>

                <!--Country-->
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-globe"></i></span>
                    </div>
                    <input type="text" placeholder="Country" id="country" maxlength="255" class="form-group form-control" v-model="country">
                </div>

                <!--Upload File-->
                <div class="form-group input-group">
                    <div class="custom-file">
                        <input type="file" id="profileImage" class="custom-file-input" v-on:change="uploadFile">
                        <label class="custom-file-label" for="profileImage">{{image.imageName}}</label>
                    </div>
                </div>

                <!--Create account button-->
                <div class="form-group ">
                    <button type="submit" class="btn btn-info btn-block">Create Account</button>
                </div>
            </form>
        </div>

    </body>
</template>

<script>
    import Api from "@/Api";

    export default {
        name: "RegistrationForm",

        data() {
            return {
                "name": "",
                "email": "",
                "password": "",
                "confirmPassword": "",
                "city": null,
                "country": null,
                "alertMessage": "",
                "imageSet": false,
                "image": {
                    "imageName": "Upload profile image",
                    "type": null
                }
            }
        },

        computed: {
            badForm: function () {
                return this.alertMessage.length > 0;
            }
        },

        watch: {
            email: function () {
                this.checkEmailInput();
            },

            name: function () {
                this.checkNameInput();
            },

            password: function () {
                this.checkPasswordInput();
            },

            confirmPassword: function () {
                this.checkConfirmPasswordInput();
            },

            imageSet: function () {
                this.checkProfileUpload();
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

            checkEmailInput() {
                // Match regex
                const email = this.$data.email;
                if(!/\s/.test(email) && /[\w]+@[\w]+/.test(email)) {
                    this.successfulInput("email")
                    return true
                } else {
                    this.unsuccessfulInput("email")
                    return false
                }
            },

            checkNameInput() {
                // Match regex
                const name = this.$data.name;
                if(name.length >= 1) {
                    this.successfulInput("name")
                    return true
                } else {
                    this.unsuccessfulInput("name")
                    return false
                }
            },

            checkPasswordInput() {
                // Match regex
                const password = this.$data.password;
                if(password.length >= 1) {
                    this.successfulInput("password")
                    return true
                } else {
                    this.unsuccessfulInput("password")
                    return false
                }
            },

            checkConfirmPasswordInput() {
                // Match regex
                const password = this.$data.password;
                const confirmPassword = this.$data.confirmPassword;
                if(confirmPassword.length >= 1 && confirmPassword === password) {
                    this.successfulInput("confirmPassword")
                    return true
                } else {
                    this.unsuccessfulInput("confirmPassword")
                    return false
                }
            },

            checkProfileUpload() {
                if (!this.imageSet) {
                    this.resetInput("profileImage")
                    return true
                } else if (this.image.type !== "image/png") {
                    this.unsuccessfulInput("profileImage");
                    return false
                } else {
                    this.successfulInput("profileImage");
                    return true
                }
            },

            uploadFile(e) {
                console.log(e.target.files)
                if (e.target.files.length > 0) {
                    const file = e.target.files[0]
                    this.imageSet = true;
                    this.image.imageName = file.name;
                    this.image.type = file.type

                } else {
                    this.imageSet = false;
                    this.image.imageName = "Upload profile image"
                }
            },

            composeRegistrationBody() {
                return {
                    "name": this.name,
                    "email": this.email,
                    "password": this.password,
                    "city": this.city,
                    "country": this.country
                }
            },

            submitRegistration(e) {
                e.preventDefault();

                let completedForm = true
                if (!this.checkEmailInput()) completedForm = false;
                if (!this.checkNameInput()) completedForm = false;
                if (!this.checkPasswordInput()) completedForm = false;
                if (!this.checkConfirmPasswordInput()) completedForm = false;

                if (!completedForm) {
                    this.alertMessage = "One or more of your input fields are not as expected"
                } else { // Send an api request to create account
                    const requestBody = this.composeRegistrationBody();
                    let accountCreated = false;

                    Api.createAccount(requestBody)
                        .then(response => {
                            if (response.status === 201) { // Account was created
                                accountCreated = true
                            } else if (response.status === 400) { // Bad request error
                                this.alertMessage = "Bad Request: Email may already be in use"
                            } else {
                                this.alertMessage = "Internal Server Error: Please try again"
                            }
                        }).then(() => {
                            if (accountCreated) {
                                this.alertMessage = "Success!"
                            }
                    })
                }

            }
        }
    }
</script>

<style scoped>

    .card-body {
        width: auto;
    }

</style>