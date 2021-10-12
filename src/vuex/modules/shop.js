/**
 * 商家模块相关数据管理
 */
import Vue from 'vue'
import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
  CLEAR_CART
} from '../mutation-types'
import { reqGoods, reqRatings, reqInfo } from '@/api'
export default {
  state: {
    goods: [], // 商品列表
    ratings: [], // 商家评论列表
    info: {}, // 商家信息
    cartFoods: [] // 购物车中所有food数组
  },
  mutations: {
    [RECEIVE_GOODS](state, { goods }) {
      state.goods = goods
    },
    [RECEIVE_RATINGS](state, { ratings }) {
      state.ratings = ratings
    },
    [RECEIVE_INFO](state, { info }) {
      state.info = info
    },
    [ADD_FOOD_COUNT](state, { food }) {
      console.log(food.count)
      if (food.count) {
        food.count++
      } else {
        // 给响应式对象添加一个响应式属性
        Vue.set(food, 'count', 1)
        // 将当前food添加到购物车中
        state.cartFoods.push(food)
      }
    },
    [REDUCE_FOOD_COUNT](state, { food }) {
      if (food.count > 0) {
        food.count--
        if (food.count === 0) {
          // 如果数量变为0，将food从购物车中移除
          state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
        }
      }
    },
    [CLEAR_CART](state) {
      // 将cartFoods中所有food的count变为0
      state.cartFoods.forEach(food => (food.count = 0))
      // 重置购物车数组
      state.cartFoods = []
    }
  },
  actions: {
    /**
     * 异步获取商家信息
     */
    async getShopInfo({ commit }, cb) {
      const result = await reqInfo()
      // 请求成功后提交Mutation
      if (result.code === 0) {
        const info = result.data
        commit(RECEIVE_INFO, { info })
        typeof cb === 'function' && cb()
      }
    },
    /**
     * 异步获取商家评论列表
     */
    async getShopRatings({ commit }, cb) {
      const result = await reqRatings()
      // 请求成功后提交Mutation
      if (result.code === 0) {
        const ratings = result.data
        commit(RECEIVE_RATINGS, { ratings })
        typeof cb === 'function' && cb()
      }
    },
    /**
     * 异步获取商家商品列表
     */
    async getShopGoods({ commit }, cb) {
      const result = await reqGoods()
      // 请求成功后提交Mutation
      if (result.code === 0) {
        const goods = result.data
        commit(RECEIVE_GOODS, { goods })
        typeof cb === 'function' && cb()
      }
    },
    /**
     * 更新food中的数量的同步action
     */
    updateFoodCount({ commit }, { isAdd, food }) {
      console.log(isAdd)
      if (isAdd) {
        commit(ADD_FOOD_COUNT, { food })
      } else {
        commit(REDUCE_FOOD_COUNT, { food })
      }
    }
  },
  getters: {
    /**
     * 1.初始显示
     * 2.依赖数据发生改变==>效率低
     */
    // cartFoods(state) {
    //   const arr = []
    //   state.goods.forEach(good => {
    //     good.foods.forEach(food => {
    //       if (food.count > 0) {
    //         arr.push(food)
    //       }
    //     })
    //   })
    //   return arr
    // }
    /* 总数量 */
    totalCount(state) {
      return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
    },
    totalPrice(state) {
      return state.cartFoods.reduce(
        (pre, food) => pre + food.count * food.price,
        0
      )
    }
  }
}
