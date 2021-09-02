//封装首页数据的请求
import {request} from './request'

export function getHomeMultidata(){//因为首页里面有很多请求，所以把每一个请求拆分，当需要用到那个请求的时候，就去调用那个函数

  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page){//请求 商品 的数据
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })


}
