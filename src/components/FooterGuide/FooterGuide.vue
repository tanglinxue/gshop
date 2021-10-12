<template>
  <footer class="footer_guide">
    <span
      class="guide_item"
      @click="goto('/msite')"
      :class="{ on: $route.path === '/msite' }"
    >
      <span>
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>{{ $t('footer_home') }}</span>
    </span>
    <span
      class="guide_item"
      @click="goto('/search')"
      :class="{ on: $route.path === '/search' }"
    >
      <span>
        <i class="iconfont icon-search"></i>
      </span>
      <span>{{ $t('footer_search') }}</span>
    </span>
    <span
      class="guide_item"
      @click="goto('/order')"
      :class="{ on: $route.path === '/order' }"
    >
      <span>
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>{{ $t('footer_order') }}</span>
    </span>
    <span
      class="guide_item"
      @click="goto('/profile')"
      :class="{ on: $route.path === '/profile' }"
    >
      <span>
        <i class="iconfont icon-geren"></i>
      </span>
      <span>{{ $t('footer_own') }}</span>
    </span>
  </footer>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'FooterGuide',
  methods: {
    goto(path) {
      if (path !== this.$route.path) {
        // 编程式理由跳转
        this.$router.replace(path)
      } else {
        // 如果点击当前项，刷新界面
        window.location = path // 发送一般的http请求 ===> 整个界面会刷新显示
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.footer_guide
  top-border-1px(#cccccc)
  display flex
  position fixed
  left 0
  bottom 0
  height 50px
  width 100%
  z-index 1000
  background #fff
  .guide_item
    display flex
    flex-direction column
    text-align center
    width 25%
    &.on
      color $green
    span
      margin-top 3px
      font-size 12px
      i
        font-size 22px
</style>
