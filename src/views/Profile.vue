<template>
    <body class="container">
        <profile-card v-bind:profile="profile" :profile-image="userImage"></profile-card>
    </body>
</template>

<script>
    import ProfileCard from "@/components/ProfileCard";
    import Api from "@/Api";
    import Images from "@/utils/Images";
    export default {
        name: "Profile",
        components: {ProfileCard},
        data() {
            return {
                userImage: null
            }
        },

        computed: {
            profile: function() {
                return this.$parent.profile;
            },
        },

        created() {
            this.getUserImage()
        },

        methods: {
            getUserImage: function() {
                Api.getUserImage(localStorage.getItem("user_id"))
                    .then(imageResponse => {
                        if (imageResponse.status === 200) {
                            this.userImage = Images.dataUrl(imageResponse.headers["content-type"], imageResponse.data);
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>