

const HOST = {
  'zh': '1',
  'en': '2',
  'hk': '3',
};


/***
 *转换语言包为id
 *@param {string} language 语言包名称
 */
export function transformLanguageToId(language) {

  if(!language) return '';

  let languageId = HOST[language];
  if(languageId){
    return languageId;
  }else{
    return '';
  }

}

export default {
  transformLanguageToId,
}
