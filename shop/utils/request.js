class request {
  constructor() {
    this._baseUrl = 'https://www.fastmock.site/mock/31875da47f27128e357e3d3e6ac0cc37/api/';
    this._token = wx.getStorageSync('token');
    // this._header = {'Authorization': 'Bearer ' + token}
  }

  /**
   * GET类型的网络请求
   */
  getRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'GET')
  }

  /**
   * DELETE类型的网络请求
   */
  deleteRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'DELETE')
  }

  /**
   * PUT类型的网络请求
   */
  putRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'PUT')
  }

  /**
   * POST类型的网络请求
   */
  postRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'POST')
  }

  /**
   * 网络请求
   */
  requestAll(url, data, header, method) {
    return new Promise((resolve, reject) => {
      // 显示正在等待
      wx.showLoading({
        title: "正在加载中",
        mask: false
      });
      wx.request({
        url: this._baseUrl + url,
        data: data,
        header: header,
        method: method,
        success: (res => {
          let {
            data
          } = res;
          // console.log(res);
          if (data.success && data.code == 200) {
            //200: 服务端业务处理正常结束
            resolve(data.data)
          } else {
            //其它错误，提示用户错误信息
            reject(data.data)
          }
        }),
        fail: (res => {
          reject(res)
        }),
        complete: () => {
          // 隐藏正在等待图标
          wx.hideLoading();
        }
      })
    })
  }
}

export default request