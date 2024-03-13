// components/topnav/topnav.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    active: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    toNav: function (e) {
      let p = e.currentTarget.dataset.page
      if (p == this.properties.active) {
        return;
      }
      if (p == 'home') {
        wx.switchTab({
          url: '/pages/index/index',
        })
      } else{
        wx.redirectTo({
          url: '/pages/manage/' + p + 'Manage/' + p + 'Manage',
        })
      }
    }
    

  }

})