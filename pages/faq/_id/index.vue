<template>
  <div class="faq-all">
    <faq-header></faq-header>
    <div class="faq_wrap" >
      <h1 class="faq_title cl">
        <span class="fll">{{categoryName}}</span>
        <a href="javascript:;" @click="comeBack()" class="flr">&lt; 返回</a>
      </h1>
      <!--分类详情-->
      <ol class="faq_list">
        <li v-for="item in byCategoryList" v-if="byCategoryList && byCategoryList.length > 0">
          <h3 class="faq_category_title">
            <nuxt-link :to="{ name: 'faq-id-qid', params:{ qid:item.question_id } }">
              {{item.title}}
            </nuxt-link>
          </h3>
          <span class="faq_category_desc">
            <nuxt-link :to="{ name: 'faq-id-qid', params:{ qid:item.question_id } }">
              {{item.summary}}...
            <!--<a href="javascript:;" @click="getAnswer(item.question_id)">{{item.summary}}...</a>-->
            </nuxt-link>
          </span>
          <span class="faq_category_time">创建时间: </span>
          <span class="faq_category_time">{{item.update_time}}</span>
        </li>
        <p class="search_none" v-if="NoData">暂无相关问题</p>
      </ol>
    </div>
  </div>
</template>

<script>
  import FaqHeader from '~/components/faq/faq-header.vue'
  export default {
    name: 'faq-id',
    components: {
      FaqHeader
    },
    data(){
      return {
        byCategoryList: [],  // 分类列表
        isLoadMoreLock: true,  // 数据加载
        categoryName: this.$route.query.name ? this.$route.query.name : '搜索与"' + this.$route.query.search + '"相关的问题',  // 分类名
        params: {   // 分类索引参数
          cate_id: this.$route.params.id,
          limit: 10,
          last_key: '',
        },
        searchBtnParams: {  // 搜索按钮参数
          search: this.$route.query.search,
          page: 1,
          limit: 10
        },
        NoData: false,   // 无数据
      }
    },
    async asyncData({$axios, app, params, query}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
      if (params.id != 0){
        let [by_category_list] = await Promise.all([
          app.$api.faq.getFaqByCategoryList({ params: { cate_id: params.id , limit: 10, last_key: ''}})
        ])

        return {
          byCategoryList: by_category_list.data.list,
        }
      } else {
        let [search_faq_question] = await Promise.all([
          app.$api.faq.getSearchFaqQuestion({ params: {search: query.search ,page: 1,limit: 10}})
        ])

        return {
          byCategoryList: search_faq_question.data.list,
        }
      }

    },
    methods: {
      // window滚动事件
      async winHandleScroll(e) {
        let clientWidth = e.target.documentElement.clientWidth // 浏览器可视区域宽度
        let clientHeight = e.target.documentElement.clientHeight // 浏览器可视区域高度
        let scrollTop = e.target.documentElement.scrollTop   // document滚动偏移量
        let scrollHeight = e.target.documentElement.scrollHeight //文档内容实际高度（包括超出视窗的溢出部分）

        if (this.isLoadMoreLock && clientHeight + scrollTop >= scrollHeight - 300) {
          this.isLoadMoreLock = false
          // 搜索分类分页
          this.setCacheKey();
          this.getData();
        }
      },
      // 获取分类列表最后一条数据的cache_key，设置给params参数
      setCacheKey() {
        if (this.byCategoryList && this.byCategoryList.length > 0) {
          if (this.$route.query.search) {
            this.searchBtnParams.page += 1
          } else {
            this.params.last_key = this.byCategoryList[this.byCategoryList.length - 1].question_id;
          }
        }
      },
      // 分别获取数据
      async getData(){
        if (this.$route.query.search) {
          // 搜索索引 数据列表
          console.log('搜索索引 数据列表')
          console.log(this.searchBtnParams)
          let res = await this.$api.faq.getsearchFaqQuestion({ params: this.searchBtnParams});
          if (res.code == '200') {
            this.byCategoryList = this.searchBtnParams.page == 1 ? res.data.list || [] : this.byCategoryList.concat(res.data.list);
            if (this.byCategoryList.length != 0 && res.data.list.length != 0) this.isLoadMoreLock = true
          } else {
            this.$Message.warning(res.message);
          }
        } else {
          // 分类索引 数据列表
          console.log('分类索引 数据列表')
          console.log(this.params)
          let res = await this.$api.faq.getFaqByCategoryList({ params: this.params});

          if (res.code == '200') {
            this.byCategoryList = this.params.last_key == '' ? res.data.list || [] : this.byCategoryList.concat(res.data.list)
            if (this.byCategoryList.length != 0 && res.data.list.length != 0 ) this.isLoadMoreLock = true
          } else {
            this.$Message.warning(res.message);
          }

        }


      },
      comeBack(){
        if(this.$route.query.search) {
          this.$router.push({
            name: 'faq'
          });
        } else {
          this.$router.back(-1);
        }
      },
      // 监听路由
      getQuery(){
        if (this.$route.params.id == 0) {
          this.searchBtnParams.search = this.$route.query.search;
          this.categoryName = '搜索与"' + this.$route.query.search + '"相关的问题';
          this.searchBtnParams.page = 1;
          this.getData();
        }
      }
    },
    mounted(){
      this.NoData = this.byCategoryList && this.byCategoryList.length == 0 ? true : false;
      window.addEventListener('scroll', this.winHandleScroll, true);  // 监听（绑定）滚轮滚动事件
    },
    watch: {
      '$route':'getQuery'  // 监听路由
    },
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

    /*分类列表*/
    .faq_wrap {
      max-width: 1200px;
      padding-top: 20px;
      margin: 0 auto -50px;

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
      .faq_list{
        .search_none {
          background-color: #f5f5f5;
          border: 1px solid #B9C4CB;
          padding: 20px 10px;
        }

        li {
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

      }
    }
  }
</style>
