
import request from '../../utils/request';
const api = new request();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [{
        id: 1,
        url: 'https://ae01.alicdn.com/kf/H9450011bbd2e480882aa986c8ceaa312i.jpg'
      },
      {
        id: 2,
        url: 'https://ae01.alicdn.com/kf/H1eeb66ae770b44ad9147c1123fb63a32P.jpg'
      },
      {
        id: 3,
        url: 'https://ae01.alicdn.com/kf/H0fdf0f299c2a49d5995582f085d24522G.jpg'
      },
    ],
    // 分类菜单
    categoryList: [{
        id: 1,
        "name": "办公",
        image_src: 'https://ae01.alicdn.com/kf/H974e4de8124b4783b7768d06a2b847ab0.jpg'
      },
      {
        id: 2,
        "name": "家电",
        image_src: 'https://ae01.alicdn.com/kf/H53dede49e8bd4037b702eeb1f83f1b55M.jpg'
      },
      {
        id: 3,
        "name": "服饰",
        image_src: 'https://ae01.alicdn.com/kf/H575960420d6b4990960160fba79f443bw.jpg'
      },
      {
        id: 4,
        "name": "日用",
        image_src: 'https://ae01.alicdn.com/kf/H30b911d8668d46deb9cfed0fd68da1fex.jpg'
      },
      {
        id: 5,
        "name": "蔬果",
        image_src: 'https://ae01.alicdn.com/kf/Hd3edad8b6c834a23aa214fa83ecca4ddm.jpg'
      },
      {
        id: 6,
        "name": "运动",
        image_src: 'https://ae01.alicdn.com/kf/Hdb7bb002f13c4b79bc876c28555ca7ceV.jpg'
      },
      {
        id: 7,
        "name": "书籍",
        image_src: 'https://ae01.alicdn.com/kf/Hc1a477b73bc147728ef29ab6c74af0f0O.jpg'
      },
      {
        id: 8,
        "name": "文具",
        image_src: 'https://ae01.alicdn.com/kf/H23940f3a1f3145418b439c32521e263b4.jpg'
      }
    ],
    //猜你喜欢列表
    productList: [],
  },
  // 定义接口参数对象 
  QueryParams: {
    // 页码
    pagenum: 1,
    // 页容量
    pagesize: 10
  },
  // 总页码
  totalPage: 1,

  // 获取商品列表
  getProductList() {
    // 使用微信小程序内置发送请求的代码来获取数据
    api.postRequest(
      'home/getProductList',
      this.QueryParams
    ).then(res => {
      console.log(res);
      // 执行加载下一页的时候 productList 应该是 叠加 
      // 拼接数组 
      let productList = [...this.data.productList, ...res.productList];
      this.setData({
        productList
      });

      // 计算总页码
      this.totalPage = Math.ceil(res.total / this.QueryParams.pagesize);
    })
  },
  // 点击分类事件
  hancleClickItem(e) {
    let data = e.currentTarget.dataset.itemlist;
    wx.showToast({
      title: '点击了' + data.name,
      icon: 'none'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    this.getProductList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    this.QueryParams.pagenum = 1;
    this.setData({
      productList: []
    });
    this.getProductList();
    //  结束下拉刷新组件的显示
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断有没有下一页数据
    if (this.QueryParams.pagenum >= this.totalPage) {
      // 没有数据
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none',
        duration: 1500,
        // 蒙版  遮罩层 
        mask: false
      });

    } else {
      this.QueryParams.pagenum++;
      this.getProductList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})