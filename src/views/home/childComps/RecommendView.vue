<template>
  <div id="recommend-view">
    <div v-for="item in recommends " class="recommend-view-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div class="title">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }

}
</script>

<style scoped>
#recommend-view{
  display: flex;
  text-align: center;
  font-size:0.8rem;
  padding: 0.65rem 0 20px;
  border-bottom: 9px solid #eee;
}
.recommend-view-item{
  flex:1;
}
.recommend-view-item img{
  width: 80%;
}
.title{
  margin-top: 5px;
}
</style>
