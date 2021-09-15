/*addCart(context,payload){
      //find方法 当里面为true就说明找到了 返回这个item
      //用find方法去查找cartList里面的iid是否与传过来的iid一样 没找到这个oldProduct就没有值
      let oldProduct = context.state.cartList.find((item) => item.iid === payload.iid)
      //判断oldProduct是否有值
      if(oldProduct){
        //当有值的时候，只把count加1
        oldProduct.count += 1
      }else{
        //当没有值的时候，把传过来的payload加入count属性赋值为1
        payload.count = 1;
        //把传过来的payload加入到cartList里面去
        state.cartList.push(payload)
      }
    }*/

import {ADD_COUNTER,ADD_TO_CART} from "./mutation-types";

export default {
  addCart(context,payload) {
    return new Promise((resolve,reject) =>{
      let oldProduct = context.state.cartList.find((item) => item.iid === payload.iid)
      //当里面有值的时候
      if (oldProduct) {
        //将这个提交到mutation里面处理
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量加1')
      } else {//当里面没有oldProduct的时候
        payload.count = 1;
        payload.checked = true;
        context.commit(ADD_TO_CART, payload)
        reject('添加了新的商品')
      }
    })
  }
}
