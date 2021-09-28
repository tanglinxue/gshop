import Vue from 'vue'
import App from './App'
import router from './router'
import Header from '@/components/Header/Header'
import './validate'
import store from './vuex/store'

import 'lib-flexible'

// 注册全局组件
Vue.component('Header', Header)

new Vue({
  render: h => h(App),
  store, // 所有组件都能看到$store
  router // 所有组件都能看到 $router和$route <router-link></router-link> 和<router-view></router-view>
}).$mount('#app')
