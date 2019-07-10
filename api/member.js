import {_axiosApi, _formatParams} from './common'



/**
 * 获取国家区号
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getCountryCode = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/member/country_code_list.php', options));

/**
 * 登录
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getLogin = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/member/member_login.php', options));

/**
 * 注销
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let setLogout = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/member/member_out.php', options));

/**
 * 获取别人的用户信息
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getUserInfo = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/member/get_user_info.php', options));

/**
 * 获取自己的用户信息
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getMemberInfo = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/member/member_info.php', options));


/**
 * 获取用户消息数量
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getMessageCount = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/chat/count.php', options));


/**
 * 注册
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getRegister = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/member/member_register.php', options));


/**
 * 验证手机号是否注册
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getMobileIsRegister = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/member/check_mobile_register.php', options));


/**
 * 获取短信验证码，验证码验证码是否正确
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选) {op:send 发送验证码，op:check 验证验证码是否正确  }
 * return promise对象
 */
let getMsgCode = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/common/mobile_code.php', options));

/**
 * 屏蔽用户
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选) {op:send 发送验证码，op:check 验证验证码是否正确  }
 * return promise对象
 */
let setBlockMemeber = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/member/block_member.php', options));

/**
 * 用户战绩查询
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getMemberRecord = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/member/member_record.php', options));


/**
 * 关注好友
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let setAttention = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/member/attention_member.php', options));

/**
 * 关注多个好友
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let setAttentionAll = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/member/attention_save.php', options));

/**
 * 取消关注好友
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let unAttention = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/member/cancel_attention_member.php', options));








export default (axios) => ({
  getCountryCode: getCountryCode(axios),
  getLogin: getLogin(axios),
  setLogout: setLogout(axios),
  getUserInfo: getUserInfo(axios),
  getMemberInfo: getMemberInfo(axios), //获取自己的用户信息
  getMessageCount: getMessageCount(axios),
  getRegister: getRegister(axios),
  getMobileIsRegister: getMobileIsRegister(axios),
  getMsgCode: getMsgCode(axios),
  setBlockMemeber: setBlockMemeber(axios), //屏蔽用户
  getMemberRecord: getMemberRecord(axios), //用户战绩查询
  setAttention: setAttention(axios), //关注好友
  setAttentionAll: setAttentionAll(axios), //关注多个好友
  unAttention: unAttention(axios), //取消关注好友
})
