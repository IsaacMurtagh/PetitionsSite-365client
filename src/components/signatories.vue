<template>
    <body class="card bg-lightblue" style="width: auto">
        <div class="card-body">
            <div class="card-text">
                <h6>Signed by: {{signedUser.name}}</h6>
                10 hours ago
            </div>
        </div>
    </body>
</template>

<script>
    export default {
        name: "signatories",
        props: ['signedUser'],

        data() {
            return {
                "city": "",
                "country": "",
            }
        },

        calcaulted: {
            userDetails: function () {
                return this.$parent.calculateDetails(this.city, this.country)
            }
        }
    }
</script>

<style scoped>

</style>