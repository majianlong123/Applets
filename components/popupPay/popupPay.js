//index.js
//获取应用实例
const app = getApp()
import pay from '../../utils/pay'
// import { userInfo } from '../../api/user'

Component({
  options: {
    // styleIsolation: 'isolated',
    // addGlobalClass: true,
  },
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    orderfee: {
      type: String,
      value: '0.00',
    },
    orderId: {
      type: String,
      value: '',
    },
  },
  data: {
    // 这里是一些组件内部数据
    radioVal: 'WX',
    show: false,
    info: {},
  },
  attached: function () {
    // this.getInfo()
  },

  methods: {
    // 获取个人信息
    // getInfo() {
    //   userInfo().then((res) => {
    //     this.setData({
    //       user: res.data.info,
    //     })
    //   })
    // },
    // // 选择支付
    // onRadio(e) {
    //   this.setData({
    //     radioVal: e.detail,
    //   })
    // },
    // // 立即支付
    // pay() {
    //   let id = this.properties.orderId
    //   pay.orderPay(id, this.data.radioVal).then((res) => {
    //     if (res.code == 1) {
    //       if (this.data.radioVal == 'WX') {
    //         pay
    //           .wxPay(res.data)
    //           .then(() => {
    //             this.isShow()
    //             this.triggerEvent('getData')
    //             app.toastSuccess('支付成功')
    //           })
    //           .catch((e) => {
    //             console.log(e)
    //             app.toastFail('支付失败')
    //           })
    //       } else {
    //         this.isShow()
    //         this.triggerEvent('getData')
    //         app.toastSuccess('支付成功')
    //       }
    //     } else {
    //       app.toastFail(res.msg)
    //     }
    //   })
    // },
    // // 显示隐藏
    // isShow() {
    //   this.setData({
    //     show: !this.data.show,
    //   })
    // },
  },
})
