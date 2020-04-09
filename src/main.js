import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Home from "@/views/Home";
import Search from "@/views/Search";

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
