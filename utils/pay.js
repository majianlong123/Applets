// import { orderPay } from '../api/order'
export default class pay {
  static wxPay(item) {
    wx.showLoading({
      title: '等待中',
      mask: true,
    })
    return new Promise((resolve, reject) => {
      this.item = item
      wx.requestPayment({
        timeStamp: this.item.timeStamp,
        nonceStr: this.item.nonceStr,
        package: this.item.package,
        signType: 'MD5',
        paySign: this.item.paySign,
        success(res) {
          wx.hideLoading()
          resolve(res)
        },
        fail(res) {
          wx.hideLoading()
          reject(res)
        },
      })
    })
  }
  // static orderPay(id) {
  //   return app.post('/member/order/pay', { order_id: id })
  // }
}
