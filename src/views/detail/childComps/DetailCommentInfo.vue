<template>

    <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
      <!--      用户评价-->
      <div class="info-header">
        <div class="header-title">
          用户评价
        </div>
        <div class="info-more">
          更多
          <i class="arrow-right"></i>
        </div>
      </div>
      <!--      用户名称与图片-->
      <div class="info-user">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <!--用户评论的内容-->
      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-other">
          <span class="date">
            {{commentInfo.created | showDate}}
          </span>
          <span>
            {{commentInfo.style}}
          </span>
        </div>
        <!--        用户评论的图片-->
        <div class="info-imgs">
          <img :src="item" alt="" v-for="(item,index) in commentInfo.images" :key="index">
        </div>

      </div>


    </div>



</template>

<script>

import {formatDate} from "../../../common/utils";
export default {
  name: "DetailCommentInfo",
  props:{
    commentInfo:{
      type:Object,
      default(){
        return{}
      }
    }
  },

  filters:{
    showDate:function (value){
      //将时间戳转成Date对象  value是秒  Date里面是毫秒
      let date = new Date(value*1000);
      /*将date进行格式化*/
      return formatDate(date,'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>

<style lang="less" scoped>
.comment-info{
  padding: 3px 12px;
  color:#333;
  border-bottom:1px solid rgba(0,0,0,.1);
      /*用户评价*/
    .info-header{
      height: 50px;
      line-height: 50px;
      border-bottom:1px solid rgba(0,0,0,.1);
        .header-title{
          float: left;
          font-size: 15px;
        }
        .info-more{
          float: right;
          margin-right: 10px;
          font-size: 13px;
        }
    };
    /*用户图片和名称*/
    .info-user{
      padding: 10px 0 5px;
        img{
          width: 42px;
          height: 42px;
          border-radius: 50%;
        };
        span{
          position: relative;
          font-size: 15px;
          top:-15px;
          margin-left: 10px;
        };
    };

    /*用户评论的内容*/
    .info-detail{
      padding: 0 5px 15px;
        p{
          font-size: 14px;
          color:#777;
          line-height: 1.5;
        }
        .info-other{
          font-size: 12px;
          color:#999;
          margin-top: 10px;
            .date{
              margin-right: 8px;
            }
        }
    };
    /*用户评论的图片*/
    .info-imgs{
      margin-top: 10px;
      img{
        width: 70px;
        height: 70px;
        margin-right:5px ;
      }
    }

}
</style>
