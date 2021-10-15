<template>
  <div>
    <keep-alive exclude="Search"><router-view></router-view></keep-alive>

    <footer-guide v-show="$route.meta.isShowFooter"></footer-guide>
  </div>
</template>

<script>
import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'

export default {
  components: { FooterGuide },
  async mounted() {
    // 通知action异步获取addrss并保存到state
    this.$store.dispatch('getAddress')
    this.$store.dispatch('autoLogin')
  }
}
</script>

<style></style>
