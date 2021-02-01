const app = getApp()

Page({
  data: {
    value: '',
    historyList: [],
    hotList: [],
  },

  onLoad: function (option) {
    wx.getStorage({
      key: 'searchVal',
      success: (res) => {
        this.setData({
          historyList: res.data,
        })
      },
    })
    this.getHot()
  },

  getHot() {},
  onShow() {
    app.get('/member/member/info', {}).then((res) => {
      this.setData({
        hotList: res.data.param.keywords
      })
    })
  },

  onSearch(e) {
    if (this.data.value) {
      this.storage()
      this.open(this.data.value)
    } else {
      app.toastFail('请输入你要搜索的物品')
    }
  },

  // 储存
  storage() {
    let list = this.data.historyList || []
    if (this.isContrast(list)) {
      list.unshift(this.data.value)
      list = this.isOverstep(list)
      this.setData({
        historyList: list,
      })
      wx.setStorage({
        key: 'searchVal',
        data: this.data.historyList,
      })
    }
  },

  // 判断是搜索相同字
  isContrast(list) {
    if (list.indexOf(this.data.value) == -1) {
      return true
    } else {
      return false
    }
  },

  // 判断搜索历史超出10个了
  isOverstep(list) {
    if (list.length < 10) {
      return list
    } else {
      list.splice(list.length - 1, 1)
      return list
    }
  },

  cloes() {
    this.setData({
      historyList: [],
    })
    wx.setStorage({
      key: 'searchVal',
      data: [],
    })
  },

  onChange(e) {
    this.setData({
      value: e.detail,
    })
  },

  clickItem(e) {
    let val = e.currentTarget.dataset.item
    this.open(val)
  },

  open(val) {
    wx.navigateTo({
      url: `/pages/searchResults/searchResults?value=${val}`,
    })
  },
})
