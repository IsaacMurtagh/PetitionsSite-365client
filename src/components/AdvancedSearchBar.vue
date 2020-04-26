<template>
    <div class="row bg-lightblue">
        <div class="col col-12">
            <p class="text-center m-0 h5">
                <!--Left arrow-->
                <i v-if="currentPage != 1" class="clickable fa fa-arrow-left" v-on:click="decrementPage"></i>
                <i v-else class="fa fa-arrow-left text-grey"></i>

                <!--Page Numbers-->
                <span v-for="pageNum in pageList" v-bind:key="pageNum">
                    <span v-if="pageNum == currentPage" class="font-weight-bold"> {{pageNum}} </span>
                    <span v-else class="clickable text-grey" v-on:click="setPage(pageNum)"> {{pageNum}} </span>
                </span>

                <!--Right arrow-->
                <i v-if="currentPage != numPages" class="clickable fa fa-arrow-right" v-on:click="incrementPage"></i>
                <i v-else class="fa fa-arrow-right text-grey"></i>
            </p>
        </div>
        <div class="col col-6 col-sm-4 col-md-12">
            <input class="form-control btn-outline-info" type="text" placeholder="Search" aria-label="Search" v-model="params.q">
        </div>
        <div class="col col-6 col-sm-4 col-md-12">
            <select class="form-control" id="selectCategory" v-on:click="setCategory">
                <option value="" selected >Filter by Category</option>
                <option v-for="category in categories" v-bind:key="category.categoryId" :value="category.categoryId">{{category.name}}</option>
            </select>
        </div>
        <div class="col col-6 col-sm-4 col-md-12">
            <select class="form-control" id="sortBy" v-on:click="setSorting">
                <option value="" selected>Sort petitions by </option>
                <option value="ALPHABETICAL_ASC">Title A-Z</option>
                <option value="ALPHABETICAL_DESC">Title Z-A</option>
                <option value="SIGNATURES_DESC">Signatures most-least</option>
                <option value="SIGNATURES_ASC">Signatures least-most</option>
            </select>
        </div>
        <div class="col col-6 col-sm-4 col-md-12">
            <button type="button" class="btn btn-outline-info btn-block" v-on:click="resetSearch">Reset</button>
        </div>
        <div class="col col-6 col-sm-4 col-md-12">
            <button type="button" class="btn btn-info btn-block" v-on:click="executeSearch">Search</button>
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
                    categoryId: null,
                    sortBy: null,
                    count: 10
                },
                currentPage: 1
            }
        },

        computed: {
            pageList: function() {
                let pages = [];
                for (let i = 1; i <= this.numPages; i++) {
                    pages.push(i);
                }
                return pages;
            },

            numPages: function () {
                return Math.ceil(this.$parent.$data.numPetitions / this.params.count)
            },

            startIndex: function () {
                return (this.currentPage - 1) * this.params.count;
            }
        },

        methods: {

            executeSearch() {
                this.currentPage = 1;
                this.getPetitionsByParams();
            },

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
                if (this.params.sortBy) {
                    query.sortBy = this.params.sortBy;
                }
                if (this.params.count) {
                    query.count = this.params.count;
                }
                if(this.startIndex > 0) {
                    query.startIndex = this.startIndex;
                }
                console.log(query)
                return query
            },

            setCategory() {
                const e = document.getElementById("selectCategory");
                const value = e.options[e.selectedIndex].value;
                this.params.categoryId = value;
            },

            setSorting() {
                const e = document.getElementById("sortBy");
                const value = e.options[e.selectedIndex].value;
                this.params.sortBy = value;
            },

            resetSearch() {
                this.params = {
                    q: null,
                    categoryId: null,
                    sortBy: null,
                    count: 10
                }

                document.getElementById("selectCategory").selectedIndex = 0;
                document.getElementById("sortBy").selectedIndex = 0;
            },

            incrementPage() {
                this.currentPage++;
                this.getPetitionsByParams();
            },

            decrementPage() {
                this.currentPage--;
                this.getPetitionsByParams();
            },

            setPage(pageNumber) {
                this.currentPage = Number(pageNumber);
                this.getPetitionsByParams();
            }
        },
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
    .clickable:hover {
        cursor: pointer;
    }

    .text-grey {
        color: grey;
    }

</style>