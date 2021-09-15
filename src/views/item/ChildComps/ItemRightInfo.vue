<template>
  <div class="right-top-info"  >
    <!--    头部的图片与标题-->
    <div v-for="(item,index) in list" :key="index" class="item-list">
      <div class="img">
        <img :src="item.image" alt="">
      </div>
      <div class="span">
        <span>{{item.title}}</span>
      </div>


    </div>

  </div>
</template>

<script>

export default {
  name: "ItemRightInfo",
  props:{
    list:{
      type:Array,
      default(){
        return[]
      }
    }
  },






}
</script>

<style scoped>
/*item的样式*/
.item-list{
  width: 32%;
  margin-left: 1%;
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
/*图片样式*/
.img img{
  width: 100%;
}

</style>
