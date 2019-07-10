import {_axiosApi, _formatParams} from './common'

/**获得首页帖子数据**/
let getPostList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/cms/article_list.php', options));

/**圈子，QA列表**/
let getQAList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/cms/qa_list.php', options));



export default (axios) => ({
  getPostList:getPostList(axios),//获得首页帖子数据
  getQAList:getQAList(axios),//圈子，QA列表
})
