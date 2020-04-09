<template>
    <body class="container">
    <hr>
        <div class="row">
            <div class="col-1"></div>
<!--            Left Toolbar-->
            <div class="col col-12 col-md-2">
                content
            </div>
<!--            Petition cards-->
            <div class="col col-12 col-md-8">
                <div class="row justify-content-center">
                    <petition-card style="margin-bottom: 20px"></petition-card>
                </div>
            </div>
            <div class="col-1"></div>
        </div>
    </body>
</template>

<script>
    import PetitionCard from "@/components/PetitionCard";
    import Api from "@/Api";

    console.log(Api.getPetitions({}));

    export default {
        name: "Search",
        components: {PetitionCard},
        data() {
            return {
                petitions: []
            }
        }
    }
</script>

<style scoped>

    .col {
        border: solid black 1px;
    }


</style>