<template>
  <div class="shop-info">
<!--    店铺顶部-->
    <div class="shop-top">
      <!--店铺logo-->
      <img :src="shop.logo" alt="">
      <!--店铺名称-->
      <span class="title">{{shop.name}}</span>
    </div>
<!--  店铺中间-->
    <div class="shop-middle">
        <!--店铺中间里面的左边-->
      <div class="shop-middle-item shop-middle-left">
                <!--总销量-->
        <div class="info-sells">
          <div class="sells-count">
            {{shop.sells | sellCountFilter}}
          </div>
          <div class="sells-text">
            总销量
          </div>
        </div>
<!--        全部宝贝-->
        <div class="info-good">
          <div class="goods-count">
            {{shop.goodsCount}}
          </div>
          <div class="goods-text">
            全部宝贝
          </div>
        </div>
      </div>
<!--店铺中间里面的右边-->
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item ,index) in shop.score" :key="index">
            <td class="speak">{{item.name}}</td>
<!--            根据item.isBetter传过来的值动态绑定样式-->
            <td class="score" :class="{'score-better' : item.isBetter}"><span>{{item.score}}</span></td>
            <td class="better" :class="{'better-more' :item.isBetter}">
              <span>{{item.isBetter ? '高' : '低'}}</span>
            </td>
          </tr>
        </table>
      </div>

    </div>

    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",

  props:{
    shop:{
      type:Object,
      default(){
        return{}
      }
    }
  },
  filters:{
    sellCountFilter:function (value){
      if(value < 10000) return value
      return (value/10000).toFixed(1)+'万'//toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
    }
  },

}
</script>

<style lang="less" scoped>
/*整个盒子*/
.shop-info{
  padding: 0.64rem 0.34rem;
  border-bottom: 0.128rem solid rgba(128, 128, 128, 0.2);
  font-size: 0.75rem;
}
/*店铺顶部样式*/
.shop-top{
  margin: 10px 10px;
  /*align-items: center;*//*元素位于容器的中心。 弹性盒子元素在该行的侧轴（纵轴）上居中放置*/
  img{
    border-radius:100% ;
    width: 50px;
    height: 50px;
    vertical-align:middle;
    margin-right:10px ;
  }
  span{
    font-family: "微软雅黑",serif;
    font-size: 0.768rem;
  }
}
/**
  * 商店信息左右两侧的样式，整个商店信息是弹性盒子，
  * 可左边用弹性盒子做，右边用table做
  */
/*店铺中间样式*/
.shop-middle{
  font-size:12px;
  line-height: 22px;
}

.shop-middle{

  display: flex;

  .shop-middle-item{
    flex:1;

  }
  /*店铺中间的左边样式*/
  .shop-middle-left{
    display: flex;
    text-align: center;
    margin: 10px 8px;
    font-weight: bold;
    font-size: 12px;
    .info-sells{
      flex:1;
    }
    .info-good{
      flex: 1;
      border-right: 1px solid #ccc;
    }

  }
  /*店铺中间的右边样式*/
  .shop-middle-right{

    padding-left: 20px;
    box-sizing:border-box;
    table tr{
      height: 20px;
      line-height: 20px;
      text-align: center;
      .speak{
        width: 58px;
      }
      .score{
        color: #079039;
        width: 40px;
        text-align: left;
        padding-left:20px ;
      }
      .better{
        color: #079039;
        width: 40px;
      }
    }
  }
}
/*店铺底部的样式*/
.shop-bottom{
  padding: 10px 0;
  .enter-shop{
    display: flex;
    align-items: center;
    justify-content: center;
    margin:0 auto;
    width: 200px;
    height: 30px;
    background-color: rgba(128, 128, 128, 0.1);
    border-radius:50px;
  }
}


.score-better span{
  color: #ff5000;
}
.better-more span{
  color: #ff5000;
  background-color: #fff1eb;
  border-radius:100%;
}
</style>
