<template>
  <div class="cartcontrol">
    <transition name="move">
      <div
        class="iconfont icon-remove_circle_outline"
        v-if="food.count > 0"
        @click.stop="UpdateFoodCount(false)"
      ></div>
    </transition>

    <div class="cart-count" v-if="food.count > 0">{{ food.count }}</div>
    <div
      class="iconfont icon-add_circle"
      @click.stop="UpdateFoodCount(true)"
    ></div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
export default {
  props: {
    food: Object
  },
  methods: {
    UpdateFoodCount: throttle(
      function(isAdd) {
        this.$store.dispatch('updateFoodCount', { isAdd, food: this.food })
      },
      1000,
      { trailing: false } // 在1s内多次点击，只响应第一次点击(默认是响应2次，且第2是在过了1s后才响应)
    )
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.cartcontrol
  font-size: 0
  .cart-decrease
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 24px
    color: rgb(0, 160, 220)

  .icon-remove_circle_outline
    display: inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color $green
    &.move-enter-active, &.move-leave-active
      transition all .5s
    &.move-enter, &.move-leave-to
      opacity 0
      transform translateX(15px) rotate(180deg)
  .cart-count
    display: inline-block
    vertical-align: top
    width: 12px
    padding-top: 6px
    line-height: 24px
    text-align: center
    font-size: 10px
    color: rgb(147, 153, 159)
  .icon-add_circle
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 24px
    color $green
</style>
