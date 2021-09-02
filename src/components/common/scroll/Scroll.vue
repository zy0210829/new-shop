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
      this.scroll.scrollTo(x,y,time)//调用scrollTo（x,y,滚动动画执行的时长ms）方法
    },
    finishPullUp(){
      this.scroll.finishPullUp()
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
        pullUpLoad:this.pullUpLoad,//下拉加载更多

    })
    //2.监听滚动的位置
    this.scroll.on('scroll',(position) =>{
     this.$emit('scroll',position)//把实时监听到的x和y发射出去
    })
    //3.监听上拉事件
    this.scroll.on('pullingUp',() =>{
      this.$emit('pullingUp')
    })
  }
}
</script>

<style scoped>

</style>
