import Locale from '~/locales'
// 获取编译启动的默认语言
const NUXT_ENV_LANGUAGE = process.env.NUXT_ENV_LANGUAGE ? process.env.NUXT_ENV_LANGUAGE : "zh";


export const state = () => ({
  locales: Locale(),
  locale: NUXT_ENV_LANGUAGE,
});

export const mutations = {
  /**保存全局默认语言**/
  setLanguage(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      console.log("setLanguage=" + locale);
      state.locale = locale
    }
  },
};
