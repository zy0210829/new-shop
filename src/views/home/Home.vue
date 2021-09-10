<template>
  <div id="home">
<!--    导航栏-->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div><!--这里用具名插槽只替换了中间的插槽  -->

    </nav-bar>
<!--    增加一行tabControl  当滚动的距离大于tab-control到top的距离才显示-->
    <tab-control :title="['流行','新款','精选']" @tabControlClick="tabControlClick"
                 ref="tabControlNew" class="tab-control-new" v-show="isTabFixed"></tab-control>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="scrollPosition"
            :pull-up-load="true" @pullingUp="pullingUp">

      <!--轮播图-->
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper><!--将这个banners传入homeswiper组件-->
      <!--   recommend: 推荐-->
      <recommend-view :recommends="recommends"></recommend-view>
      <!--    特点-->
      <feature-view></feature-view>
      <!--    选项卡控件-->
      <tab-control :title="['流行','新款','精选']" @tabControlClick="tabControlClick" ref="tabControl" clss="tab-control"></tab-control>
      <goods-list :goods="showGoods"></goods-list><!--   showGoods 根据点击获取类型-->
    </scroll>

<!--      返回顶部图标,click事件加了修饰符native可以监听组件-->
    <back-top @click.native="backClick" v-show="isShow"></back-top>

  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import featureView from './childComps/featureView';
import TabControl from "../../components/content/tabControl/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";
import Scroll from "../../components/common/scroll/Scroll";//滚动组件
import BackTop from "../../components/content/backTop/BackTop";//返回顶部
import {getHomeGoods, getHomeMultidata} from "../../network/home"; //导入要请求的数据
import {debounce} from "../../common/utils";//导入防抖函数

export default {
  name: "Home",
  data(){//用data来保存请求过来的数据
    return{
      banners:[],//保存了 轮播图 的数据
      recommends:[],//保存了 推荐 的数据
      goods:{//保存了 流行 新款 精选  这些数据
        'pop':{page:0,list:[],currentY:0},
        'new':{page:0,list:[],currentY:0},
        'sell':{page:0,list:[],currentY:0},
      },
      currentType:'pop',//默认当前的类型，
      tabOffsetTop:0,//保存tabControl的高度
      isShow:false,//返回顶部按钮默认不显示
      isTabFixed:false,//设置是否吸顶
      isScroll:0,//定义离开后在进入的高度
      /*scrollY:0,*/

    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    featureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

  },
  activated(){//当进入的时候 自动滚动到保存的y坐标位置
    this.$refs.scroll.refresh()//重新进入后再刷新页面
    this.$refs.scroll.scrollTo(0,this.isScroll,0)

  },
  deactivated() {//当离开的时候保存y坐标
    this.isScroll = this.$refs.scroll.getScrollY()
  },


  created(){//当组件创建完成后就调用这个生命周期函数 ，去发送网络请求
    //1.调用函数 得到请求的数据
    this.getHomeMultidataNew()
    //2.调用3次函数   得到请求商品的数据
    this.getHomeGoodsNew('pop')
    this.getHomeGoodsNew('new')
    this.getHomeGoodsNew('sell')

  },
  mounted(){

    //调用防抖函数 , 把准备执行的函数传入进去  这里是传入的是this.$refs.scroll.refresh方法
    const refresh = debounce(this.$refs.scroll.refresh,300)//这里的 refresh 是一个函数  是 this.debounce(）里面返回的函数
    //监听发射的事件总线的事件
    this.$bus.$on('itemImgLoad',() =>{
      //当监听到图片加载完成后发射过来的信息，调用refresh    防抖这个函数
      refresh()
    })
    /*this.goods[this.currentType].currentY = this.tabOffsetTop*/

  },
  methods:{
    //网络请求的方法
    getHomeMultidataNew(){
      //1.请求多个数据 （轮播图，推荐图）
      getHomeMultidata().then(res =>{//promise里面的 resolve(res)回调
        this.banners=res.data.banner.list;//把res对象里面的data对象的banner数据单独保存
        this.recommends=res.data.recommend.list;//把res对象里面的data对象的recommend数据单独保存
      })
    },
    getHomeGoodsNew(type){//传入一个参数
      const page = this.goods[type].page + 1//为了不把page写死，要动态获取page  拿到这个type里面最新的页码

      //2.请求商品的数据
      getHomeGoods(type,page).then(res =>{
        this.goods[type].list.push(...res.data.list);//用...对这个数据进行解析  解析后就是一个个数据 然后把一个个数据添加到数据goods里面
        this.goods[type].page += 1//修改 数据goods里面的page 的值 因为是箭头函数所以这里的this向上找  上面的page=this 哪里是指向的当前的组件对象（home），所以可以拿到里面的goods

        this.$refs.scroll.finishPullUp()//表示上拉加载更多完成了  这样才可能再次使用上拉加载更多
      })




    },
    /**
     * 事件监听的方法
    */
    tabControlClick(index){//当收到子组件发射的index就执行这个方法
    //保存点击前的pop的y坐标，点击后 判断滚动位置是否小于等于offsetTop的高度，如果小于就滚动到保存的滚动位置
      //如果大于就保存大于的坐标，并且滚动到哪里去

      //因为开始进来还没有点击的时候 this.currentType默认是'pop'
      // 当第一点击了index的时候，把点击前的y坐标保存到了pop里面
      //第二次点击了index的时候，根据第一次的index所得到的currentType的类型 把点击前的y坐标保存在所得到的currentType类型里面
      this.goods[this.currentType].currentY=this.$refs.scroll.getScrollY()
      switch (index){
        case 0:
          this.currentType='pop';
          break;
        case 1:
          this.currentType='new';
          break;
        case 2:
          this.currentType='sell';
          break;

      }
      //判断 当前goods里面的类型里面的currentY是否小于等于 tabControl 滚动的距离
      //因为tabControl 滚动的距离是正数，而类型里面的currentY是负数，所以需要加 -
      if(-this.goods[this.currentType].currentY <=this.tabOffsetTop){
        //当小于等于的时候 就滚动到 - tabOffsetTop 的高度，因为tabOffsetTop是正数
        this.$refs.scroll.scrollTo(0,-this.tabOffsetTop,0)
        //把tabOffsetTop的高度保存在当前类型的currentY 里面
        this.goods[this.currentType].currentY = this.tabOffsetTop
      }else{
        //当goods[this.currentType].currentY 里面的currentY  大于  tabControl滚动的距离
        //就滚动到currentY里面保存的值  的位置
        this.$refs.scroll.scrollTo(0,this.goods[this.currentType].currentY,0)
      }

      this.$refs.tabControl.currentIndex = index  //把当前点击的index赋值给tabControl.currentIndex
      this.$refs.tabControlNew.currentIndex = index //为了新加的tabControl标签与原来的点击保持一致 把当前点击的index赋值给tabControlNew.currentIndex  ,这样他们随便点击那个都是一样的index
    },
    /*返回顶部*/
    backClick(){
      this.$refs.scroll && this.$refs.scroll.scrollTo(0,0)//调用this.$refs.scroll 对象里面的方法
      //this.$refs.scroll.scroll.scrollTo(0,0,500)
      // this.$refs.scroll  拿到这个组件对象 后面的 scroll 是对象里面的属性  调用scrollTo（x,y,滚动动画执行的时长ms）方法
    },
    scrollPosition(position){

      /*console.log(position.y);*/
      //接收发射过来的 实时监听的位置 显示返回顶部
      this.isShow = - position.y > 1500
      //决定tabControl 是否吸顶
      this.isTabFixed = - position.y >this.tabOffsetTop  //当滚动的距离大于tabControl到顶部的距离 把isTabFixed变为true
    },
    pullingUp(){//上拉加载更多  里面传入的当前活跃的类型 表示你点击了谁，只加载谁下面的数据
      this.getHomeGoodsNew(this.currentType)//调用方法getHomeGoodsNew
    },
    swiperImgLoad(){
      //this.tabOffsetTop  607
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop //通过offsetTop方法  可以得到tabControl 滚动的距离

    }


  }
}
</script>

<style scoped>

#home{
  /*padding-top: 44px;*/
  height: 100vh;/*视口*/
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color:#fff;
 /* position: fixed;
  left:0;
  right: 0;
  top:0;
  z-index:999;*/
}


/*.content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
}*/
.content{
  position: absolute;
  top:44px;
  bottom:49px;
  overflow: hidden;

}
.tab-control-new{
  position: relative;
  background-color: #fff;
  z-index: 999;/*只有对定位元素起效果*/


}
</style>
