/**
 * 节流
 * @param {*} fn 执行函数
 * @param {*} delay 节流时间,毫秒
 */
export function _throttle(fn, delay = 200) {
  var last;
  var timer;
  var delay = delay;
  return function () {
    var th = this;
    var args = arguments;
    var now = +new Date();
    if (last && now - last < delay) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn.apply(th, args);
      }, delay);
    } else {
      last = now;
      fn.apply(th, args);
    }
  }
}
/**
 * 防抖
 * @param {*} fn 执行函数
 * @param {*} wait 防抖时间,毫秒
 */
export function _debounce(fn, wait = 200) {
  var wait = wait;
  var timer;
  return function (){
    var th = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      timer = null;
      fn.apply(th, args);
    }, wait);
  };
}