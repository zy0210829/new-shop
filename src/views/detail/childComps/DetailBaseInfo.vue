<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <!--    Object.keys()，这个方法是获取到对象的所有键名；为了防止页面渲染的速度，快于异步数据请求的速度，这里要判断goods对象里面是否要长度，没有长度就是没有加载好-->

    <div class="info-title">{{goods.title}}</div>

    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span><!--    discount:折扣-->
    </div>

    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>

    <div class="service">
<!--      遍历 index 到 services长度-1 -->
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index"><!--这里遍历中的index是1-->
        <img :src="goods.services[index-1].icon " alt="">
        <span>{{goods.services[index-1].name}}</span><!--因为上面使用了services[3]的name，所以这里就把数组3里面的东西排除-->
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props:{
    goods:{
      type:Object,
      default(){
        return{}
      }
    }
  },

}
</script>

<style lang="less" scoped>/*安装依赖：依赖less文件   命令：npm install --save-dev less-loader@4.1.0 less@3.9.0*/

.info-title{
  margin:10px 0;
  padding:0 4px;
  font-size:14px;
  line-height:20px;
}
.info-price{
  display: flex;
  padding:0 4px 10px;
  .new-price{
    color:var(--color-high-text)
  }
  .old-price{
    color:#999;
    font-size:12px;
    margin: -1px 4px;
    text-decoration: line-through;/*穿过文本下的一条线。*/
  }
  .discount{
    color:#fff;
    font-size:12px;
    border-radius:100px;
    padding: 2px 6px;
    background-color: var(--color-high-text);
  }
}
.info-other{
  display: flex;
  color: #999;
  font-size: 12px;
  padding: 10px 4px;
  border-bottom: 1px solid #ededed;
  border-top: 1px solid #ededed;
  justify-content: space-between;
}
.service {
  display: flex;
  font-size: 12px;
  color: #333;
  padding: 10px 4px;
  justify-content: space-between;
  border-bottom: 4px solid #ededed;
  img {
    width: 12px;
    height: 12px;
    vertical-align: middle;
  }
}


</style>
