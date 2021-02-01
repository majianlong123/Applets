// pages/reservation/reservation.js
import moment from 'moment'
import pay from '../../utils/pay'

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    serviceName: '请选择服务',
    cateName: '',
    dateTimeShow: false,
    currentDate: new Date().getTime(),
    fileList: [],
    service: '',
    price: '',
    item: [
      {
        product_id: '',
        skill_id: '',
      },
    ],
    order: {
      budget: '',
      visiting_time: '',
      album: [],
      remark: '',
    },
    address: {
      linkman: '',
      contact: '',
      address: '',
      address_detail: '',
      address_id: '0',
      add_lon: '',
      add_lat: '',
      adcode: '',
    },
    isGps: false,
    info: {},
  },

  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
    this.getProductDetails()
    this.getLocation()
    this.getData()
  },

  getData() {
    app.get('/member/member/info').then((res) => {
      this.setData({
        info: res.data.info,
      })
    })
  },

  // 地址授权
  getLocation() {
    const self = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        self.setData({
          isGps: true,
        })
      },
      fail(res) {
        self.setData({
          isGps: false,
        })
      },
    })
  },

  openSetting() {
    this.getLocation()
  },

  // 服务详情
  getProductDetails() {
    app
      .get('/member/product/info', {
        product_id: this.data.id,
      })
      .then((res) => {
        const { skill_list } = res.data.info
        this.setData({
          'item[0].product_id': skill_list[0].product_id,
          'item[0].skill_id': skill_list[0].skill_id,
          serviceName: res.data.info.name,
          cateName: res.data.info.cate_name,
          price: res.data.info.price,
        })
      })
  },

  // 绑定数据
  setInputVal(e) {
    app.pulicSetData(e, this)
  },

  // 打开时间弹框
  openDateTime() {
    this.setData({
      dateTimeShow: true,
    })
  },

  // 关闭时间弹框
  cancelDateTime() {
    this.setData({
      dateTimeShow: false,
    })
  },

  confirmDateTime(e) {
    let formatTime = moment(e.detail).format('YYYY-MM-DD:HH:mm')
    this.setData({
      'order.visiting_time': formatTime,
    })
    this.cancelDateTime()
  },

  openAddress() {
    wx.navigateTo({
      url: `/pages/address/address?type=${true}`,
    })
  },

  afterRead(event) {
    const self = this
    const { file } = event.detail
    wx.uploadFile({
      url: 'http://t_shuaxing.demo2.dx623.com/member/image/upload', // 上传接口地址
      filePath: file.path,
      name: 'file',
      formData: {
        user: 'test',
      },
      success(res) {
        let data = JSON.parse(res.data)
        const { fileList = [] } = self.data
        fileList.push({
          ...file,
          url: data.data.fileurl_str,
          fileurl: data.data.fileurl,
        })
        self.setData({
          fileList,
        })
        self.filterPicarr()
      },
    })
  },

  delPicarr(e) {
    const { fileList = [] } = this.data
    let index = e.detail.index
    fileList.splice(index, 1)
    this.setData({
      fileList,
    })
    this.filterPicarr()
  },

  filterPicarr() {
    const { fileList = [] } = this.data
    let picarrList = []
    fileList.map((item) => {
      picarrList.push(item.fileurl)
    })
    this.setData({
      'order.album': picarrList,
    })
  },

  // 打开地图选择位置
  isMap() {
    var self = this
    wx.chooseLocation({
      success: function (res) {
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1',
          method: 'GET',
          header: {
            'Content-Type': 'application/json',
          },
          data: {
            key: 'IIDBZ-NJV66-4ZTS5-ELF4S-J4AKE-2DF5F',
            location: `${res.latitude},${res.longitude}`,
          },
          success(res) {
            const { result } = res.data
            self.setData({
              'address.address': result.formatted_addresses.recommend,
              'address.add_lat': result.location.lat,
              'address.add_lon': result.location.lng,
              'address.adcode': result.ad_info.adcode,
            })
          },
          fail(res) {
            app.toastFail(res)
          },
        })
      },
    })
  },

  // 预约
  reservation() {
    const { data } = this
    if (!!data.info.nickname || !!data.info.phone) {
      wx.navigateTo({
        url: `/pages/bindUser/bindUser?nameType=${
          !!data.info.nickname ? 1 : 0
        }&phoneType=${!!data.info.phone ? 1 : 0}`,
      })
    } else {
      const form = {
        address: data.address,
        order: data.order,
        item: data.item,
      }
      if (!form.address.linkman) {
        return app.toastFail('请填写联系人')
      } else if (!form.address.contact) {
        return Toast('请填写联系电话')
      } else if (!form.address.address) {
        return app.toastFail('请选择上门地址')
      } else if (!form.address.address_detail) {
        return app.toastFail('请选择详细地址')
      } else if (!form.order.budget) {
        return app.toastFail('请填写服务预算')
      } else if (!form.order.visiting_time) {
        return app.toastFail('请选择上门时间')
      }
      app.post('/member/order/add', form).then((res) => {
        if (res.code == 1) {
          const orderId = res.data.order_id
          this.payOrder(orderId)
        }
      })
    }
  },

  payOrder(orderId) {
    app
      .post('/member/order/pay', {
        order_id: orderId,
      })
      .then((res) => {
        pay
          .wxPay(res.data)
          .then(() => {
            app.toastSuccess('支付成功')
            wx.switchTab({
              url: '/pages/order/order',
            })
          })
          .catch((e) => {
            console.log(e)
            app.toastFail('支付失败')
            wx.switchTab({
              url: '/pages/order/order',
            })
          })
      })
  },

  onChangeService() {
    wx.switchTab({
      url: `/pages/classAll/classAll`,
    })
  },
})
