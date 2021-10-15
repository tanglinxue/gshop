/**
 * 所有路由配置的数组
 */
// import Msite from '@/pages/Msite/Msite' // 静态引入:打包时引入
// import Search from '@/pages/Search/Search'
// import Order from '@/pages/Order/Order'
// import Profile from '@/pages/Profile/Profile'

/*
路由组件懒加载:
    1). 在打包时路由组件会被单独打包(代码分割: code split)
    2). 默认不请求加载路由组件打包文件, 当请求需要路由组件时才请求加载
1. import动态引入:
    import(模块路径)
    结果: 被引入的模块会被单独打包(代码分割: code split)
2. 配置的路由组件是函数(返回动态加载的路由组件模块)
    函数开始是不执行(开始不请求加载单独打包的路由组件模块代码)
    当请求对应路径需要显示组件界面时, 去加载路由组件打包文件

作用: 减小首屏需要加载的js文件 ==> 显示更快
*/
import Login from '@/pages/Login/Login'
import Shop from '@/pages/Shop/Shop'
import Goods from '@/pages/Shop/Goods'
import Ratings from '@/pages/Shop/Ratings'
import Info from '@/pages/Shop/Info'

const Msite = () => import('@/pages/Msite/Msite')
const Search = () => import('@/pages/Search/Search')
const Order = () => import('@/pages/Order/Order')
const Profile = () => import('@/pages/Profile/Profile')
export default [
  {
    path: '/msite',
    component: Msite,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/shop/:id',
    props: true, // 将所有params参数转换成标签属性传递给子路由组件
    component: Shop,
    // props: toRoute => ({ id: toRoute.params.id }),
    children: [
      {
        path: 'goods',
        component: Goods
      },
      {
        path: 'ratings',
        component: Ratings
      },
      {
        path: 'info',
        component: Info
      },
      {
        path: '',
        redirect: 'goods'
      }
    ]
  },
  {
    path: '/',
    redirect: '/msite'
  }
]
