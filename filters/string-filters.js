
/**
 * 裁剪字符省略号
 * @param imgStr string
 * @param width number
 * @param height number
 * @returns string
 */
const stringEllipsis = (str, length) => {
  if(str.length > length){
    return str.substr(0, length) + '...';
  }else{
    return str;
  }
};

export default {
  stringEllipsis
}
