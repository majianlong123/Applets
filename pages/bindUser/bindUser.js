const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nameType: 0,
    phoneType: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nameType: options.nameType || 0,
      phoneType: options.phoneType || 0,
    })
  },

  getUserInfo(res) {
    wx.getUserInfo({
      success: (res) => {
        this.editUser(res.userInfo.nickName, res.userInfo.avatarUrl)
      },
    })
  },

  editUser(nickname, thumb) {
    app
      .post('/member/member/edit', {
        nickname: nickname,
        thumb: thumb,
      })
      .then((res) => {
        if (res.code === 1) {
          this.setData({
            nameType: 1,
          })
        }
      })
  },

  getPhoneNumber(e) {
    if (e.detail.errMsg.indexOf('ok') > -1) {
      const a = {}
      a.encryptedData = e.detail.encryptedData
      a.iv = e.detail.iv
      a.session = wx.getStorageSync('session_key')
      app.post('member/member/myphone', a).then((res) => {
        if (res.code == 1) {
          wx.navigateBack()
        }
      })
    } else {
      app.toastFail('拒绝绑定手机，可能影响小程序正常使用')
    }
  },
})
