<template>
  <section class="msite">
    <Header :title="address.name || '定位中...'">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div ref="sc1" class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(cs, index) in categorysArr2"
            :key="index"
          >
            <div class="link_to_food" v-for="(c, index) in cs" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + c.image_url" />
              </div>
              <span>{{ c.title }}</span>
            </div>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <div class="shop_container">
        <ul class="shop_list" v-if="shops.length">
          <li
            class="shop_li border-1px"
            v-for="shop in shops"
            :key="shop.id"
            @click="$router.push(`/shop/${shop.id}`)"
          >
            <a>
              <Div>{{ shop.id }}</Div>
              <div class="shop_left">
                <img
                  class="shop_img"
                  :src="'https://fuss10.elemecdn.com/' + shop.image_path"
                />
              </div>
              <div class="shop_right">
                <section class="shop_detail_header">
                  <h4 class="shop_title ellipsis">{{ shop.name }}</h4>
                  <ul class="shop_detail_ul">
                    <li
                      class="supports"
                      v-for="(support, index) in shop.supports"
                      :key="index"
                    >
                      {{ support.icon_name }}
                    </li>
                  </ul>
                </section>
                <section class="shop_rating_order">
                  <section class="shop_rating_order_left">
                    <Star :score="shop.rating" :size="24" />
                    <div class="rating_section">
                      {{ shop.rating }}
                    </div>
                    <div class="order_section">
                      月售{{ shop.recent_order_num }}单
                    </div>
                  </section>
                  <section class="shop_rating_order_right">
                    <span class="delivery_style delivery_right">{{
                      shop.delivery_mode.text
                    }}</span>
                  </section>
                </section>
                <section class="shop_distance">
                  <p class="shop_delivery_msg">
                    <span>¥{{ shop.float_minimum_order_amount }}起送</span>
                    <span class="segmentation">/</span>
                    <span>配送费约¥{{ shop.float_delivery_fee }}</span>
                  </p>
                </section>
              </div>
            </a>
          </li>
        </ul>
        <ul v-else>
          <li>
            <img src="./images/shop_back.svg" alt="loading" />
          </li>
          <li>
            <img src="./images/shop_back.svg" alt="loading" />
          </li>
          <li>
            <img src="./images/shop_back.svg" alt="loading" />
          </li>
          <li>
            <img src="./images/shop_back.svg" alt="loading" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import { mapState } from 'vuex'
import { chunk } from 'lodash'

export default {
  computed: {
    ...mapState({
      // address: 'address',  // 总state中没有address
      // categorys: 'categorys',
      // shops: 'shops'
      address: state => state.msite.address, // state是总状态, 函数的返回就是计算属性值
      categorys: state => state.msite.categorys,
      shops: state => state.msite.shops
    }),
    /**
      包含所有分类的二维数组
     */
    categorysArr() {
      const categorys = this.categorys
      const bigArr = []
      let smallArr = []
      categorys.forEach(c => {
        if (smallArr.length === 0) {
          bigArr.push(smallArr)
        }
        smallArr.push(c)
        if (smallArr.length === 8) {
          smallArr = []
        }
      })
      return bigArr
    },
    categorysArr2() {
      return chunk(this.categorys, 8)
    }
  },
  async mounted() {
    // 分发异步action, 将数据从后台请求到vuex中
    /* this.$store.dispatch('getCategorys', () => {// 数据已经变了
        this.$nextTick(() => {
          // swiper对象必须要在列表数据显示之后创建
          // new Swiper ('.swiper-container', {
          new Swiper (this.$refs.sc1, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
        })
      }) */
    await this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
    // eslint-disable-next-line no-new
    new Swiper(this.$refs.sc1, {
      loop: true,
      pagination: {
        el: '.swiper-pagination'
      }
    })
  },
  /*
    解决swiper轮播不正常的问题?
    方式1: watch + nextTick()
    方式2: callback + nextTick()
    方式3: 利用dipatch()返回的promise
    */
  watch: {
    /*
      1. 更新数据
      2. 立即同步调用监视回调函数
      3. 异步更新界面
      */
    /* categorys () { // categorys变化: [] ==> [...]

        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
        this.$nextTick(() => {
          // swiper对象必须要在列表数据显示之后创建
          // new Swiper ('.swiper-container', {
          new Swiper (this.$refs.sc1, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
        })
      } */
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.msite
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .shop_icon
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
    .shop_container
      margin-bottom 50px
      .shop_list
        .shop_li
          bottom-border-1px(#f1f1f1)
          width 100%
          >a
            clearFix()
            display block
            box-sizing border-box
            padding 15px 8px
            width 100%
            .shop_left
              float left
              box-sizing border-box
              width 23%
              height 75px
              padding-right 10px
              .shop_img
                display block
                width 100%
                height 100%
            .shop_right
              float right
              width 77%
              .shop_detail_header
                clearFix()
                width 100%
                .shop_title
                  float left
                  width 200px
                  color #333
                  font-size 16px
                  line-height 16px
                  font-weight 700
                  &::before
                    content '品牌'
                    display inline-block
                    font-size 11px
                    line-height 11px
                    color #333
                    background-color #ffd930
                    padding 2px 2px
                    border-radius 2px
                    margin-right 5px
                .shop_detail_ul
                  float right
                  margin-top 3px
                  .supports
                    float left
                    font-size 10px
                    color #999
                    border 1px solid #f1f1f1
                    padding 0 2px
                    border-radius 2px
              .shop_rating_order
                clearFix()
                width 100%
                margin-top 18px
                margin-bottom 8px
                .shop_rating_order_left
                  float left
                  color #ff9a0d
                  .rating_section
                    float left
                    font-size 10px
                    color #ff6000
                    margin-left 4px
                  .order_section
                    float left
                    font-size 10px
                    color #666
                    transform scale(.8)
                .shop_rating_order_right
                  float right
                  font-size 0
                  .delivery_style
                    transform-origin 35px 0
                    transform scale(.7)
                    display inline-block
                    font-size 12px
                    padding 1px
                    border-radius 2px
                  .delivery_left
                    color #fff
                    margin-right -10px
                    background-color #02a774
                    border 1px solid #02a774
                  .delivery_right
                    color #02a774
                    border 1px solid #02a774
              .shop_distance
                clearFix()
                width 100%
                font-size 12px
                .shop_delivery_msg
                  float left
                  transform-origin 0
                  transform scale(.9)
                  color #666
                .segmentation
                  color #ccc
</style>
