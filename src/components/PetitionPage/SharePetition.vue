<template>
    <div>
        <div class="row">
            <div class="col col-md-5 text-center separator mx-auto">Share</div>
        </div>
        <div class="row">
            <div class="col text-center">
                <button class="btn btn-primary mr-1 mb-1" v-on:click="openInNewTab('http://www.facebook.com')">
                    <i class="fab fa-facebook-f"></i> Facebook
                </button>
                <button class="btn btn-info mr-1 mb-1" v-on:click="openInNewTab('http://www.twitter.com')">
                    <i class="fab fa-twitter"></i> Twitter
                </button>
                <button class="btn btn-danger mr-1 mb-1" v-on:click="openInNewTab('http://www.reddit.com')">
                    <i class="fab fa-reddit"></i> Reddit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SharePetition",

        methods: {
            openInNewTab(url) {
                console.log(url)
                const win = window.open(url, '_blank');
                win.focus()
            }
        }
    }
</script>

<style scoped>

    .btn {
        width: 150px;
    }

    .separator {
        display: flex;
        align-items: center;
        text-align: center;
    }
    .separator::before, .separator::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid #000;
    }
    .separator::before {
        margin-right: .25em;
    }
    .separator::after {
        margin-left: .25em;
    }

</style>