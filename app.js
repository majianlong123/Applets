//app.js
import { fly } from './utils/request'
import authConfig from './utils/authConfig'

App({
  onLaunch: function (options) {
    authConfig.SETOPTIONS(options)
    // 获取用户信息
    // this.isBindPhone()
    // wx.getSetting({
    //   success: (res) => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: (res) => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         },
    //       })
    //     }
    //   },
    // })
  },
  globalData: {
    navHeight: wx.getSystemInfoSync()['statusBarHeight'] * 2,
    kcID: '',
    isPhone: true,
    name: '',
    selectedClassIndex: '',
    capsuleToTop: wx.getSystemInfoSync()['statusBarHeight'] + 6, //胶囊按钮距离顶部距离= 手机导航栏的高度(px)+6px
  },

  get: function (url, params) {
    return new Promise((resolve, reject) => {
      resolve(fly.get(url, params))
    })
  },

  post: function (url, data) {
    return new Promise((resolve, reject) => {
      resolve(fly.post(url, data))
    })
  },

  //input数据绑定
  pulicSetData(e, _this) {
    let name = e.currentTarget.dataset.name
    _this.setData({
      [name]: typeof e.detail.value == 'undefined' ? e.detail : e.detail.value,
    })
  },
  //失败提示
  toastFail(e) {
    wx.showToast({
      title: e,
      icon: 'none',
    })
  },
  //成功提示
  toastSuccess(e) {
    wx.showToast({
      title: e,
    })
  },
  // 时间
  countdown(_this, bool) {
    var nsecond = 60
    var that = _this
    var appCount = setInterval(function () {
      nsecond -= 1
      that.setData({
        Time: nsecond,
      })
      if (bool == true) {
        clearInterval(appCount)
      }
      if (nsecond < 1) {
        clearInterval(appCount)
        //取消指定的setInterval函数将要执行的代码
        that.setData({
          flogs: true,
        })
      }
    }, 1000)
  },
})
