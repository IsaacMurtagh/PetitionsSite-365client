<template>
    <div id="app">
        <div class="bg-info">
            <NavigationBar/>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import NavigationBar from "@/components/NavigationBar";
    import Api from "@/Api";

    export default {
        name: 'App',
        components: {
            NavigationBar,
        },

        data() {
            return {
                siteDomain: 'iratethat.com',
                siteName: "I Rate That Petitions",
                siteDescription: "The only petition site where you can take your opinions, and lay it on THICK",
                profile: null
            }
        },

        computed: {
            route: function () {
                return this.$route
            }
        },

        watch: {
            route: function () {
                if (!this.profile) {
                    this.getUserDetails();
                }
            }
        },

        created() {
            this.getUserDetails();
        },

        methods: {
            clearLocalStorage() {
                localStorage.clear();
            },

            getUserDetails() {
                if (localStorage.getItem("user_id") && localStorage.getItem("token")) {
                    Api.setHeaderToken(localStorage.getItem('token'));
                    Api.getProfileInformation(localStorage.getItem("user_id"))
                        .then(response => {
                            if (response.status === 200 && response.data.email) {
                                this.profile = response.data;
                            } else { // not logged in
                                this.profile = null;
                                this.clearLocalStorage();
                            }
                        })
                } else {
                    this.profile = null;
                    this.clearLocalStorage();
                }
            }
        }

    }
</script>

<style>
    [v-cloak] {
        display: none;
    }

    .text-darkblue {
        color: #0D1866;
    }

    .bg-lightblue {
        background: #D1FFE7;
    }

    hr {
        height: 1px;
        /* Set the hr color */
        color: #0D1866; /* old IE */
        background-color: #0D1866; /* Modern Browsers */
    }

    .banner {
        padding-top: 30px;
        padding-bottom: 30px;
        /*border: solid black 1px;*/
    }

    .text-hero {
        margin-right: auto;
        margin-left: auto;
        text-align: center;
    }




</style>
