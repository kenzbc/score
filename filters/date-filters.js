import moment from 'moment'

/**
 * 格式化时间戳
 * @param timestamp
 * @returns {string}
 */
const getTs = ts => {
  let _ts = ts + '';
  if ((/^\d{10}$/).test(_ts) || (/^\d{13}$/).test(_ts)) {
    if (_ts.length === 10) _ts += '000'
  }
  return _ts
}

/**
 * 转换服务器时区时间
 * @param t  2018-12-31 12:10:10
 * @param utc 8
 * @returns {string}
 */
function transformTimeZoneDate(t,utc){
  //t传入的时间参数,utc传入的时区参数
  if(!t) return;

  //获取本地时间
  var d=new Date();

  //获得本地时区
  utc=utc?parseFloat(utc):d.getTimezoneOffset()/60;

  //格式化传入时间
  var time=new Date(t);

  //转换传入时间为本地时间（默认传入服务器时间为东八区时间）
  time.setHours(time.getHours()+(utc-8));

  //输出时间
  var yy=time.getFullYear();
  var MM=time.getMonth()+1;
  MM=MM<10?'0'+MM:MM;
  var dd=time.getDate();
  dd=dd<10?'0'+dd:dd;
  var hh=time.getHours();
  hh=hh<10?'0'+hh:hh;
  var mm=time.getMinutes();
  mm=mm<10?'0'+mm:mm;
  var ss=time.getSeconds();
  ss=ss<10?'0'+ss:ss;
  var date=yy+'-'+MM+'-'+dd+' '+hh+':'+mm+':'+ss;

  return date;
}

/**
 * 将时间戳转换为距离当前的 x月前，x天前等
 * @param ts
 * @returns {string|string}
 */
const tsToaGo = ts => {   //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();   //获取当前时间毫秒
  // console.log(now)

  var dateTimeStamp = ts+'';
  var diffValue = now;
  if(dateTimeStamp.length<14){
    diffValue = now - dateTimeStamp*1000;//时间差
  }else{
    diffValue = now - dateTimeStamp;
  }
  var result = '';

  if(diffValue < 0){
    return;
  }
  var minC = diffValue/minute;  //计算时间差的分，时，天，周，月
  var hourC = diffValue/hour;
  var dayC = diffValue/day;
  var weekC = diffValue/week;
  var monthC = diffValue/month;
  if(monthC >= 1 && monthC <= 3){
    result = " " + parseInt(monthC) + "月前"
  }else if(weekC >= 1 && weekC <= 3){
    result = " " + parseInt(weekC) + "周前"
  }else if(dayC >= 1 && dayC <= 6){
    result = " " + parseInt(dayC) + "天前"
  }else if(hourC >= 1 && hourC <= 23){
    result = " " + parseInt(hourC) + "小时前"
  }else if(minC >= 1 && minC <= 59){
    result =" " + parseInt(minC) + "分钟前"
  }else if(diffValue >= 0 && diffValue <= minute){
    result = "刚刚"
  }else {
    var datetime = new Date();
    datetime.setTime(dateTimeStamp);
    var Nyear = datetime.getFullYear();
    var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    result = Nyear + "-" + Nmonth + "-" + Ndate
  }
  return result;
}

/**
 * 将时间戳转换成日期格式
 * @param timestamp
 * @param format   ('YYYY-MM-DD', 'MM-DD')
 * @returns {string}
 */
const tsToDate = (ts, format) => {
  const _ts = getTs(ts)
  if (_ts) {
    if (typeof format === 'string') return moment(_ts, 'x').format(format)
    return moment(_ts, 'x').format('YYYY-MM-DD')
  }
  return ''
}

/**
 * 转换周日期 ( 日期格式参见 http://momentjs.cn/docs/#/displaying/format/ )
 * @param dateStr  时间戳、日期字符串
 * @param sourcePatternStr  源日期格式
 * @returns {string}
 */
const weekDay = (dateStr, sourcePatternStr) => typeof dateStr === 'string' ? moment(dateStr, sourcePatternStr).format('ddd') : ''

/**
 * 日期转换 ( 日期格式参见 http://momentjs.cn/docs/#/displaying/format/ )
 * @param dateStr  时间戳、日期字符串
 * @param sourcePatternStr  源日期格式
 * @param expectPatternStr  目标日期格式
 * @returns {string}
 */
const dateFormat = (dateStr, sourcePatternStr, expectPatternStr) => {
  if (sourcePatternStr.toLowerCase() === 'x') {
    sourcePatternStr = 'x'
    dateStr = getTs(dateStr)
  }
  return typeof dateStr === 'string' ? moment(dateStr, sourcePatternStr).format(expectPatternStr) : ''
}

/**
 * 时差转换 ( 日期格式参见 http://momentjs.cn/docs/#/displaying/format/ )
 * @param dateStr  时间戳、日期字符串
 * @param sourcePatternStr  源日期格式
 * @param expectDateStr  比较的日期
 * @returns {string}
 */
const fromDate = (dateStr, sourcePatternStr, expectDateStr) =>
  typeof dateStr === 'string' ? moment(dateStr, sourcePatternStr).from(expectDateStr) : ''

/**
 * 时差转换 ( 日期格式参见 http://momentjs.cn/docs/#/displaying/format/ )
 * @param dateStr  时间戳、日期字符串
 * @param sourcePatternStr  源日期格式
 * @returns {string}
 */
const fromNow = (dateStr, sourcePatternStr) => typeof dateStr === 'string' ? moment(dateStr, sourcePatternStr).fromNow() : ''



export default {
  tsToaGo,
  tsToDate,
  weekDay,
  dateFormat,
  fromDate,
  fromNow
}
