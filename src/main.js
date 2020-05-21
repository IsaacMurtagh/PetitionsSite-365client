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
import NotFound from "@/views/NotFound";
Vue.use(VueRouter);

function loggedIn() {
    return localStorage.getItem("token") && localStorage.getItem("user_id")
}

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
            if (!loggedIn()) {
                next()
            } else {
                next("/")
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
        beforeEnter(to, from, next) {
            if (!loggedIn()) {
                next()
            } else {
                next("/")
            }
        }
    },
    {
        path: '/create',
        name: "create",
        component: CreatePetition,
        beforeEnter(to, from, next) {
            if (loggedIn()) {
                next()
            } else {
                next("/login")
            }
        }
    },
    {
        path: '/edit',
        name: "edit",
        props: true,
        component: CreatePetition,
        beforeEnter(to, from, next) {
            if (!loggedIn()) {
                next('/login')
            } else if (to.params.petition) {
                next()
            } else {
                next('/petition')
            }
            next()
        }
    },
    {
        path: '/petition',
        name: 'petition',
        component: PetitionsDashboard,
        beforeEnter(to, from, next) {
            if (loggedIn()) {
                next()
            } else {
                next("/login")
            }
        }
    },
    {
        path: '/profile',
        name: "profile",
        component: Profile,
        beforeEnter(to, from, next) {
            if (loggedIn()) {
                next()
            } else {
                next("/login")
            }
        }
    },
    {
        path: '/error',
        name: "error",
        component: NotFound,
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
