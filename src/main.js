import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Home from "@/views/Home";
import Search from "@/views/Search";
import Petition from "@/views/Petition";
import Register from "@/views/Register";

Vue.use(VueRouter);

const routes = [
    {
    path: '/',
    component: Home,
    },
    {
    path: '/login',
    component: Login,
    },
    {
        path: '/search',
        component: Search,
    },
    {
        path: '/petition/:id',
        component: Petition,
    },
    {
        path: '/register',
        component: Register,
    },

]

const router = new VueRouter({
      routes,
      mode: 'history'
    }
)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
