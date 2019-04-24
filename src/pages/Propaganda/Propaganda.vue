<template>
  <div class="propaganda">
    <swiper :options="swiperObj"  class="propaganda">
        <swiper-slide
            class="propaganda-page"
            v-for="(item,index) in imgList"
            :key="index">
            <img :src="item.imageUrl" alt="">
            <!-- <div class="propaganda-bg"
              v-bind:class="{ 'bgAnimation': thisBanner === index}">
              <div></div>
            </div> -->
        </swiper-slide>
    </swiper>
    <div class="propaganda-point"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import api from '../../lib/tools/api'
const vueSwiper = require('vue-awesome-swiper')
Vue.use(vueSwiper)
require('swiper/dist/css/swiper.min.css')

export default {
  name: 'Propaganda',
  components: {},
  data () {
    return {
      imgList: [],
      thisBanner: 0,
      swiperObj: {
        effect: 'fade',
        slidesPerView: 1,
        direction: 'vertical',
        loop: false,
        speed: 800,
        // autoplay: 3000,
        transitionStart: (swiper) => {
          this.thisBanner = swiper.realIndex
        },
        onTransitionEnd: (swiper) => {
          this.thisBanner = swiper.realIndex
        }
      }
    }
  },
  mounted () {
    this.getImg()
  },
  methods: {
    getImg () {
      api.getImg().then(res => {
        if (res.responseCode === '100000') this.imgList = res.result
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .propaganda{
    width: 100%;
    height: 100vh;
    background-color: #ff8a66;

    &-page{
      width: 100%;
      height: 100vh;
      font-size: 0;

      img{
        width: 100%;
      }
    }
    @keyframes pointAnimation{
      0% {
        bottom: 0.3rem;
      }
      80% {
        bottom: 0.7rem;
      }
      100% {
        bottom: 0.3rem;
      }
    }
    &-point{
      position: fixed;
      bottom: 0.3rem;
      left: 50%;
      width: 0.75rem;
      height: 0.52rem;
      margin-left: -0.36rem;
      background: url("./img/point.png") center center no-repeat;
      background-size: 0.75rem;
      z-index: 2;
      animation: pointAnimation 1.2s infinite;
      -webkit-animation: pointAnimation 1.2s infinite;
    }
    &-bg{
      width: 6.16rem;
      margin: 0.84rem auto 0;
      border: solid 0.12rem #FFF;
      transform: scale(0);

      div{
        width: 6.04rem;
        height: 11.28rem;
        background-color: #FFF;
        border: solid 0.06rem #ff8a66;
      }
    }
    .bgAnimation{
      animation: bgAnimation 1s;
      -webkit-animation: bgAnimation 1s;
      -webkit-animation-fill-mode: both;
    }
    @keyframes bgAnimation{
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(2);
        }
        100% {
          transform: scale(1);
        }
    }
  }
</style>
