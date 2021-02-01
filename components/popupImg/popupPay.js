//index.js
//获取应用实例
const app = getApp()
import pay from '../../utils/pay'

Component({
  options: {},
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    fileList: {
      type: Array,
      value: [],
    },
  },
  data: {
    // 这里是一些组件内部数据
    lists: [],
    isInCount: true,
  },
  attached: function () {
    this.formatFileList()
  },

  methods: {
    formatFileList() {
      const { fileList = [] } = this.data
      const lists = fileList.map((item) =>
        Object.assign(Object.assign({}, item), {
          isImage:
            typeof item.isImage === 'undefined'
              ? isImageFile(item)
              : item.isImage,
        })
      )
      this.setData({ lists })
    },
  },
})
