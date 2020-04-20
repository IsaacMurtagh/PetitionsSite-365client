<template>
    <div class="row bg-lightblue">
        <div class="col col-6 col-sm-4 col-md-12">
            <input class="form-control btn-outline-info" type="text" placeholder="Search" aria-label="Search" v-model="params.q">
        </div>
        <div class="col col-6 col-sm-4 col-md-12">
            <select class="form-control" id="categories" v-model="params.categoryId">
                <option value="" selected>Filter by Category</option>
                <option v-for="category in categories" v-bind:key="category.categoryId" :value="category.categoryId">{{category.name}}</option>
            </select>
        </div>
        <div class="col col-6 col-sm-4 col-md-12">
            <button type="button" class="btn btn-info btn-block" v-on:click="getPetitionsByParams">Search</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AdvancedSearchBar",
        props: ["categories"],

        data() {
            return  {
                params: {
                    q: null,
                    categoryId: null
                },
            }
        },

        methods: {
            getPetitionsByParams() {
                this.$router.push({name: "search", query: this.composeQuery()})
                .catch(() => {
                    // Already on this page, do nothing
                })
            },

            composeQuery() {
                let query = {}
                if (this.params.q) {
                    query.q = this.params.q;
                }
                if (this.params.categoryId) {
                    query.categoryId = this.params.categoryId;
                }
                console.log(query)
                return query
            }
        },

        updateCategory() {
            console.log("hi")
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