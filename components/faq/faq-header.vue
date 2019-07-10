<template>
  <div class="faq-top">
    <h1><a href="/faq">帮助中心</a></h1>
    <div class="faq-search">
      <input placeholder="输入问题" id="faq_input" v-model="searchBtnParams.search" name="faq_input" type="text" maxlength="50" value=""  @keyup.enter="searchFaqQuestion()">
      <a href="javascript:;" @click="searchFaqQuestion()">搜索</a>
    </div>
    <div class="faq-ask">
      <i class="iconfont icon-faq-chat"></i><a href="javascript:;" id="J_openChat" @click="OnlineService()">Online Service</a>
      <span class="wkit_span"> | </span>
      <div class="ask-icon"></div><a href="javascript:;" @click="faqLineType()">在线提问</a>
      <span> | </span>
      <i class="iconfont icon-new"></i><a href="javascript:" @click="showMyFaq()">我的提问</a>
    </div>
    <faq-my-list v-if="showMyFaqBlock"  @listenToMyList="childBackData"></faq-my-list>
  </div>
</template>

<script>
  import FaqMyList from './faq-my-list.vue'

  export default {
    name: 'faq-header',
    data(){
      return {
        searchBtnParams: {  // 搜索按钮参数
          search: '',
          page: 1,
          limit: 10
        },
        // faqMyList:[],
        // faqMyListParams: {
        //   page: 1,
        //   limit: 10
        // },
        showMyFaqBlock: false,  // 我的提问弹窗

      }
    },
    components: {
      FaqMyList
    },
    methods: {
      // 搜索按钮
      searchFaqQuestion(){
        if (this.searchBtnParams.search == '') {
          this.$Message.warning('请输入搜索内容');
          return false;
        }
        this.$router.push({
          name: 'faq-id',
          params: { id: 0 },
          query: {
            search: this.searchBtnParams.search
          }
        });
      },
      // 在线咨询
      async OnlineService(){
        if(!await this.$getLoginStatus()){return false;}
        let HOST = location.host;
        let URL = HOST.indexOf('host') > 0 ? 'https://www.famulei.com' : ''; // 在开发模式下
        window.open( URL + '/active/wkit/index.html', 'chatwindow', 'toolbar=no, status=no,scrollbars=0,resizable=0,menubar＝0,location=0,width=700,height=500');
      },
      // 在线提问
      async faqLineType(){
        if(!await this.$getLoginStatus()){return false;}
        this.$router.push({
          name: 'faq-ask'
        });
      },
      // 我的提问
      async showMyFaq(){
        if(!await this.$getLoginStatus()){return false;}
        // alert('我的提问')
        // let res = await this.$api.faq.getFaqMyList({ params: this.faqMyListParams })
        // console.log('searchCategory 数据')
        // console.log(res)
        // this.faqMyList = this.faqMyListParams.page == 1 ? res.data.list || [] : this.faqMyList.concat(res.data.list)


        this.showMyFaqBlock = true
        // this.faqMyList && this.faqMyList.length > 0 ? this.showMyFaqBlock = true : this.$Message.warning('您没有提交过问题！');
      },
      // 监听返回数据 -> ask
      childBackData(params){
        this.showMyFaqBlock = params.showMyFaqBlock;
      }
    },
  }
</script>

<style lang="stylus" scoped>

  .faq-top {
    height: 350px;
    text-align: center;
    background-image: url('/static/images/faq/faq_bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom right;
    background-color: #1e3d63;
    padding-top: 4.5%;

    h1 {
      font-size: 44px;
      color: #fff;
      margin-bottom: 20px;

      a {
        color #fff

        &:hover {
          text-decoration: none;
          color: #4b9ce3;
        }
      }
    }
    .faq-search {
      max-width: 500px;
      margin: 0 auto 12px auto;
      position: relative;

      input {
        width: 100%;
        font-size: 18px;
        color: #818E95;
        background-image: url('/static/images/faq/faq_search.svg');
        background-repeat: no-repeat;
        background-size: 20px 20px;
        background-position: 15px;
        border-radius: 3px;
        padding-left: 50px;
        padding-right: 15%;
        border: none;
        height: 55px;
      }

      a {
        line-height: 55px;
        right: 20px;
        bottom: 0;
        overflow: visible;
        font-size: 18px;
        font-weight: normal;
        color: #1493ff;
        text-shadow: none;
        position: absolute;
      }
    }
    .faq-ask {
      text-align: center;
      .iconfont {
        display: inline-block;
        vertical-align: middle;
        color: #fff;
        margin-right: 8px;
      }
      .ask-icon {
        width: 17px;
        height: 17px;
        margin-right: 8px;
        display: inline-block;
        vertical-align: middle;
        background-image: url('/static/images/faq/ask.svg');
      }
      a {
        color: #fff;
        font-size: 18px;
        display: inline-block;
        vertical-align: middle;

        &:hover {
          text-decoration: none;
          color: #4b9ce3;
        }
      }
      span {
        display: inline-block;
        vertical-align: middle;
        color: #fff;
        padding: 0 10px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .faq-top {
      padding-top: 40px;
      max-height: 140px;
      margin-bottom: 80px;
      h1 {
        font-size: 28px;
        margin-bottom: 28px;
      }
      .faq-search {
        padding: 0 3%;

        input {
          height: 42px;
          font-size: 14px;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06), 0 0 5px rgba(55, 112, 192, 0.7);
        }

        a {
          line-height: 42px;
          font-size: 14px;
          right: 9%;
        }
      }

      .faq-ask {
        a {
          font-size: 14px;
          color: #1493ff;
        }
        .iconfont {
          display: none;
          color: #1493ff;
          margin-right: 6px;
          font-size: 13px;
        }
        span {
          padding: 0 3px;
        }
        .ask-icon {
          display: none;
          width: 14px;
          height: 14px;
          margin-right: 6px;
          background-image: url('/images/faq/ask_blue.svg');
        }
      }
    }
  }
</style>
