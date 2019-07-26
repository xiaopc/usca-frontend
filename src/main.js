// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import { Button, Icon, Col, Row, Layout, Menu, Collapse, AutoComplete, Form, Input, Progress, Tooltip, message, Select, Rate, Alert, Spin, Skeleton } from 'ant-design-vue';
import Viser from 'viser-vue'

Vue.config.productionTip = false
// Vue.use(Antd)
Vue.prototype.$message = message

Vue.use(Button)
Vue.use(Icon)
Vue.use(Col)
Vue.use(Row)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Collapse)
Vue.use(AutoComplete)
Vue.use(Form)
Vue.use(Input)
Vue.use(Progress)
Vue.use(Tooltip)
Vue.use(Select)
Vue.use(Rate)
Vue.use(Alert)
Vue.use(Spin)
Vue.use(Skeleton)
Vue.use(Viser)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
