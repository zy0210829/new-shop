<template>
  <div class="cart-list-item">
    <!--    选中按钮-->
    <div class="item-selector">
      <check-button :is-checked="product.checked" @click.native="checkedClick"></check-button>
    </div>
    <!--商品图片-->
    <div class="item-img">
      <img :src="product.image" alt="">
    </div>
    <!--    商品信息-->
    <div class="item-info">
      <!--      商品标题与描述-->
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <!--      商品价格与数量-->
      <div class="info-bottom">
        <div class="item-price  left">¥{{product.price}}</div>
        <div class="item-count  right">×{{product.count}}</div>
      </div>
    </div>


  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton";
export default {
  name: "CartListItem",
  components:{
    CheckButton,
  },
  props:{
    product:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    checkedClick(){
      //把product.checked里面的值取反
      this.product.checked = !this.product.checked
    }
  }


}
</script>

<style scoped>
.cart-list-item{
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector{
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-img{
  padding: 5px;
}
.item-img img{
  width: 80px;
  height: 100px;
  display: block;
  border-radius:5px;
}
.item-info{
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-title,.item-desc{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

}
.item-info .item-desc{
  font-size: 14px;
  color:#666;
  margin-top: 15px;

}

.info-bottom{
  margin-top: 10px;
  position: absolute;
  bottom:10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price{
  color:orangered;

}
</style>
