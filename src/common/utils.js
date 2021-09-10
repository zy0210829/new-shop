export function debounce(func,delay){//debounce(准备执行的函数，等待时间)   防抖函数
  let timer = null ;//timer初始化为空,保存定时器的一个变量

  return function (...args){//返回一个新的函数  ...args :表示可以传入很多个参数
    if(timer)clearTimeout(timer)//当timer有true的时候，就清除上一次的定时器

    timer = setTimeout(() => {//清除定时器后就执行新的定时器，
      func.apply(this,args)//func  是传入的函数  apply（)是方法
    },delay)//假如delay为300ms  当300ms之前，有新的timer来了，就清除上一次的定时器，当300ms过后，没有新的timer来了，就执行这里面定时器 最后返回出去
  }
}

//时间戳
export function formatDate(date,format){
  //获取年份
  if(/(y+)/.test(format)){
    format = format.replace(RegExp.$1,(date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //
  let o={
    'M+':date.getMonth() + 1,//月
    'd+':date.getDate(),//天
    'h+':date.getHours(),//时
    'm+':date.getMinutes(),//分
    's+':date.getSeconds(),//秒
    'q+':Math.floor((date.getMonth() + 3) / 3),//一刻种 15分钟
    'S+':date.getMilliseconds(),//毫秒
  };
  for(let k in o){
    if(new RegExp(`(${k})`).test(format)){
      let str = o[k] + '';
      format =format.replace(RegExp.$1,(RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return format;

}
function padLeftZero(str){
  return ('00' + str).substr(str.length)
}
