// pages/goods_detail/index.js
import request from '../../utils/request';
const api = new request();
import {
  _debounce
} from "../../utils/commonfn";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData: null,
    // 轮播图
    swiperList: [],
    // 楼层图
    descriptionStr: "",
    // 服务
    services: [],
    // 规格
    spec: [],
    // 选中的规格
    selectSpec: 1,
    // 评论
    comment: null,
    // 商品数量
    inpValue: 1,
    // 导航条锚点
    anchorlist: [],
    //选中锚点
    selectAnchor: '01',
    toView: '0',
    //不透明度
    afterHeaderOpacity: 0,
    // 设备可是窗口高度
    winHeight: 0,
    // 是否被收藏
    isCollect: false
  },
  // 商品id
  goods_id: null,
  // 获取商品详情
  getGoodsDetail(goods_id) {
    api.postRequest(
      'getGoodsDetail', {
        goods_id
      }
    ).then(res => {
      console.log(res);
      const goodsData = res.goodsDetail
      let {
        swiperList,
        descriptionStr,
        comment,
        services,
        spec
      } = goodsData;
      this.setData({
        goodsData,
        swiperList,
        descriptionStr,
        comment,
        services,
        spec,
      });
      //动态设置标题
      wx.setNavigationBarTitle({
        title: goodsData.name
      })
      this.getWindowH()
    })
  },
  // 选择规格
  handleSpeci(e) {
    let selectSpec = e.currentTarget.dataset.index;
    this.setData({
      selectSpec
    })
  },
  // 数量加减
  handleChangeNum(e) {
    let num = Number(e.currentTarget.dataset.num);
    let vloNum = Number(this.data.inpValue);
    if (num === -1 && vloNum <= 1) return;
    let inpValue = vloNum + num;
    // let inpValue = this.data.inpValue--;//我也不知道为啥不支持
    console.log(inpValue)
    this.setData({
      inpValue: inpValue
    });
  },
  // 输入框的值 改变 就会触发
  handleInput: _debounce(function (e) {
    let {
      value
    } = e.detail;
    value = Number(value);
    if (value <= 1) value = 1;
    this.setData({
      inpValue: value
    })
  }, 800),
  // 跳转锚点
  handleToAnchor(e) {
    let selectAnchor = e.currentTarget.dataset.index;
    this.setData({
      selectAnchor,
      toView: this.data.anchorlist[selectAnchor].top
    })
  },
  // 获取屏幕的高度
  getWindowH() {
    let sysInfo = wx.getSystemInfoSync();
    let winHeight = sysInfo.windowHeight;
    this.setData({
      winHeight
    });
    this.calcAnchor()
  },
  // 监听页面滚动事件
  handelScroll(e) {
    let scrollTop = e.detail.scrollTop;

    //锚点切换
    let selectAnchor = scrollTop >= this.data.anchorlist[2].top ? 2 : scrollTop >= this.data.anchorlist[1].top ? 1 : 0;
    //实现导航栏渐变
    let tmpY = 375; //轮播图高度
    scrollTop = scrollTop > tmpY ? 375 : scrollTop;
    let afterHeaderOpacity = scrollTop * (1 / tmpY);
    this.setData({
      selectAnchor,
      afterHeaderOpacity
    })
  },
  // 计算锚点高度
  calcAnchor() {
    let anchorlist = [{
        name: '主图',
        top: 0,
      },
      {
        name: '评价',
        top: 0,
      },
      {
        name: '详情',
        top: 0,
      }
    ];
    let query = wx.createSelectorQuery().in(this);
    query.selectAll('#comments').boundingClientRect((data) => {
      console.log(data);
      let headerHeight = 45; //头部高度
      anchorlist[1].top = data[0].top - headerHeight;
      anchorlist[2].top = data[0].bottom - headerHeight;
      this.setData({
        anchorlist
      })
    }).exec()
  },
  // 收藏
  handleItemCollect() {
    // 页面的提示
    let title = "收藏成功"
    // 小程序 获取本地存储的api 也可能是空字符串 ""
    let collect = wx.getStorageSync("collect") || {};

    // 切换页面收藏效果
    let {
      isCollect
    } = this.data;

    isCollect = !isCollect;
    // 页面效果已经实现
    this.setData({
      isCollect
    });
    // 本地存储中的数据还没同步
    if (isCollect) {
      // 要收藏
      // 给收藏 大 对象赋值
      collect[this.goods_id] = this.data.goodsData;
    } else {
      // 要删除属性
      delete collect[this.goods_id];
      title = "取消收藏";
    }
    // 收藏成功
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 1500,
      // 当前组件显示的时候 用户无法再点击页面的其他按钮
      mask: true
    });

    // 设置到 本地存储当中
    wx.setStorageSync("collect", collect)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    //获取url传递的参数
    this.goods_id = options.goods_id
    this.getGoodsDetail(this.goods_id)

    // 获取本地存储中的数据
    let collect = wx.getStorageSync("collect") || {};
    // 判断是否被收藏了
    if (collect[this.goods_id]) {
      // 被收藏
      this.setData({
        isCollect: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})