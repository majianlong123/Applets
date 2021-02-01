// pages/Details/Details.js
const app = getApp()
import pay from '../../utils/pay'
import Dialog from '@vant/weapp/dialog/dialog'

Page({
  data: {
    active: 0,
    listInfo: [],
    title1: '',
    orderList: [],
    couseinfo: [],
    totalPage: 1,
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    this.getcourse()
  },
  getcourse() {
    app.get('/member/info_img/lists',{
      page: 1,
      rows: 50,
      id: 7
    }).then((res) => {
      this.setData({
        couseinfo: res.data.list,
      })
    })
  },
  getData() {
    app.get('/member/index/education',{
      page: this.data.page,
      row: 10,
      id: 4
    }).then((res) => {
      this.setData({
        listInfo: res.data.list,
      })
    })
  },
  goCalssInfo(e) {
    console.log(e.currentTarget.dataset)
    app.globalData.name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/classinfo/classinfo?id=${e.currentTarget.dataset.id}`
    })
  },
  // 跳转课程详情
  goClassInfo(e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/classinfo/classinfo?id=${e.currentTarget.dataset.id}`
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
