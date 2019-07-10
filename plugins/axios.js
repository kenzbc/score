import qs from "qs"
import Cookie from 'js-cookie' //npm install js-cookie --save
import {createSign} from '~/utils/sign-utils'

const isDev = process.env.NODE_ENV == "production" ? false : true;
const NUXT_ENV_LANGUAGE = process.env.NUXT_ENV_LANGUAGE ? process.env.NUXT_ENV_LANGUAGE : "zh";

/**
 * 获取客户端时区
 * @returns {string}
 */
function getClientTimezone(){
  var oDate = new Date();
  var nTimezone = -oDate.getTimezoneOffset() / 60;
  return nTimezone.toFixed(0);
}

export default function ({store, $axios, route, redirect, req}) {

  //console.log(`axios-language=${NUXT_ENV_LANGUAGE}`);
  const headers = (req && req.headers) ? Object.assign({}, req.headers) : {};
  let headerHost = headers.host ? headers.host : window.location.host;
  console.log(`headerHost = ${headerHost}`);
  const HOST = {
    'www.famulei.com': 'https://api-v2.famulei.com',
    'scoregg.com': 'https://api-v2.famulei.com',
    'score.gg': 'https://api-v2.famulei.com',
    'nuxt.ufu.auan.cn': 'https://api-v2.famulei.com',

    'staging-1.famulei.com': 'https://staging-api-1.famulei.com',
    'staging-2.famulei.com': 'https://staging-api-2.famulei.com',
    'staging-3.famulei.com': 'https://staging-api-3.famulei.com',

    'dev.famulei.com': 'https://dev-api.famulei.com',

    'www.famulei.cn': 'https://dev-api.famulei.com',
    'localhost': 'https://dev-api.famulei.com',
    // 'localhost:3000': 'https://api-v2.famulei.com',
    // 'localhost:3000': 'https://dev-api-2.famulei.com',
    'localhost:3000': 'https://dev-api.famulei.com',
    // 'localhost:3000': 'http://localhost:3000',
  };
  const baseURL = HOST[headerHost];

  const redirectURL = route.fullPath;
  //console.log('%c ','background-image:url("http://iyeslogo.orbrand.com/150902Google/005.gif");background-size:120% 120%;background-repeat:no-repeat;background-position:center center;line-height:60px;padding:30px 120px;');

  console.log(`baseURL = ${baseURL}`);

  console.log(`axios-cookie-token=${Cookie.get('f_token')}`)
  console.log(`axios-store-token=${store.state.modules.login.f_token}`)
  $axios.defaults.retry = { retries: 3 };
  $axios.defaults.withCredentials = true// 是否允许带cookie这些
  //开发模式下开启debug
  $axios.defaults.debug = process.env.NODE_ENV == "production" ? false : true;
  // console.log(`axios-NODE_ENV=${process.env.NODE_ENV}`)
  // console.log(`axios-NUXT_ENV_PATH=${process.env.NUXT_ENV_PATH}`)


  // 设置请求头
  $axios.defaults.timeout = 10000;
  $axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  //$axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
  $axios.defaults.baseURL = baseURL;

  //request统一处理操作
  $axios.onRequest(config => {
    let defaultParams = {
      timezone: getClientTimezone(),
      appid: 1,
      api_version: '9.9.9',
      platform: 'web',
      language_id: store.state.modules.apiParams.languageId,
      gameID: store.state.modules.apiParams.gameId,
      ts: Math.round(new Date() / 1000)
    };

    if (config.method === 'post') {
      let params = Object.assign({}, defaultParams, qs.parse(config.data));

      if(store.state.f_token){
        params.member_id = store.state.modules.login.member_id;
        params.token = store.state.modules.login.f_token;
      }

      //判断是否是上传图片请求
      if(config.url == '/services/common/upload_image.php'){
        //处理所有参数到 formData
        for(let k in params){
          config.data.append(k,params[k]);
        }
        //签名除file外的其他参数
        params.file_type = config.data.get('file_type');
        params.type = config.data.get('type');
        //将创建好的签名追加到 formData
        config.data.append("sign",createSign(params));
      }else{
        params.sign = createSign(params);
        config.data = qs.stringify(params, {
          allowDots: true //Option allowDots can be used to enable dot notation
        });
      }

      if(isDev){
        console.log(config.method +" "+ config.baseURL + config.url+'?'+config.data);
      }
    }


    if (config.method === 'get') {
      // 如果请求JSON，不用合并默认参数
      let params
      if (config.url.lastIndexOf('.json') != -1) {
        // config.baseURL = headers.host ? 'https://' + headers.host : 'http://localhost:3000';
        config.baseURL = window ? window.location.origin : 'http://localhost:3000';
        // config.baseURL = 'http://localhost:3000';
        // config.baseURL = 'http://localhost:3000';
        // config.baseURL = "http://nuxt.ufu.auan.cn";
        params = Object.assign({ts: Math.round(new Date() / 1000)}, config.params);
      } else {
        params = Object.assign({}, defaultParams, config.params);
        if(store.state.modules.login.f_token){
          params.member_id = store.state.modules.login.member_id;
          params.token = store.state.modules.login.f_token;
        }
        params.sign = createSign(params);
      }
      config.params = params;

      if(isDev){
        console.log(config.method +" "+ config.baseURL + config.url+'?'+qs.stringify(config.params));
      }
    }

    return config
  }, (error) => {
    console.log("参数错误！");
    return Promise.reject(error);
  });

  //response统一处理操作
  $axios.onResponse(response => {
    // code状态码200判断
    // console.log(response)
    // console.log("response.data.code = "+response.data.code+'\n');
    if(response.data.code != '200'){
      console.log("response.data.code="+response.data.code);
      console.log("response.data.message="+response.data.message);
    }

    if(response.data.code == '40500'){
      store.commit('modules/login/removeToken');
      Cookie.remove('f_token');
      Cookie.remove('member_id');
      Cookie.remove('member_avatar');
      Cookie.remove('userInfo');
      //console.log('ref='+redirectURL);
      redirect('/login?ref='+redirectURL);
    }

    //判断接口中是否有随机事件内容
    if(response.data.event && response.data.event.length > 0){
      // console.log(`event:`);
      // console.log(response.data.event);
      store.commit('modules/event/setEventPop',response.data.event);
    }


    Promise.resolve(response)
  }, (error) => {
    console.log("网络异常");
    return Promise.reject(error)
  });

  $axios.onError(error => {
    console.log("请求错误");
    return Promise.reject(error)
  });
}
