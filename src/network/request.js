import axios from 'axios'

export function request(config){

  //1.创建实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/hy66',
    timeout:5000,
  })

  //2.拦截器

  //响应拦截
  instance.interceptors.response.use(res =>{
    return res.data//一般res里面data里面还有个data   这里返回的外面的data
  },error => {
    console.log(error);
  })

  //发送网络请求
  return instance(config)


}
