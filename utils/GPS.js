export default class gps {
  static wxGps() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          resolve(res)
        },
        fail: (info) => {
          resolve({ fail: info, type: 'fail' })
        },
      })
    })
  }
  static openGps() {
    return new Promise((resolve, reject) => {
      wx.openSetting({
        success: (res) => {
          let type = res.authSetting['scope.userLocation']
          resolve(type)
        },
      })
    })
  }
}
