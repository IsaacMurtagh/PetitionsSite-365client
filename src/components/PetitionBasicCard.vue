<template>
    <body class="card bg-info mb-3" style="width: 36rem">

        <div class="card-header">
            <div class="card-title text-center text-light h5">
                <router-link v-bind:to="petitionUrl" class="text-decoration-none text-light">{{title}}</router-link>
            </div>
        </div>
        <div class="card-body bg-light ">
            <div class="row">
                <div class="col-8">
                    <div class="card-text" id="category">Category: {{category}}</div>
                    <div class="card-text" id="author">Authored by: {{author}}</div>
                </div>
                <div class="col-4">
                    <img class="rounded" v-if="heroImage" v-bind:src="heroImage">
                </div>
            </div>
        </div>
        <div class="card-footer text-light">
            <p class="card-text d-inline"  id="signatures">Signed by {{signatures}} {{signatureToken}}</p>
        </div>

    </body>
</template>

<script>
    import Api from "@/Api";
    import Images from "@/utils/Images";

    export default {
        name: "PetitionCard",
        props: ["id", "title", "category", "author", "signatures", "authorId"],

        data() {
            return {
                petitionUrl: "/petition/" + this.id,
                heroImage: ""
            }
        },

        computed: {
            signatureToken: function() {
                return this.signatures === 1 ? "person": "people"
            }
        },

        created() {
            this.getHeroImage()
        },

        methods : {
            getHeroImage() {
                Api.getPetitionImage(this.id)
                    .then(response => {
                        if (response.status === 200) {
                            this.heroImage = Images.dataUrl(response.headers["content-type"], response.data);
                        }
                    })
            }
        }
    }


</script>

<style scoped>

    img {
        max-width: 100%;
        max-height: 120px;
    }

    .card-footer {
        height: 60px;
    }

</style>