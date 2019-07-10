import Cookie from "js-cookie";


function getcookiesInServer(req){
  let service_cookie = {};
  req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
    let parts = val.split('=');
    service_cookie[parts[0].trim()] = (parts[1] || '').trim();
  });
  return service_cookie;
}
//获取客户端cookie
function getcookiesInClient (key){
  return Cookie.get(key) ? Cookie.get(key) : ''
}



export default function ({store, route, req, res, redirect}) {

  let isClient = process.client;
  let isServer = process.server;
  let redirectURL = '/login';
  var token, path;
  //在服务端
  if (isServer) {
    console.log('在服务端~')
    let cookies = getcookiesInServer(req);
    path = req.originalUrl;
    token = cookies.f_token ? cookies.f_token : ''
  }
  //在客户端判读是否需要登陆
  if (isClient) {
    console.log('在客户端~');
    token = getcookiesInClient('f_token');
    path = route.path;
  }
  if (path) {
    redirectURL = '/login?ref=' + encodeURIComponent(path);
  }
  //需要进行权限判断的页面开头
  if (!token) {
    console.log('token为空，跳转登录~');
    redirect(redirectURL)
  }
}
