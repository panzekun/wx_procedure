import request from '../../utils/request';
const api = new request();
import {
  _debounce
} from "../../utils/commonfn";

Page({
  data: {

    // 搜索结果的数组
    list: [],
    // 输入框的值
    inpValue: ""
  },
  // 输入框的值 改变 就会触发
  handleInput(e) {
    //  2 获取输入框的值
    const {
      value
    } = e.detail;
    this.setData({
      inpValue: value
    })

    this.getProductList()
  },
  // 获取商品列表
  getProductList: _debounce(function () {
    // 使用微信小程序内置发送请求的代码来获取数据
    let params = {
      // 页码
      pagenum: parseInt(this.data.inpValue) || 1,
      // 页容量
      pagesize: 10
    }
    api.postRequest(
      'home/getProductList', params
    ).then(res => {
      let list = [...this.data.list, ...res.productList];
      this.setData({
        list
      });
      // 自己帮我们计算 
      console.count("触发的次数");
    })
  })
})