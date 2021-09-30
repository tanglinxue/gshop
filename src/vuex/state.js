/**
 * 包含n个状态数据属性的对象
 */
export default {
  address: {}, // 地址信息对象
  categorys: [], // 分类数组
  shops: [], // 商家数组
  longitude: 116.36867,
  latitude: 40.10038,
  user: {}, // 用户信息对象
  token: localStorage.getItem('token_key') || '' // 当前用户登录的标记
}
