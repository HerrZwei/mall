import { request3 } from "./request";

export function getHomeMultidata() {
    return request3({
      url: '/home/multidata'
    })
}

export function getHomeGoods(type, page) {
  return request3({
    url: 'home/data',
    params: {
      type,
      page
    }
  })
}
