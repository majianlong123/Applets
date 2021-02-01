// pages/share/share.js
const app = new getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    datalist: [],
    imgArr: [],
    imgList: []
  },
  onLoad: function (options) {
    this.getData()
  },
  getData() {
    app.get('/member/info_img/lists',{
      page: 1,
      row: 50,
      id: 13
    }).then((res) => {
      console.log(res)
      this.setData({
        datalist: res.data.list,
      })
    })
  },
  // 图片预览
  previewImage(e) {
    let current = e.target.dataset.src
    console.log(e)
    this.data.imgList = this.data.datalist.map(item => item.picurl_str)
    wx.previewImage({
      current: current,
      urls: this.data.imgList
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
