/**
 * 向外暴露路由器对象模块
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history', // 路由路径没有#
  routes
})

// 定义全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('to' + JSON.stringify(to))
  console.log('from' + JSON.stringify(from))
  next()
})

export default router
