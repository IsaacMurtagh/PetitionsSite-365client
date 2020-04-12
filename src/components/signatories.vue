<template>
    <body class="card bg-lightblue" style="width: auto">
        <div class="card-body">
            <div class="card-text">
                <img v-if="userImage != ''" class="profile-image" v-bind:src="userImage">
                <img v-else class="profile-image" src="../assets/defaultprofile.png">
                <h6>Signed by: {{signedUser.name}}{{userDetails}}</h6>
                {{timeAgo}}
            </div>
        </div>
    </body>
</template>

<script>
    import Api from "@/Api";
    import Images from "@/utils/Images";

    const moment = require('moment');

    export default {
        name: "signatories",
        props: ["signedUser"],

        data() {
            return {
                "city": this.signedUser.city,
                "country": this.signedUser.country,
                "userId": this.signedUser.signatoryId,
                "userImage": "",
            }
        },

        computed: {
            userDetails: function () {
                return this.$parent.calculateDetails(this.city, this.country)
            },

            timeAgo: function() {
                return moment(this.signedUser.signedDate).fromNow();
            }
        },

        created() {
            Api.getUserImage(this.userId)
                .then(response => {
                    if (response) {
                        this.userImage = Images.dataUrl(response.headers["content-type"], response.data);
                    }
                })
        }
    }
</script>

<style scoped>

    body {
        margin-bottom: 10px;
    }

    .profile-image {
        max-width: 40px;
        max-height: 40px;
        margin-right: 10px;
    }
</style>