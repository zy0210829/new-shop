<template>
  <div id="app">
    <keep-alive exclude="Detail"><!--    排除详情页的组件，这样详情页的组件就不会被缓存，可以重新创建，销毁-->
    <router-view></router-view>
    </keep-alive>
    <main-tab-bar v-if="$route.meta.footShow"></main-tab-bar>

  </div>
</template>

<script>
import MainTabBar from "./components/content/mainTabBar/MainTabBar";

export default {
  name: 'App',
  components:{
    MainTabBar,

  },

}
</script>

<style>
@import "./assets/css/base.css";/*导入初始化的css*/
</style>
