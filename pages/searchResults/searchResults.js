//获取应用实例
const app = getApp()
Page({
  data: {
    value: '',
    page: 1,
    totalPage: 1,
    orderList: [],
  },
  onLoad: function (option) {
    this.setData({
      value: option.value,
    })
    this.getData()
  },
  onShow() {},

  //下拉事件
  onReachBottom() {
    if (this.data.page < this.data.totalPage) {
      this.data.page += 1
      this.getData('down')
    }
  },

  getData(type) {
    app
      .get('/member/product/lists', {
        page: this.data.page,
        row: 8,
        keywords: this.data.value,
      })
      .then((res) => {
        this.data.totalPage = res.data.page_total
        let orderList = this.data.orderList
        const resList = res.data.list
        console.log(resList)
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

  open(e) {
    const id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: `/pages/reservation/reservation?id=${id}`,
    })
  },

  onClear() {
    this.data.value = ''
    this.onSearch()
  },
})
