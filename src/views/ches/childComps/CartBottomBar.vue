<template>
  <div class="bottom-bar">
    <!--    全选按钮-->
    <div class="checked-select">
      <check-button class="checkedButton"></check-button>
      <span>全选</span>
    </div>
    <!--    商品总价-->
    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate">
      去结算:{{checkLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components:{
    CheckButton,
  },
  computed:{
    totalPrice(){
      //filter 过滤器  把item.checked 为true的商品返回
      return '¥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) =>{//接着filter里面返回的值计算的  preValue  表示前一个值 这里的item是filter返回的值
        //前一个数  加  价格*数量      当这里计算完成后就把这个数返回出去  然后0就变成这里计算的数
        return preValue + item.price * item.count
      },0).toFixed(2)//保留2位小数
    },
    //获取被选中的长度
    checkLength(){
      return this.$store.state.cartList.filter( item => item.checked).length
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  display: flex;
  position: relative;

  background-color: #eee;
  height: 40px;
  line-height: 40px;

}
.checked-select{
  display: flex;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin: 5px;

}
.checked-select span{
  font-size: 15px;
  font-weight: 700;
  margin-left:3px ;
}

.checkedButton{
  width: 20px;
  height: 20px;
  line-height: 20px;

}
.price{
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.calculate{
  width: 100px;
  text-align: center;
  background-color: red;
  color:#fff;
}
</style>
