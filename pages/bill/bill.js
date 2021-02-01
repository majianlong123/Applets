const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 'zhinan',
    tabBarList: [],
    article: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    this.onChange({
      detail:{
        name:"zhinan"
      }
    })
  },

  getData() {
    app.get('/member/member_bill/lists', {
      page: 1,
      rows: 10,
      // class: this.data.active
    }).then((res) => {
      console.log(res)
      this.setData({
        article: res.data.list
      })
    })
  },

  onChange(e) {
    console.log(e)
  },
  // 跳转详情页
  // toDetail(e) {
  //   wx.navigateTo({
  //     url: '/pages/articleDetail/articleDetail?id=' + e.currentTarget.dataset.id,
  //   })
  // }
})