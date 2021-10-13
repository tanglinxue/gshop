import Vue from 'vue'
/**
 * 包含一些工具函数的模块
 */
export function saveCartFoods(shopId, cartFoods) {
  // 根据cartFoods生成包含所有count数量的对象容器
  const cartCounts = cartFoods.reduce((pre, food) => {
    // 向pre中添加属性
    pre[food.id] = food.count
    return pre
  }, {})

  // 保存到sessionStorage
  sessionStorage.setItem(shopId + '_key', JSON.stringify(cartCounts))
}

/**
 * 读取sesstuibStorage中的cartCounts,生成并返回一个cartFoods
 */
export function getCartFoods(shop) {
  const cartFoods = []

  // 读取sesstuibStorage中的cartCounts
  const cartCounts = JSON.parse(sessionStorage.getItem(shop.id + '_key')) || {}

  // 遍历出所有需要指定count的food
  shop.goods.forEach(good => {
    good.foods.forEach(food => {
      const count = cartCounts[food.id]
      if (count) {
        Vue.set(food, 'count', count)
        cartFoods.push(food)
      }
    })
  })

  return cartFoods
}
