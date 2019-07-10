<template>
  <div class="post-content-comments">
    <!--神评论-->
    <div class="god-comments" v-if="hotComment.list && hotComment.list.length > 0">
      <div class="god-comments-top cl">
        <div class="god-top-left fl">
          <span class="god-top-line"></span>
          <span class="god-top-title">神回复</span>
        </div>
        <div class="god-top-right fr">
          共有<span class="god-count">{{hotComment.count}}</span>条神回复
        </div>
      </div>
      <div class="god-comments-cont">
        <div class="god-comments-list" v-for="item,index in hotComment.list">

          <div class="god-comments-list-best" v-if="item.reward_guozi_count > 0">
            <div class="god-best-obtain cl">
              <div class="post-good-title fl">
                <i class="iconfont zan-icon icon-general__good"></i>
                优质回复
              </div>
              <div class="post-good-list-left fr">
                <svg class="icon_size-guozi" aria-hidden="true">
                  <use xlink:href="#icon-guozi"></use>
                </svg>
                +{{item.reward_guozi_count}}
              </div>
            </div>
          </div>

          <div class="god-first-left fl">
            <a :href="'/u/'+item.member_id">
              <img :src="item.avatar ? item.avatar : '/static/images/tx_pic.jpg'" class="comment_img" width="100%">
              <img v-if="item.member_type == '1'" src="/static/images/member/v.png" class="comment_img_positon">
              <img v-if="item.member_type == '2'" src="/static/images/member/staff.png" class="comment_img_positon">
            </a>
          </div>

          <div class="god-first-right">
            <div class="god-first-user">
              <div class="god-first-message">
                <div class="first-user-nickname flex align_center">
                  <a :href="'/u/'+item.member_id" target="_blank">{{item.nickname}}</a>
                  <div class="first-user-leval">Lv.{{item.rank}}</div>
                  <img :src="item.badge_image" class="badge-icon" >
                </div>

                <div class="comment_manage">
                  <div @click="reportAdd(2, item.member_id, item.dynamic_comment_id)" class="post-report">举报</div>
                  <span class="info_line">|</span>
                  <Dropdown>
                    <a href="javascript:void(0)" class="post-report gray_3">
                      管理
                    </a>
                    <DropdownMenu slot="list">
                      <DropdownItem onclick="master(1,'',this);">贴子置顶</DropdownItem>
                      <DropdownItem onclick="master(3,'',this);">设置热门</DropdownItem>
                      <DropdownItem onclick="master(5,'',this);">删除贴子</DropdownItem>
                      <DropdownItem onclick="manager_pop(1,'楼主')">奖励果子</DropdownItem>
                      <DropdownItem onclick="jinyan_pop('楼主',75165)">禁言管理</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div class="god-first-desc">
              <div class="god-desc-cont">
                <div class="god-desc-cont_p" v-html="item.content_html"></div>
              </div>
              <div class="post-good-bottom">
                <div class="comment_floor">
                  <span class="">沙发</span>
                  <span class="comment_time">{{item.add_time | tsToaGo}}</span>
                </div>
                <div class="post-bottom-right">
                  <div class="post-good-replay flex align_center" @click="commentQuote(item.dynamic_comment_id,item.nickname,item.content_html)">
                    <svg class="icon" aria-hidden="true">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-quote"></use>
                    </svg>
                    <span class="louzhu-replay-num">引用</span>
                  </div>

                  <div class="post-good-replay flex align_center"
                       @click="commentPop(1, item.dynamic_id, item.dynamic_comment_id, item.reply_reply_id, item.nickname)">
                    <svg class="icon" aria-hidden="true">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-circle__comment"></use>
                    </svg>
                    <span class="louzhu-replay-num">{{item.reply.count > 0 ? item.reply.count : ''}}</span>
                  </div>
                  <div class="post-good-replay post-good-cai" :class="{'active' : item.is_praise == 1}"
                       @click="commentPraise(item.cache_key,item.dynamic_id,item.dynamic_comment_id,item.is_praise == 1 ? 'unPraise' : 'praise')">
                    <svg class="icon icon_hand-top" aria-hidden="true">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-circle__good_white"></use>
                    </svg>
                    <span class="louzhu-replay-num">{{item.praise_count}}</span>
                  </div>

                </div>
              </div>
            </div>

            <!--回复的回复样式-->
            <div class="god-first-replay">
              <div class="first-replay-content">

                <div class="first-replay-content-list" v-for="item in item.reply.list">
                  <div class="first-replay-user cl">
                    <div class="first-replay-user-left fl">
                      <a target="_blank" :href="'/u/'+item.member_id">
                        <img class="user-left-img" :src="item.avatar ? item.avatar : '/static/images/tx_pic.jpg'" :alt="item.nickname">
                      </a>
                    </div>
                    <div class="first-replay-user-right fl">
                      <a target="_blank" :href="'/u/'+item.member_id">{{item.nickname}}</a>
                    </div>
                    <img class="badge-icon" :src="item.badge_image">
                  </div>
                  <div class="first-replay-html" v-html="item.content_html"></div>
                  <div class="first-bottom-btn">
                    <div class="first-bottom-btn-left">
                      <div class="first-bottom-clock">{{item.add_time | tsToaGo}}</div>
                      <div class="first-bottom-jubao" @click="reportAdd(2, item.member_id, item.dynamic_comment_id)">举报</div>
                      <div class="first-bottom-guanli">
                        <div class="post-management-btn post-management-btn1">管理</div>
                        <div class="post-management-show">
                          <div onclick="manager_pop(0,'dev小诸',9592,9593)" class="post-management-list">奖励果子</div>
                          <div onclick="jinyan_pop('dev小诸',75165)" class="post-management-list">禁言管理</div>
                        </div>
                      </div>
                    </div>
                    <div @click="commentPop(1, item.dynamic_id, item.dynamic_comment_id, item.reply_reply_id, item.nickname)" class="first-bottom-btn-right">回复</div>
                  </div>
                </div>

              </div>

              <div class="replay-replay-open" v-if="item.reply.count > 3" @click="loadMoreComments('hot',index, item.reply.list[item.reply.list.length-1].cache_key, item.dynamic_comment_id)">还有
                <span class="reply_total_num">{{item.reply.count - 3}}</span>条，点击加载
              </div>
            </div>
          </div>

        </div>

      </div>
      <div class="god-comments-open" style="display: none;">展开更多神回复<i class="iconfont icon-left-arrow icon-left"></i>
      </div>
    </div>


    <!--普通评论-->
    <div class="ordinary-comments">
      <div class="god-comments-top">
        <div class="god-top-left">
          <span class="god-top-line"></span>
          <span class="god-top-title">全部回复</span>
        </div>
        <div class="god-top-right">
          <a href="javascript:" class="only-see-louzhu1 broadcast_only">只看楼主</a>
          <a href="javascript:" id="order_switch" class="sequence-order">正序
            <svg class="icon-order" aria-hidden="true">
              <use xlink:href="#icon-sort-desc"></use>
            </svg>
          </a>
        </div>
      </div>

      <div class="god-comments-cont">

        <div class="god-comments-list go-floor1" v-for="item,index in commentList">

          <div class="god-comments-list-best" v-if="item.reward_guozi_count > 0">
            <div class="god-best-obtain cl">
              <div class="post-good-title fl">
                <i class="iconfont zan-icon icon-general__good"></i>
                优质回复
              </div>
              <div class="post-good-list-left fr">
                <svg class="icon_size-guozi" aria-hidden="true">
                  <use xlink:href="#icon-guozi"></use>
                </svg>
                +{{item.reward_guozi_count}}
              </div>
            </div>
          </div>

          <div class="god-first-left fl">
            <a :href="'/u/'+item.member_id">
              <img :src="item.avatar ? item.avatar : '/static/images/tx_pic.jpg'" class="comment_img" width="100%">
            </a>
          </div>
          <div class="god-first-right">
            <div class="god-first-user">
              <div class="god-first-message flex justify_between align_center">
                <div class="first-user-nickname flex align_center">
                  <a :href="'/u/'+item.member_id" target="_blank">{{item.nickname}}</a>
                  <div class="first-user-leval">Lv.{{item.rank}}</div>
                  <img v-if="item.badge_image" class="badge-icon" :src="item.badge_image">
                </div>
                <div class="comment_manage flex">
                  <div @click="reportAdd(2, item.member_id, item.dynamic_comment_id)" class="post-report">举报</div>
                  <span class="info_line">|</span>
                  <Dropdown>
                    <a href="javascript:void(0)" class="post-report gray_3">
                      管理
                    </a>
                    <DropdownMenu slot="list">
                      <DropdownItem onclick="master(1,'',this);">贴子置顶</DropdownItem>
                      <DropdownItem onclick="master(3,'',this);">设置热门</DropdownItem>
                      <DropdownItem onclick="master(5,'',this);">删除贴子</DropdownItem>
                      <DropdownItem onclick="manager_pop(1,'楼主')">奖励果子</DropdownItem>
                      <DropdownItem onclick="jinyan_pop('楼主',75165)">禁言管理</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div class="god-first-desc">
              <div class="god-desc-cont">
                <div class="god-desc-cont_p" v-html="item.content_html">评论内容</div>
              </div>
              <div class="post-good-bottom flex justify_between">
                <div class="comment_floor">
                  <span v-if="item.floor == '1'">沙发</span>
                  <span v-if="item.floor == '2'">地板</span>
                  <span v-else>{{item.floor}}楼</span>
                  <span class="comment_time">{{item.add_time | tsToaGo}}</span>
                </div>
                <div class="post-bottom-right flex ">
                  <div class="post-good-replay flex align_center" @click="commentQuote(item.dynamic_comment_id,item.nickname,item.content_html)">
                    <svg class="icon" aria-hidden="true">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-quote"></use>
                    </svg>
                    <span class="louzhu-replay-num">引用 </span>
                  </div>
                  <div class="post-good-replay flex align_center"
                       :class="{'active' : item.reply.count > 0}"
                       @click="commentPop(1, item.dynamic_id, item.dynamic_comment_id, item.reply_reply_id, item.nickname)">
                    <svg class="icon" aria-hidden="true">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-circle__comment"></use>
                    </svg>
                    <span class="louzhu-replay-num">{{item.reply.count>0 ? item.reply.count : '回复'}}</span>
                  </div>
                  <div class="post-good-replay post-good-cai flex align_center"
                       :class="{'active' : item.praise_count > 0}"
                       @click="commentPraise(item.cache_key,item.dynamic_id,item.dynamic_comment_id,item.is_praise == 1 ? 'unPraise' : 'praise')">
                    <svg class="icon icon_hand-top" aria-hidden="true">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-circle__good_white"></use>
                    </svg>
                    <span class="louzhu-replay-num">{{item.praise_count > 0 ? item.praise_count : '点赞'}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!--回复的回复样式-->
            <div class="god-first-replay" v-if="item.reply.count > 0">
              <div class="first-replay-content">

                <div class="first-replay-content-list" v-for="item in item.reply.list">
                  <div class="first-replay-user cl">
                    <div class="first-replay-user-left fl">
                      <a target="_blank" :href="'/u/'+item.member_id">
                      <img class="user-left-img" :src="item.avatar ? item.avatar : '/static/images/tx_pic.jpg'" :alt="item.nickname"> </a>
                    </div>
                    <div class="first-replay-user-right fl">
                      <a target="_blank" :href="'/u/'+item.member_id">{{item.nickname}}</a>
                    </div>
                    <img class="badge-icon" :src="item.badge_image">
                  </div>
                  <div class="first-replay-html" v-html="item.content_html"></div>
                  <div class="first-bottom-btn">
                    <div class="first-bottom-btn-left">
                      <div class="first-bottom-clock">{{item.add_time | tsToaGo}}</div>
                      <div @click="reportAdd(2, item.member_id, item.dynamic_comment_id)" class="first-bottom-jubao">举报</div>
                      <div class="first-bottom-guanli">
                        <div class="post-management-btn post-management-btn1">管理</div>
                        <div class="post-management-show">
                          <div onclick="manager_pop(0,'dev小诸',9592,9593)" class="post-management-list">奖励果子</div>
                          <div onclick="jinyan_pop('dev小诸',75165)" class="post-management-list">禁言管理</div>
                        </div>
                      </div>
                    </div>
                    <div @click="commentPop(1, item.dynamic_id, item.dynamic_comment_id, item.reply_reply_id, item.nickname)" class="first-bottom-btn-right">回复</div>
                  </div>
                </div>

              </div>

              <div class="replay-replay-open" v-if="item.reply.count > 3" @click="loadMoreComments('general',index, item.reply.list[item.reply.list.length-1].cache_key, item.dynamic_comment_id)">
                还有<span class="reply_total_num">{{item.reply.count - 3}}</span>
                条，点击加载
              </div>
            </div>
          </div>
        </div>

      </div>


      <!--分页-->
      <s-page class="mt10" v-if="commentList && commentList.length > 0"
              prev-text="上一页"
              next-text="下一页"
              :total="Number(commentListLength)"
              :current="thisPageSize"
              :page-size="pageLimit"
              @on-change="onChangePage"></s-page>
      <no-data v-else :show="true"></no-data>

      <!--编译器样式-->
      <div class="send-post">
        <div class="not-club-test" v-if="!$store.state.f_token" @click="signEvent('login')">请先登录</div>
        <div class="send-post-wrap">
          <editor :clear-content="clearContent" @editorContent="getEditorContent">
            <div v-if="quoteCommentId" class="editor-quote-wrap show">
              <div class="close-btn" @click="clearQuote"><i class="iconfont icon-close-60"></i></div>
              <div class="quote-title">
                <span>引用</span>
                <span class="nickname">@{{quoteData.nickname}}</span>
                <span>的回复:</span>
              </div>
              <div class="quote-content">
                <span v-html="quoteData.contentHtml"></span>
                <div class="more-text-icon">...</div>
              </div>
            </div>
          </editor>
          <div class="send-post-text">{{editorContent.length}}/800</div>
        </div>
        <div class="send-post-bottom cl">
          <div class="img_code fll" id="reply_imgCode"></div>
          <p class="send-post-button fr" @click="commentAdd()">回复</p>
        </div>
      </div>
    </div>


    <!--回复评论弹层-->
    <comment-pop v-if="commentPopShow" :data="commentPopData" @close="closeCommentPop()" @refreshComments="refreshComments()"></comment-pop>

    <!--举报弹层-->
    <report-modal :reportAddModal="reportAddModal" :report-data="reportData" @setReportModalShow="setReportModalShow"></report-modal>
  </div>
</template>

<script>
  import editor from '~/components/common/wang-editor'
  import ReportModal from "../common/report-modal";
  import CommentPop from "./comment-pop";
  import SPage from "../common/s-page";
  import VerifyModal from "../common/verify-modal";
  export default {
    name: "god-comments",
    components: {
      VerifyModal,
      SPage,
      CommentPop,
      ReportModal,
      editor
    },
    props:{
      //神评论
      hotCommentObj:{
        type:Object,
        default: ()=>{}
      },
      //普通评论
      generalCommentObj:{
        type:Object,
        default: ()=>{}
      },
      //默认加载哪一页评论
      initPageSize: {
        type: Number,
        default: 1
      },
    },
    watch:{
      hotCommentObj(newVal,oldVal){
        this.hotComment = newVal;
      },
      generalCommentObj(newVal,oldVal){
        this.commentList = newVal.list;
        this.commentListLength = newVal.count;
      },
      initPageSize(newVal,oldVal){
        this.thisPageSize = newVal;
      }
    },
    computed:{
    },
    data() {
      return {
        hotComment:{},//热评对象
        commentList:[],//普通评论list array
        commentListLength:0,//普通评论总数
        landlordOnly:0,//只看楼主（0表示显示所有，1表示只显示楼主，默认为0显示所有）
        orderSwitch:0,//正序倒序切换(0表示正序，1表示倒序，默认为0正序)
        pageLimit:20,//分页数量
        thisPageSize:1,// 当前分页页码

        reportAddModal:false,
        reportData:{},

        commentPopShow:false,//回复评论弹窗
        commentPopData:{},//评论的评论弹窗对象

        clearContent:false,
        editorContent:'',//编辑器内容

        quoteCommentId:'',//引用评论ID
        quoteData:{},//引用内容
      }
    },
    mounted() {
      this.thisPageSize = this.initPageSize;
      this.hotComment = this.hotCommentObj;
      this.commentList = this.generalCommentObj.list;
      this.commentListLength = this.generalCommentObj.count;
    },
    methods: {
      /**
       * 接收editor子组件回传的编辑器内容
       * **/
      getEditorContent(e){
        console.log(e)
        this.editorContent = e;
      },
      /**
       * 接收子组件回传，举报弹层隐藏处理
       * **/
      setReportModalShow(e){
        if(e === false){
          this.reportAddModal = false;
          this.reportData = {};
        };
      },
      /**
       * 举报评论弹层
       * **/
      reportAdd(reportType, broadcastId, objectId){
        this.reportAddModal = true;
        this.reportData.reportType = reportType; //举报类型： 1帖子 2 评论 3私信
        this.reportData.broadcastId = broadcastId;//举报对象人的ID 如帖子作者的member_id
        this.reportData.objectId = objectId; //举报对象Id，如帖子ID
      },
      /**
       * 回复评论的评论弹层
       * **/
      commentPop(replyType, dynamicId, replyId, replyReplyId, nickname, dynamicCommentId){
        this.commentPopShow = true;
        this.commentPopData.nickname = nickname;
        this.commentPopData.dynamicId = dynamicId;
        this.commentPopData.replyId = replyId;
        this.commentPopData.replyReplyId = replyReplyId;
        this.commentPopData.replyType = replyType;
        this.commentPopData.dynamicCommentId = dynamicCommentId;
      },

      /**
       * 评论点赞取消点赞
       * @param cacheKey 最后一条的评论的 cache_key
       * @param dynamicId 帖子ID
       * @param dynamicCommentId 评论ID
       * @param type 操作类型  praise:评论  unPraise:取消评论
       * **/
      async commentPraise(cacheKey, dynamicId, dynamicCommentId, type){
        let params = {
          comment_cache_key:cacheKey,
          dynamic_id:dynamicId,
          dynamic_comment_id:dynamicCommentId
        };

        let res;
        if(type == 'praise'){
          res = await this.$api.comment.praise({params});
        }else{
          res = await this.$api.comment.unPraise({params});
        }

        if(res.code == '200'){
          this.$Message.success(res.message);
          this.$emit('refreshComments',true);
        }else{
          this.$Message.error(res.message);
        }
      },
      /**
       * 点击引用评论按钮时，赋值引用内容
       * **/
      commentQuote(dynamic_comment_id,nickname,content_html){
        this.quoteCommentId = dynamic_comment_id;//引用评论ID
        this.quoteData.nickname = nickname;//引用评论人
        this.quoteData.contentHtml = content_html;//引用内容
      },
      //清空引用
      clearQuote(){
        this.quoteCommentId = '';
        this.quoteData = {};
      },

      /**
       * 评论的评论，点击加载更多
       * @param type 追加更多评论的类型：hot:神评论  general:普通评论
       * @param commentIndex 当前评论的索引Index 用来在指定位置追加新评论
       * @param lastPageKey 最后一条的评论的 cache_key
       * @param dynamicCommentId 评论ID
       * @description
       * */
      async loadMoreComments(type, commentIndex, lastPageKey, dynamicCommentId){
        let params = {
          dynamic_comment_id: dynamicCommentId,
          last_page_key: lastPageKey
        };
        let res = await this.$api.comment.replyList({params});
        if(res.code == '200'){
          if(type == 'hot'){
            // console.log(this.hotComment.list[commentIndex].reply.list)
            // console.log(this.hotComment.list[commentIndex].reply.count)
            // console.log(res.data.list.length)
            this.hotComment.list[commentIndex].reply.count -= res.data.list.length;
            this.hotComment.list[commentIndex].reply.list = this.hotComment.list[commentIndex].reply.list.concat(res.data.list);
          }else{
            console.log(this.commentList[commentIndex].reply.list)
            // console.log(this.commentList.list[commentIndex].reply.count)
            //console.log(res.data.list.length)
            this.commentList[commentIndex].reply.count -= res.data.list.length;
            this.commentList[commentIndex].reply.list = this.commentList[commentIndex].reply.list.concat(res.data.list);
          }
        }else{
          this.$Message.warning(res.message);
        }

      },

      /**
       * 评论分页
       * @description 评论组件内异步刷新评论数据，此时并没有从父组件刷新，而是直接在当前组件内刷新评论
       * */
      async onChangePage(pageNo){
        this.thisPageSize = pageNo;
        this.$router.push({path:this.$router.path,query:{pageNo:pageNo}});

        let commentParams={
          dynamic_id:this.$route.params.id,//动态id
          last_page_key: pageNo,
          limit: this.pageLimit,//分页数量
          landlord_only:this.landlordOnly,//只看楼主
          order_switch:this.orderSwitch //排序
        };
        let res = await this.$api.comment.list({params:commentParams});
        if(res.code == '200'){
          this.hotComment = res.data.hot_comment_list;
          this.commentList = res.data.list;

          console.log(this.commentList)
        }
      },

      /**
       * editor评论提交
       * @description  评论完成后清空评论内容、清空引用内容、获取到当前评论的最大分页数量返回给父组件进行刷新评论（因回复完成后需要跳转到评论的最后一页）
       */
      async commentAdd(){
        let params = {
          dynamic_id:this.$route.params.id, //帖子id
          content_html:this.editorContent,
          quote_comment_id:this.quoteCommentId,
          is_chatroom:'',
          img_code:'',
          audio_url:'',
          is_prize:'',
          reply_id:'',
          reply_reply_id:'',
          seconds:'',
        };
        console.log(params);
        let res = await this.$api.comment.add({method:'post',params});
        if(res.code == '200'){
          this.$Message.success('评论成功！');
          this.clearContent = true;
          this.clearQuote();
          let newPageSize = Math.ceil(this.commentListLength / this.pageLimit);
          this.onChangePage(newPageSize);
          this.$emit('refreshComments',{pageNo:newPageSize});

          setTimeout(()=>{
            this.clearContent = false;
          },800)
        }else{
          this.$Message.success(res.message);
        }
      },
      /**
       * 刷新回复数据（一般在回复评论后要通知父组件刷新评论，并传入当前的评论分页）
       */
      refreshComments(){
        this.$emit('refreshComments',{pageNo:this.$route.query.pageNo});
      },
      //关闭回复弹层
      closeCommentPop(){
        this.commentPopShow = false;
        this.commentPopData = {};
      },
      //评论遮罩层，没有登录的时候显示，点击弹出登录modal
      signEvent(type){
        if(type && type == 'login'){
          this.$store.commit("modules/login/setLoginModal",true);
        }
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .post-content-comments{
    //神评论
    .god-comments {
      background: #fffcf5;
      border-radius: 6px;
      margin-bottom: 30px;

      .god-comments-top {
        background: #e0cb9d;
        height: 40px;
        line-height: 40px;
        display flex;
        justify-content space-between;
        text-align center;
        border-radius: 6px 6px 0 0;

        .god-top-left {
          .god-top-line {
            margin-left: 14px;
            display: inline-block;
            height: 12px;
            width: 4px;
            background: #fff;
            vertical-align: middle;
          }
          .god-top-title {
            font-size: 15px;
            color: #fff;
            margin-left: 3px;
            display: inline-block;
            vertical-align: middle;
          }
        }

        .god-top-right {
          font-size: 14px;
          color: #fff;
          margin-right: 13px;
        }
      }


      .god-comments-cont {
        padding: 4px 24px;

        .god-comments-list {
          border-bottom: 1px solid #ebebed;
          padding-top: 12px;
          position: relative;

          &:last-child {
             border-bottom: 0px;
          }


          .god-comments-list-best {
            margin-bottom: 12px;

            .god-best-obtain {
              margin-top: 10px;
              line-height: 22px;
              display flex;
              justify-content space-between;

              .post-good-title {
                background: #ffefd6;
                border-radius: 16px;
                padding: 0 11px;
                height: 22px;
                text-align: center;
                line-height: 22px;
                font-size: 12px;
                color: #ffa621;

                .zan-icon {
                  font-size: 12px;
                  color: #ffa621;
                  margin-right: 5px;
                  vertical-align: middle;
                }
              }
              .post-good-list-left {
                font-size: 12px;
                color: #a8abb3;

                .icon_size-guozi {
                  margin-right: 4px;
                  width: 16px;
                  height: 16px;
                  vertical-align: middle;
                  margin-bottom: 1px;
                }
              }
            }
            .god-best-obtain:nth-of-type(1) {
              margin-top: 0;
            }
          }

          .god-first-left {
            width: 36px;
            position: relative;

            .comment_img {
              width: 36px;
              height: 36px;
              border: 1px solid rgba(0,0,0,0.04);
              border-radius: 50%;
            }
            .comment_img_positon {
              position: absolute;
              bottom: -2px;
              right: 0px;
              height: 15px;
              width: 15px;
            }

          }
          .god-first-right {
            margin-left: 44px;


            .god-first-user{

              .god-first-message{
                display flex
                justify-content space-between
                align-items center

                .first-user-nickname {
                  font-size: 15px;
                  color: #2d2f33;
                  line-height: 22px;
                  font-weight: bold;
                  display flex
                  align-items:center

                  a{
                    display block;
                  }
                  .first-user-leval {
                    margin-left: 3px;
                    display: inline-block;
                    padding: 0 5px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    font-weight: normal;
                    background-image: linear-gradient(135deg, #19a7ff 0%, #058aff 100%);
                    border-radius: 3px;
                    font-size: 11px;
                    color: #fff;
                  }
                  .badge-icon {
                    height: 16px;
                    margin-left: 3px;
                  }
                }
                .comment_manage {
                  font-size: 12px;
                  color: #a8abb3;
                  display flex

                  .info_line{
                    display: inline-block;
                    color: #ebebed;
                    margin: 0 12px;
                  }

                  .post-report {
                    cursor: pointer;
                  }
                }
              }


            }
            .god-first-desc{
              .god-desc-cont {
                padding-top: 2px;
                margin-bottom: 8px;

                .god-desc-cont_p {
                  font-size: 14px;
                  color: #2d2f33;
                  line-height: 20px;
                  overflow: hidden;
                }
              }


              .post-good-bottom {
                line-height: 20px;
                height: 20px;
                margin-bottom: 10px;
                display flex
                justify-content: space-between

                .comment_floor {
                  font-size: 12px;
                  color: #a8abb3;

                  .comment_time {
                    margin-left: 8px;
                  }
                }
                .post-bottom-right{
                  display flex

                  .post-good-replay {
                    cursor: pointer;
                    margin-left: 30px;
                    display flex
                    align-items center;

                    .icon {
                      width: 18px;
                      height: 18px;
                      color: #656973
                    }

                    &.active{
                      .louzhu-replay-num{
                        color: #0d8dfc;
                      }
                      .icon{
                        color: #0d8dfc;
                      }
                    }

                    .louzhu-replay-num {
                      margin-left: 5px;
                      font-size: 12px;

                    }
                  }


                }
              }


            }

            //回复的回复
            .god-first-replay{
              background: rgba(0,0,0,0.03);
              border-radius: 8px;
              margin-bottom: 8px;

              .first-replay-content-list {
                &:first-Child {
                  border-top: 0px;
                }

                .first-replay-user {
                  padding: 12px 0 0 16px;
                  display: flex;
                  align-items: center;

                  .first-replay-user-left {
                    .user-left-img {
                      border: 1px solid rgba(0,0,0,0.04);
                      height: 20px;
                      width: 20px;
                      border-radius: 50%;
                    }
                  }

                  .first-replay-user-right {
                    line-height: 20px;
                    margin-left: 8px;
                    font-size: 14px;
                    color: #3d3931;
                  }
                  .badge-icon {
                    margin-top: 2px;
                    height: 16px;
                    margin-left: 3px;
                  }

                }


                .first-replay-html {
                  margin: 5px 16px 0;
                  font-size: 13px;
                  color: #737373;
                  line-height: 20px;

                  >>> a{
                    color: #4b9ce3;
                  }
                }



                .first-bottom-btn {
                  height: 30px;
                  line-height: 30px;
                  font-size: 12px;
                  color: #b3b3b3;
                  display: flex;
                  justify-content: space-between;
                  position relative;

                  .first-bottom-btn-left {
                    margin-left: 16px;
                    display flex

                    .first-bottom-jubao {
                      display: none;
                      cursor: pointer;
                      margin-left: 25px;
                      position: relative;
                    }
                    .first-bottom-guanli{
                      display: none;
                      cursor: pointer;
                      padding-left: 25px;
                      position: relative;

                      .post-management-show {
                        display: none;
                        z-index: 10;
                        position: absolute;
                        top: 30px;
                        left: -50px;
                        width: 120px;
                        background: #fff;
                        box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px 0 rgba(0,0,0,0.08);
                        border-radius: 4px;

                        .post-management-list {
                          font-size: 14px;
                          color: #2d2f33;
                          padding-left: 13px;
                          cursor: pointer;
                          height: 36px;
                          line-height: 36px;
                          margin: 5px;

                          &:hover{
                            background: #f0f1f2;
                            border-radius: 8px;
                          }
                        }

                      }


                      &:hover{
                        .post-management-show {
                          display inline-block;
                        }
                      }
                    }
                  }
                  .first-bottom-btn-right {
                    display: none;
                    margin-right: 16px;
                    cursor: pointer;
                  }


                  &:hover{
                    .first-bottom-jubao,.first-bottom-guanli,.first-bottom-btn-right {
                      display inline-block;
                      cursor: pointer;
                    }
                  }
                }





              }


              .replay-replay-open {
                border-top: 1px solid rgba(0,0,0,0.04);
                cursor: pointer;
                height: 32px;
                line-height: 30px;
                color: #a8abb3;
                text-align: center;
              }
            }

          }





          .god-first-left {
            width: 36px;
            position: relative;

            .comment_img {
              width: 36px;
              height: 36px;
              border: 1px solid rgba(0,0,0,0.04);
              border-radius: 50%;
            }
            .comment_img_positon {
              position: absolute;
              bottom: -2px;
              right: 0px;
              height: 15px;
              width: 15px;
            }

          }

          .god-first-right {
            margin-left: 44px;

            .god-first-user{
              .god-first-message{
                display: flex;
                align-items: center;
                justify-content space-between;

                .first-user-nickname {
                  font-size: 15px;
                  color: #2d2f33;
                  line-height: 22px;
                  font-weight: bold;
                  display: flex;
                  align-items: center;

                  a {
                    display: block;
                  }

                  .first-user-leval {
                    margin-left: 3px;
                    display: inline-block;
                    padding: 0 5px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    font-weight: normal;
                    background-image: linear-gradient(135deg, #19a7ff 0%, #058aff 100%);
                    border-radius: 3px;
                    font-size: 11px;
                    color: #fff;
                  }
                  .badge-icon {
                    height: 16px;
                    margin-left: 3px;
                  }
                }
                .comment_manage {
                  font-size: 12px;
                  color: #a8abb3;
                  display flex;
                  align-items center;

                  .info_line{
                    display: inline-block;
                    color: #ebebed;
                    margin: 0 12px;
                  }

                  .post-report {
                    cursor: pointer;
                  }
                }
              }
            }


            .god-first-desc{
              .god-desc-cont {
                padding-top: 2px;
                margin-bottom: 8px;

                .god-desc-cont_p {
                  font-size: 14px;
                  color: #2d2f33;
                  line-height: 20px;
                  overflow: hidden;
                }
              }
              .post-good-bottom {
                line-height: 20px;
                height: 20px;
                margin-bottom: 10px;
                display flex;
                justify-content space-between;

                .comment_floor {
                  font-size: 12px;
                  color: #a8abb3;

                  .comment_time {
                    margin-left: 8px;
                  }
                }

                .post-bottom-right {
                  display flex;
                  justify-content space-between;

                  .post-good-replay {
                    cursor: pointer;
                    margin-left: 30px;
                    display flex
                    align-items center;

                    .icon {
                      width: 18px;
                      height: 18px;
                      color: #656973;
                    }

                    &.active{
                      .louzhu-replay-num{
                        color: #0d8dfc;
                      }
                      .icon{
                        color: #0d8dfc;
                      }
                    }

                    .louzhu-replay-num {
                      margin-left: 5px;
                      font-size: 12px;
                      color: #656973;
                    }
                  }
                }
              }
            }


            //回复的回复样式

            .god-first-replay {
              background: #fff7e8;
              border-radius: 8px;
              margin-bottom: 8px;


              .first-replay-content{

                .first-replay-content-list {
                  border-top: 1px solid #faedd2;
                  &:first-Child {
                    border-top: 0px;
                  }

                  .first-replay-user {
                    padding: 12px 0 0 16px;
                    display: flex;
                    align-items: center;

                    .first-replay-user-left {

                      .user-left-img {
                        border: 1px solid rgba(0,0,0,0.04);
                        height: 20px;
                        width: 20px;
                        border-radius: 50%;
                      }
                    }

                    .first-replay-user-right {
                      line-height: 20px;
                      margin-left: 8px;
                      font-size: 14px;
                      color: #3d3931;
                    }
                    .badge-icon{
                      height: 16px;
                      margin-left: 3px;
                    }

                  }

                  .first-replay-html {
                    margin: 5px 16px 0;
                    font-size: 13px;
                    color: #737373;
                    line-height: 20px;

                    >>> a{
                      color: #4b9ce3
                    }
                  }
                  .first-bottom-btn {
                    height: 30px;
                    line-height: 30px;
                    font-size: 12px;
                    color: #b3b3b3;
                    display flex;
                    justify-content space-between;
                    position relative;

                    .first-bottom-btn-left {
                      margin-left: 16px;
                      display flex;

                      .first-bottom-jubao {
                        display: none;
                        cursor: pointer;
                        margin-left: 25px;
                        position: relative;
                      }
                      .first-bottom-guanli{
                        display: none;
                        cursor: pointer;
                        padding-left: 25px;
                        position: relative;


                        .post-management-show {
                          display: none;
                          z-index: 10;
                          position: absolute;
                          top: 30px;
                          left: -50px;
                          width: 120px;
                          background: #fff;
                          box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px 0 rgba(0,0,0,0.08);
                          border-radius: 4px;

                          .post-management-list {
                            font-size: 14px;
                            color: #2d2f33;
                            padding-left: 13px;
                            cursor: pointer;
                            height: 36px;
                            line-height: 36px;
                            margin: 5px;

                            &:hover{
                              background: #f0f1f2;
                              border-radius: 8px;
                            }
                          }

                        }


                        &:hover{
                          .post-management-show {
                            display inline-block;
                          }
                        }
                      }
                    }


                    .first-bottom-btn-right{
                      display: none;
                      margin-right: 16px;
                      cursor: pointer;
                    }

                    &:hover{
                      .first-bottom-jubao,.first-bottom-guanli,.first-bottom-btn-right,.post-management-show {
                        display inline-block;
                      }
                    }

                  }

                }

              }

              .replay-replay-open {
                border-top: 1px solid #faedd2;
                color: #bda571;
                height 31px;
                line-height 31px;
                text-align center;
                cursor pointer;


                .reply_total_num {
                  vertical-align: initial;
                }

              }

            }




          }
        }


      }


    }


    //普通评论
    .ordinary-comments {
      background: #fff;


      .god-comments-top {
        border-radius: 2px 2px 0 0;
        height: 40px;
        line-height: 40px;
        position: relative;
        display: flex
        justify-content space-between


        .god-top-left {

          .god-top-line {
            margin-left: 14px;
            display: inline-block;
            height: 12px;
            width: 4px;
            background: #0d8dfc;
            vertical-align: middle;
          }
          .god-top-title {
            font-size: 15px;
            color: #2d2f33;
            margin-left: 3px;
            display: inline-block;
            vertical-align: middle;
            font-weight: bold;
          }

        }
        .god-top-right{
          .only-see-louzhu1 {
            font-size: 14px;
            margin-right: 20px;
            color: #a8abb3;
          }
          .sequence-order {
            font-size: 14px;
            color: #a8abb3;
            margin-right: 10px;

            .icon-order {
              display: inline-block;
              height: 12px;
              width: 12px;
              margin: 0 4px 0 4px;
              transform: rotate(180deg);
            }
          }
        }
      }

      .god-comments-cont {
        padding: 4px 24px;

        .god-comments-list {
          border-bottom: 1px solid #ebebed;
          padding-top: 12px;
          position: relative;

          .god-comments-list-best {
            margin-bottom: 12px;

            .god-best-obtain {
              margin-top: 10px;
              line-height: 22px;
              display flex;
              justify-content space-between;

              .post-good-title {
                background: #ffefd6;
                border-radius: 16px;
                padding: 0 11px;
                height: 22px;
                text-align: center;
                line-height: 22px;
                font-size: 12px;
                color: #ffa621;

                .zan-icon {
                  font-size: 12px;
                  color: #ffa621;
                  margin-right: 5px;
                  vertical-align: middle;
                }
              }
              .post-good-list-left {
                font-size: 12px;
                color: #a8abb3;

                .icon_size-guozi {
                  margin-right: 4px;
                  width: 16px;
                  height: 16px;
                  vertical-align: middle;
                  margin-bottom: 1px;
                }
              }
            }
            .god-best-obtain:nth-of-type(1) {
              margin-top: 0;
            }
          }

          .god-first-left {
            width: 36px;
            position: relative;

            .comment_img {
              width: 36px;
              height: 36px;
              border: 1px solid rgba(0,0,0,0.04);
              border-radius: 50%;
            }
            .comment_img_positon {
              position: absolute;
              bottom: -2px;
              right: 0px;
              height: 15px;
              width: 15px;
            }

          }
          .god-first-right {
            margin-left: 44px;


            .god-first-user{

              .god-first-message{
                display flex
                justify-content space-between
                align-items center

                .first-user-nickname {
                  font-size: 15px;
                  color: #2d2f33;
                  line-height: 22px;
                  font-weight: bold;
                  display flex
                  align-items:center

                  a{
                    display block;
                  }
                  .first-user-leval {
                    margin-left: 3px;
                    display: inline-block;
                    padding: 0 5px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    font-weight: normal;
                    background-image: linear-gradient(135deg, #19a7ff 0%, #058aff 100%);
                    border-radius: 3px;
                    font-size: 11px;
                    color: #fff;
                  }
                  .badge-icon {
                    height: 16px;
                    margin-left: 3px;
                  }
                }
                .comment_manage {
                  font-size: 12px;
                  color: #a8abb3;
                  display flex

                  .info_line{
                    display: inline-block;
                    color: #ebebed;
                    margin: 0 12px;
                  }

                  .post-report {
                    cursor: pointer;
                  }
                }
              }


            }
            .god-first-desc{
              .god-desc-cont {
                padding-top: 2px;
                margin-bottom: 8px;

                .god-desc-cont_p {
                  font-size: 14px;
                  color: #2d2f33;
                  line-height: 20px;
                  overflow: hidden;
                }
              }


              .post-good-bottom {
                line-height: 20px;
                height: 20px;
                margin-bottom: 10px;
                display flex
                justify-content: space-between

                .comment_floor {
                  font-size: 12px;
                  color: #a8abb3;

                  .comment_time {
                    margin-left: 8px;
                  }
                }
                .post-bottom-right{
                  display flex

                  .post-good-replay {
                    cursor: pointer;
                    margin-left: 30px;
                    display flex
                    align-items center;

                    .icon {
                      width: 18px;
                      height: 18px;
                      color: #656973
                    }

                    &.active{
                      .louzhu-replay-num{
                        color: #0d8dfc;
                      }
                      .icon{
                        color: #0d8dfc;
                      }
                    }

                    .louzhu-replay-num {
                      margin-left: 5px;
                      font-size: 12px;

                    }
                  }


                }
              }


            }

            //回复的回复
            .god-first-replay{
              background: rgba(0,0,0,0.03);
              border-radius: 8px;
              margin-bottom: 8px;

              .first-replay-content-list {
                &:first-Child {
                  border-top: 0px;
                }

                .first-replay-user {
                  padding: 12px 0 0 16px;
                  display: flex;
                  align-items: center;

                  .first-replay-user-left {
                    .user-left-img {
                      border: 1px solid rgba(0,0,0,0.04);
                      height: 20px;
                      width: 20px;
                      border-radius: 50%;
                    }
                  }

                  .first-replay-user-right {
                    line-height: 20px;
                    margin-left: 8px;
                    font-size: 14px;
                    color: #3d3931;
                  }
                  .badge-icon {
                    margin-top: 2px;
                    height: 16px;
                    margin-left: 3px;
                  }

                }


                .first-replay-html {
                  margin: 5px 16px 0;
                  font-size: 13px;
                  color: #737373;
                  line-height: 20px;

                  >>> a{
                    color: #4b9ce3;
                  }
                }



                .first-bottom-btn {
                  height: 30px;
                  line-height: 30px;
                  font-size: 12px;
                  color: #b3b3b3;
                  display: flex;
                  justify-content: space-between;
                  position relative;

                  .first-bottom-btn-left {
                    margin-left: 16px;
                    display flex

                    .first-bottom-jubao {
                      display: none;
                      cursor: pointer;
                      margin-left: 25px;
                      position: relative;
                    }
                    .first-bottom-guanli{
                      display: none;
                      cursor: pointer;
                      padding-left: 25px;
                      position: relative;

                      .post-management-show {
                        display: none;
                        z-index: 10;
                        position: absolute;
                        top: 30px;
                        left: -50px;
                        width: 120px;
                        background: #fff;
                        box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px 0 rgba(0,0,0,0.08);
                        border-radius: 4px;

                        .post-management-list {
                          font-size: 14px;
                          color: #2d2f33;
                          padding-left: 13px;
                          cursor: pointer;
                          height: 36px;
                          line-height: 36px;
                          margin: 5px;

                          &:hover{
                            background: #f0f1f2;
                            border-radius: 8px;
                          }
                        }

                      }


                      &:hover{
                        .post-management-show {
                          display inline-block;
                        }
                      }
                    }
                  }
                  .first-bottom-btn-right {
                    display: none;
                    margin-right: 16px;
                    cursor: pointer;
                  }


                  &:hover{
                    .first-bottom-jubao,.first-bottom-guanli,.first-bottom-btn-right {
                      display inline-block;
                      cursor: pointer;
                    }
                  }
                }





              }


              .replay-replay-open {
                border-top: 1px solid rgba(0,0,0,0.04);
                cursor: pointer;
                height: 32px;
                line-height: 30px;
                color: #a8abb3;
                text-align: center;
              }
            }

          }




        }
      }


      //编辑器
      .send-post {
        position: relative;
        padding-top: 30px;

        .not-club-test {
          width: 100%;
          height: 100%;
          background: #eee;
          position: absolute;
          left: 0;
          top: 18px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #888;
          z-index: 99;
          cursor: pointer;
        }

        .send-post-wrap {
          border: 1px solid #ebebed;
          border-radius: 6px;
          margin-bottom: 14px;

          .editor_toolbar {
            height: 32px;
            border-bottom: 1px solid #ebebed;
            position: relative;
            z-index: 28;
            display flex
            text-align center
          }

          .editor {
            min-height: 200px;
            z-index 28
          }

          >>> .w-e-text {
            padding: 0 14px;
            position absolute;
          }


          .send-post-text {
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            color: #a8abb3;
            text-align: right;
            border-top: 1px solid #ebebed;
            padding-right: 14px;
          }
        }

        .send-post-bottom {
          display flex;
          justify-content flex-end;

          .img_code {
            display: table;
            padding-top: 4px;
          }

          .send-post-button {
            cursor: pointer;
            width: 120px;
            height: 34px;
            text-align: center;
            line-height: 34px;
            background: #0d8dfc;
            border-radius: 24px;
            font-size: 14px;
            color: #fff;
          }
        }



        .close-btn {
          width: 16px;
          height: 16px;
          position: absolute;
          top: 8px;
          right: 8px;
          cursor: pointer;
          color: #ccc;
        }
        .quote-title {
          font-size: 13px;
          font-weight: 400;
          color: #656973;

          span {
            display: inline-block;
            vertical-align: middle;
            height: 18px;
            line-height: 18px;
          }
          .nickname {
            margin: 0 5px;
            color: #4b9ce3;
          }

        }
        .quote-content {
          line-height: 20px;
          max-height: 40px;
          overflow: hidden;
          position: relative;
          word-break: break-all;
          margin-top: 5px;
          color: #656973;
          font-size: 13px;
          font-weight: 400;

          .face-icon {
            height: 20px;
            margin-top: -3px;
          }
          .more-text-icon {
            height: 20px;
            line-height: 13px;
            position: absolute;
            right: 0;
            bottom: 0;
            padding-left: 50px;
            padding-right: 7px;
            background: linear-gradient(to right, rgba(255,255,255,0), #f7f8fa 65%);
            color: #999;
          }
        }



      }


    }




  }
</style>
