import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import Site from '../components/Site.vue'
import Db from '../components/Db.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Root",
        redirect: { name: 'Index' },
    },
    {
        path: "/index",
        name: "Index",
        component: Index
    },
    {
        path: "/site",
        name: "Site",
        component: Site
    },
    {
        path: "/db",
        name: "Db",
        component: Db
    },
]

const router = new VueRouter({
  routes
})

export default router
