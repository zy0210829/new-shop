<template>
  <div class="me-order">
    <!--    顶部-->
    <div class="order-top">
      <div class="order-top-left">
        <span>我的订单</span>
      </div>
      <div class="order-top-right"><span>查看全部订单</span></div>
      <!--      箭头-->
      <div class="order-top-right-svg">
        <img src="../../../assets/img/me/order/right.svg" alt="">
      </div>
    </div>


    <!--    底部-->
    <div class="order-bottom">
      <div v-for="(item,index) in info" :key="index" class="order-bottom-item">
        <div class="order-bottom-item-info">
          <img :src="item.url" alt="">
          <span>{{item.message}}</span>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "MeOrder",
  data(){
    return{
      info:[
        {
          url:require('../../../assets/img/me/order/pay.svg'),
          message:'待付款'
        },
        {
          url:require('../../../assets/img/me/order/fahuo.svg'),
          message:'待发货'
        },
        {
          url:require('../../../assets/img/me/order/shouhuo.svg'),
          message:'待收货'
        },
        {
          url:require('../../../assets/img/me/order/evaluate.svg'),
          message:'评价'
        },
        {
          url:require('../../../assets/img/me/order/refund.svg'),
          message:'退款/售后'
        }]
    }
  }
}
</script>

<style scoped>
.me-order{
  margin-left: 12px;
  margin-right: 12px;
  background-color: #fff;
  border-radius:12px ;
}
.order-top{
  border-bottom: 2px solid #f2f2f2 ;
  display: flex;
  padding: 10px 2px;
  align-content:center;
  justify-content:center;
}
.order-top-left{
  flex: 1;
  font-size: 14px;
  color: rgb(51,51,51);
  font-weight: bold;
  margin-left: 12px;


}
.order-top-right{
  font-size: 12px;
  color: rgb(153, 153, 153);
  flex: 1;

}
.order-top-right span{
  display: flex;
  justify-content: flex-end;
  align-content:center;
  margin-top: 1px;
}
.order-top-right-svg{
 margin:1px 5px 0 5px ;
}
.order-top-right-svg img{
  display: flex;
  width: 14px;
  height: 14px;
}

/*底部样式*/
.order-bottom{
  display: flex;
}

.order-bottom-item-info{
  display: flex;
  flex-direction: column;
  font-size: 12px;
  align-items: center;
  justify-content: center;
}

.order-bottom-item{
  flex: 1;
  margin-top: 10px;
}
.order-bottom-item img{
  height: 29px;
  width: 29px;
}
.order-bottom-item span{
  margin: 10px 0;
}

</style>
