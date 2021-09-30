/**
 * 包含n个用于间接更新状态数据的方法的对象
 * 方法可以包含异步和逻辑处理代码
 */
import { reqAddress, reqCategorys, reqShops, reqAutoLogin } from '@/api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_TOKEN,
  RECEIVE_USER,
  RESET_TOKEN,
  RESET_USER
} from './mutation-types'
export default {
  /**
   * 获取当前地址信息对象的异步action
   */
  async getAddress({ commit, state }) {
    const { longitude, latitude } = state
    // 发异步ajax请求
    const result = await reqAddress(longitude, latitude)
    // 请求成功后提交Mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, address)
    }
  },
  /**
   * 获取商品分类数组的异步action
   */
  async getCategorys({ commit, state }) {
    // 发异步ajax请求
    const result = await reqCategorys()
    // 请求成功后提交Mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
    }
  },
  /**
   * 获取商家数组的异步action
   */
  async getShops({ commit, state }) {
    const { longitude, latitude } = state
    // 发异步ajax请求
    const result = await reqShops({ longitude, latitude })
    // 请求成功后提交Mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },

  /**
   * 保存用户信息
   */
  saveUser({ commit }, user) {
    const token = user.token
    // 将token保存到local
    localStorage.setItem('token_key', token)
    // 将token保存到state
    commit(RECEIVE_TOKEN, { token })
    // 将user保存到state
    delete user.token // 删除user内部的token
    commit(RECEIVE_USER, { user })
  },

  /**
   * 自动登录的action
   */
  async autoLogin({ commit, state }) {
    if (state.token && !state.user._id) {
      // 必须要有token且没有user信息
      // 发异步ajax请求
      const result = await reqAutoLogin()
      // 请求成功后提交Mutation
      if (result.code === 0) {
        const user = result.data
        commit(RECEIVE_USER, { user })
      }
    }
  },
  logout({ commit }) {
    localStorage.removeItem('token_key')
    commit(RESET_TOKEN)
    commit(RESET_USER)
  }
}
