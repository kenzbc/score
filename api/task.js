import {_axiosApi, _formatParams} from './common'


/**
 * 任务中心
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getTaskCenter = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/task/my_task_center.php', options));


export default (axios) => ({
  getTaskCenter: getTaskCenter(axios), //任务中心列表
})
