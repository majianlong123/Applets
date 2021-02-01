//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    id: '',
    linkman: '',
    contact: '',
    address: '',
    adcode: '',
    address_detail: '',
    add_lon: '',
    add_lat: '',
    type: '',
    isGps: false,
  },

  onLoad: function (option) {
    wx.setNavigationBarTitle({
      title: option.type == 'add' ? '新增地址' : '修改地址',
    })
    this.setData({
      type: option.type,
    })
    if (option.type == 'edit') {
      let item = JSON.parse(option.item)
      this.setData({
        id: item.id,
        linkman: item.linkman,
        address: item.address,
        contact: item.contact,
        adcode: item.adcode,
        address_detail: item.address_detail,
        add_lon: item.add_lon,
        add_lat: item.add_lat,
      })
    }
    this.getLocation()
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

  isMap() {
    var self = this
    wx.chooseLocation({
      success: function (res) {
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1',
          method: 'GET',
          header: { 'Content-Type': 'application/json' },
          data: {
            key: 'IIDBZ-NJV66-4ZTS5-ELF4S-J4AKE-2DF5F',
            location: `${res.latitude},${res.longitude}`,
          },
          success(res) {
            const { result } = res.data
            console.log(result.location)
            self.setData({
              address: result.formatted_addresses.recommend,
              add_lat: result.location.lat,
              add_lon: result.location.lng,
              adcode: result.ad_info.adcode,
            })
          },
          fail(res) {
            // app.toastFail(res)
          },
        })
        // }
      },
    })
  },
  // 文本框赋值
  setInputVal(e) {
    app.pulicSetData(e, this)
  },

  //点击添加或者修改
  storage() {
    let tips = ''
    if (!this.data.linkman) {
      tips = '请输入联系人'
    } else if (!this.data.contact) {
      tips = '请输入联系方式'
    } else if (!/^1[3456789]\d{9}$/.test(this.data.contact)) {
      tips = '请输入正确的联系方式'
    } else if (!this.data.address) {
      tips = '请选择地区'
    } else if (!this.data.address_detail) {
      tips = '请输入详细地区'
    } else {
      if (this.data.type == 'add') {
        this.add()
      } else {
        this.edit()
      }
    }
    if (tips) {
      app.toastFail(tips)
    }
  },
  // 添加
  add() {
    app
      .post('/member/address/add', {
        linkman: this.data.linkman,
        contact: this.data.contact,
        address: this.data.address,
        address_detail: this.data.address_detail,
        adcode: this.data.adcode,
        add_lon: this.data.add_lon,
        add_lat: this.data.add_lat,
      })
      .then((res) => {
        if (res.code == 1) {
          wx.navigateBack({
            success() {
              app.toastSuccess('添加成功')
            },
          })
        } else {
          app.toastFail(res.msg)
        }
      })
  },
  // 修改
  edit() {
    app
      .post('/member/address/edit', {
        id: this.data.id,
        linkman: this.data.linkman,
        contact: this.data.contact,
        address: this.data.address,
        address_detail: this.data.address_detail,
        adcode: this.data.adcode,
        add_lon: this.data.add_lon,
        add_lat: this.data.add_lat,
      })
      .then((res) => {
        if (res.code == 1) {
          wx.navigateBack({
            success() {
              app.toastSuccess('修改成功')
            },
          })
        } else {
          app.toastFail(res.msg)
        }
      })
  },
  open() {},
})
