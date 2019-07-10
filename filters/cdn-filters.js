// import Cookie from 'js-cookie' //npm install js-cookie --save

/**
 * 裁剪CDN图片
 * @param imgStr string
 * @param width number
 * @param height number
 * @returns string
 */
const catImg = (imgStr, width, height) => {
  let url;
  let params = `?x-oss-process=image/resize,m_fill,w_${width},h_${height},limit_0`;
  let format = '/format,jpg';
  if (typeof imgStr === 'string') {
    if (imgStr.indexOf('img1.famulei.com') != -1) {
      url = imgStr + params;
      if (imgStr.lastIndexOf('.gif') != -1) {
        url += format;
      }
    } else {
      url = imgStr;
    }
  } else {
    url = 'https://img1.famulei.com/active/index/img_null.png' + params;
  }
  return url;
};


export default {
  catImg
}
