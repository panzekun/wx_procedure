// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放数据中的第一层大菜单
    menuList: [],
    // 右侧二层数据
    goodsArr: [],
    // 默认渲染数组的索引
    activeIndex: 0,
    // 设置右侧滚动条的滚动距离
    scrollTop: 0
  },
  // 模拟-> 接口数据
  catesData: [{
      id: 1,
      title: '家用电器',
      children: {
        banner: 'https://ae01.alicdn.com/kf/H1eeb66ae770b44ad9147c1123fb63a32P.jpg',
        list: [{
            name: '冰箱',
            img: 'https://ae01.alicdn.com/kf/H6519f78b23f84696ac336a1348469386S.jpg'
          },
          {
            name: '电视',
            img: 'https://ae01.alicdn.com/kf/Hb2f3c3ed3fa247f68d8c6a2bf43fce86u.jpg'
          },
          {
            name: '空调',
            img: 'https://ae01.alicdn.com/kf/H0590f0b88a9d415f8076934dac81868fh.jpg'
          },
          {
            name: '洗衣机',
            img: 'https://ae01.alicdn.com/kf/H470f0335623f48c389c628594c74eb83r.jpg'
          },
          {
            name: '风扇',
            img: 'https://ae01.alicdn.com/kf/Hc5c1ba47e73341faa68965bf8dbfcf3ac.jpg'
          },
          {
            name: '燃气灶',
            img: 'https://ae01.alicdn.com/kf/Hc4cadacbc4d0465fbf86e72d78fa0e195.jpg'
          },
          {
            name: '热水器',
            img: 'https://ae01.alicdn.com/kf/H086fbf07f0414749b86ec0631d903cebu.jpg'
          },
          {
            name: '电吹风',
            img: 'https://ae01.alicdn.com/kf/Ha21fd4b970024b189ff3cf0475703d2dJ.jpg'
          },
          {
            name: '电饭煲',
            img: 'https://ae01.alicdn.com/kf/Hc6feda63d9924ea4a1b0959835a0ba80O.jpg'
          },
          {
            name: '燃气灶',
            img: 'https://ae01.alicdn.com/kf/Hc4cadacbc4d0465fbf86e72d78fa0e195.jpg'
          },
          {
            name: '热水器',
            img: 'https://ae01.alicdn.com/kf/H086fbf07f0414749b86ec0631d903cebu.jpg'
          },
          {
            name: '电吹风',
            img: 'https://ae01.alicdn.com/kf/Ha21fd4b970024b189ff3cf0475703d2dJ.jpg'
          },
          {
            name: '电饭煲',
            img: 'https://ae01.alicdn.com/kf/Hc6feda63d9924ea4a1b0959835a0ba80O.jpg'
          },
          {
            name: '燃气灶',
            img: 'https://ae01.alicdn.com/kf/Hc4cadacbc4d0465fbf86e72d78fa0e195.jpg'
          },
          {
            name: '热水器',
            img: 'https://ae01.alicdn.com/kf/H086fbf07f0414749b86ec0631d903cebu.jpg'
          },
          {
            name: '电吹风',
            img: 'https://ae01.alicdn.com/kf/Ha21fd4b970024b189ff3cf0475703d2dJ.jpg'
          },
          {
            name: '电饭煲',
            img: 'https://ae01.alicdn.com/kf/Hc6feda63d9924ea4a1b0959835a0ba80O.jpg'
          },
        ]
      }
    },
    {
      id: 2,
      title: '办公用品',
      children: {
        banner: 'https://ae01.alicdn.com/kf/H6006d943348f4b5b878ec309b3730959p.jpg',
        list: [{
            name: '打印机',
            img: 'https://ae01.alicdn.com/kf/H6519f78b23f84696ac336a1348469386S.jpg'
          },
          {
            name: '路由器',
            img: 'https://ae01.alicdn.com/kf/Hb2f3c3ed3fa247f68d8c6a2bf43fce86u.jpg'
          },
          {
            name: '扫描仪',
            img: 'https://ae01.alicdn.com/kf/H0590f0b88a9d415f8076934dac81868fh.jpg'
          },
          {
            name: '投影仪',
            img: 'https://ae01.alicdn.com/kf/H470f0335623f48c389c628594c74eb83r.jpg'
          },
          {
            name: '墨盒',
            img: 'https://ae01.alicdn.com/kf/Hc5c1ba47e73341faa68965bf8dbfcf3ac.jpg'
          },
          {
            name: '纸类',
            img: 'https://ae01.alicdn.com/kf/Hc4cadacbc4d0465fbf86e72d78fa0e195.jpg'
          }
        ]
      }
    },
    {
      id: 3,
      title: '日常用品',
      children: {
        banner: 'https://ae01.alicdn.com/kf/H6006d943348f4b5b878ec309b3730959p.jpg',
        list: [{
            name: '茶具',
            img: 'https://ae01.alicdn.com/kf/H6519f78b23f84696ac336a1348469386S.jpg'
          },
          {
            name: '花瓶',
            img: 'https://ae01.alicdn.com/kf/Hb2f3c3ed3fa247f68d8c6a2bf43fce86u.jpg'
          },
          {
            name: '纸巾',
            img: 'https://ae01.alicdn.com/kf/H0590f0b88a9d415f8076934dac81868fh.jpg'
          },
          {
            name: '毛巾',
            img: 'https://ae01.alicdn.com/kf/H470f0335623f48c389c628594c74eb83r.jpg'
          },
          {
            name: '牙膏',
            img: 'https://ae01.alicdn.com/kf/Hc5c1ba47e73341faa68965bf8dbfcf3ac.jpg'
          },
          {
            name: '保鲜膜',
            img: 'https://ae01.alicdn.com/kf/Hc4cadacbc4d0465fbf86e72d78fa0e195.jpg'
          },
          {
            name: '保鲜袋',
            img: 'https://ae01.alicdn.com/kf/H086fbf07f0414749b86ec0631d903cebu.jpg'
          }
        ]
      }
    },
    {
      id: 4,
      title: '蔬菜水果',
      children: {
        banner: 'https://ae01.alicdn.com/kf/H9450011bbd2e480882aa986c8ceaa312i.jpg',
        list: [{
            name: '苹果',
            img: 'https://ae01.alicdn.com/kf/H6519f78b23f84696ac336a1348469386S.jpg'
          },
          {
            name: '芒果',
            img: 'https://ae01.alicdn.com/kf/Hb2f3c3ed3fa247f68d8c6a2bf43fce86u.jpg'
          },
          {
            name: '椰子',
            img: 'https://ae01.alicdn.com/kf/H0590f0b88a9d415f8076934dac81868fh.jpg'
          },
          {
            name: '橙子',
            img: 'https://ae01.alicdn.com/kf/H470f0335623f48c389c628594c74eb83r.jpg'
          },
          {
            name: '奇异果',
            img: 'https://ae01.alicdn.com/kf/Hc5c1ba47e73341faa68965bf8dbfcf3ac.jpg'
          },
          {
            name: '玉米',
            img: 'https://ae01.alicdn.com/kf/Hc4cadacbc4d0465fbf86e72d78fa0e195.jpg'
          },
          {
            name: '百香果',
            img: 'https://ae01.alicdn.com/kf/H086fbf07f0414749b86ec0631d903cebu.jpg'
          }
        ]
      }
    },
  ],
  // 左侧菜单被点击
  handleItemSelect(e) {
    const {
      index
    } = e.currentTarget.dataset;
    const goodsArr = this.catesData[index].children;
    // 切换菜单同时 把右侧的滚动条 设置回到顶部 
    const scrollTop = 0;
    this.setData({
      activeIndex: index,
      scrollTop,
      goodsArr,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const menuList = this.catesData.map(v => v.title);
    const goodsArr = this.catesData[this.data.activeIndex].children;
    this.setData({
      menuList,
      goodsArr,
    })
  },
})