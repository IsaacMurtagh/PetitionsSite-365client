<template>
    <body class="container">
    <hr>
    <div class="row">
        <div class="col-md-1 col-lg-2"></div>
        <div class="col-12 col-md-10 col-lg-8" id="banner">
            <h1 class="text-darkblue text-hero" id="hero">Welcome back!</h1>
            <login-form></login-form>
        </div>
        <div class="col-2"></div>
    </div>
    </body>
</template>

<script>
    import LoginForm from "@/components/LoginForm";
    export default {
        name: "Login",
        components: {LoginForm}
    }
</script>

<style scoped>

</style>