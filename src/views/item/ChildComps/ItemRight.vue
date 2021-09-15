<template>
  <div class="item-right">
    <!--    滚动组件-->
    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true" >
        <!--      顶部图片-->
        <item-right-info  :list="rightList" class="right-info"></item-right-info>
        <!--        control-->
        <tab-control :title="['综合','新品','销量']" @tabControlClick="tabControlClick" ref="tabControl" class="tab-control"></tab-control>
        <!--        展示图片-->
        <goods-list :goods="showGoods"></goods-list>
    </scroll>
  </div>
</template>

<script>
import ItemRightInfo from "./ItemRightInfo";
import Scroll from "../../../components/common/scroll/Scroll";
import TabControl from "../../../components/content/tabControl/TabControl";
import GoodsList from "../../../components/content/goods/GoodsList";
import {getItemMaitKey} from "../../../network/item";
import {getCategoryDetail} from "../../../network/item";

export default {
  name: "ItemRight",

  components:{
    ItemRightInfo,
    TabControl,
    GoodsList,
    Scroll
  },
  data(){
    return{
      RightMaitKey:0,//保存事件总线发射的MaitKey
      RightMiniWallkey:0,//保存事件总线发射的MiniWallKey
      rightList:[],//保存请求的顶部图片 数据
      miniWallkeyList:[],//保存请求过来的要展示的图片  的数据
      currentType:'pop',//默认类型
      goods:{//保存了 流行 新款 精选  这些数据
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
    }
  },

  computed:{
    showGoods(){
      //把点击goods里面的类型里面的list传入组件goods-list
      return this.goods[this.currentType].list
    }
  },

  mounted() {
    //监听到事件总线
   this.$bus.$on('currMaitKey',maitKey =>{
     //把传过来的MaitKey保存在RightMaitKey
       this.RightMaitKey = maitKey[0]
     //把传过来的MiniWallkey保存在RightMiniWallkey
       this.RightMiniWallkey = maitKey[1]


     //根据RightMaitKey去请求数据
     getItemMaitKey(this.RightMaitKey).then(res => {
       if(res){
         //把请求到的数据保存在rightList 里面
         this.rightList = res.data.list
       }
     })



  //调用3次函数   得到请求商品的数据

     this.getCategoryDetail('pop')
     this.getCategoryDetail('new')
     this.getCategoryDetail('sell')


   })


  },
  methods:{

    tabControlClick(index){
      //根据点击改变当前的currentType类型
      switch (index){
        case 0:
          this.currentType='pop';
          break;
        case 1:
          this.currentType='new';
          break;
        case 2:
          this.currentType='sell';
          /*this.getCategoryDetail(this.currentType)*/
          break;

      }
    },

    getCategoryDetail(currentType){
      //根据RightMiniWallkey去请求数据
      getCategoryDetail(this.RightMiniWallkey,currentType).then(res =>{
        //保存请求的数据
        this.goods[currentType].list = res

      })
    }







  },

}
</script>

<style scoped>
/*整个右边样式*/
.item-right{
  flex: 1;
  overflow: hidden;
}
/*右边的顶部样式*/
.right-info{
  display: flex;
  flex-wrap: wrap;
}
/*滚动样式*/
.content{
  height: 100%;
  overflow: hidden;
}

.tab-control{
  margin-bottom: 6px;
}
</style>
