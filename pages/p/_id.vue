<template>
  <div class="post-page" :class="{'article' : isArticle}">
    <div class="page-main-single">
      <div class="post-content">
        <!--left-->
        <div class="post-content-left">
          <!--判断是否是文章-->
          <!--贴子-->
          <!--<template-dynamic :detail="detail"></template-dynamic>-->
          <template-article v-if="isArticle" :detail="detail" @refreshDetail="getDynamicDetail"></template-article>
          <template-dynamic v-else :detail="detail" @refreshDetail="getDynamicDetail" @refreshComments="getDynamicComments"></template-dynamic>

          <!--评论显示神评论和评论, 不是AMA帖子的时候显示-->
          <comments class="mt20"
              :hot-comment-obj="hotCommentObj"
              :general-comment-obj="genericCommentObj"
              :initPageSize="parseInt(last_page_key)"
              @refreshComments="getDynamicComments"></comments>
        </div>


        <!--right-->
        <div class="post-content-right">
          <div class="post-content-right-top post-content-right-fixed" style="top:70px; bottom:auto;">
            <!--楼主-->
            <right-side-member :item="detail"></right-side-member>

            <!-- 右侧推荐-->
            <right-slide-hot type="square" :list="detail.type == 'text' ? circleHotDynamicList : recArticle"></right-slide-hot>

          </div>
        </div>


      </div>


    </div>
  </div>

</template>

<script>
  /** 帖子详情页 **/
  import TemplateDynamic from "../../components/post/template-dynamic"; //帖子类型模板
  import TemplateArticle from "../../components/post/template-article"; //文章类型模板
  import comments from '~/components/post/comments' //评论区域
  import RightSideMember from "../../components/post/right-side-member"; //右侧楼主
  import RightSlideHot from "../../components/post/right-slide-hot"; //右侧热帖、

  import {oneOf} from "../../utils/assist";

  export default {
    name: "postDetail",
    components: {
      TemplateArticle,
      TemplateDynamic,
      RightSlideHot,
      RightSideMember,
      comments
    },
    data() {
      return {
        isArticle:'',//是否是文章

        hotCommentObj:{},//热门评论
        genericCommentObj:{},//普通评论
        last_page_key:1,//上一页的最后一个key
        limit:20,//limit
        landlordOnly:0,//只看楼主（0表示显示所有，1表示只显示楼主，默认为0显示所有）
        orderSwitch:0,//正序倒序切换(0表示正序，1表示倒序，默认为0正序)
      }
    },
    async asyncData({app, $axios, error, params, query}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。

      console.log(params.pageNo);

      let commentParams={
        dynamic_id:params.id,//动态id
        last_page_key:query.pageNo ? query.pageNo : 1,
        limit: 20,
        landlord_only:0,
        order_switch:0
      };

      let [dynamic,recArticle,comment] = await Promise.all([
        app.$api.dynamic.details({params:{dynamic_id:params.id}}),
        app.$api.dynamic.recArticleList({params:{dynamic_id:params.id}}),
        app.$api.comment.list({params:commentParams})
      ]);

      let [circleHotDynamicList] = await Promise.all([
        app.$api.dynamic.circleHotDynamicList({params:{circle_id:dynamic.data.circle_id,limit:10,page:1}})
      ])


      return {
        last_page_key:query.pageNo ? query.pageNo : 1,
        detail: dynamic.data,
        isArticle: oneOf('article', dynamic.data.type.split(',')),
        circleHotDynamicList:circleHotDynamicList.data.list,//圈子热帖推荐
        recArticle: recArticle.data.list,//推荐文章列表
        hotCommentObj:comment.data.hot_comment_list ? comment.data.hot_comment_list : {},
        genericCommentObj:comment.data ? comment.data : {},
      }

    },
    fetch() {
      // 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。
    },
    mounted() {
      //console.log(this.$route.params.id)
      this.isArticle = oneOf('article', this.detail.type.split(','));
    },
    methods: {
      //获取帖子详情
      async getDynamicDetail(){
        let res = await this.$api.dynamic.details({params:{dynamic_id:this.detail.dynamic_id}});
        if(res.code == '200'){
          this.detail = res.data;
        }
      },
      //获取评论数据
      async getDynamicComments(obj){
        this.last_page_key = obj.pageNo ? obj.pageNo : 1;
        this.$router.push({path:this.$router.path,query:{pageNo:this.last_page_key}});

        let commentParams={
          dynamic_id:this.$route.params.id,//动态id
          last_page_key: obj.pageNo,
          limit: this.limit,
          landlord_only:this.landlordOnly,//只看楼主
          order_switch:this.orderSwitch//排序
        };
        let res = await this.$api.comment.list({params:commentParams});
        if(res.code == '200'){
          this.hotCommentObj = res.data.hot_comment_list;
          this.genericCommentObj = res.data;
        }
      },
      //关注
      attention(memberId){
        alert('关注');
      },
      //帖子点赞
      async parse(dynamicId){
        let params = {
          dynamic_id:dynamicId,
        };
        let res = await this.$api.dynamic.praise({params})
        if (res.code == '200'){
          this.$Message.success(res.message);
        }else {
          this.$Message.error(res.message);
        }
      },
      //帖子取消点赞
      async unParse(dynamicId){
        let params = {
          dynamic_id:dynamicId,
        };
        let res = await this.$api.dynamic.unParse({params})
        if (res.code == '200'){
          this.$Message.success(res.message);
        }else {
          this.$Message.error(res.message);
        }
      },

    },
    destroyed() {
    }
  }
</script>


<style lang="stylus" scoped>
  .post-page{
    background-color: #F5F6F7;
    height: 100%;

    &.article{
      background-color: #fff;
    }
  }
  .page-main {
    max-width: 990px;
    margin: 36px auto;
    width: 100%;
    zoom: 1;
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .post-content{
    width 990px;
    margin 0 auto;
    display flex;
    justify-content space-between;
    flex-wrap wrap;
    padding-top: 20px;
    margin-bottom: 20px;
  }


  .post-content-left {
    width: 640px;


  }


  .post-content-right {
    width: 330px;

    .post-content-right-fixed {
      width: 330px;
      /*position: fixed;*/
      top: 70px;
      z-index: 11;
    }

    .post-report {
      cursor: pointer;
    }

  }
</style>
