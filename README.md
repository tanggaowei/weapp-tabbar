# 微信小程序自定义标签栏（TabBar） 组件

源码下载：https://github.com/tanggaowei/weapp-tabbar

自定义标签栏组件的代码在 /commpents/tabbar 目录下，可以直接复制到其他项目里使用。下面讲述使用方法。

## 1、引用组件

在需要使用标签栏的页面的 json 文件中，使用 usingComponents 配置项引用标签栏组件：
```
{
  "usingComponents": {
    "tabbar": "/components/tabbar/tabbar"
  }
}
```
## 2、添加组件

现在 wxml 文件里添加组件标签：
```
<tabbar data="{{tabbar}}"></tabbar>
```
然后在 js 文件中定义标签的数据，如 tabbar：
```
Page({
  data: {
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
  }
})
```
普通标签和小程序原始标签栏的使用相同，这里重点讲标签项的属性 iconType 和 choose 的使用。

iconType 一共有4个值：big、overflow、circle 和 shadow。这四个值可以单独使用，也可以同时使用。同时使用时用空格隔开（实际上会被填写到便签项 class 属性中）。它们的作用如下：


	* big 使用大图标，将图标的宽和高设置为 95rpx，和标签栏的高相等；
	* overflow 将图标上移，使其一部分在标签栏外面显示；
	* circle 将图标的图片截取为圆形；
	* shadow 给图标加阴影。

choose 属性一共有两个值：enable 和 disable，默认为 enable。当将其设置为 disable 时，点击该标签项将不会改变标签栏的选中状态，但仍然会触发 change 事件。

## 3、监听切换事件

使用 bindchange 属性绑定监听事件：
```
<tabbar bindchange="tabChange" data="{{tabbar}}"></tabbar>
```
然后在 Page() 中实现监听方法：
```
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
```
监听方法会得到两个数据：e.detail.key 和 e.detail.index。其中 e.detail.key 对应数据  tabbar.list 数组元素的 key 值，不如上面的 home 、tag、new、notebook 和 me。e.detail.index 对应该数组元素的序号，如 0、1、2、3、4。 

## 4、实践方案

1）自定义组件

自定义组件类似于页面，拥有自己的 wxml 模版和 wxss 样式，便于逻辑与视图分离，比直接使用模板要好。下面是在 index.wxml 中使用自定义组件进行切换的示例代码：
```
<home wx:if="{{choose_index==0}}"></home>
<tag wx:if="{{choose_index==1}}"></tag>
<notebook wx:if="{{choose_index==3}}"></notebook>
<me wx:if="{{choose_index==4}}"></me>

<tabbar bindchange="tabChange" data="{{tabbar}}"></tabbar>
```
其中 `<home>`、<tag>、<notebook> 和 <me> 是 4 个自定义组件，分别实现各自的功能。

2）使用模板

使用模板也能实现切换效果，但是逻辑代码可能要写在同一个页面。例如：
```
<import src='/template/home/home.wxml' />
<import src='/template/tag/tag.wxml' />
<import src='/template/notebook/notebook.wxml' />
<import src='/template/me/me.wxml' />

<template is="home" wx:if="{{choose_index==0}}"></template>
<template is="tag" wx:if="{{choose_index==1}}"></template>
<template is="notebook" wx:if="{{choose_index==3}}"></template>
<template is="me" wx:if="{{choose_index==4}}"></template>

<tabbar bindchange="tabChange" data="{{tabbar}}"></tabbar>
```

3）导航和跳转

可以在监听方法中使用 wx.navigateTo() 或 wx.redirectTo() 接口切换页面内容。例如：
```
  tabChange: function(e) {
    var key = e.detail.key
    if (key == 'new') {
      wx.navigateTo({
        url: '/pages/new/new',
      })
    }
  }
```
