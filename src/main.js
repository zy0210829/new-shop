import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import toast from "components/common/toast"
import Fastclick from "fastclick"
import VueLazyLoad from "vue-lazyload";
Vue.config.productionTip = false

//安装toast插件
Vue.use(toast)

//解决移动端300ms的延迟
Fastclick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/load.svg')
})

Vue.prototype.$bus = new Vue()//创建一个原型 等于空的vue实例  事件总线
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
