import Vue from "vue"
import Vuex from "vuex"
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
//安装插件
Vue.use(Vuex)


//创建store对象
const state ={
    cartList:[]
}
const store =new Vuex.Store({
  state,
  mutations,
  actions,//可以放异步操作  判断逻辑
  getters,

  modules:{},

})

//挂载到Vue实例上
export default store
