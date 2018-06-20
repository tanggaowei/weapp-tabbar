Page({
  data: {
    choose_index: 0,
    tabbar: {
      "color": "#999999",
      "selectedColor": "#7788dd",
      "borderStyle": "#dcdcdc",
      "backgroundColor": "#ffffff",
      "list": [{
          "key": "home",
          "iconPath": "/images/icon_home.png",
          "selectedIconPath": "/images/icon_home_active.png",
          "text": "首页"
        },
        {
          "key": "tag",
          "iconPath": "/images/icon_tag.png",
          "selectedIconPath": "/images/icon_tag_active.png",
          "text": "标签"
        },
        {
          "key": "new",
          "iconPath": "/images/icon_plus_big.png",
          "iconType": "big overflow circle shadow",
          "choose": "disable"
        },
        {
          "key": "notebook",
          "iconPath": "/images/icon_notebook.png",
          "selectedIconPath": "/images/icon_notebook_active.png",
          "text": "日记本"
        },
        {
          "key": "me",
          "iconPath": "/images/icon_me.png",
          "selectedIconPath": "/images/icon_me_active.png",
          "text": "我"
        }
      ]
    }
  },
  tabChange: function(e) {
    var key = e.detail.key
    if (key == 'new') {
      wx.navigateTo({
        url: '/pages/new/new',
      })
    } else {
      this.setData({
        choose_index: e.detail.index
      })
    }
  }
})