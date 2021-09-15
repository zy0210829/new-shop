<template>
  <!--  滚动-->
  <scroll class="content">
    <div id="item-left">
      <!--      遍历展示数据-->
      <div class="left-tab" v-for="(item,index) in list " :key="index" @click="shopClick(index)" :class="{active:index === currentIndex}">
        <span>{{item.title}}</span>
      </div>
    </div>
  </scroll>
</template>

<script>

import {getItem,getItemMaitKey} from "../../../network/item";
import Scroll from "../../../components/common/scroll/Scroll";
export default {
  name: "ItemLeft",
  components:{
    Scroll
  },
  data(){
    return{
      currentIndex:0,//当前点击
      currMaitKey:0,//当前点击分类的key
      miniWallkey: 0,
      list:null//保存数据
    }
  },

  mounted() {
    //调用函数去请求数据
    this.getItem()

  },

  methods:{
    //请求数据
    async getItem(){
      let res = await getItem()
      if(res){
        //把数据保存在list里面
        this.list = res.data.category.list;
        /*调用函数，传入初始点击值0*/
        this.shopClick(0)
      }


    },

    shopClick(index){
      //保存当前的index
      this.currentIndex = index
      if(this.list){
        //获取当前点击的index里面的maitKey的值保存在currMaitKey
        this.currMaitKey = this.list[index].maitKey
        //获取当前点击的index里面的miniWallKey的值保存在miniWallkey
        this.miniWallkey = this.list[index].miniWallkey
        //发出事件总线，把保存的currMaitKey和miniWallkey的值发射出去
        this.$bus.$emit('currMaitKey',[this.currMaitKey,this.miniWallkey])


      }

    }
  }
}
</script>

<style scoped>


/*左边目录样式*/
#item-left{
  width: 100%;
  background-color: #f6f6f6;
  font-size: 14px;

}
/*滚动样式*/
.content{
  height: 100%;
  overflow: hidden;
}
/*遍历的item样式*/
.left-tab{
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-left: 3px solid #f6f6f6;

}
/*文字样式*/
.left-tab span{
  font-weight:bold ;
}
/*动态绑定样式*/
.active{
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
  color: rgb(216,30,6);


}
</style>
