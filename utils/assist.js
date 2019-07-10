// 判断参数是否是其中之一
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

/**
 * 获取url中的文件名
 * @param url
 * @returns {string}
 */
export function getHtmlDocName (url) {
  let str = url;
  str = str.substring(str.lastIndexOf("/") + 1);
  str = str.substring(0, str.lastIndexOf("."));
  return str;
}

/**
 * 获取url中的某个参数
 * @param url
 * @returns {string}
 */
export function getUrlParam (url) {
  //构造一个含有目标参数的正则表达式对象
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  //匹配目标参数
  var r = window.location.search.substr(1).match(reg);
  //返回参数值
  if (r != null) return decodeURI(r[2]);
  //不存在时返回null
  return null;
}

/**
 * 禁止window滚动
 * @returns {*}
 */
export function stopWindowScroll () {
  var mo=function(e){e.preventDefault();};
  document.body.style.overflow='hidden';
  document.addEventListener("touchmove",mo,false);//禁止页面滑动
}

/**
 * 解除禁止window滚动
 * @returns {*}
 */
export function starWindowScroll () {
  var mo=function(e){e.preventDefault();};
  document.body.style.overflow='';//出现滚动条
  document.removeEventListener("touchmove",mo,false);
}

