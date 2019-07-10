<template>
  <div class="faq-all">
    <faq-header></faq-header>
    <ul class="faq-category-list cl">
      <li v-for="item in category_list">
        <nuxt-link :to="{ name: 'faq-id', params: { id: item.id}, query: { name: item.name}}" class="faq-category-a">
          <img :src="item.image_url" class="faq-category-img">
          <div class="faq-category-main">
            <h3>{{item.name}}</h3>
            <p>{{item.demo}}</p>
          </div>
        </nuxt-link>
      </li>
    </ul>

    <!--单个问答-->
    <!--<faq-answer @listenToAnswerEvent="childBackData" :getAnswerObj="getAnswerObj" v-if="faqGetAnswer"></faq-answer>-->
    <!--<faq-ask @listenToAskEvent="childBackData" :category_list="category_list" v-if="faqAskBlock"></faq-ask>-->
    <!--<faq-my-list></faq-my-list>-->
  </div>
</template>

<script>
  export default {
    name: 'index',
    components: {
    },
    async asyncData({$axios, app}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
      let [category_list] = await Promise.all([
        app.$api.faq.getFaqCategoryList()
      ])
      return {
        category_list: category_list.data,
      }
    },
    methods: {

    }
  }
</script>

<style lang="stylus" scoped>
  .faq-all {
    background: #fff;
    margin-bottom: 50px;
    min-height: 100vh;
    h3 {
      margin-top: 20px;
      margin-bottom: 10px;
      line-height: 24px;
    }

    .faq-category-list {
      max-width: 1200px;
      margin: -50px auto;

      li {
        width: 33%;
        padding: 24px 12px;
        float: left;

        .faq-category-a {
          display: block;
          position: relative;

          .faq-category-img {
            width: 65px;
            height: 65px;
            position: absolute;
            left: 50%;
            top: -32px;
            margin-left: -32px;
          }
          .faq-category-main {
            width: 100%;
            min-height: 170px;
            text-align: center;
            background-color: #fff;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
            border-radius: 3px;
            padding-top: 30px;

            h3 {
              font-size: 18px;
              color: #1f375b;
            }

            p {
              font-size: 14px;
              color: #818e95;
            }
          }
        }
      }
    }
  }
  @media screen and (min-width: 769px)  and (max-width: 1200px){
    .faq-all {
      .faq-category-list{
        width 100%
      }
    }
  }

  @media screen and (max-width: 768px) {
    .faq-all {
      .faq-category-list {
        width 100%
        margin-top: 0;

        li {
          width: 100%;
          padding: 0 5%;
          float: inherit;

          .faq-category-a {
            .faq-category-img {
              display: none;
            }
            .faq-category-main {
              min-height: inherit;
              text-align: left;
              box-shadow: none;
              padding-top: 0;

              h3 {
                line-height: 50px;
                font-size: 14px;
                color: #1493ff;
                border-bottom: 1px solid #CFD6DB;
                text-align: left;
                padding-left: 2%;
                margin: 0;
                background-image: url('/images/faq/faq_right.svg');
                background-repeat: no-repeat;
                background-position: right 2px top 16px;
                background-size: 20px 20px;
              }
              p {
                display: none;
              }
            }
          }
        }




      }
    }
  }
</style>
