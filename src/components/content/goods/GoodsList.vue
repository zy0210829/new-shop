<template>
<!--  遍历数组  得到许多个item对象  把item的数据传入子组件渲染-->
  <div class="goods-list">
    <good-list-item v-for="(item,index) in goods"  :goods-item="item" :key="index"></good-list-item>
  </div>
</template>

<script>
import GoodListItem from "./GoodListItem";
export default {
  name: "GoodsList",
  props:{
    goods:{//
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    GoodListItem,
  }
}
</script>

<style scoped>
.goods-list{
  display: flex;
  flex-wrap:wrap;/*是否换行，默认不换*/
  justify-content: space-around;
}
</style>
