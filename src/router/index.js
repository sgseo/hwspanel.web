import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import Site from '../components/Site.vue'

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
    }
]

const router = new VueRouter({
  routes
})

export default router
