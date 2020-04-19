<template>
    <div class="row bg-lightblue">
        <div class="col col-6 col-sm-4 col-md-12">
            <input class="form-control btn-outline-info" type="text" placeholder="Search" aria-label="Search" v-model="searchQuery">
        </div>
        <div class="col col-6 col-sm-4 col-md-12">
            <button type="button" class="btn btn-info btn-block" v-on:click="getPetitionsByParams">Search</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AdvancedSearchBar",
        data() {
            return  {
                searchQuery: ""
            }
        },

        methods: {
            getPetitionsByParams() {
                this.$router.push({name: "search", query:{q: this.searchQuery}})
                .catch(() => {
                    // Already on this page, do nothing
                })
            }
        }
    }
</script>

<style scoped>
    .row {
        margin-bottom: 5px;
    }
    .col {
        margin-top: 10px;
        margin-bottom: 10px;
    }

</style>