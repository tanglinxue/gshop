/*
  用户模块相关数据管理
*/
import {
  RECEIVE_TOKEN,
  RECEIVE_USER,
  RESET_TOKEN,
  RESET_USER
} from '../mutation-types'
import { reqAutoLogin } from '@/api'
export default {
  state: {
    user: {}, // 用户信息对象
    token: localStorage.getItem('token_key') || '' // 当前用户登录的标记
  },
  mutations: {
    [RECEIVE_TOKEN](state, { token }) {
      state.token = token
    },
    [RECEIVE_USER](state, { user }) {
      state.user = user
    },
    [RESET_TOKEN](state) {
      state.token = ''
    },
    [RESET_USER](state) {
      state.user = {}
    }
  },
  actions: {
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
  },
  getters: {}
}
