//index.js
//获取应用实例
// import Toast from '@vant/weapp/dist/toast/toast'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp()
Page({
  data: {
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    info: [], //轮播
    couseinfo: [],
    activity: [],
    linkman: '',
    contact: '',
    imgArr: [],
    cateinfo: [
      {
        picurl: '../../static/class/school.png',
        name: '学校介绍',
        id: 1
      },
      {
        picurl: '../../static/class/Introduction.png',
        name: '课程介绍',
        id: 2
      },
      {
        picurl: '../../static/class/Features.png',
        name: '教学特色',
        id: 3
      },
      {
        picurl: '../../static/class/activity.png',
        name: '活动掠影',
        id: 4
      },
      {
        picurl: '../../static/class/about.png',
        name: '联系我们',
        id: 5
      }
    ], //分类
    school_introduction: '',
    totalPage: '',
    page: 1,
    rows: 50,
    height: app.globalData.capsuleToTop,
    left: 0.625,
    leftImg: '',
    topImg: '',
    bottomImg: '',
    backGround: '',
    ContactPerson: '',
    phone: '',
    address: '',
    jieshaoImg: ''
  },

  onLoad: function () {
    this.getData()
    this.getSchool()
    this.getcourse()
    this.geteducation()
    this.getactivity()
    this.getcontact()
  },
  onShow() {
    // this.data.height = app.globalData.capsuleToTop
  },
  // 查询轮播
  getData() {
    app.get('/member/index/slider').then((res) => {
      console.log(res)
      this.setData({
        info: res.data.list,
      })
    })
  },
  // 学校介绍
  getSchool() {
    app.get('/member/index/student').then(res => {
      this.setData({
        school_introduction: res.data.info.description,
        jieshaoImg: res.data.info.picurl_str
      })
    })
  },
  // 开设课程
  getcourse() {
    app.get('/member/index/course',).then((res) => {
      this.setData({
        couseinfo: res.data.list,
      })
    })
  },
  // 特色
  geteducation() {
    app.get('/member/index/education',).then((res) => {
      this.setData({
        education: res.data.list,
      })
    })
  },
  // 活动
  getactivity() {
    app.get('/member/index/activity',).then((res) => {
      console.log(res.data.list)
      this.setData({
        imgArr: res.data.list,
        leftImg: res.data.list[2],
        topImg: res.data.list[1],
        bottomImg: res.data.list[0]
      })
    })
  },
  // 联系我们
  getcontact() {
    app.get('/member/index/contact',).then((res) => {
      this.setData({
        ContactPerson: res.data.list[2].varvalue,
        ContactPerson_two: res.data.list[4].varvalue,
        phone: res.data.list[3].varvalue,
        phone_two: res.data.list[6].varvalue,
        address: res.data.list[5].varvalue,
        address_two: res.data.list[7].varvalue
      })
    })
  },

  getName(e) {
    console.log(e.detail.value)
    this.data.linkman = e.detail.value
  },
  getPhone(e) {
    this.data.contact = e.detail.value
  },
  // 拨打电话
  Call(e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },

  toForm() {
    if (this.data.linkman == '') {
      wx.showToast({
        title: '请先输入姓名',
        icon: 'none',
        duration: 1000,
      })
    } else if(this.data.contact == '') {
      wx.showToast({
        title: '请先输入手机号',
        icon: 'none',
        duration: 1000,
      })
    } else {
      app.post('/member/index/message',{
        linkman: this.data.linkman,
        contact: this.data.contact
      }).then((res) => {
        wx.showToast({
          title: '报名成功',
          icon: 'succes',
          duration: 1000,
          mask:true
        })
        this.setData({
          linkman: '',
          contact: ''
        })
      })
    }
  },
  // 跳转课程介绍
  goOrder() {
    wx.switchTab({
      url: `/pages/order/order`,
    })
  },
  // 跳转课程详情
  goClassInfo(e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/classinfo/classinfo?id=${e.currentTarget.dataset.id}`
    })
  },

  goList() {
    wx.navigateTo({
      url: `/pages/features/features`
    })
  },
  goimgList() {
    wx.navigateTo({
      url: `/pages/imgList/imgList`
    })
  },
  toClassAll() {
    wx.switchTab({
      url: `/pages/classAll/classAll`
    })
  },
  
  goClassAll(e) {
    console.log(e.currentTarget.dataset.id)
    if (e.currentTarget.dataset.id === 1) {
      wx.switchTab({
        url: `/pages/classAll/classAll`
      })
    } else if(e.currentTarget.dataset.id === 2) {
      wx.switchTab({
        url: `/pages/order/order`
      })
    } else if(e.currentTarget.dataset.id === 5) {
      wx.switchTab({
        url: `/pages/user/user`
      })
    } else if(e.currentTarget.dataset.id === 3) {
      wx.navigateTo({
        url: `/pages/features/features`
      })
      // wx.switchTab({
      //   url: `/pages/features/features`
      // })
      // let query = wx.createSelectorQuery().in(this)
      // console.log(query)
      // query.selectViewport().scrollOffset()
      // query.select("#tese").boundingClientRect();
      // query.exec(function (res) {
      //    console.log(res);
      //    var miss = res[0].scrollTop + res[1].top - 140;
      //    console.log(miss);
      //    wx.pageScrollTo({
      //      scrollTop: miss,
      //      duration: 300,
      //    });
      // });
    } else if(e.currentTarget.dataset.id === 4) {
      // wx.switchTab({
      //   url: `/pages/imgList/imgList`
      // })
      wx.navigateTo({
        url: `/pages/imgList/imgList`
      })
      // let query = wx.createSelectorQuery().in(this)
      // console.log(query)
      // query.selectViewport().scrollOffset()
      // query.select("#Glimpse").boundingClientRect();
      // query.exec(function (res) {
      //    console.log(res);
      //    let pase = res[0].scrollTop + res[1].top - 140;
      //    wx.pageScrollTo({
      //      scrollTop: pase,
      //      duration: 300,
      //    });
      // });
    }
  },

  // 图片预览
  previewImage(e) {
    let current = e.target.dataset.src
    console.log(e)
    wx.previewImage({
      current: current,
      urls: this.data.imgArr
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
