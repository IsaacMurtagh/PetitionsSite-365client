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
                profile: this.$parent.$data.profile
            }
        }
    }
</script>

<style scoped>

</style>