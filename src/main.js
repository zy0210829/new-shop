import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()//创建一个原型 等于空的vue实例  事件总线
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
