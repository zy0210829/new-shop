<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0,
    },
    pullUpLoad:{
      type:Boolean,
      default: false,
    }

  },
  data(){
    return{
      scroll:null
    }
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)//调用scrollTo（x,y,滚动动画执行的时长ms）方法  返回顶部
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()//调用了上拉加载完成的方法
    },
    refresh(){
      this.scroll && this.scroll.refresh()//调用了scroll对象里面的刷新方法
    },
    getScrollY(){//判断scroll 是否有值  有就返回y坐标
      return this.scroll ? this.scroll.y : 0
    }
  },

  mounted(){
    //1.监听BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      //observeDOM 这个属性会在 better-scroll 内部帮我们监听 content 的高度变化，自动的帮我们调用内部的 refresh，再也不
      // 用为了图片内容早better-scroll对象创建的时候没加载出来导致不能滚动而到处的refresh了。
        observeDOM:true,//开启 observeDOM  插件
        click:true,
        probeType:this.probeType,//根据外面的组件传过来的值设置是否实时监听
        pullUpLoad:this.pullUpLoad,//上拉加载更多
        ObserveImage:true/*,开启对 wrapper 子元素中图片元素的加载的探测。无论图片的加载成功与否，都会自动调用 BetterScroll 的 refresh 方法来重新计算可滚动的宽度或者高度，新增于 v2.1.0 版本*/

    })
    //2.监听滚动的位置
   if(this.probeType === 2 ||this.probeType === 3){
     //probe 侦测  这里0 和 1 都是不能侦测的
     //2的时候   当手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
     //3的时候   只要是滚动，都进行侦测
     this.scroll.on('scroll',(position) =>{
       this.$emit('scroll',position)//把实时监听到的x和y发射出去
     })
   }
    //3.监听上拉事件
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',() =>{
        this.$emit('pullingUp')
      })
    }

  }
}
</script>

<style scoped>

</style>
