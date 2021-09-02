<template>
  <div>
    <!--    轮播图-->
    <swiper>
      <swiper-item v-for="item in banners" :key="item.index"><!--        根据下面banners里面的数据去遍历然后 item-->
        <a :href="item.link"><!--动态绑定a标签的链接-->
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from '../../../components/common/swiper'

export default {
  name: "HomeSwiper",
  props:{
    banners:{
      type:Array,
      default() {
        return [];
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

</style>
