import global from './global' // 全局接口
import member from './member' // 会员
import tournamentFn from './tournament'
import videoFn from './video'
import bet from './bet' // 菠菜
import upload from './upload' // 上传
import badge from './badge' //徽章
import dynamic from './dynamic' //帖子
import comment from './comment' //评论
import circle from './circle' //圈子
import user from './user' // 用戶
import faq from './faq' // 帮助
import task from './task' // 任务中心
import star from './star' // 官方号
import cms from './cms' // cms
import match from './match' // match
import bar from './bar' // bar



export default (axios) => {

  const BASE_URL = axios.defaults.baseURL;  // BASE_URL

  return {
    global: global(axios),//全局接口
    member: member(axios),//会员相关
    upload: upload(axios),//上传接口
    tournament: tournamentFn(axios),
    video: videoFn(axios),
    bet: bet(axios), //菠菜
    badge: badge(axios), //徽章
    dynamic: dynamic(axios), //帖子
    comment: comment(axios), //评论
    circle: circle(axios), //圈子
    user: user(axios), //用戶
    faq: faq(axios), //帮助
    task: task(axios), //任务中心
    star: star(axios), //官方号
    cms: cms(axios), //cms
    match: match(axios), //match
    bar: bar(axios), //bar
  }
}
