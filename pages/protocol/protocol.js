const app = new getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

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
      this.setData({
        content: res.data.info.content,
      })
    })
  }
})