<template>
  <div id="app" >
    <div class="bg-info">
      <NavigationBar/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar";

export default {
  name: 'App',
  components: {
    NavigationBar,
  },

  data () {
    return {
      siteDomain: 'iratethat.com',
      siteName: "I Rate That Petitions",
      siteDescription: "The only petition site where you can take your opinions, and lay it on THICK",
      loggedIn: true
    }
  }
}
</script>

<style>

  .text-darkblue {
    color: #0D1866;
  }

  .bg-lightblue {
    background: #D1FFE7;
  }

  hr {
    height: 1px;
    /* Set the hr color */
    color: #0D1866; /* old IE */
    background-color: #0D1866; /* Modern Browsers */
  }

  .banner {
    padding-top: 30px;
    padding-bottom: 30px;
    /*border: solid black 1px;*/
  }

  .text-hero {
    margin-right: auto;
    margin-left: auto;
    text-align: center;
  }



</style>
