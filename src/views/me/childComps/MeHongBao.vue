<template>
  <div class="hong-bao">
    <div class="left">
      <div class="left-top">超级吃货分享红包</div>
      <div class="left-bottom">
        <span>5元大额红包</span>
        <span class="qiang">马上抢</span>
      </div>
    </div>

    <div class="right">
      <img src="../../../assets/img/me/hongbao/hongbao.svg" alt="">
    </div>


  </div>
</template>

<script>
export default {
  name: "MeHongBao"
}
</script>

<style scoped>
.hong-bao{
  margin: 10px 12px;
  background-color: #fff;
  border-radius:12px ;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left{
  flex: 1;
  flex-direction: column;
}
.left-top{
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  margin: 15px 10px;
}
.left-bottom{
  color: #999999;
  font-size: 14px;
  margin-left:10px;
  margin-bottom: 15px;
}
.qiang{
  background-color: #ee4714;
  color: #fff;
  font-size: 12px;
  margin-left:5px ;
  border-radius: 15px;
  padding:2px 5px;
}


.right{
  display: flex;
  width:60px ;
  margin-top: 7px;
  margin-right: 15px;

}
.right img{
  width: 60px;
  height: 60px;

}
</style>
