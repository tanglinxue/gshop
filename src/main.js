import Vue from 'vue'
import App from './App'
import router from './router'
import Header from '@/components/Header/Header'
import Star from '@/components/Star/Star'
import './validate'
import store from './vuex/store'
import * as API from '@/api'

import 'lib-flexible'

// 将API对象挂载到Vue的原型对象上
Vue.prototype.$API = API
// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)

new Vue({
  render: h => h(App),
  store, // 所有组件都能看到$store
  router // 所有组件都能看到 $router和$route <router-link></router-link> 和<router-view></router-view>
}).$mount('#app')
