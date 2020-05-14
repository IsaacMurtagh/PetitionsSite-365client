<template>
    <div class="card">
        <div class="card-header">
            <div class="text-center">
                <h1>{{modeName}} petition</h1>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EditPetitionCard",
        props: ["editing", "petition"],
        data() {
            return {
                modeName: "Create",
                petitionData: {}
            }
        },

    }
</script>

<style scoped>

</style>