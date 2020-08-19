import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Public functions
import {hws} from './hws-public.js'
Vue.mixin(hws)

// Style
import './assets/css/base.css'
import './assets/css/antd.css'
import './assets/css/codemirror.css'

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
    Tabs,
    Select,
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
Vue.use(Tabs)
Vue.use(Select)

// codemirror
Vue.use(VueCodemirror, {
  options: {
    tabSize: 4,
    indentUnit: 4,
    smartIndent: true,
    lineWiseCopyCut: true,
    styleActiveLine: true,
    styleSelectedText: true,
    scrollbarStyle: "simple",
    showCursorWhenSelecting: true,
    extraKeys: {
      "Alt-/": "autocomplete",
      "Ctrl-F": "findPersistent",
      "Ctrl-H": "replaceAll",
    },
    lineNumbers: true,
    lineWrapping:true,
    matchBrackets: true,
    autoCloseBrackets: true,
    autoMatchParens: true,
    highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true }, // 可以启用该选项来突出显示当前选中的内容的所有实例
    showTrailingSpace: true,
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
