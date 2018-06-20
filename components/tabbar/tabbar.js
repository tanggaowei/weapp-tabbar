Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    index: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change: function(e) {
      var index = e.currentTarget.dataset.index * 1
      var item = this.data.data.list[index]
      var choose = item.choose
      
      if (choose != 'disable') {
        this.setData({
          index: index
        })
      }

      this.triggerEvent('change', {
        key: item.key,
        index: index
      })
    }
  }
})