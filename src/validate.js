import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

// 指定提示文本的为中文

// 声明使用vue插件
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  // 根据name属性名称映射对应的中文提示名称
  attributes: {
    phone: '手机号',
    code: '验证码',
    username: '用户名',
    pwd: '密码',
    captcha: '验证码'
  }
})
VeeValidate.Validator.extend('phone', {
  validate: value => {
    return /^1\d{10}$/.test(value)
  },
  getMessage: field => field + '必须是11位手机号码'
})
VeeValidate.Validator.extend('code', {
  validate: value => {
    return /^\d{6}$/.test(value)
  },
  getMessage: field => field + '必须是6位的数字'
})
