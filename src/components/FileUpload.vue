<template>
    <div class="form-group input-group">
        <div class="custom-file">
            <input type="file" id="profileImage" class="custom-file-input" v-on:change="checkProfileUpload">
            <label class="custom-file-label" for="profileImage">{{image.imageName}}</label>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FileUpload",
        data() {

        },

        methods: {

        }
    }
</script>

<style scoped>

</style>