<template>
    <body class="container">
    <hr>
    <div class="row">
        <div class="col-md-1 col-lg-2"></div>
        <div class="col-12 col-md-10 col-lg-8" id="banner">
            <h1 class="text-darkblue text-hero" id="hero">Register Now</h1>
            <p class="text-dark text-hero">Let everyone know what opinions you <i>'slap'</i></p>
            <registration-form></registration-form>
        </div>
        <div class="col-2"></div>
    </div>
    </body>
</template>

<script>
    import RegistrationForm from "@/components/RegistrationForm";
    export default {
        name: "Register.vue",
        components: {RegistrationForm}
    }
</script>

<style scoped>

</style>