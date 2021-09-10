import VueRouter from 'vue-router'
import Vue from 'vue'


//路由懒加载导入
const home =() => import('../views/home/Home')
const item =() => import('../views/item/Item')
const ches =() => import('../views/ches/Ches')
const me =() => import('../views/me/Me')
const detail = () => import('../views/detail/Detail')
//1.安装插件
Vue.use(VueRouter)

//2.配置路由
const routes=[{
  path:'/',
  redirect:'/home',
  meta:{
    footShow:true
  }
},{
  path:'/home',
  component:home,
  meta:{
    footShow:true
  }
},{
  path:'/item',
  component:item,
  meta:{
    footShow:true
  }
},{
  path:'/ches',
  component:ches,
  meta:{
    footShow:true
  }
},{
  path:'/me',
  component:me,
  meta:{
    footShow:true
  }
},{
  path:'/detail/:iid',//动态路由 params
  component:detail,
  meta:{
    footShow:false
  }
}
]
const router =new VueRouter({
  routes,
  mode:'history',
})


//解决 Vue 路由重复点击报错问题
const  originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
  return originalPush.call(this,location).catch(err => err)
}



//3.导出
export default router
