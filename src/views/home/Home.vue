<template>
  <div id="home">
<!--    导航栏-->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div><!--这里用具名插槽只替换了中间的插槽  -->

    </nav-bar>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="scrollPosition"
            :pull-up-load="true" @pullingUp="pullingUp">
      <!--轮播图-->
      <home-swiper :banners="banners"></home-swiper><!--将这个banners传入homeswiper组件-->
      <!--   recommend: 推荐-->
      <recommend-view :recommends="recommends"></recommend-view>
      <!--    特点-->
      <feature-view></feature-view>
      <!--    选项卡控件-->
      <tab-control :title="['流行','新款','精选']" class="tab-control" @tabControlClick="tabControlClick"></tab-control>
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

export default {
  name: "Home",
  data(){//用data来保存请求过来的数据
    return{
      banners:[],//保存了 轮播图 的数据
      recommends:[],//保存了 推荐 的数据
      goods:{//保存了 流行 新款 精选  这些数据
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',//默认当前的类型，
      isShow:false,//返回顶部按钮默认不显示
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
  created(){//当组件创建完成后就调用这个生命周期函数 ，去发送网络请求
    //1.调用函数 得到请求的数据
    this.getHomeMultidataNew()
    //2.调用3次函数   得到请求商品的数据
    this.getHomeGoodsNew('pop')
    this.getHomeGoodsNew('new')
    this.getHomeGoodsNew('sell')
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
        this.goods[type].page += 1//修改 数据goods里面的page 的值

        this.$refs.scroll.finishPullUp()
      })



    },
    /**
     * 事件监听的方法
    */
    tabControlClick(index){//当收到子组件发射的index就执行这个方法
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
    },
    /*返回顶部*/
    backClick(){
      this.$refs.scroll.scrollTo(0,0)//调用this.$refs.scroll 对象里面的方法
      //this.$refs.scroll..scroll.scrollTo(0,0,500)
      // this.$refs.scroll  拿到这个组件对象 后面的 scroll 是对象里面的属性  调用scrollTo（x,y,滚动动画执行的时长ms）方法
    },
    scrollPosition(position){//接收发射过来的 实时监听的位置
      this.isShow = - (position.y) > 1500
    },
    pullingUp(){//上拉加载更多  里面传入的当前活跃的类型 表示你点击了谁，只加载谁下面的数据
      this.getHomeGoodsNew(this.currentType)
    }

  }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh;/*视口*/
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color:#fff;
  position: fixed;
  left:0;
  right: 0;
  top:0;
  z-index:999;
}

.tab-control{
  position: sticky;/*粘性的*/
  top:44px;
  background-color: #fff;
  z-index: 99;
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

</style>
