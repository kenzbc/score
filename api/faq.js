import {_axiosApi, _formatParams} from './common'

/**
 * 获得帮助列表数据
 * @param options: object (可选)
 * return promise对象
 */
let getFaqCategoryList = (axios) => (options) => _axiosApi(axios, _formatParams('/services/faq/faq_category_list.php', options))


/**
 * 获得帮助 分类下列表数据
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getFaqByCategoryList = (axios) => (options) => _axiosApi(axios, _formatParams('/services/faq/search_faq_by_category.php', options))


/**
 * 获得帮助 单个问答数据
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getFaqAnswer = (axios) => (options) => _axiosApi(axios, _formatParams('/services/faq/get_faq.php', options))


/**
 * 获得帮助 搜索结果列表
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getSearchFaqQuestion = (axios) => (options) => _axiosApi(axios, _formatParams('/services/faq/search_faq_question.php', options))


/**
 * 提交form 问题表单
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getFaqMyList = (axios) => (options) => _axiosApi(axios, _formatParams('/services/faq/get_faq_list.php', options))


/**
 * 提交faq 我的提问列表
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let faqSubmitForm = (axios) => (options) => _axiosApi(axios, _formatParams('/services/faq/submit_faq_form.php', options))

export default (axios) => ({
  getFaqCategoryList: getFaqCategoryList(axios),
  getFaqByCategoryList: getFaqByCategoryList(axios),
  getFaqAnswer: getFaqAnswer(axios),
  getSearchFaqQuestion: getSearchFaqQuestion(axios),
  getFaqMyList: getFaqMyList(axios),
  faqSubmitForm: faqSubmitForm(axios),

})
