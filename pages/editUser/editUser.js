const app = getApp()
Page({
  data: {
    fileList: [],
    dataList: {},
    phone: '点击获取手机号',
    user_img: '',
    user_thumb: '',
    showName: false,
  },

  onShow: function () {
    this.getData()
  },
  // 获取个人信息
  getData() {
    app.get('/member/member/info').then((res) => {
      this.setData({
        dataList: res.data.info,
        user_img: res.data.info.thumb,
        phone: res.data.info.phone,
      })
    })
  },
  editName() {
    this.setData({
      showName: true,
    })
  },
  onClose() {
    this.setData({
      showName: false,
    })
  },
  // 获取手机号
  getPhoneNumber(e) {
    if (e.detail.errMsg.indexOf('ok') > -1) {
      const a = {}
      a.encryptedData = e.detail.encryptedData
      a.iv = e.detail.iv
      a.session = wx.getStorageSync('session_key')
      app.post('member/member/myphone', a).then((res) => {
        if (res.code == 1) {
          this.getData()
        }
      })
    } else {
      app.toastFail('拒绝绑定手机，可能影响小程序正常使用')
    }
  },
  // 绑定昵称
  onInput(e) {
    console.log(e)
    app.pulicSetData(e, this)
  },

  // 图片上传处理
  afterRead(event) {
    console.log(event)
    const { file } = event.detail
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    const that = this
    wx.uploadFile({
      url: 'http://t_shuaxing.demo2.dx623.com/member/image/upload', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      success(result) {
        const res = JSON.parse(result.data)
        // res.data.data.fileurl
        // 上传完成需要更新 fileList
        that.setData({
          user_img: res.data.fileurl_str,
          user_thumb: res.data.fileurl,
        })
        that.handapply()
        console.log(that.data)
      },
    })
  },

  handapply() {
    app
      .post('/member/member/edit', {
        nickname: this.data.dataList.nickname,
      })
      .then((res) => {
        if (res.code === 1) {
          this.onClose()
        } else {
          app.toastFail(res.msg)
        }
      })
  },
})
