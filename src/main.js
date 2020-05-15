import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Home from "@/views/Home";
import Search from "@/views/Search";
import Petition from "@/views/Petition";
import Register from "@/views/Register";
import CreatePetition from "@/views/CreatePetition";
import Profile from "@/views/Profile";
import PetitionsDashboard from "@/views/PetitionsDashboard";
Vue.use(VueRouter);


const routes = [
    {
        path: '/',
        name: "home",
        component: Home,
    },
    {
        path: '/login',
        name: "login",
        component: Login,
        beforeEnter(to, from, next) {
            if (localStorage.getItem("token") && localStorage.getItem("user_id")) {
                next({name: "home"})
            } else {
                next()
            }
        }
    },
    {
        path: '/search',
        name: "search",
        component: Search,
    },
    {
        path: '/petition/:id',
        name: "petition",
        component: Petition,
    },
    {
        path: '/register',
        name: "register",
        component: Register,
    },
    {
        path: '/create',
        name: "create",
        component: CreatePetition,
    },
    {
        path: '/edit',
        name: "edit",
        props: true,
        component: CreatePetition,
    },
    {
        path: '/petition',
        name: 'petition',
        component: PetitionsDashboard
    },
    {
        path: '/profile',
        name: "profile",
        component: Profile,
        beforeEnter(to, from, next) {
            if (localStorage.getItem("token") && localStorage.getItem("user_id")) {
                next()
            } else {
                next({name: "login"})
            }
        }
    }

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
