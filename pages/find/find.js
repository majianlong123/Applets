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
    console.log(111)
    this.onChange({
      detail:{
        name:"zhinan"
      }
    })
  },

  getData() {
    app.get('/member/article/lists', {
      page: 1,
      rows: 10,
      cate: this.data.active
    }).then((res) => {
      this.setData({
        tabBarList: res.data.cate_screen[1]
      })
    })
  },

  onChange(e) {
    console.log(e.detail)
    // this.data.active = e.detail.index
    app.get('/member/article/lists', {
      page: 1,
      rows: 10,
      cate: e.detail.name
    }).then((res) => {
      this.setData({
        article: res.data.list
      })
    })
  },
  // 跳转详情页
  toDetail(e) {
    wx.navigateTo({
      url: '/pages/articleDetail/articleDetail?id=' + e.currentTarget.dataset.id,
    })
  }
})
