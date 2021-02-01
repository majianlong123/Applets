export default {
  loginUrl: '/member/pub/xcxLogin', //登录请求地址
  loginJscodeName: 'jscode', //登录请求中 jscode的参数名

  isShip: true, //会员是否注册推荐关系
  shipVar: 'sid', //推荐会员的字段名, 储存在options.query 或 options.query.scene中
  loginShipName: 'sid', //登录请求中 推荐人的参数名

  options: null,

  SETOPTIONS(options) {
    this.options = options
  },

  cleanQuery() {
    try {
      this.options.query = {}
    } catch (error) {}
  },
}
