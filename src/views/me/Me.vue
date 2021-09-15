<template>
  <div class="me">
    <me-head-bar class="head-nav" ref="ss"></me-head-bar>
    <scroll class="content" ref="scroll" :probeType="3">
      <me-space></me-space>
      <me-order></me-order>
      <me-tool></me-tool>
      <me-hong-bao></me-hong-bao>

    </scroll>

  </div>
</template>

<script>
import Scroll from "../../components/common/scroll/Scroll";
import MeHeadBar from "./childComps/MeHeadBar";
import MeOrder from "./childComps/MeOrder";
import MeTool from "./childComps/MeTool";
import MeSpace from "./childComps/MeSpace";
import MeHongBao from "./childComps/MeHongBao";
export default {
  name: "Me",
  components:{
    MeHeadBar,
    MeOrder,
    MeTool,
    MeSpace,
    MeHongBao,
    Scroll,
  },

}
</script>

<style scoped>
.me{
  height:100vh;
  background-color: #f2f2f2;
}
.content{
  height: calc(100% - 154px - 49px - 10px);
  overflow: hidden;
}
</style>
