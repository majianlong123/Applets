// pages/article/article.js
const app = new getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    totalPage: '',
    orderList: [],
    type: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  // 查询列表
  getData(type) {
    app
      .get('/member/article/lists', {
        page: 1,
        rows: 8,
        cate: 'm_notice',
      })
      .then((res) => {
        this.data.totalPage = res.data.page_total
        let orderList = this.data.orderList
        const resList = res.data.list
        if (type === 'down') {
          orderList.push(...resList)
          this.setData({
            orderList: this.data.orderList,
          })
        } else {
          this.setData({
            orderList: resList,
          })
        }
      })
  },
  // 跳转到文章详情
  articleDeatail(e) {
    wx.navigateTo({
      url: '../articleDetail/articleDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.page < this.data.totalPage) {
      this.data.page += 1
      this.getData('down')
    }
  },
})
