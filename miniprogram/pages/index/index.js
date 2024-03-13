const util = require("../../utils/util.js");
const app = getApp()

// index.js
const db = wx.cloud.database()

Page({

  //分页
  pageNum:1,
  pageSize:6,
  hasMore:true,
  
  data: {
    banners:[],
    articles:[]
  },
  
  onLoad: function(e){
    wx.showShareMenu({
      withShareTicket:true,
      menus:['shareAppMessage','shareTimeline']
    })

    //加载推荐
    this.loadBanners()

    //加载内容
    this.loadArticles()

  },

  //加载推荐的banners
  loadBanners:function(e){
    wx.showLoading({
      title: '数据加载中',
    })
    db.collection("article").where({
      recommend: 1,
      status: 1
    }).field({
      thumimg: true,
      img:true
    }).orderBy("sortNum", "asc").orderBy("time", "desc").limit(5).get({
      success: res => {
        this.setData({
            banners: res.data
        })
      },
      complete: res => {
        wx.hideLoading()
      },
      fail: res => {
        wx.showToast({
          title: '获取失败',
        })
      }
    })
  },

  loadArticles:function(){
    //加载云数据库中的数据
    wx.showLoading({
      title: '数据加载中',
    })

    let query = db.collection("article")
    query = query.where({
        status:1,
    })
    query.field({
      title: true,
      desc: true,
      img: true
    })
    query = query.orderBy("sortNum", "asc").orderBy("time", "desc")
    query = query.skip((this.pageNum-1)*this.pageSize).limit(this.pageSize)
    query.get({
      success: res => {
        this.hasMore=(res.data.length==this.pageSize)?true:false
        this.pageNum=this.pageNum + 1

        let articles = this.data.articles
        articles = articles.concat(res.data)
        this.setData({
          articles: articles
        })
      },
      complete: res => {
        wx.hideLoading()
      },
      fail: res => {
        wx.showToast({
          title: '获取失败',
        })
      }
    })
  },

  loadimg:function(e){
    wx.hideLoading()
  },

  toSearch: function (e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.hasMore){
      this.loadArticles()
    }
  },
  
});

