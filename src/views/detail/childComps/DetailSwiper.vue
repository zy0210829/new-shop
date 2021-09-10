<template>

    <swiper>
      <swiper-item v-for="(item,index) in topImages" class="swiperItem"  :key="index"><!--  遍历数据 得到图片的地址  在动态绑定图片地址-->
        <img :src="item" alt="">
      </swiper-item>
    </swiper>


</template>

<script>
import {Swiper,SwiperItem} from '../../../components/common/swiper/index'

export default {
  name: "DetailSwiper",
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },

  components:{
    Swiper,
    SwiperItem,
  }
}
</script>

<style scoped>
.swiperItem{
  height: 18rem;
  overflow: hidden;
}
</style>
