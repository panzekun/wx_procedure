// components/skeleboxSkeleton.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //选择器(外层容器)
    selector: {
      type: String,
      value: 'skeleton'
    },
    //外层容器背景颜色
    backgroundColor: {
      type: String,
      value: '#fff'
    },
    //骨架元素背景颜色
    skeletonBgColor: {
      type: String,
      value: '#e9e9e9'
    },
    //骨架元素类型：矩形，圆形，带圆角矩形["rect","circular","fillet"]
    //默认所有，根据页面情况进行传值
    //页面对应元素class为：skeleton-rect，skeleton-circular，skeleton-fillet
    //如果传入的值不在下列数组中，则为自定义class值，默认按矩形渲染
    skeletonType: {
      type: Array,
      value: ['rect', 'circular', 'fillet']
    },
    //圆角值，skeletonType=fillet时生效
    borderRadius: {
      type: String,
      value: '16rpx'
    },
    //骨架屏预生成数据：提前生成好的数据，当传入该属性值时，则不会再次查找子节点信息
    preloadData: {
      type: Array,
      value: []
    },
    //是否需要loading
    isLoading: {
      type: Boolean,
      value: false
    },
    //loading类型[1-10]
    loadingType: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    winWidth: 375,
    winHeight: 800,
    skeletonElements: []
  },
  attached() {
    let sysInfo = wx.getSystemInfoSync();
    let winWidth = sysInfo.windowWidth + 'px';
    let winHeight = sysInfo.windowHeight + 'px';
    this.setData({
      winWidth,
      winHeight
    });
    //如果有预生成数据，则直接使用
    !this.isPreload() && this.selectorQuery();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getLoadingType: function (type) {
      let value = 1;
      if (type && type > 0 && type < 11) {
        value = type;
      }
      return 'skelebox-loading-' + value;
    },
    getRadius: function (type, val) {
      console.log(type);
      let radius = '0';
      if (type == 'circular') {
        radius = '50%';
      } else if (type == 'fillet') {
        radius = val;
      }
      return radius;
    },
    isPreload(init) {
      let preloadData = this.properties.preloadData || [];
      if (preloadData.length) {
        init && (this.setData({
          skeletonElements: preloadData
        }));
        return true;
      }
      return false;
    },
    async selectorQuery() {
      let skeletonType = this.properties.skeletonType || [];
      let nodes = [];
      for (let item of skeletonType) {
        let className = `.${this.properties.selector} >>> .${item}`;
        if (~'rect_circular_fillet'.indexOf(item)) {
          className = `.${this.properties.selector} >>> .${this.properties.selector}-${item}`;
        }
        await this.nodesRef(className).then(res => {
          res.map(d => {
            d.radius = this.getRadius(item, this.properties.borderRadius);
          });
          nodes = nodes.concat(res);
        });
      }
      console.log(nodes, 'elementnodes')
      this.setData({
        skeletonElements: nodes
      })
    },
    async nodesRef(className) {
      return await new Promise((resolve, reject) => {
        wx.createSelectorQuery()
          .selectAll(className)
          .boundingClientRect(res => {
            if (res) {
              resolve(res);
            } else {
              reject(res);
            }
          })
          .exec();
      });
    }
  }
})