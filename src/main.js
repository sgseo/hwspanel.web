import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {hws} from './hws-public.js'
Vue.mixin(hws)

// style
import './assets/css/base.css'
import './assets/css/antd.css'

// ant-design-vue
import {
    Layout,
    Menu,
    Icon,
    Row,
    Col,
    Card,
    Progress,
    Badge,
    Breadcrumb,
    Button,
    Table,
    ConfigProvider,
    Input,
    Divider,
    Switch,
    Alert,
} from 'ant-design-vue';
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Progress)
Vue.use(Badge)
Vue.use(Breadcrumb)
Vue.use(Button)
Vue.use(Table)
Vue.use(ConfigProvider)
Vue.use(Input)
Vue.use(Divider)
Vue.use(Switch)
Vue.use(Alert)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
