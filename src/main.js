import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import { request } from 'network/request'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


request({
  url: "home/multidata"
}, res => {
  console.log(0 ,res);
}, err => {
  console.log(0, err);
})

import {request1} from 'network/request'

request1({
  baseConfig: {
    url: "home/multidata"
  },
  success: res => {
    console.log(1, res)
  },
  failure: err => {
    console.log(1, err)
  }
})

// 最终方案1

import { request2 } from 'network/request'

request2({
  url: "home/multidata"
}).then(res => {
  console.log(2, res)
}).catch(err => {
  console.log(2, err)
})

真最终方案

import { request3 } from 'network/request'

request3({
  url: "home/multidataa"
}).then(res => {
  console.log(3, res)
}).catch(err => {
  console.log(3, err)
})
// axios({
//   url: "http://123.207.32.32:8000/home/data", //httpbin.org
//   params: {
//     type: 'pop',
//     page: 1
//   }
// }).then(res => {
//   console.log(res)
// })

// 全局配置
// axios.defaults.baseURL = "http://123.207.32.32:8000"
// axios.defaults.timeout = 5000

// // axios发送并发请求
// axios.all([axios({
//   url: "/home/multidata"
// }), axios({
//   url: "/home/data",
//   params: {
//     type: 'sell',
//     page: '1'
//   }
// })]).then(results => {
//   console.log(results)
// })

// .then(axios.spread((res1, res2) => {
//   console.log(res1);
//   console.log(res2);
// }))


// 创建对应的axios的实例

// const instance1 = axios.create({
//   baseURL: "http://123.207.32.32:8000",
//   timeout: 5000
// })

// instance1({
//   url :"/home/multidata",
// }).then(res => {
//   console.log(res)
// })

// instance1({
//   url: "home/data",
//   params: {
//     type: "pop",
//     page: "1"
//   }
// }).then(res => {
//   console.log(res)
// })

// const instance2 = axios.create({
//   baseURL: "",
//   timeout: 3000,

// }).then(res => {
//   console.log(res)
// })
