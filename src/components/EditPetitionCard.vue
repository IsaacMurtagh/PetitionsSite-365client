<template>
    <div class="card mx-auto">
        <div class="card-header">
            <div class="text-center">
                <h1>{{modeName}} petition</h1>
                <div class="card-body bg-lightblue">

                    <div class="row">
                        <!--Title-->
                        <div class="col col-12 col-lg-7 form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><em class="fa fa-envelope"></em></span>
                            </div>
                            <input type="text" placeholder="Petition Title" id="title" maxlength="255" class="form-group form-control" v-model.lazy="petitionData.title">
                        </div>

                        <!--Category-->
                        <div class="col col-12 col-md-8 col-lg-5 form-group input-group">
                            <select class="form-control" id="selectCategory">
                                <option value="" selected >Select Category</option>
                                <option v-for="category in this.categories" v-bind:key="category.categoryId" :value="category.categoryId">{{category.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col form-group input-group">
                            <textarea placeholder="Description" id="description" class="form-group form-control" v-model.lazy="petitionData.description"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EditPetitionCard",
        props: ["editing", "petition", "categories"],
        data() {
            return {
                modeName: "Create",
                petitionData: {}
            }
        },

    }
</script>

<style scoped>

    .card {
        width: 70%;
    }

    textarea {
        min-height: 200px;
    }

</style>