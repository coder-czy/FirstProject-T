import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import { Toast, Empty, Icon, Swipe, SwipeItem, Form, Button, Field, SwipeCell, Dialog, Switch, Step, Steps, Tab, Tabs } from 'vant'
Vue.use(Empty)
Vue.use(Toast)
Vue.use(Icon)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Form)
Vue.use(Button)
Vue.use(Field)
Vue.use(SwipeCell)
Vue.use(Dialog)
Vue.use(Switch)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Tab);
Vue.use(Tabs);


Vue.prototype.$axios = axios
Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')