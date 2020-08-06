import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// glbal style
import './assets/css/base.css'

// ant-design-vue
import {
    Layout,
    Menu,
    Icon,
    Row,
    Col,
    Card,
    Progress,
} from 'ant-design-vue';
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Progress)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
