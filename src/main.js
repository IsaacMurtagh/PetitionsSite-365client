import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Home from "@/views/Home";

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
