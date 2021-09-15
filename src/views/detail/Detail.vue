<template>
  <div class="detail">
    <!--    头部-->
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="navBar"/>
    <!--    滚动组件-->
    <scroll class="content" ref="scroll" @scroll="scrollContent" :probeType="3"><!--必须要有固定的高度-->
      <!--    轮播图-->
      <detail-swiper :top-images="topImages"></detail-swiper><!--    将请求到的数据传入detailSwiper组件里面去-->
      <!--      商品的基本信息-->
      <detail-base-info :goods="goods"></detail-base-info>
      <!--      店铺信息-->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!--      上身效果图片-->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <!--      尺码表-->
      <detail-param-info :param-info="paramInfo" ref="paramInfo"></detail-param-info>
      <!--      用户评论-->
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <!--      推荐图片-->
      <goods-list :goods="recommendInfo" ref="recommend"></goods-list>
    </scroll>

    <!--    底部栏-->
    <detail-bottom-bar @addCart="addShopCart"></detail-bottom-bar>

  </div>
</template>

<script>
import {getDetail, Goods, GoodsParam, Shop,getRecommend} from "../../network/detail";//导入请求的数据
import Scroll from "../../components/common/scroll/Scroll";//导入滚动
import {debounce} from "../../common/utils";//导入防抖函数
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "../../components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";

export default {
  name: "Detail",
  components:{
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  data(){
    return{
      iid:null,//用于保存iid
      topImages:[],//轮播图图片
      goods: {},//保存请求的商品标题，商品价格 的数据
      shop:{},//保存请求的店铺信息的数据
      detailInfo:{},//保存店铺里面的上身效果图片
      paramInfo:{},//保存尺码表里面的实际
      commentInfo:{},//保存用户评论的信息
      recommendInfo:[],//保存详情页的推荐图片
      themeTopYs:[],//定义一个数组，保存其他组件的offsetTop的高度
      getThemeTopY:null,//定义一个null  去保存 防抖函数返回一个新的函数
      navBarHeight:0,//计算tabbar的高度
      saveIndex:0,//保存下面i的值
    }
  },
  created(){
    //1.在详情页创造之前拿到iid并且保存
    this.iid = this.$route.params.iid

    //2.传入iid，里面会去根据iid去请求详情页的数据
    getDetail(this.iid).then(res => {
      const data = res.result//把获取的数据对象 里面的result对象保存在data里面
      //1.轮播图      将请求到的数据保存
      this.topImages = data.itemInfo.topImages

      //2.获取商品信息  把请求到的数据里面的一些传入Goods类里面，在哪里在进行筛选
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      //4.商品详细信息
      this.detailInfo = data.detailInfo;

      //5.商品的尺码表
      if((data.itemParams.info && data.itemParams.rule) !==0){
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      }


      //6.评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }

    })

    //3.请求详情页中的推荐图片
    getRecommend().then( res =>{
      this.recommendInfo = res.data.list
    })

    //4.点击标题滚动到对应的内容
    this.getThemeTopY = debounce(()=>{
      //向themeTopYs数组了添加各个组件对应的高度
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop - this.TabNavBarHeight);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - this.TabNavBarHeight);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - this.TabNavBarHeight);
      this.themeTopYs.push(Number.MAX_VALUE);//为了下面更好的使用if，这里加一个最大值
    },200)

  },
  mounted() {//监听推荐的图片加载完成没有
    //调用防抖函数 , 把准备执行的函数传入进去  这里是传入的是this.$refs.scroll.refresh方法
    const refresh = debounce(this.$refs.scroll.refresh,300)//这里的 refresh 是一个函数  是 this.debounce(）里面返回的函数
    //监听发射的事件总线的事件
    this.$bus.$on('itemImgLoad',() =>{
      //当监听到图片加载完成后发射过来的信息，调用refresh    防抖这个函数
      refresh()
    })

    //当推荐图片加载完后，调用getThemeTopY() 防抖函数
    this.getThemeTopY()
  },
  computed:{
    //计算tabbar的高度
    TabNavBarHeight(){
      return this.navBarHeight = this.$refs.navBar.$el.offsetHeight
    }


  },

  methods:{
    imageLoad(){
      //当详情页里面的上身效果图片全部加载完成。调用refresh()方法
      this.$refs.scroll.refresh()
      //调用getThemeTopY() 防抖函数
      this.getThemeTopY()
    },
    titleClick(index){
      //因为themeTopYs 这数组里面已经保存了
      //根据点击所得到的index来滚动
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
    },
    scrollContent(position){

      //1.获取y的值
      const positionY = - position.y
      //2.使positionY 与 themeTopYs 数组里面的值比较
      //[0, 6162, 6966, 7174, 1.7976931348623157e+308]
      //positionY 在0和6162之间，index =0
      //positionY 在6162和6966之间，index =1
      //positionY 在6966和7174之间，index =2
      //positionY 在7174和最大值之间，index =3

      let length = this.themeTopYs.length//保存长度
      for(let i = 0;i < length-1;i++){
        //this.saveIndex !== i 因为每次都要把i的值赋值给saveIndex 这里为了不重复赋值，当他们值一样就不满足if条件
        //当positionY 大于等于 themeTopYs数组中的第i个数 并且 当positionY 小于  themeTopYs数组中的第i+1个数
        if(this.saveIndex !== i && (positionY >= this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
          //把i赋值给saveIndex保存
          this.saveIndex = i;
          //根据saveIndex保存的值去改变navBar组件里面的currentIndex，这样就可以滚动内容显示对于的标题
          this.$refs.navBar.currentIndex = this.saveIndex

        }
      }

    },
    addShopCart(){
      //1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2.将商品添加到购物车里面
      this.$store.dispatch('addCart',product).then(res =>{
       // 当第一次加入商品的时候，调用toast组件的show方法
        this.$toast.show(res,1000)
      }).catch(err => {
        //当不是第一次加入商品的时候
        this.$toast.show(err,1000)
      })
    }
  }
}
</script>

<style scoped>
/*.detail{
  position:relative;
  z-index:999;
  background-color: #fff;
}*/
.detail{
  height: 100vh;

}
.detail-nav-bar{
  position: relative;
  z-index: 999;
  background-color: #fff;
}
.content{
  height: -webkit-calc(100% - 44px - 49px);
  height: calc(100% - 44px - 49px);
}

</style>
