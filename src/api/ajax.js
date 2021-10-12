/*
对axio进行2次封装一个能发ajax请求的函数
1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对请求体参数进行urlencode处理, 而不使用默认的json方式(后台接口不支持)
4. 配置请求超时的时间
5. 通过请求头携带token数据
6. 请求loading
*/
import axios from 'axios'
import qs from 'qs'
import { Indicator, Toast, MessageBox } from 'mint-ui'
import store from '@/vuex/store'
import router from '@/router'
const instance = axios.create({
  baseURL: '/api',
  timeout: 20000 // 配置请求超时的时间
})

// 请求拦截器
instance.interceptors.request.use(config => {
  console.log('req interceptor')
  console.log(config)
  const data = config.data
  Indicator.open()
  if (data instanceof Object) {
    // 对请求体参数进行urlencode处理, 而不使用默认的json方式(后台接口不支持)
    config.data = qs.stringify(data)
  }

  // 请求头携带token数据
  const token = store.state.user.token

  if (token) {
    config.headers.Authorization = token
  } else {
    const needCheck = config.headers.needCheck
    // 如果当前需要token检验，但没有token，不发请求，进入错误流程
    if (needCheck) {
      throw new Error('没有登录，不能请求')
    }
  }
  return config
})

// 相应拦截器
instance.interceptors.response.use(
  response => {
    Indicator.close()
    console.log('res interceptor')
    console.log(response)
    return response.data
  },
  error => {
    // 没发请求的错误
    // 发了请求的错误
    console.log(error)
    const response = error.response
    const path = router.currentRoute.path
    if (!response) {
      if (path !== 'login') {
        router.replace('/login')
        Toast(error.message)
      }
    } else {
      if (error.response.status === 401) {
        // 如果响应状态码是401，且当前没在登录页面，退出登录，自动跳转到login页面

        if (path !== 'login') {
          store.dispatch('logout')
          router.replace('/login')
          Toast(error.response.data.message || '登录失效，请重新登录')
        }
      } else if (error.response.status === 404) {
        MessageBox('提示', '访问的资源不存在')
      } else {
        MessageBox('提示', '请求出错' + error.message)
      }
    }

    Indicator.close()

    // alert('请求出错' + error.message)
    return new Promise(() => {}) // 返回一个pending状态的promise => 中断promise链
  }
)

export default instance
