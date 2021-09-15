<template>
  <div class="head">
    <div class="head-top">
      <div class="head-top-use">
        <img src="../../../assets/img/me/use.jpg" alt="">
      </div>

      <div class="head-top-name"><span>行走的猪</span></div>

      <div class="head-top-set">
        <div class="user-profile">
          <img src="../../../assets/img/me/order/user.svg" alt="">
        </div>
        <div class="user-set">
          <img src="../../../assets/img/me/order/set.svg" alt="">
        </div>
      </div>

    </div>





    <div class="head-bottom">
      <div v-for="item in info" class="bottom-item">
        <div class="bottom-flex">
        <span class="item-number">{{item.num}}</span>
        <span class="item-message">{{item.message}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MeHeadBar",
  data(){
    return{
      info:[
        {
        num:116,
        message:'收藏夹',
      },
        {
          num:23,
          message:'关注',
        },
        {
          num:22,
          message:'足迹',
        },
        {
          num:0,
          message:'红包卡劵',
        },

      ]
    }
  }
}
</script>

<style scoped>
.head{
  background:linear-gradient( #fe8b23,#ff5402) ;
  padding: 12px 10px;
  box-sizing: border-box;
}
.head-top{
  display: flex;
  width: 100%;
  align-self: flex-start;
  justify-content: flex-start;
  position: relative;
}
.head-top-use{
  margin-top: 32px;
  margin-left:10px ;
  display: flex;

}

.head-top-use img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}


.head-top-name{
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
  margin-left: 5px;
  overflow: hidden;

}
.head-top-name span{
  white-space: nowrap;
  text-overflow: ellipsis;
}

.head-top-set{
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  flex: 1;
  justify-content: flex-end;
}
.head-top-set img{
  margin-right: 10px;
  width: 20px;
  height: 20px;
}

.head-bottom{
  display: flex;
  text-align: center;
  color: #fff;
}
.bottom-item{
  flex: 1;
  margin-left: 5px;
}

.bottom-flex{
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.item-number{
  font-size: 14px;
}
.item-message{
  font-size: 12px;
  margin-top: 10px;
}
</style>
