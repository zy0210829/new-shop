<template>
  <div class="item">
    <!--    头部-->
    <nav-bar class="item-nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <!--    中间-->
    <div class="item-center">
        <!--      左边组件-->
        <item-left class="item-left" ></item-left>
        <!--      右边组件-->
        <item-right class="item-right" ></item-right>
    </div>
  </div>
</template>

<script>

import NavBar from "../../components/common/navbar/NavBar";
import ItemLeft from "./ChildComps/ItemLeft";
import ItemRight from "./ChildComps/ItemRight";
export default {
  name: "Item",
  components:{
    NavBar,
    ItemLeft,
    ItemRight
  },



}
</script>

<style scoped>
/*整个分类页面的样式*/
.item{
  background-color: #fff;
  height: 100vh;
}
/*头部样式*/
.item-nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
/*中间样式*/
.item-center{
  height:calc(100% - 49px - 44px);
  width: 100%;
  overflow: hidden;
  display: flex;
}
/*中间的左边样式*/
.item-left{
  width: 25%;
}


</style>
