<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <!--    描述-->
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
    <!--      商品内容描述-->
      <div class="desc">
        {{detailInfo.desc}}
      </div>
      <div class="end">
      </div>
    </div>


    <!--    穿着效果-->
    <div class="info-key">
      {{detailInfo.detailImage[0].key}}
    </div>
    <!--    图片-->
    <div class="info-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :src="item"  :key="index" @load="imgLoad" alt="" >
    </div>

  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props:{
    detailInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return{
      counter:0,
      imagesLength:0,//保存图片的长度
    }
  },

  methods:{
    imgLoad(){
      //因为在开始的时候，图片慢慢加载长度会变  判断图片的长度是否全部加载完成 当全部加载完成才发生事件  只发射一次
      if(++this.counter === this.imagesLength){
        this.$emit('imageLoad')
      }
    }
  },
  watch:{
    detailInfo(){
      //用watch实时监听detailInfo属性是否发生了变化，当发生了变化，就把最新的list的长度赋值给imagesLength保存
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style lang=less scoped>
.goods-info{
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}
.info-desc{
  padding: 0 15px;
  .start,.end{
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }
  .start{
    float: left;
  }
  .end{
    float: right;
  }

  .start::before,.end::after{
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }
  .end::after{
    right: 0;
  }
  .desc{
    padding: 15px 0;
    font-size: 14px;
  }
}
.info-key{
  margin: 10px 0 10px 15px;
  color: #ee4714;
  font-size: 15px;
  font-family: "宋体", serif;
}
.info-list img{
  width: 100%;
}
</style>
