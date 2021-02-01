//index.js
//获取应用实例
const app = getApp()

Component({
  options: {
    // styleIsolation: 'isolated',
    // addGlobalClass: true,
  },
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    title: {
      type: String,
      value: '暂无数据',
    },
    size: {
      type: Number,
      value: 500,
    },
  },
  data: {
    // 这里是一些组件内部数据
  },
  attached: function () {},

  methods: {},
})
