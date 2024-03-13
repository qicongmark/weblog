//app.js
const cloud = wx.cloud

App({
  version: 102,
  SITE_ID: 'd5a1114a644e1f820006c81a',
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'mjcloud-4ggq30j7b02ac65b',
        traceUser: true,
      })
    }
    this.globalData = {
      globalUserInfo: {}
    }
    this.prepareNavigationBar()
  },

  // 登录密码
  LOGIN_CACHE_KEY:'_mj_login_cache_key_',
  setLoginCache:function(pwd){
    wx.setStorage({
      key:this.LOGIN_CACHE_KEY,
      data:pwd
    })
  },
  
  getLoginCache:function(callback){
    wx.getStorage({
      key:this.LOGIN_CACHE_KEY,
      success:res=>{
        callback(res)
      },
      fail:res=>{
        callback(res)
      }
    })
  },

  isLogin:function(){
    if(this.globalData.loginToken){
      return true
    }else{
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },

  //站点
  getSite:function(callback){
    cloud.database().collection("site").doc(this.SITE_ID).get({
      success:res=>{
        callback(res)
      }
    })
  },

  //站点访问
  incSiteViewCount:function(){
    wx.cloud.callFunction({
      name: "quickFunctions",
      data: {
        type: "incViewCount",
        permission:1
      }
    })
  },

  //站点咨询
  incSiteUserCount:function(){
    wx.cloud.callFunction({
      name: "quickFunctions",
      data: {
        type: "incUserCount",
        permission:1
      }
    })
  },

  //自定义NavigationBar
  prepareNavigationBar:function(){
    const systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    const menuButton = wx.getMenuButtonBoundingClientRect();
    // 导航栏高度 = 状态栏高度 + 44（适配所有机型）
    this.globalData.navBarHeight = systemInfo.statusBarHeight + 44;
    this.globalData.navMenuRight = systemInfo.screenWidth - menuButton.right;
    this.globalData.navMenuTop = menuButton.top;
    this.globalData.navMenuHeight = menuButton.height;

    //窗口高度
    this.globalData.windowHeight = systemInfo.windowHeight;
    this.globalData.windowWidth = systemInfo.windowWidth;

    //卡片宽度
    this.globalData.cardWidth = (systemInfo.windowWidth-30)*48/100;
  },
  
})

