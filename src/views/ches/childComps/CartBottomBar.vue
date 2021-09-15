<template>
  <div class="bottom-bar">
    <!--    全选按钮-->
    <div class="checked-select">
      <check-button class="checkedButton" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
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
    },

    isSelectAll(){
      //用find方法去查找 里面按钮有没有不选中的(item => !item.checked)
      // 当有不选中的这个就返回值为true 所以需要取反 当有不选中的这个全选按钮为false
      if(this.$store.state.cartList.length === 0) return false//当里面没有数据的时候，返回false

      /* 这个方法也可以 但是效率没有find高
      return !(this.$store.state.cartList.filter(item => !item.checked).length)
      */

      /*
      //用循环也可以
      for(let item of this.$store.state.cartList){
        if(!item.checked){//如果有未选中，就返回false
          return false
        }
      }
      return true
      */
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods:{
    checkClick(){//点击全选按钮
      if(this.isSelectAll){//isSelectAll为true表示全部选中
        //当点击全选按钮的时候，如果商品全部都是选中的状态，那么就全部商品的状态改为未选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else{//部分或者全部不选中
        //当点击全选按钮的时候，如果商品只有一些选中，还有一些没有选中，就把全部商品的状态改为选中，让全部商品都处于选中状态
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
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
  justify-content: center;
  align-items: center;
  width: 100px;
  text-align: center;
  background-color: red;
  color:#fff;
}
</style>
