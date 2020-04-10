<template>
    <body class="container bg-info">
        <div class="row" id="top-nav">
            <div class="col-8 col-lg-10"></div>
<!--            If not logged in-->
                <div class="col-2 col-lg-1">
                    <router-link v-if="this.$parent.$data.loggedIn" to="/login" class="btn btn-outline-light">Login</router-link>
                    <router-link v-else to="/profile" class="btn btn-outline-light">Profile</router-link>
                </div>
                <div class="col-2 col-md-1">
                    <router-link v-if="this.$parent.$data.loggedIn" to="/register" class="btn btn-outline-light">Register</router-link>
                    <router-link v-else to="/logout" class="btn btn-outline-light">Logout</router-link>
                </div>
<!--            If logged in-->
        </div>
        <div class="row" id="bottom-nav">
            <div class="col-12 col-md-4 col-lg-3">
                <router-link to="/" class="h2 font-weight-bold text-darkblue text-decoration-none">
                    {{ this.$parent.$data.siteDomain}}
                </router-link>

            </div>
            <div class="col-6 col-md-4">
                <input class="form-control" type="text" placeholder="Search" aria-label="Search">
            </div>
            <div class="col-4 col-md-4" id="advancedSearch">
                <span class="align-text-bottom">
                    <router-link to="/search" class="btn-link text-light">Advanced Search</router-link>
                </span>
            </div>
        </div>
    </body>
</template>

<script>
    export default {
        name: "NavigationBar",

    }
</script>

<style scoped>

    #top-nav {
        padding-top: 10px;
    }

    #bottom-nav {
        padding-top: 5px;
        padding-bottom: 30px;
    }

    #advancedSearch {
        margin-top: auto;
        margin-bottom: auto;
    }

    input {
        font-size: 20px;
    }



</style>