import {request} from "./request";
export function getDetail(iid){//根据传入的iid去请求详情页的数据
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

export class Goods{//标题 价格 等数据抽离出来
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;

  }
}

export class Shop{//抽取详情页中商家的信息
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.score = shopInfo.score;
    this.sells = shopInfo.cSells;
    this.goodsCount = shopInfo.cGoods;
  }

}

export  class GoodsParam{//抽取详情页中尺码表的数据
  constructor(info,rule){
    //注意：这里面的images可能没有值（某些商品有，某些商品没有）
    this.iamge = info.images ? info.images[0] :'';
    this.infos = info.set;
    this.sizes = rule.tables;
  }

}

export function getRecommend(){//请求详情页的推荐图片
  return request({
    url:'/recommend'
  })
}
