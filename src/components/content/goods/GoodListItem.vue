<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props:{
    goodsItem:{//接收组件传过来的一个个item对象数据  然后item把数据渲染出来
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
.goods-item{
  position: relative;
  padding-bottom: 44px;
  width: 48%;
}
.goods-item img{
  width: 100%;
  border-radius:5px;

}
.goods-info{
  font-size:12px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  text-align: center;
  overflow: hidden;

}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;/*显示省略符号来代表被修剪的文本。*/
  white-space: nowrap;/*nowrap :强制在同一行内显示所有文本，直到文本结束或者遭遇 br 对象。*/
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.collect {
  position: relative;
}
 .collect::before{
  content: '';
  position: absolute;
  left:-15px;
  top:0;
  width: 14px;
  height: 14px;
   /*第一个数字0表示背景颜色,第二个数字 0/14
   0是background-position的属性简写,设置背景图像的起始位置
   14px 是background-size的属性简写，规定背景图像的尺寸
   第三个数字 14px和前面14px共同构成background-size*/
  background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;

}
</style>
