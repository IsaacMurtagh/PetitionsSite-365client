<template>
    <body class="container">
        <profile-card v-bind:profile="profile"></profile-card>
    </body>
</template>

<script>
    import ProfileCard from "@/components/ProfileCard";
    export default {
        name: "Profile",
        components: {ProfileCard},
        data() {
            return {
            }
        },

        computed: {
            profile: function() {
                return this.$parent.profile;
            }
        }
    }
</script>

<style scoped>

</style>