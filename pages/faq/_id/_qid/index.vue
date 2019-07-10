<template>
  <div class="faq-all">
    <faq-header></faq-header>
    <div class="faq_wrap">
      <p class="faq_home">
        <a href="javascript:;">帮助中心</a>
        <span class="faq_list_span"> > </span>
        <a href="javascript:;" class="faq_list_name">{{getAnswerObj.category_name}}</a>
      </p>
      <h1 class="faq_title cl">
        <span class="fll">{{getAnswerObj.title}}</span>
        <a href="javascript:;" @click="comeBack()" class="flr">&lt; 返回</a>
      </h1>

      <!--问题详情-->
      <div class="faq_content">
        <p class="faq_time">创建时间：<span>{{getAnswerObj.update_time}}</span></p>
        <div class="faq_main" v-html="getAnswerObj.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import FaqHeader from '~/components/faq/faq-header.vue'
  export default {
    name: 'faq-id-qid',
    components: {
      FaqHeader
    },
    data(){
      return {

      }
    },
    async asyncData({$axios, app, params}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
      let [faq_answer] = await Promise.all([
        app.$api.faq.getFaqAnswer({ params: {question_id: params.qid}})
      ])

      return {
        getAnswerObj: faq_answer.data,
      }
    },
    mounted(){

      // console.log(this.$router.params.qid);

    },
    methods: {
      comeBack(){
        this.$router.back(-1);
      },
    }
  }
</script>

<style  lang="stylus" scoped>
  .faq-all {
    background: #fff;
    margin-bottom: 50px;
    min-height: 100vh;
    h3 {
      margin-top: 20px;
      margin-bottom: 10px;
      line-height: 24px;
    }
    /*分类列表*/
    .faq_wrap {
      max-width: 1200px;
      padding-top: 20px;
      margin: 0 auto -50px;

      .faq_home {
        a,
        span {
          color: #1493ff;
        }
        a {
          &:hover {
            color: #4b9ce3;
          }
        }
      }
      .faq_title {
        color: #1F375B;
        font-size: 24px;
        margin-top: 12px;
        margin-bottom: 12px;
        padding-bottom: 18px;
        border-bottom: 1px solid #B9C4CB;
        width: 100%;
        span {
          display: block;
          max-width: 80%;
          float: left;
          height: 26px;
          line-height: 26px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        a {
          font-size: 18px;
          color: #1493ff;
          height: 26px;
          line-height: 26px;
        }
      }
      .faq_list li {
        padding-bottom: 6px;

        .faq_category_title {
          color: #1493ff;

          a {
            font-size: 18px;
            color: #218ff2;

            &:hover {
              color: #4b9ce3;
            }
          }
        }

        .faq_category_desc {
          display: block;
          font-size: 16px;
          line-height: 22px;
          margin-bottom: 4px;

          a {
            color: #5f5f5f;

            &:hover {
              color: #4b9ce3;
            }
          }
        }

        .faq_category_time {
          line-height: 22px;
          color: #99a8b1;
          font-size: 12px;
        }
      }

      /*问题详情*/
      .faq_time {
        padding: 10px 0px 0px 0px;
        margin-bottom: 10px;
        font-size: 12px;
        color: #99a8b1;
        line-height: 22px;
      }

      .faq_main {
        font-size: 16px;
        color: #5f5f5f;
        word-wrap: break-word;
        padding-bottom: 3%;
      }

      .faq_main img {
        max-width: 100%;
      }
    }

  }
  @media screen and (min-width: 769px)  and (max-width: 1200px){
    .faq-all {
      .faq_wrap{
        padding-left 60px
        padding-right 60px
      }
    }
  }
  @media screen and (max-width: 768px) {
    .faq-all {
      .faq_wrap {
        padding: 0 3%;
        overflow hidden

        .faq_title {
          color: #1F375B;
          font-size: 18px;
          margin-top: 12px;
          margin-bottom: 12px;
          padding-bottom: 14px;
          border-bottom: 1px solid #B9C4CB;

          a {
            font-size: 16px;
          }
        }

        .faq_content {

          img {
            max-width 100%
          }
        }
      }
    }
  }
</style>
