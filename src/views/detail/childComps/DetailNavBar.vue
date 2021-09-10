<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in title" class="title-item" @click="titleItemClick(index)" :class="{active:currentIndex === index}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components:{
    NavBar,
  },
  data(){
    return{
      title:['商品','参数','评论','推荐'],
      currentIndex:0,//初始点击
    }
  },
  methods:{
    titleItemClick(index){
        this.currentIndex = index
        this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.back()//点击后返回上一页
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;
}
.title-item{
  flex:1;
}
.active{
  color: var(--color-high-text);
}
.back img{
  vertical-align: middle;/*让图片居中*/
  width: 16px;
  height: 16px;
}
</style>
