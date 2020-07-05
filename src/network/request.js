import axios from 'axios'

export function request(config, success, failure) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000",
    timeout: 5000
  })

  instance(config).then(res => {
    // console.log(res);
    success(res)
  }).catch(err => {
    // console.log(err);
    failure(err)
  })
}

export function request1(config) {
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000",
    timeout: 5000
  })

  instance(config.baseConfig).then(res => {
    config.success(res)
  }).catch(err => {
    config.failure(err)
  })
}

// 最终方案1

export function request2(config) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: "http://123.207.32.32:8000",
      timeout: 5000
    })

    instance(config)
      .then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
  })
}

// 真最终方案

export function request3(config) {
  const instance = axios.create({
    baseURL: "http://152.136.185.210:8000/api/n3",
    timeout: 5000
  })

  // axios的拦截器
  axios.interceptors.request.use(config => {
    console.log('拦截' ,config);
    return config
  }, err => {
    console.log('拦截' ,err)
  });
  axios.interceptors.response.use(res => {
    console.log(res)
    return res.data
  }, err => {
    console.log(err)
  })

  return instance(config)
}
