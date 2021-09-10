<template>
  <div>
    <!--    轮播图-->
    <swiper>
      <swiper-item v-for="item in banners" :key="item.index"><!--        根据下面banners里面的数据去遍历然后 item-->
        <a :href="item.link"><!--动态绑定a标签的链接-->
          <img :src="item.image" alt="" @load="imgLoad"><!--          @load  监听图片加载-->
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
  },
  data(){
    return {
      isLoad:false,//定义一个数 保存加载状态
    }
  },
  methods:{
    imgLoad(){
      if(!this.isLoad){//当第一次加载的时候，取反
        this.$emit('swiperImgLoad');
        this.isLoad = true;//把isLoad设置为真，就不运行这个代码了
      }
    }
  }
}
</script>

<style scoped>

</style>
