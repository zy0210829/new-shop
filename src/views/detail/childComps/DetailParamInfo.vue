<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <!--    尺码信息-->
    <table v-for="(table,index) in paramInfo.sizes" class="info-size" :key="index">
      <tr v-for="(tr,index) in table" :key="index">
          <td v-for="(td,index) in tr" :key="index">
            {{td}}
          </td>
      </tr>
    </table>
    <!--    商品产地之类的信息-->
    <table class="info-parma">
      <tr v-for="(info,index) in paramInfo.infos" :key="index">
        <td class="info-parma-key">
          {{info.key}}
        </td>
        <td class="parma-value">
          {{info.value}}
        </td>
      </tr>
    </table>
    <!--    当有图片的时候展示-->
    <div class="info-img" v-if="paramInfo.iamge.length !== 0">
      <img :src="paramInfo.iamge" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props:{
    paramInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },

}
</script>

<style lang="less" scoped>
.param-info{
  padding:20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
    table{
      width: 100%;
      border-collapse: collapse;/*边框会合并为一个单一的边框*/
        tr{
          height: 42px;
          td{
            border-bottom: 1px solid rgba(100,100,100,.1);
          }
        }
    }
}
.info-parma-key{
 /* 当value的数据量比较大的时候，会挤到key，所以给一个固定宽度*/
  width: 100px;
}
.info-parma{

  border-top:3px solid rgba(0,0,0,.1) ;
}
.parma-value{
  color:#eb4868;

}
.info-img img{
  width: 100%;
}
</style>
