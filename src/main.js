import Vue from 'vue'
import App from './App'
import router from './router'
import Header from '@/components/Header/Header'
import Star from '@/components/Star/Star'
import CartControl from '@/components/CartControl/CartControl'
import './validate'
import store from './vuex/store'
import { Button } from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import * as API from '@/api'
import loading from '@/common/images/loading.gif'
import 'lib-flexible'
import i18n from './i18n'
import './mock/mock-server'

Vue.use(VueLazyload, {
  loading // 在要显示的图片没有加载到前显示
}) // 内部定义一个全局指令: lazy

// 将API对象挂载到Vue的原型对象上
Vue.prototype.$API = API
// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
Vue.component(Button.name, Button)

new Vue({
  render: h => h(App),

  // 所有组件都能看到$store
  store,

  i18n,

  // 所有组件都能看到 $router和$route <router-link></router-link> 和<router-view></router-view>
  router
}).$mount('#app')
