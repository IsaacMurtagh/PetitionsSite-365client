<template>
    <body class="card bg-lightblue" @submit="sendLogin">
        <div v-if="badForm" class="alert alert-danger m-3 text-center">
            {{alertMessage}}
        </div>

        <div class="card-body mx-auto">
            <h4 class="card-title text-center">Login</h4>

            <form>
                <!--Email-->
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><em class="fa fa-envelope"></em></span>
                    </div>
                    <input type="email" placeholder="Email" id="email" maxlength="255" class="form-group form-control" v-model.lazy="email">
                </div>

                <!--Password-->
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><em class="fa fa-key"></em></span>
                    </div>
                    <input type="password" placeholder="Password" id="password" maxlength="255" class="form-group form-control" v-model.lazy="password">
                </div>

                <!--Login button-->
                <div class="form-group ">
                    <button type="submit" class="btn btn-info btn-block">Login</button>
                </div>
            </form>
        </div>
    </body>
    
</template>

<script>
    import Api from "../Api.js";

    export default {
        name: "LoginForm",

        data() {
            return {
                email: "",
                password: "",
                alertMessage: ""
            }
        },

        computed: {
            badForm: function() {
                return this.alertMessage.length > 0;
            }
        },

        methods: {
            checkFormInput() {
                if (this.email.length < 1 || this.password.length < 1) {
                    this.alertMessage = "Please fill out both email and password";
                    return false;
                }
                return true;
            },

            composeLoginBody() {
                return {
                    "email": this.email,
                    "password": this.password
                };
            },

            sendLogin(e) {
                e.preventDefault();

                if (!this.checkFormInput()) {
                    return // Do nothing as inputs not as expected
                }

                Api.login(this.composeLoginBody())
                .then(response => {
                    if (response.status === 200) {
                        this.alertMessage = "";
                        this.$router.push("/");
                    } else {
                        this.alertMessage = response.statusText
                    }
                })
            }
        }


    }

</script>

<style scoped>

    .card-body {
        width: 50%;
    }

</style>