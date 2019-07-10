//index.js 服务启动文件
let express = require("express");
let app = express();

let schedule = require('node-schedule');

let { Nuxt, Builder } = require('nuxt');
let config = require('../nuxt.config.js');//nuxt的配置文件
let nuxt = new Nuxt(config);


let ws = require("nodejs-websocket");
var allUserData = new Array();
let server = ws.createServer(function(ws){
  ws.on("text", function (str) {
    try {
      var wsData = JSON.parse(str);
      //判断是否是新用户
      if(CheckIsNew(wsData)) {
        allUserData.push({
          'id':wsData.id,
          'ws':ws
        });
        ws.sendText(JSON.stringify({
          fromId: 0,
          nickname: '系统信息',
          avatar: 'https://img1.famulei.com/m/393180/p/185/2114184063264_100x100.png',
          content: `欢迎你 ${wsData.nickname}`,
          date: new Date().toLocaleString()
        }));
      } else {
        for(let i=0; i<allUserData.length; i++) {
          //获取接收者ID，判断接收者用户知否在线。要用 接收者的ws连接池来发送
          if(wsData.toMemberId == allUserData[i]['id']) {
            //信息类型不是注册
            if(wsData.type != "userRegister") {
              // item['ws'].sendText(wsData.id + wsData.data);
              console.log(`接收到到客户端 ${wsData.id} 的消息，发送给 ${wsData.toMemberId}`);
              let dateStr = new Date().toLocaleString();
              //发送给对方
              singleMsg({
                server:server,
                fromId: wsData.id,
                nickname:wsData.name,
                avatar: wsData.avatar,
                content:wsData.content,
                memberId: wsData.id,
                toMemberId: wsData.toMemberId,
              });
              //发送给自己
              ws.sendText(JSON.stringify({
                fromId: wsData.id,
                nickname: wsData.name,
                avatar: wsData.avatar,
                content: wsData.content,
                date: dateStr
              }));
              break;
            }
          }
        }
      }
    }catch (e) {
      console.log(e);
    }
  });

  ws.on("close", function (code, reason) {
    console.log("Connection closed");
    // 当用户退出的时候捕捉到退出的用户
    for (var i=0 in allUserData) {
      if (allUserData[i].ws == ws) {
        allUserData.splice(i, 1);
        break;
        // console.log(allUserData[i])
      }
    }
  });

  ws.on("error", function (code, reason) {
    console.log("异常关闭")
    console.log(code);
    console.log(reason);
  });

}).listen(3110);
console.log("WebSocket建立完毕");


/**
 * 判断当前连接的用户是否是新用户
 * @param temp
 * @returns {boolean}
 * @constructor
 */
function CheckIsNew(wsData) {
  for(let i=0;i<allUserData.length;i++) {
    if(wsData.id == allUserData[i]['id']) {
      return false;
    }
  }
  return true;
}

/**
 * WebSoceket 广播消息
 * @param server
 * @param msg
 */
function broadcast(server, msg) {
  // 取到server下面的所有连接
  server.connections.forEach(function (ws) {
    ws.sendText(JSON.stringify({
      fromId: 0,
      nickname: '系统信息',
      avatar: 'https://img1.famulei.com/m/393180/p/185/2114184063264_100x100.png',
      content: msg,
      date: new Date().toLocaleString()
    }))
  })
}

/**
 * WebSoceket 发送单个消息
 * @param server
 * @param memberId 发送者ID
 * @param toMemberId 接收者ID
 * @param content 消息内容
 */
function singleMsg(obj) {

  if(allUserData && allUserData.length > 0){
    for(let i=0; i<allUserData.length;i++){
      if(allUserData[i].id == obj.toMemberId) {
        console.log(obj.memberId+' 发送单个消息 给'+ obj.toMemberId);

        allUserData[i]['ws'].sendText(JSON.stringify({
          fromId: obj.memberId,
          nickname: obj.nickname,
          avatar: obj.avatar,

          content: obj.content,
          date: new Date().toLocaleString()
        }));
        return false;
      }
    }
  }
}







app.get("/myApi",function(req,res){  //自己的路由
  console.log(req.query);

  if(req.query.id){
    singleMsg(server, req.query.id ,`啦啦啦，我是服务端推送给 ${req.query.id} 的一条消息`);
  }else{
    broadcast(server,'啦啦啦，我是从服务端发送的广播消息');
  }

  let data = {};
  data.code = '0000';
  data.msg = '发送成功';
  data.data = {};
  res.send(data);
});


if (config.dev) {// 是否启用开发模式
  let builder = new Builder(nuxt);
  builder.build();
}


schedule.scheduleJob('00 * * * * *', function(){
  console.log(`我是一个定时任务~`  +'ts='+ new Date().getTime());
});



app.use(nuxt.render);//自己定义的路由写它上边
app.listen(config.port, function() {
  console.log('=>=>=> ScoreWeb Application Running Is on port '+config.port)
});
