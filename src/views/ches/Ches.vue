<template>
  <div class="cart">
    <!--    购物车-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!--商品的列表-->
    <cart-list></cart-list>
    <!--    结算-->
    <cart-bottom-bar></cart-bottom-bar>

  </div>
</template>

<script>
import {mapGetters} from "vuex"
import NavBar from "../../components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

export default {
  name: "Ches",
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    //1.mapGetter辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
    // 第一种写法
    // ...mapGetters(['cartLength']),
    //第二种写法
    ...mapGetters({
      length:'cartLength'
    })
  }
}
</script>

<style scoped>
.cart{
  height: 100vh;
}

.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
