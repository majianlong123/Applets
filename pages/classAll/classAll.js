const app = getApp()
Page({
  data: {
    activeKey: 0,
    left_list: [],
    product_list: [],
    cate_id: '',
    serviceId: '',
    content: '',
    top_img: '',
  },
  onLoad: function (option) {
    this.getData()
  },

  onShow() {
    this.setData({
      serviceId: app.globalData.selectedClassIndex,
      activeKey: 0,
    })
  },

  onChange(e) {
    this.setData({
      activeKey: e.detail,
    })
  },

  // 获取左侧列表数据
  getData() {
    app.get('/member/info/lists',{
      id: 3
    }).then((res) => {
      let shi = res.data.info.content
      shi = shi.replace(/<img/gi, '<img style="width:100%;height:auto;" ')
      this.setData({
        content: shi,
        // top_img: res.data.info.picurl_str
      })
    })
  },


  // 获取默认数据
  default_list() {
    app
      .get('/member/product/lists', {
        page: 1,
        row: 10,
        cate_id: this.data.cate_id,
      })
      .then((res) => {
        this.setData({
          product_list: res.data.list,
        })
      })
  },

  // 跳转搜索
  search() {
    wx.navigateTo({
      url: `/pages/search/search`,
    })
  },

  clickClass(e) {
    this.setData({
      cate_id: e.currentTarget.dataset.id,
    })
    this.default_list()
  },

  // 跳转到预约信息
  goReservation(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/reservation/reservation?id=${id}`,
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
