// pages/articleDetail/articleDetail.js
const app = new getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    id: null,
    content: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
    this.getData()
  },
  // 详情
  getData() {
    app
      .get('/member/article/info', {
        id: this.data.id,
      })
      .then((res) => {
        // let result = res.data.content.replace(
        //   /\<img/gi,
        //   '<img style="max-width:100%;height:auto;display:block" '
        // )
        wx.setNavigationBarTitle({
          title: res.data.info.title,
        }),
        this.setData({
          content: res.data.info.content,
        })
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
  onReachBottom: function () {},
})
