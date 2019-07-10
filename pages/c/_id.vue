<template>
  <div class="moment-main">
    <div class="moment-list">
      <div class="moment-left">
        <div class="left-top">
          <div class="team-bg" :style="'background:url('+circle.circle_avatar_background+') no-repeat;background-size: cover;background-position:center;border-radius: 2px 2px 0 0;'"></div>

          <div class="team-desc">
            <div class="desc-left">
              <div class="circle-img">
                <a :href="'/c/'+circle.id">
                  <img class="circle-logo" :src="circle.circle_picture" :alt="circle.circle_name">
                </a>
                <div class="join-circle"
                     :class="{'active' : circle.is_attention == 1}" @click="joinCircle(circle.id, circle.is_attention)">{{circle.is_attention == 1 ? '已加入' : '加入'}}</div>
              </div>
              <div class="circle-name">
                <a :href="'/c/'+circle.id"><div class="club-name">{{circle.circle_name}}</div></a>
                <div class="club-desc">{{circle.circle_intro}}</div>
                <div class="club-desc-line"></div>
                <div class="club-fan">
                  <p class="fan-numb">
                    <span class="fan-text1">{{circle.fans_num}}</span>
                    <span class="fan-text">粉丝</span>
                  </p>
                  <p class="fan-numb">
                    <span class="fan-text1">{{circle.dynamic_num}}</span>
                    <span class="fan-text">贴子</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="desc-right">
              <div class="send-post-app" id="dynamic_editor_btn">下载App提问</div>
            </div>
          </div>

          <div class="toggle-butt">
            <div class="button-list" :class="{'button-list-active' : cTab == 'new'}" @click="cTab = 'new'">最新
              <svg class="icon moment_icon_active" aria-hidden="true">
                <use xlink:href="#icon-circle_blue"></use>
              </svg>
            </div>
            <div class="button-list" :class="{'button-list-active' : cTab == 'hot'}" @click="cTab = 'hot'">热贴
              <svg class="icon moment_icon_active" aria-hidden="true">
                <use xlink:href="#icon-circle_blue"></use>
              </svg>
            </div>
            <div class="button-list" :class="{'button-list-active' : cTab == 'star'}" @click="cTab = 'star'">明星
              <svg class="icon moment_icon_active" aria-hidden="true">
                <use xlink:href="#icon-circle_blue"></use>
              </svg>
            </div>
          </div>
          <div class="write-moment-btn">
            <p class="write-moment-btn-top"><img class="write-moment-btn-img" src="/static/images/banner/write.png" alt=""></p>
            <p class="write-moment-btn-bottom">发贴</p></div>
        </div>

        <div class="hot-new-cont">
          <div class="left-list">
            <!--置顶-->
            <div class="left-list-items" v-show="cTab == 'new'" v-for="item in topDynamicList">
              <div class="list-items-title">
                <span class="run-top">置顶</span>
                <a :href="'/p/'+item.dynamic_id">{{item.title}}</a>
              </div>
              <!--问答区分-->
              <!--不是问答-->
              <div class="list-items-desc">
                <a :href="'/p/'+item.dynamic_id" v-html="item.content"></a>
              </div>
              <!--根据不同的参数显示不同的内容-->
              <!--大图显示-->
              <!--菠菜单场显示-->
              <!--组合菠菜投注显示-->
              <!--音频部分显示-->
              <!--视频部分显示-->
              <!--转发的贴子-->
              <!--红包功能显示-->
              <!--专发红包-->
              <!---->
              <!--赛事新加样式-->
              <!--房间列表显示-->
              <!--用户信息-->
              <div class="list-items-user">
                <div class="user-left">
                  <a :href="'/u/'+item.member_id">
                    <img class="user-img" :src="item.avatar ? item.avatar : '/static/images/tx_pic.jpg'" alt="">
                    <span class="user-left-name">{{item.nickname}}</span>
                  </a>
                  <span class="user-left-time">{{item.add_time}}</span>
                </div>
                <div class="user-right">
                  <span class="user-left-zan">{{item.praise_count}} 赞</span>
                  <span class="user-left-reply">{{item.comment_count}} 回复</span>
                </div>
              </div>
              <div class="list-items-line"><p class="line-width"></p></div>
            </div>

            <!--****最新****-->
            <div class="left-list-items" v-show="cTab == 'new'" v-for="item in dynamic">
              <!--用户信息-->
              <div class="list-items-user">
                <div class="user-left">
                  <a :href="'/u/'+item.member_id">
                    <img class="user-img" :src="item.avatar ? item.avatar : '/static/images/tx_pic.jpg'" alt="">
                    <span class="user-left-name">{{item.nickname}}</span>
                  </a>
                  <span class="user-left-time">{{item.add_time}}</span>
                </div>
                <div class="user-right">
                  <span class="user-left-zan">{{item.praise_count}} 赞</span>
                  <span class="user-left-reply">{{item.comment_count}} 回复</span>
                </div>
              </div>
              <div class="list-items-title">
                <a :href="'/p/'+item.dynamic_id">{{item.title}}</a>
              </div>
              <!--问答区分-->
              <div class="list-qa-radio" v-if="item.sound && item.sound.length > 0">
                <div class="list-qa-radio-left fl">
                  <a :href="'/u/'+item.qa.member_id">
                    <img class="qa-avatar" :src="item.qa.avatar ? item.qa.avatar : '/static/images/tx_pic.jpg'" alt="">
                    <img v-if="item.qa.member_type == '1'" class="star_qa_staff" src="/static/images/member/v.png" alt="">
                    <img v-if="item.qa.member_type == '2'" class="star_qa_staff" src="/static/images/member/staff.png" alt="">
                  </a>
                </div>
                <div class="list-qa-radio-right fl">
                  <div class="mobile-nickname">{{item.qa.nickname || ''}} | {{item.qa.asked_demo || ''}}</div>
                  <a :href="'/p/'+item.dynamic_id" target="_blank">

                    <!--免费-->
                    <div v-if="item.qa.is_limit == 1" class="qa-radio-bg">
                      <p class="qa-radio-bg-left fl"><i class="iconfont radio-icon icon-general__voice"></i></p>
                      <p class="qa-radio-bg-text">限时免费，{{item.qa.limit_time}}</p>
                      <p class="qa-radio-bg-right fr">{{item.sound[0].seconds}}"</p>
                    </div>
                    <!--收费-->
                    <div v-else class="qa-radio-bg">
                      <p class="qa-radio-bg-left fl">
                        <i class="iconfont radio-icon icon-general__voice"></i>
                      </p>
                      <p class="qa-radio-bg-text">{{item.qa.listen_diamond}}钻偷听</p>
                      <p class="qa-radio-bg-right fr">{{item.sound[0].seconds}}"</p>
                    </div>

                    <div class="qa-radio-bottom">
                      <div class="qa-radio-bottom-left fl">
                        <div class="qa-radio-name">{{item.qa.nickname || ''}}</div>
                        <div class="qa-radio-time">回答于{{item.qa.answer_time}}</div>
                      </div>
                      <div class="qa-radio-bottom-right fr">
                        <div class="qa-radio-praise"><i class="iconfont icon-general__good"></i> {{item.qa.praise_count || '0'}}</div>
                        <div class="qa-radio-listen"><i class="iconfont icon-general__headphone"></i> {{item.qa.listen_num || ''}}</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <!--不是问答-->
              <!--根据不同的参数显示不同的内容-->
              <div class="list-items-desc">
                <a :href="'/p/'+item.dynamic_id" v-html="item.content"></a>
              </div>
              <!--大图显示-->
              <div class="list-items-pic" v-if="item.picture.length > 0">
                <a :href="'/p/'+item.dynamic_id" target="_blank">
                  <div class="items-pic-list" v-for="it in item.picture">
                    <img class="items-pic-img" :src="it.image_url + '?x-oss-process=image/resize,m_fill,h_120,w_120,limit_0/format,jpg'"
                                                   alt="">
                    <span class="score_list_pic_gif">GIF</span>
                    <span class="score_list_pic_num">共 {{item.picture.lengt}} P</span>
                  </div>
                </a>
              </div>
              <!--菠菜单场显示-->
              <!--组合菠菜投注显示-->
              <!--音频部分显示-->

              <!--视频部分显示-->
              <div v-if="item.video && item.video.length>0" class="list-qa-video">
                <div class="list-qa-radio-left fl">
                  <a :href="'/u/'+item.qa.member_id">
                    <img class="qa-avatar" :src="item.qa.avatar ? item.qa.avatar : '/static/images/tx_pic.jpg'" alt="">
                  </a>
                </div>
                <div class="list-qa-radio-right fl">
                  <div class="mobile-nickname">{{item.qa.nickname || ''}} | {{item.qa.asked_demo || ''}}</div>
                  <a :href="'/p/'+item.dynamic_id" target="_blank">


                    <div v-if="item.qa.is_limit == 1" class="qa-radio-bg cl">
                      <img class="qa-radio-bg-img"
                           :src="item.video[0].image_url ? item.video[0].image_url : '/static/images/default_score.png'" alt="">
                      <p class="qa-radio-bg-left">限时免费，{{item.qa.limit_time}}</p>
                      <p class="qa-radio-bg-right">{{item.video[0].seconds}}"</p>
                      <i class="iconfont icon-general__play"></i>
                    </div>
                    <div v-else class="qa-radio-bg">
                      <img class="qa-radio-bg-img"
                           :src="item.video[0].image_url ? item.video[0].image_url : '/static/images/default_score.png'" alt="">
                      <p class="qa-radio-bg-left">{{item.qa.listen_diamond}}钻偷偷看</p>
                      <p class="qa-radio-bg-right">{{item.video[0].seconds}}"</p>
                      <i class="iconfont icon-general__play"></i>
                    </div>


                    <div class="qa-radio-bottom">
                      <div class="qa-radio-bottom-left fl">
                        <div class="qa-radio-name">{{item.qa.nickname || ''}}</div>
                        <div class="qa-radio-time">回答于{{item.qa.answer_time}}</div>
                      </div>
                      <div class="qa-radio-bottom-right fr">
                        <div class="qa-radio-praise"><i class="iconfont icon-general__good"></i> {{item.qa.praise_count || '0'}}</div>
                        <div class="qa-radio-listen"><i class="iconfont icon-general__headphone"></i> {{item.qa.listen_num || ''}}</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <!--转发的贴子-->
              <a v-if="item.forward_dynamic.length > 0" class="forward-post" :href="'/p/'+item.forward_dynamic[0].dynamic_id">
                <div class="img-wrap">
                  <img v-if="item.forward_dynamic[0].video.length > 0" class="f-img" :src="item.forward_dynamic[0].video[0].image_url+'?x-oss-process=image/resize,m_fill,h_120,w_120,limit_0'">
                  <img v-else-if="item.forward_dynamic[0].picture.length > 0" class="f-img" :src="item.forward_dynamic[0].picture[0].image_url+'?x-oss-process=image/resize,m_fill,h_120,w_120,limit_0'">
                  <img v-else class="f-img" src="/static/images/default_score.png">
                </div>
                <div class="post-conent">
                  <h2>{{item.forward_dynamic[0].title}}</h2>
                  <p>{{item.forward_dynamic[0].summary}}</p>
                  <div class="author">
                    <img :src="item.forward_dynamic[0].avatar+'?x-oss-process=image/resize,m_fill,h_20,w_20,limit_0'">
                    <span>{{item.forward_dynamic[0].nickname}}</span>
                  </div>
                </div>
              </a>
              <!--红包功能显示-->
              <red-envolope-detail v-if="item.redPacket_info && item.redPacket_info.length >0"></red-envolope-detail>
              <!--专发红包-->
              <!---->
              <!--赛事新加样式-->
              <!--房间列表显示-->

              <div class="list-items-line"><p class="line-width"></p></div>
            </div>


            <!--****热帖列表****-->
            <div class="left-list-items" v-show="cTab == 'hot'" v-for="item in hotList">
              <div class="list-items-title">
                <a :href="'/p/'+item.dynamic_id">{{item.title}}</a>
              </div>
              <!--问答区分-->
              <!--不是问答-->
              <!--根据不同的参数显示不同的内容-->
              <div class="list-items-desc">
                <a :href="'/p/'+item.dynamic_id" v-html="item.content"></a>
              </div>
              <!--大图显示-->
              <div class="list-items-pic" v-if="item.picture.length > 0">
                <a :href="'/p/'+item.dynamic_id" target="_blank">
                  <div class="items-pic-list" v-for="it in item.picture">
                    <img class="items-pic-img" :src="it.image_url + '?x-oss-process=image/resize,m_fill,h_120,w_120,limit_0/format,jpg'"
                         alt="">
                    <span class="score_list_pic_gif">GIF</span>
                    <span class="score_list_pic_num">共 {{item.picture.lengt}} P</span>
                  </div>
                </a>
              </div>
              <!--菠菜单场显示-->
              <!--组合菠菜投注显示-->
              <!--音频部分显示-->
              <!--视频部分显示-->
              <!--转发的贴子-->
              <a v-if="item.forward_dynamic.length > 0" class="forward-post" :href="'/p/'+item.forward_dynamic[0].dynamic_id">
                <div class="img-wrap">
                  <img v-if="item.forward_dynamic[0].video.length > 0" class="f-img" :src="item.forward_dynamic[0].video[0].image_url+'?x-oss-process=image/resize,m_fill,h_120,w_120,limit_0'">
                  <img v-else-if="item.forward_dynamic[0].picture.length > 0" class="f-img" :src="item.forward_dynamic[0].picture[0].image_url+'?x-oss-process=image/resize,m_fill,h_120,w_120,limit_0'">
                  <img v-else class="f-img" src="/static/images/default_score.png">
                </div>
                <div class="post-conent">
                  <h2>{{item.forward_dynamic[0].title}}</h2>
                  <p>{{item.forward_dynamic[0].summary}}</p>
                  <div class="author">
                    <img :src="item.forward_dynamic[0].avatar+'?x-oss-process=image/resize,m_fill,h_20,w_20,limit_0'">
                    <span>{{item.forward_dynamic[0].nickname}}</span>
                  </div>
                </div>
              </a>
              <!--红包功能显示-->
              <red-envolope-detail v-if="item.redPacket_info && item.redPacket_info.length >0"></red-envolope-detail>
              <!--专发红包-->
              <!---->
              <!--赛事新加样式-->
              <!--房间列表显示-->
              <!--用户信息-->
              <div class="list-items-user">
                <div class="user-left">
                  <a :href="'/u/'+item.member_id">
                    <img class="user-img" :src="item.avatar ? item.avatar : '/static/images/tx_pic.jpg'" alt="">
                    <span class="user-left-name">{{item.nickname}}</span>
                  </a>
                  <span class="user-left-time">{{item.add_time}}</span>
                </div>
                <div class="user-right">
                  <span class="user-left-zan">{{item.praise_count}} 赞</span>
                  <span class="user-left-reply">{{item.comment_count}} 回复</span>
                </div>
              </div>
              <div class="list-items-line"><p class="line-width"></p></div>
            </div>

            <!--****明星****-->
            <div class="moment-start" v-show="cTab == 'star'">
              <div class="moment-start-list">
                <div class="start-list-first" v-for="item in starList">
                  <a :href="'/u/'+item.member_id">
                    <img class="start-list-avatar" :src="item.avatar ? item.avatar : '/static/images/tx_pic.jpg'">
                    <img class="star_right_v" v-if="item.type == '1'" src="/static/images/v.png" alt="">
                    <img class="star_right_v" v-if="item.type == '2'" src="/static/images/staff.png" alt="">
                  </a>
                  <div class="start-list-cont">
                    <a :href="'/u/'+item.member_id">
                      <p class="start-list-name">{{item.nickname}}</p>
                      <p class="start-list-detail">{{item.intro}}</p>
                    </a>
                    <p data-member_id="74822" class="start-list-focus" :class="{'active' : item.is_attention == 1}">{{item.is_attention == 1 ? '关注' : '取消关注'}}</p>
                    <p class="start-list-first-line"></p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <!--分页-->
          <div class="page-num">
            <s-page class="mt10"
                    prev-text="上一页"
                    next-text="下一页"
                    :total="Number(commentListLength)"
                    :current="thisPageSize"
                    :page-size="pageLimit"
                    @on-change="onChangePage"></s-page>
          </div>


          <div class="editor-cont">
            <div class="editor-cont-write">
              <div class="post-write">
                <div class="post-write-team">
                  <img class="post-write-team-logo" src="http://img1.famulei.com/z/0/p/165/2522241716989.jpg" alt="">
                  <div class="post-write-team-title">测试圈子2</div>
                </div>
                <div class="post-write-title">
                  <input id="title" maxlength="30" type="text" placeholder="标题 (不超过30字)">
                </div>
                <div class="post-write-desc">
                  <editor :clear-content="clearContent" @editorContent="getEditorContent">
                  </editor>
                  <div class="max-text-list">{{editorContent.length}}/800</div>
                </div>
                <div class="post-write-desc-mobile">
                  <div class="post-write-vote"><i class="iconfont icon-vote icon-icontoupiao"></i>添加投票</div>
                  <textarea maxlength="20000" class="comment_pop_content"></textarea></div>
              </div>
            </div>
            <div class="editor-cont-vote"></div>
            <div class="editor-cont-release">
              <div class="img_code fll"></div>
              <div class="editor-post-button">发布</div>
            </div>
          </div>

        </div>


      </div>

      <div class="moment-right">
        <hot-circle-slide :hotCircleList="hotCircleList"></hot-circle-slide>
        <div class="hot-qa-cont mt10">
          <div class="hot-qa-list">
            <div class="circle-recomm-top">
              <div class="recomm-top-left fl">
                <span class="recomm-top-left-line"></span>
                <span class="recomm-top-left-text">编辑推荐</span>
              </div>
              <div class="hot-qa-item-line"></div>
            </div>
            <div class="hot-qa-item">

              <div class="qa-item-first" v-for="it in qaList">
                <a target="_blank" :href="'/p/'+it.dynamic_id">
                  <div class="qa-item-first-title">{{it.title}}</div>
                </a>
                <div class="qa-item-first-mesaage">
                  <div class="qa-item-first-left">答</div>
                  <div class="qa-item-first-right cl">
                    <div class="first-right-avatar fl">
                      <a :href="'/u/'+it.qa.asked_member_id">
                        <img class="first-right-avatar-img fl" :src="it.qa.asked_avatar" alt="">
                        <img v-if="it.qa.asked_type == '1'" class="star_right_v" src="/static/images/member/v.png" alt="">
                        <img v-if="it.qa.asked_type == '2'" class="star_right_v" src="/static/images/member/staff.png" alt="">
                      </a>
                    </div>
                    <div class="first-right-nickname fl">
                      <p class="user-nick"><a :href="'/u/'+it.qa.member_id">{{it.qa.asked_nickname || ''}}</a></p>
                      <p class="user-nick1">{{it.qa.asked_demo || ''}}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import RedEnvolopeDetail from "../../components/post/content/red-envolope-detail";
  import HotCircleSlide from "../../components/post/hot-circle-slide";
  import HotUserSlide from "../../components/post/hot-user-slide";
  import ModeratorSlide from "../../components/post/moderator-slide";
  import SPage from "../../components/common/s-page";
  import editor from '~/components/common/wang-editor'

  /**问答**/
  export default {
    name: "circle-index",
    components: {
      SPage,
      ModeratorSlide,
      HotUserSlide,
      HotCircleSlide,
      RedEnvolopeDetail,
      editor
    },
    data() {
      return {
        cTab:'new',
        thisPageSize:1,
        pageLimit:20,
        commentListLength:0,

        clearContent:false,
        editorContent:'',
      }
    },
    async asyncData({app, $axios, error, query, params}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。


      let [circleInfo, dynamicList, hotDynamicList, starDynamicList, qaList] = await Promise.all([
        app.$api.circle.getCircleInfo({params:{circle_id: params.id}}),
        app.$api.dynamic.circleDynamicList({params:{circle_id: params.id,limit:20,page:1}}),
        app.$api.dynamic.circleHotDynamicList({params:{circle_id: params.id,order:'reply_time',limit:20,page:1}}),
        app.$api.dynamic.circleStarDynamicList({params:{circle_id: params.id}}),
        app.$api.cms.getQAList({params:{limit: 10}})
      ]);

      return {
        circle: circleInfo.data,
        bmList: circleInfo.data.circle_bm_list,
        hotCircleList: circleInfo.data.recommend_circle_list,
        hotUserList: circleInfo.data.active_member_list,

        topDynamicList: dynamicList.data.top_list,
        dynamic: dynamicList.data.list,

        hotList: hotDynamicList.data.list,
        starList: starDynamicList.data,
        qaList: qaList.data
      }


    },
    fetch() {
      // 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。
    },
    mounted() {
      console.log(this.$route.params.id);
      // this.clentInit();//如果服务器端初始化失败，客户端再次初始化数据
    },
    methods: {
      async clentInit(){
        let [circleInfo, dynamicList, hotDynamicList, starDynamicList] = await Promise.all([
          this.$api.circle.getCircleInfo({params:{circle_id: this.$route.params.id}}),
          this.$api.dynamic.circleDynamicList({params:{circle_id: this.$route.params.id,limit:20,page:1}}),
          this.$api.dynamic.circleHotDynamicList({params:{circle_id: this.$route.params.id,order:'reply_time',limit:20,page:1}}),
          this.$api.dynamic.circleStarDynamicList({params:{circle_id: this.$route.params.id}})
        ]);

        return {
          circle: circleInfo.data,
          bmList: circleInfo.data.circle_bm_list,
          hotCircleList: circleInfo.data.recommend_circle_list,
          hotUserList: circleInfo.data.active_member_list,

          topDynamicList: dynamicList.data.top_list,
          dynamic: dynamicList.data.list,

          hotList: hotDynamicList.data.list,
          starList: starDynamicList.data
        }
      },
      /**
       * 评论分页
       * @description 评论组件内异步刷新评论数据，此时并没有从父组件刷新，而是直接在当前组件内刷新评论
       * */
      async onChangePage(pageNo){
        this.thisPageSize = pageNo;
        this.$router.push({path:this.$router.path,query:{pageNo:pageNo}});

        /*
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
        */
      },
      //加入取消加入圈子
      async joinCircle(circleId, status){

        let params = {
          circle_id: circleId
        };
        let res;
        if(status == '0'){
          res = await this.$api.circle.setJoinCircleAttention({params});
        }else{
          res = await this.$api.circle.setCancelCircleAttention({params});
        }
        if(res.code == '200'){
          this.$Message.success(res.message);
          if(status == '0'){
            this.circle.is_attention = 1;
          }else{
            this.circle.is_attention = 0;
          }
        }else{
          this.$Message.error(res.message);
        }
      },
      /**
       * 接收editor子组件回传的编辑器内容
       * **/
      getEditorContent(e){
        console.log(e)
        this.editorContent = e;
      },

    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .moment-main {
    max-width: 990px;
    margin: 20px auto;
    width: 100%;
    zoom: 1;
    padding-top: 0px;
    display flex;
    flex-wrap wrap;
    justify-content space-between;
  }


  .moment-list{
    width: 100%;
    display flex;
    justify-content space-between;


    .moment-left{
      width: 640px;
      background: #fff;
      box-shadow: 0 0 0 1px #ebebed;
      border-radius: 2px;

      .left-top {
        .team-bg {
          width: 100%;
          height: 110px;
        }

        .team-desc{
          display flex
          justify-content space-between;

          .desc-left{
            display flex

            .circle-img {
              width: 100px;
              margin-left: 30px;
              position: relative;

              .circle-logo {
                position: absolute;
                top: -50px;
                left: 0;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: #fff;
                border: 3px solid #fff;
                box-shadow: 0 1px 0px 0 rgba(0,0,0,0.04);
              }

              .join-circle{
                cursor: pointer;
                border: 1px solid #0d8dfc;
                border-radius: 20px;
                width: 80px;
                height: 28px;
                margin: 70px 0 0 10px;
                text-align: center;
                line-height: 28px;
                font-size: 13px;
                color: #0d8dfc;

                &:hover {
                  background: #edf7ff;
                  color: #0d8dfc;
                }
                &.active {
                  background: #0d8dfc;
                  border-radius: 20px;
                  color: #fff;
                }
              }
            }

            .circle-name {
              margin: 12px 20px;

              .club-name {
                font-size: 16px;
                font-weight: bold;
                line-height: 22px;
                color: #2d2f33;
              }
              .club-desc {
                margin-top: 2px;
                font-size: 12px;
                color: #a8abb3;
                line-height: 17px;
              }
              .club-desc-line {
                margin-top: 10px;
                width: 217px;
                height: 1px;
                background: #f0f1f2;
              }
              .club-fan {
                margin-top: 10px;

                .fan-numb {
                  display: inline-block;

                  .fan-text1 {
                    font-size: 14px;
                    color: #2d2f33;
                    font-weight: bold;
                  }
                  .fan-text {
                    margin-left: 7px;
                    font-size: 12px;
                    color: #a8abb3;
                  }
                }
                .fan-numb + .fan-numb {
                  margin-left: 18px;
                }
              }
            }
          }
          .desc-right{
            display flex;
            align-items center;

            .send-post-app {
              width: 130px;
              height: 38px;
              font-size: 14px;
              color: #0d8dfc;
              cursor: pointer;
              line-height: 36px;
              text-align: center;
              border: 1px solid #0d8dfc;
              border-radius: 24px;
              margin-right: 20px;
            }
          }
        }


        .toggle-butt{
          background: #fafafa;
          height: 40px;
          width: 100%;
          display flex;
          justify-content space-around;

          .button-list {
            position: relative;
            cursor: pointer;
            display: inline-block;
            width: calc(100% / 3);
            text-align: center;
            line-height: 40px;
            font-size: 14px;
            color: #656973;

            &.button-list-active {
              font-size: 14px;
              color: #2d2f33;
              font-weight: bold;

              .moment_icon_active {
                display: block;
              }
            }

            .moment_icon_active {
              position: absolute;
              display: none;
              width: 12px;
              height: 12px;
              color: #0d8dfc;
              left: 57%;
              top: 10px;
            }
          }
        }
        .write-moment-btn {
          cursor: pointer;
          display: none;
          position: fixed;
          bottom: 100px;
          right: 30px;
          height: 60px;
          width: 60px;
          background: #0d8dfc;
          border-radius: 50%;
          z-index: 50;
          text-align: center;

          .write-moment-btn-top {
            margin-top: 8px;
            text-align: center;

            .write-moment-btn-img {
              height: 24px;
              width: 24px;
            }
          }

          .write-moment-btn-bottom {
            margin-top: 4px;
            font-size: 11px;
            color: #fff;
          }
        }


      }


      .hot-new-cont {
        .left-list {
          margin: 8px 25px 0 25px;

          .left-list-items {
            display: flex;
            flex-wrap: wrap;
            margin-top: 12px;

            .list-items-title {
              width: 100%;
              overflow: hidden;
              line-height: 18px;
              font-weight: bold;
              font-size: 17px;
              color: #2d2f33;

              .run-top {
                background: #0d8dfc;
                border-radius: 4px;
                height: 18px;
                width: 36px;
                display: inline-block;
                text-align: center;
                line-height: 18px;
                font-size: 12px;
                color: #fff;
                letter-spacing: 0;
                margin-right: 1px;
                vertical-align: 1px;
              }
            }

            .list-items-desc {
              width: 100%;
              line-height: 22px;
              font-size: 14px;
              color: #2d2f33;
              position: relative;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              line-clamp: 3;
              /* autoprefixer: off */
              -webkit-box-orient: vertical;
              /* autoprefixer: on */
              margin-top: 6px;
              display none;
            }


            .list-qa-radio{
              width 100%;
              display flex;
              margin-top: 6px;
              padding-bottom: 12px;

              .list-qa-radio-left {
                width: 60px;
                height: 60px;
                position: relative;

                .qa-avatar {
                  width: 60px;
                  height: 60px;
                  border-radius: 50%;
                  box-shadow: 0 10px 100px 0 rgba(255,255,255,0.1);
                }
                .star_qa_staff {
                  position: absolute;
                  height: 20px;
                  width: 20px;
                  right: -2px;
                  bottom: -2px;
                }
              }
              .list-qa-radio-right {
                margin: 5px 0 0 8px;
                width: calc(100% - 68px);

                .mobile-nickname {
                  display: none;
                  font-size: 11px;
                  color: #a8abb3;
                }

                .qa-radio-bg {
                  height: 30px;
                  line-height: 30px;
                  max-width: 260px;
                  background: url(/images/bubble_blue@2x.png) no-repeat;
                  background-size: 100% 100%;
                  text-align: center;

                  .qa-radio-bg-left {
                    margin-left: 15px;

                    .radio-icon {
                      font-size: 13px;
                      color: #fff;
                    }
                  }
                  .qa-radio-bg-text {
                    display: inline-block;
                    max-width: 160px;
                    font-size: 12px;
                    color: #fff;
                    text-align: center;
                  }
                  .qa-radio-bg-right {
                    font-size: 12px;
                    color: #fff;
                    margin-right: 10px;
                  }
                }
                .qa-radio-bottom {
                  margin-top: 10px;
                  height: 18px;

                  .qa-radio-bottom-left {
                    font-size: 12px;
                    color: #a8abb3;

                    .qa-radio-name {
                      display: inline-block;
                    }
                    .qa-radio-time {
                      margin-left: 8px;
                      display: inline-block;
                    }
                  }
                  .qa-radio-bottom-right {
                    font-size: 12px;
                    color: #a8abb3;

                    .qa-radio-praise {
                      display: inline-block;
                      .icon-general__good {
                        vertical-align: middle;
                        margin-bottom: 1px;
                        font-size: 12px;
                        color: #a8abb3;
                      }
                    }
                    .qa-radio-listen {
                      margin-left: 17px;
                      display: inline-block;

                      .icon-general__headphone {
                        display: inline-block;
                        vertical-align: middle;
                        margin-bottom: 1px;
                        font-size: 12px;
                        color: #a8abb3;
                      }
                    }
                  }
                }
              }


            }


            .list-qa-video{
              margin-top: 6px;
              padding-bottom: 12px;

              .list-qa-radio-left {
                width: 60px;
                height: 60px;
                position: relative;

                .qa-avatar {
                  width: 60px;
                  height: 60px;
                  border-radius: 50%;
                  box-shadow: 0 10px 100px 0 rgba(255,255,255,0.1);
                }
                .star_qa_staff {
                  position: absolute;
                  height: 20px;
                  width: 20px;
                  right: -2px;
                  bottom: -2px;
                }
              }
              .list-qa-radio-right {
                margin: 5px 0 0 8px;
                width: calc(100% - 68px);

                .mobile-nickname {
                  display: none;
                  font-size: 11px;
                  color: #a8abb3;
                }

                .qa-radio-bg {
                  height: 108px;
                  width: 192px;
                  position: relative;

                  &:before{
                    content: "";
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.5);
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 2;
                    transition: all 0.3s;
                    border-radius: 8px;
                  }


                  .qa-radio-bg-img {
                    height: 108px;
                    line-height: 30px;
                    width: 192px;
                    background: #2d2f33;
                    border-radius: 8px;
                  }
                  .qa-radio-bg-left {
                    position: absolute;
                    left: 10px;
                    bottom: 4px;
                    font-size: 11px;
                    color: #fff;
                    z-index: 10;
                  }
                  .qa-radio-bg-right {
                    position: absolute;
                    right: 10px;
                    bottom: 4px;
                    font-size: 11px;
                    color: #fff;
                    z-index: 10;
                  }
                  .icon-general__play {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 24px;
                    color: #fff;
                    z-index: 10;
                  }
                }
                .qa-radio-bottom {
                  margin-top: 10px;
                  height: 18px;

                  .qa-radio-bottom-left {
                    font-size: 12px;
                    color: #a8abb3;

                    .qa-radio-name {
                      display: inline-block;
                    }
                    .qa-radio-time {
                      margin-left: 8px;
                      display: inline-block;
                    }
                  }
                  .qa-radio-bottom-right {
                    font-size: 12px;
                    color: #a8abb3;

                    .qa-radio-praise {
                      display: inline-block;
                      .icon-general__good {
                        vertical-align: middle;
                        margin-bottom: 1px;
                        font-size: 12px;
                        color: #a8abb3;
                      }
                    }
                    .qa-radio-listen {
                      margin-left: 17px;
                      display: inline-block;

                      .icon-general__headphone {
                        display: inline-block;
                        vertical-align: middle;
                        margin-bottom: 1px;
                        font-size: 12px;
                        color: #a8abb3;
                      }
                    }
                  }
                }
              }

            }

            .list-items-pic {
              display flex;
              margin-top: 8px;

              .items-pic-list {
                cursor: pointer;
                width: 120px;
                height: 120px;
                display: inline-block;
                overflow: hidden;
                position: relative;
                border-radius: 4px;
                margin-right: 2px;

                .items-pic-img {
                  width: 100%;
                  height: 100%;
                  border-radius: 4px;
                  top: 0;
                  position: relative;
                  left: 0;
                  -webkit-transition: -webkit-transform 0.3s;
                  -moz-transition: -moz-transform 0.3s;
                  -o-transition: -o-transform 0.3s;
                  transition: transform 0.3s;

                  &:hover{
                    -webkit-transform: scale(1.05);
                    -moz-transform: scale(1.05);
                    -ms-transform: scale(1.05);
                    -o-transform: scale(1.05);
                    transform: scale(1.05);
                  }
                }
                .score_list_pic_gif {
                  display: block;
                  position: absolute;
                  bottom: 0;
                  right: 0;
                  background: #0d8dfc;
                  width: 42px;
                  height: 18px;
                  text-align: center;
                  line-height: 18px;
                  font-size: 11px;
                  color: #fff;
                  border-radius: 4px 0 4px 0;
                }
                .score_list_pic_num {
                  display: none;
                }
              }
            }


            .list-items-user {
              width: 100%;
              height: 18px;
              line-height: 18px;
              margin-bottom: 6px;
              display flex
              align-items center;
              justify-content space-between;

              .user-left {
                display inline-flex
                align-items center

                a{
                  display inline-flex
                  align-items center;
                }

                .user-img {
                  height: 14px;
                  width: 14px;
                  border-radius: 50%;
                }
                .user-left-name {
                  margin-left: 1px;
                  font-size: 12px;
                  color: #a8abb3;
                }
                .user-left-time {
                  margin-left: 7px;
                  font-size: 12px;
                  color: #a8abb3;
                }
              }

              .user-right {
                .user-left-zan {
                  font-size: 12px;
                  color: #a8abb3;
                }
                .user-left-reply {
                  margin-left: 11px;
                  font-size: 12px;
                  color: #a8abb3;
                }
              }
            }

            .list-items-line {
              width: 100%;
              height: 2px;
              position: relative;

              .line-width {
                position: absolute;
                left: -10px;
                width: 610px;
                height: 1px;
                border-top: 1px dotted #f0f1f2;
              }
            }
          }


          //转发的帖子
          .forward-post{
            display: flex;
            background: #fafafa;
            margin-top: 10px;

            .img-wrap {
              width: 120px;
              height: 120px;
              float: left;

              .f-img {
                width: 100%;
                border-radius: 4px 0 0 4px;
              }
            }


            .post-conent {
              width: 448px;
              height: 120px;
              background: #fafafa;
              float: left;
              margin-left: 4px;
              padding: 8px 12px;

              h2 {
                font-size: 16px;
                color: #656973;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
              p {
                color: #a8abb3;
                height: 44px;
                line-height: 22px;
                margin: 8px 0 15px;
                overflow: hidden;
              }
              .author {
                display flex;
                align-items center;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;

                img {
                  width: 18px;
                  height: 18px;
                  border-radius: 50%;
                }
                span {
                  font-size: 12px;
                  color: #656973;
                  margin-left: 5px;
                }
              }
            }
          }


          //明星
          .moment-start {
            padding-bottom: 30px;

            .moment-start-list {
              margin-top: 30px;
              display flex;
              flex-wrap wrap;

              .start-list-first {
                width: 50%;
                padding-bottom: 30px;
                position: relative;
                display flex;

                &:nth-child(2n+1) {
                  border-right: 1px solid #f0f1f2;
                }

                .start-list-avatar {
                  margin-left: 32px;
                  height: 70px;
                  width: 70px;
                  border-radius: 50%;
                  border: 1px solid rgba(0,0,0,0.04);
                }

                .star_right_v {
                  position: absolute;
                  left: 82px;
                  top: 48px;
                  height: 20px;
                  width: 20px;
                  border-radius: 50%;
                }
              }

              .start-list-cont {
                margin-left: 12px;

                .start-list-name {
                  font-weight: bold;
                  font-size: 16px;
                  color: #2d2f33;
                  line-height: 22px;
                  height: 22px;
                  width: 190px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .start-list-detail {
                  width: 190px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  line-height: 17px;
                  height: 17px;
                  margin-top: 2px;
                  font-size: 12px;
                  color: #a8abb3;
                }

                .start-list-focus {
                  cursor: pointer;
                  margin-top: 5px;
                  border: 1px solid #0d8dfc;
                  border-radius: 100px;
                  width: 70px;
                  height: 24px;
                  text-align: center;
                  line-height: 22px;
                  font-size: 12px;
                  color: #0d8dfc;

                  &:hover {
                    background: #edf7ff;
                    color: #0d8dfc;
                  }
                  &.active {
                    background: #0d8dfc;
                    border-radius: 20px;
                    color: #fff;
                  }



                }
                .start-list-first-line {
                  display: none;
                }
              }
            }

          }


        }

        .page-num{
          width 100%;
          height 50px;
          line-height 50px;
          padding:0 14px;
          background #f9f9f9;
        }

        .editor-cont{
          .editor-cont-write {
            margin: 18px 20px 0;
            position: relative;

            .post-write{

              .post-write-team {
                display: none;
              }
              .post-write-title {
                cursor: pointer;
                margin-bottom: 10px;

                #title {
                  padding-left: 14px;
                  width: 100%;
                  border: 1px solid #ebebed;
                  border-radius: 4px;
                  height: 40px;
                  font-size: 14px;
                  color: #656973;
                }
              }
              .post-write-desc {
                border: 1px solid #ebebed;
                border-radius: 4px;
                position: relative;
                z-index: 28;

                .max-text-list {
                  height: 30px;
                  text-align: right;
                  line-height: 30px;
                  font-size: 12px;
                  color: #a8abb3;
                  border-top: 1px solid #ebebed;
                  padding-right: 12px;
                }
              }

              .post-write-desc-mobile {
                display: none;
              }



            }
          }


          .editor-cont-release {
            margin: 20px 0 16px 0;
            text-align: right;

            .img_code {
              display: table;
              padding-top: 4px;
              padding-left: 20px;
            }
            .editor-post-button {
              cursor: pointer;
              margin-right: 20px;
              display: inline-block;
              background: #0d8dfc;
              border-radius: 24px;
              width: 120px;
              height: 34px;
              text-align: center;
              line-height: 34px;
              font-size: 14px;
              color: #fff;
            }
          }
        }


      }

    }
    .moment-right{
      width: 330px;

      .hot-qa-cont{
        .hot-qa-list {
          margin-top: 12px;
          background: #fff;
          box-shadow: 0 0 0 1px #ebebed;
          border-radius: 2px;

          .circle-recomm-top {
            display: flex;
            justify-content: space-between;
            padding: 10px 13px 10px 14px;
            position: relative;

            .recomm-top-left{
              .recomm-top-left-line {
                display: inline-block;
                height: 12px;
                width: 4px;
                background: #0d8dfc;
                vertical-align: middle;
              }
              .recomm-top-left-text {
                line-height: 20px;
                margin-left: 3px;
                font-size: 15px;
                color: #2d2f33;
                font-weight: bold;
              }
            }

            .hot-qa-item-line {
              position: absolute;
              bottom: 0;
              left: 12px;
              height: 1px;
              width: 306px;
              border-bottom: 1px dotted #f0f1f2;
            }
          }
          .hot-qa-item {
            margin: 15px;

            .qa-item-first{
              .qa-item-first-title {
                padding: 12px 8px;
                background: #f7f8fa;
                border-radius: 8px;
                font-size: 14px;
                color: #2d2f33;
                line-height: 18px;
              }
              .qa-item-first-mesaage {
                margin-top: 9px;
                padding-bottom: 12px;
                border-bottom: 1px dotted #f0f1f2;
                position: relative;

                .qa-item-first-left {
                  z-index: 3;
                  position: absolute;
                  left: 3px;
                  top: 0;
                  height: 36px;
                  width: 36px;
                  line-height: 30px;
                  border-radius: 50%;
                  font-size: 16px;
                  color: #fff;
                  text-align: center;
                  background: #0d8dfc;
                  border: 3px solid #fff;
                }
                .qa-item-first-right {
                  margin-left: 30px;

                  .first-right-avatar {
                    height: 36px;
                    width: 36px;
                    position: relative;

                    .first-right-avatar-img {
                      border: 1px solid rgba(0,0,0,0.04);
                      height: 36px;
                      width: 36px;
                      border-radius: 50%;
                    }
                  }
                  .first-right-nickname {
                    margin-left: 5px;

                    .user-nick {
                      line-height: 20px;
                      font-size: 15px;
                      color: #2d2f33;
                      width: 220px;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    }
                    .user-nick1 {
                      line-height: 18px;
                      width: 220px;
                      font-size: 12px;
                      color: #a8abb3;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    }
                  }
                }
              }

            }

          }
        }
      }
    }


  }



</style>
