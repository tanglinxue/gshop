/**
 * 所有路由配置的数组
 */
import Msite from '@/pages/Msite/Msite'
import Search from '@/pages/Search/Search'
import Order from '@/pages/Order/Order'
import Profile from '@/pages/Profile/Profile'
import Login from '@/pages/Login/Login'
import Shop from '@/pages/Shop/Shop'
import Goods from '@/pages/Shop/Goods'
import Ratings from '@/pages/Shop/Ratings'
import Info from '@/pages/Shop/Info'
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
