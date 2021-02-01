const app = getApp()

Page({
  data: {
    id: '',
    title: '',
    pic: '',
    content: '',
    name: ''
  },

  onLoad: function (options) {
    console.log(options)
    console.log(app.globalData.name)
    this.setData({
      id: options.id,
      name: app.globalData.name
    })
    this.getData()
    // this.getList()
  },
  getData() {
    app.get('/member/info_img/info',{
      id: this.data.id
    }).then((res) => {
      let shi = res.data.info.content
      shi = shi.replace(/<img/gi, '<img style="width:100%;height:auto" ')
      this.setData({
        title: res.data.info.title,
        pic: res.data.info.picurl_str,
        content: shi,
      })
    })
  },
  getList() {
    app.get('/member/info_list/info',{
      id: this.data.id
    }).then((res) => {
      console.log(res)
      this.setData({
        title: res.data.info.title,
        pic: res.data.info.picurl_str,
        content: res.data.info.content,
      })
    })
  },
  // 返回上一页
  back() {
    wx.navigateBack({
      delta: 2
    })
  },
  onShareAppMessage() {
    return {
      title: '爱学全优儿童成长中心',
    }
  },
  onShareTimeline() {
    return {
      title: '爱学全优儿童成长中心',
    }
  }
})