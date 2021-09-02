<template>
<!--  所有的item都展示同一个文字，同一个图片-->
  <div class="tab-bar-item" @click="Click">
    <div v-if="!Active">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="ActiveStyle"><!--绑定样式-->
      <slot name="item-text"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,//定义path传过来的值为字符串
    ActiveColor: {//定义传过来的颜色
      type:String,
      default:'#d81e06'
    },

  },
  computed:{
    Active(){//判断当前活跃的路由里面是否有传过来的this.path的路径   不等于-1  为turn
      return this.$route.path.indexOf(this.path) !== -1
    },
    ActiveStyle(){//判断 Active  是否活跃  活跃为真，把颜色设置为传过来的值  不活跃为假
      return this.Active ? {color:this.ActiveColor} : {}//根据活跃的路由把当前文字设置颜色
    }
  },
  methods:{
    Click(){
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>

.tab-bar-item{
  flex:1;
  text-align: center;
  height: 49px;
  font-size:14px;

}

.tab-bar-item img{
  height: 24px;
  width: 24px;
  margin-top: 3px;/*用了这个图片下面也会多3px，这是因为图片是基于基线对齐，而不是中线*/
  vertical-align: middle;/*要用这个把3px消除 ，使元素的中部与父元素的基线加上父元素x-height的一半对齐。*/
  margin-bottom: 2px;

}
</style>
