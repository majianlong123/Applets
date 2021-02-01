// pages/Details/Details.js
const app = getApp()
import Dialog from '@vant/weapp/dialog/dialog'

Page({
  data: {
    steps: [],
    orderId: '',
    orderInfo: {},
    order_item: [],
    education: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   orderId: options.orderId,
    // })
    this.geteducation()
  },

  geteducation() {
    app.get('/member/info_list/lists',{
      page: 1,
      row: 50,
      id: 4
    }).then((res) => {
      this.setData({
        education: res.data.list,
      })
    })
  },
  // 返回上一页
  back() {
    wx.navigateBack({
      delta: 2
    })
  },
  refund(e) {
    this.cancelOrder(e)
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
