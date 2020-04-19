<template>
    <body class="container bg-info">
    <div class="flex-container" id="top-nav">

        <div class="flex-item">
            <router-link v-if="this.loggedIn" to="/create" class="btn btn-outline-light">Create Petition</router-link>
        </div>

        <div class="flex-item">
            <router-link v-if="!this.loggedIn" to="/login" class="btn btn-outline-light">Login</router-link>
            <router-link v-else to="/profile" class="btn btn-outline-light">Profile</router-link>
        </div>

        <div class="flex-item">
            <router-link v-if="!this.loggedIn" to="/register" class="btn btn-outline-light">Register</router-link>
            <logout-button v-else></logout-button>
        </div>

    </div>
    <div class="row" id="bottom-nav">
        <div class="col-12 col-md-4 col-lg-3">
            <router-link to="/" class="h2 font-weight-bold text-darkblue text-decoration-none">
                {{ this.$parent.$data.siteDomain}}
            </router-link>

        </div>
        <div class="col-6 col-md-4">
            <input class="form-control" type="text" placeholder="Search" aria-label="Search" v-on:keypress.enter="executeSearch"
            v-model="searchTerm">
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
    import LogoutButton from "@/components/LogoutButton";

    export default {
        name: "NavigationBar",
        components: {LogoutButton},

        data() {
            return {
                searchTerm: ""
            }
        },

        computed: {
            loggedIn: function () {
                return this.$parent.$data.profile != undefined;
            }
        },

        methods: {
            executeSearch() {
                if (this.searchTerm.length > 0) {
                    this.$router.push({name: "search", query: {q: this.searchTerm}})
                    .catch(() => {
                        // Do nothing if already on that page
                    })
                    .then(() => {
                        this.searchTerm = "";
                    })
                }
            }
        }

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

    .flex-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .flex-item {
        margin-left: 10px;
    }


</style>