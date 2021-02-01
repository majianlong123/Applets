const app = getApp()
import Dialog from '@vant/weapp/dialog/dialog'
Page({
  data: {
    radio: '',
    type: false,
    adrList: [],
  },

  onLoad: function (options) {
    this.setData({
      type: options.type || false,
    })
  },
  onShow() {
    this.getData()
  },
  getData() {
    app.get('/member/address/lists').then((res) => {
      let radio = res.data.list.filter((item) => {
        return item.is_default == 1
      })
      let val = radio[0] ? radio[0].id : ''
      this.setData({
        radio: val,
        adrList: res.data.list,
      })
    })
  },
  // 新增跳转
  open() {
    wx.navigateTo({
      url: '/pages/setAddress/setAddress?type=add',
    })
  },
  // 修改跳转
  onEdit(item) {
    wx.navigateTo({
      url:
        '/pages/setAddress/setAddress?item=' +
        JSON.stringify(item.currentTarget.dataset.item) +
        '&type=edit',
    })
  },
  // 选择默认
  radioChange(value) {
    app.post('/member/address/set', { id: value.detail }).then((res) => {
      if (res.code == 1) {
        this.getData()
      } else {
        app.toastFail(res.msg)
      }
    })
  },
  // 删除地址
  onDel(item) {
    console.log(item)
    Dialog.confirm({
      title: '标题',
      message: '是否要删除地址',
    })
      .then(() => {
        let id = item.currentTarget.dataset.id
        app.post('/member/address/del', { id: id }).then((res) => {
          if (res.code == 1) {
            app.toastSuccess('删除成功')
            this.getData()
          } else {
            app.toastFail(res.msg)
          }
        })
      })
      .catch(() => {})
  },
  // 选择地址传值
  selAdr(e) {
    if (this.data.type) {
      let pages = getCurrentPages()
      let prevPage = pages[pages.length - 2]
      prevPage.setData({
        address: e.currentTarget.dataset.item,
      })
      wx.navigateBack({
        delta: 1,
      })
    }
  },
})
