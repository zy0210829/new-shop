import {request} from "./request";

export function getItem(){//请求分类的数据
  return request({
    url:"/category"
  })

}



export function getItemMaitKey(maitKey) {//根据maitKey的值去请求数据
  return request({
    url: "/subcategory",
    params: {
      maitKey
    }
  });
}

export function getCategoryDetail(miniWallkey, type) {//根据miniKey的值去请求数据
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
//http://152.136.185.210:7878/api/m5/subcategory/detail?miniWallkey=10062603

