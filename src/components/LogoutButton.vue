<template>
    <button class="btn btn-outline-light" v-on:click="logout">Logout</button>
</template>

<script>
    import Api from "@/Api";

    export default {
        name: "Logout",

        methods: {
            logout() {
                Api.logout()
                .then(response => {
                    if (response === 500) {
                        alert("Something went wrong")
                    } else {
                        localStorage.clear();
                        this.$router.push(("/login"))
                        window.location.reload()
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>