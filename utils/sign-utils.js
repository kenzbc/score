const md5 = require('js-md5');

const d$l$a = "FAMULEIENCODE2329";

/**
 * 对象升序排序
 * @param obj
 */
export function objKeySort(obj){
  var newkey = Object.keys(obj).sort();
  var newObj = {};
  for (var i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = obj[newkey[i]];
  }
  return newObj;
}


/**
 * 创建签名
 * @param params
 * @returns {string}
 */
export function createSign(params){
  let obj = objKeySort(params);
  let signStr = "";

  for (var key in obj) {
    let k = key;
    let v = obj[key];
    if (typeof v != 'undefined' && v != null) {
      //console.log("key="+k+",value="+v+",tyeof="+typeof v);
      signStr += k + v;
    }
    //signStr += k + v;
  }
  // console.log(`signStr=${signStr}`);

  // Object.getOwnPropertyNames(obj).forEach(function(key){
  //   //console.log(key+ '->'+obj[key])
  //   signStr += key + obj[key]
  // })
  let str = signStr + d$l$a;
  //console.log(str)
  //console.log("md5="+md5(signStr + d$l$a))

  let sign = md5(md5(signStr + d$l$a).toUpperCase()).toUpperCase();
  //console.log(sign)

  return sign;
}

export default {
  createSign
}
