const app = getApp()

Page({
  data: {
    ContactPerson: '',
    phone: '',
    longitude: 0,
    latitude: 0,
    markers: [{
      iconPath: "../../static/img/others.png",
      id: 0,
      latitude: 34.658037,
      longitude: 112.395757,
      width: 30,
      height: 30
    }],
    // polyline: [{
    //   points: [{
    //     longitude: 113.3245211,
    //     latitude: 23.10229
    //   }, {
    //     longitude: 113.324520,
    //     latitude: 23.21229
    //   }],
    //   color: "#FF0000DD",
    //   width: 2,
    //   dottedLine: true
    // }],
  },

  onLoad: function () {
    console.log(this.data.markers[0].longitude)
    this.getData()
  },

  onShow() {
    this.getData()
  },

  getData() {
    app.get('/member/index/contact').then((res) => {
      // this.data.markers[0].longitude = parseFloat(res.data.list[1].varvalue)
      // this.data.markers[0].latitude = parseFloat(res.data.list[0].varvalue)
      // this.data.longitude = parseFloat(res.data.list[1].varvalue)
      // this.data.latitude = parseFloat(res.data.list[0].varvalue)
      console.log( this.data.markers[0].longitude)
      this.setData({
        'markers[0].latitude': parseFloat(res.data.list[0].varvalue),
        'markers[0].longitude': parseFloat(res.data.list[1].varvalue),
        longitude: res.data.list[1].varvalue,
        latitude: res.data.list[0].varvalue,
        ContactPerson: res.data.list[2].varvalue,
        ContactPerson_two: res.data.list[4].varvalue,
        phone: res.data.list[3].varvalue,
        phone_two: res.data.list[6].varvalue,
        address: res.data.list[5].varvalue,
        address_two: res.data.list[7].varvalue
      })
    })
  },
  Call(e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
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
