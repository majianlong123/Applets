// import { login, unCheckLogin } from '@/utils/login' //导入
import authConfig from './authConfig'
import userAuth from './userAuth'
import Fly from './dist/npm/wx'
const fly = new Fly()
fly.config = {
  headers: {
    'X-Tag': 'flyio',
    'content-type': 'application/json',
  }, //请求头
  baseURL: 'https://axqyedu.com', //请求基地址
  //是否自动将Content-Type为“application/json”的响应数据转化为JSON对象，默认为true
  parseJson: true,
  timeout: 20000, //超时时间10秒
}

const newFly = new Fly()
newFly.config = fly.config

fly.interceptors.request.use(async (request) => {
  // 锁定请求, 避免不必要的请求
  wx.showLoading({
    title: '等待中',
    mask: true,
  })
  fly.lock()
  try {
    // var token = await userAuth.getTokensByFly(authConfig.options)
    // var token = wx.getStorageSync('token')
    // var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzaHVheGluZyIsImF1ZCI6Im1lbWJlciIsInNjb3BlcyI6Im1lbWJlcl9hY2Nlc3MiLCJpYXQiOjE1OTg5MjY2NDYsImRhdGEiOnsibWVtYmVyaWQiOjF9LCJleHAiOjE2MDE1MTg2NDZ9.Gyd9pGYuiFVCTr4cD9NB501IcUHuJXvxycVNf7QJUDc'

    // request.headers['Authorization'] = 'Bearer ' + token
    return request
  } catch (e) {
  } finally {
    wx.hideLoading()
    fly.unlock() //解锁后，会继续发起请求队列中的任务
  }
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  function (response) {
    //只将请求结果的data字段返回
    if (response.data.code == 0) {
      wx.showToast({
        title: response.data.msg,
        icon: 'none',
        duration: 2000,
      })
      return Promise.reject(response.data)
    }
    return response.data
  },
  function (err) {
    //发生网络错误后会走到这
    if (err.status === 900) {
      userAuth.clearTokens() //清除token
      //重新发起一次原来的请求
      //   return fly.request(err.request)
    } else {
      if (err.response.data) {
        wx.showToast({
          title: err.response.data,
          icon: 'none',
        })
      } else {
        wx.showToast({
          title: err.message,
          icon: 'none',
        })
      }
    }
  }
)

export { newFly, fly }
