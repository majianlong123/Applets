import { newFly } from './request' //导入

import authConfig from './authConfig'
import qs from 'querystringify'

export default class userAuth {
  static mytoken = wx.getStorageSync('mytoken')
  static isUserUpdate = false //是否更新过用户昵称头像
  static isToken = false // 是否有token

  static checkToken(datas) {
    const self = this
    datas = datas || { query: {} }
    return new Promise((resolve, reject) => {
      if (!self.mytoken || Object.keys(datas.query).length != 0) {
        let fromUid = 0
        if (authConfig.isShip) {
          //这里需要看一下是否需要注册推荐关系
          fromUid = self.getUidFromOptions(datas)
        }
        //要干login的事情
        self.login(fromUid).then(() => {
          resolve(self.mytoken)
        })
      } else {
        resolve(self.mytoken)
      }
    })
  }

  // 获取场景传递的fromUid
  static getUidFromOptions(datas) {
    let fromUid = 0
    //推荐关系有2种场景: 1.扫码datas.query.scene 2.卡片datas.query
    try {
      const scene = decodeURIComponent(datas.query.scene)
      // 把字符串转为对象
      const sceneObj = qs.parse(scene)

      if (sceneObj[authConfig.shipVar]) {
        fromUid = sceneObj[authConfig.shipVar]
      } else if (datas.query[authConfig.shipVar]) {
        //2.卡片datas.query
        fromUid = datas.query[authConfig.shipVar]
      }
    } catch (e) {}

    return fromUid
  }

  static login(fromUid) {
    const self = this
    return new Promise((resolve, reject) => {
      wx.login({
        async success(res) {
          console.log('res',res)
          if (res.code) {
            console.log('--unCheckLogin--')
            await self.doLogin(res.code, fromUid)
            resolve()
          } else {
            console.log('登录失败！' + res.errMsg)
            reject()
          }
        },
      })
    })
  }

  static async doLogin(code, fromUid) {
    const self = this
    let res = await newFly.post(authConfig.loginUrl, {
      [authConfig.loginJscodeName]: code,
      [authConfig.loginShipName]: fromUid || null,
    })
    let item = res.data.data
    console.log('resresres',item)
    wx.setStorageSync('token', item.token.token)
    wx.setStorageSync('session_key', item.session_key)
    self.mytoken = item.token.token
    authConfig.cleanQuery()
  }

  static updateUser() {
    console.log('----updateUser')
    const self = this
    return new Promise((resolve, reject) => {
      if (!self.isUserUpdate) {
        // 未同步过会员信息再获取
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userInfo']) {
              console.log('----scope.userInfo false')
              reject()
            } else {
              self.doUpdate()
              resolve()
            }
          },
        })
      } else {
        resolve()
      }
    })
  }

  static async getTokensByFly(datas) {
    return this.checkToken(datas)
  }

  static clearTokens() {
    this.mytoken = ''
    return true
  }
}
