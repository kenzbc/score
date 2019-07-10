<template>
  <div id="comments" class="post-content-comments" v-if="matchInfo.status && matchInfo.status != 1">
    <!--nav tab-->
    <div class="title-nav">
      <ul class="tabs fll">
        <li v-for="(item, index) in tabs"
            :class="{'active': isTabs == index}"
            v-if="item.id != 0 || item.id == 0 && matchInfo.status == 2"
            @click="funcTabs(item.id)">
          <span>{{ item.name }}</span>
          <div class="in"></div>
          <div class="tips" v-if="index != 3 && item.count > 0">
            <span><span class="num">{{item.count}}</span></span>
          </div>
        </li>
      </ul>
      <div class="switch flr">
        <label v-for="(item, index) in switchs"
               :class="{'active': isSwitch == item.id}"
               @click="funcSwitchs(item.id)">
          <span>{{ item.name }}</span>
        </label>
      </div>
    </div>

    <!--普通评论-->
    <div class="ordinary-comments" v-if="isTabs != 2">
      <div class="god-comments-cont">
        <div class="god-comments-list go-floor1" v-for="(item, index) in curCommentList ">
          <div class="god-comments-list-best" v-if="item.reward_guozi_count > 0">
            <div class="god-best-obtain">
              <div class="post-good-title">
                <i class="iconfont zan-icon icon-general__good"></i>
                优质回复
              </div>
              <div class="post-good-list-left">
                <svg class="icon_size-guozi" aria-hidden="true">
                  <use xlink:href="#icon-guozi"></use>
                </svg>
                +{{item.reward_guozi_count}}
              </div>
            </div>
          </div>

          <div class="god-first-left fll">
            <a :href="'/u/'+item.member_id">
              <img :src="item.avatar ? item.avatar : '/images/new_index/tx_pic.jpg'"
                   class="comment_img" width="100%">
              <img v-if="item.member_type == 1" src="/static/images/member/v.png" class="comment_img_positon">
              <img v-if="item.member_type == 2" src="/static/images/member/staff.png" class="comment_img_positon">
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
                <div class="right-btns">
                  <div class="comment_manage flex">
                    <div v-if="isTabs !=3 " @click="reportAdd(4, item.member_id, matchInfo.matchID, item.cache_key)"
                         class="post-report">举报
                    </div>
                    <div v-else @click="reportIMAdd(item.member_id, item.dynamic_comment_id)"
                         class="post-report">举报
                    </div>
                  </div>
                  <span v-if="isLogin && isTabs == 3">
                    <div class="first-bottom-guanli"
                         v-if="isLogin && isTabs == 3 && matchInfo.bm_node_guozi_reward != 0 && matchInfo.bm_node_close_member != 0 && matchInfo.bm_node_del_comment != 0">
                      <div class="post-management-btn post-management-btn1">管理</div>
                      <div class="post-management-show">
                        <div v-if="matchInfo.bm_node_guozi_reward != 0"
                             @click="awardGuozi(item.nickname,item.member_id,item.dynamic_id,item.reply_id,item.dynamic_comment_id)"
                             class="post-management-list">奖励果子</div>
                        <div v-if="matchInfo.bm_node_close_member != 0"
                             @click="forbidComment(item.nickname,item.member_id,item.dynamic_id)"
                             class="post-management-list">禁言管理</div>
                        <div v-if="matchInfo.bm_node_del_comment != 0"
                             @click="deleteComment(item.dynamic_comment_id, 6)"
                             class="post-management-list">删除评论</div>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div class="god-first-time" v-if="isTabs == 0 || isTabs == 1">
              <p v-if="item.update_time">{{ item.update_time ? '编辑于' : ''}} {{ item.update_time ? item.update_time :
                item.add_time | timestampToDate}}</p>
            </div>
            <div class="god-first-desc">
              <div class="god-desc-cont">
                <!--引用-->
                <div class="comment-quote cl" v-if="item.quote_comment && item.quote_comment.length >0">
                  <div class="quote-title">
                    <span>引用</span>
                    <span class="line"></span>
                    <span><a :href="'/u/' + item.quote_comment[0].member_id || '' " target="_blank">@{{ item.quote_comment[0].nickname || ''}}</a></span>
                  </div>
                  <div class="quote-content" :class="{'show': item.is_show == 0}">
                    <div class="content-text" :class="{'show': item.is_show == 0}">
                      <div>
                        <div v-html="item.quote_comment[0].content_img"></div>
                        <div class="quote-attm" :class="{'hide': item.is_show != 0 }">
                          <!--音频-->
                          <div class="list-items-radio" v-if="item.quote_comment[0].audio_url != ''">
                            <div class="cubeshape">
                              <div class="item-cube items-radio-first flex justify_between align_center">
                                <div class="radio-left"><i class="iconfont radio-icon icon-general__voice"></i><span
                                  class="radio-text">点击收听</span></div>
                                <div class="radio-right">{{ item.quote_comment[0].seconds || '00:00'}}"</div>
                              </div>
                              <div class="item-cube items-radio-second cl" :data-video_id="item.quote_comment[0].audio_url">
                                <audio class="audio-play" :src="item.quote_comment[0].audio_url" preload="auto"></audio>
                              </div>
                            </div>
                          </div>

                          <!--图片-->
                          <div class="img-wrap cl" v-if="item.quote_comment[0].picture && item.quote_comment[0].picture.length > 0 != ''">
                            <div class="img-rows">
                              <img class="img-item fll"
                                   width="90" height="90"
                                   v-for="img in item.quote_comment[0].picture"
                                   :src="img.image_url"
                                   @click="openImg(img.image_url)"/>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div class="quote-toggle-btn" v-if="item.quote_comment[0].content.length > 99 || item.quote_comment[0].audio_url != '' || item.quote_comment[0].picture.length > 0">
                      <div class="more-btn" @click="quoteShow(item.is_show, index)" v-if="item.is_show == 1">展开</div>
                      <div class="hide-btn" @click="quoteShow(item.is_show, index)" v-if="item.is_show == 0">收起</div>
                    </div>

                  </div>


                </div>

                <div class="god-desc-cont_p" v-if="isTabs == '3'" :class="{'del' : item.is_delete == 1}" v-html="item.content_html">评论内容</div>
                <div class="god-desc-cont_p" v-else :class="{'del' : item.is_delete == 1}" v-html="item.content">评论内容</div>
                <!--音频-->
                <div class="list-items-radio" v-if="item.audio_url">
                  <div class="cubeshape">
                    <div class="item-cube items-radio-first flex justify_between align_center">
                      <div class="radio-left"><i class="iconfont radio-icon icon-general__voice"></i><span
                        class="radio-text">点击收听</span></div>
                      <div class="radio-right">{{ item.seconds || '00:00'}}"</div>
                    </div>
                    <div class="item-cube items-radio-second cl" :data-video_id="item.audio_url">
                      <audio class="audio-play" :src="item.audio_url" preload="auto"></audio>
                    </div>
                  </div>
                </div>

              </div>

              <div class="post-good-bottom flex justify_between">
                <div class="comment_floor">
                  <span v-if="isTabs == 3">
                    <span v-if="item.floor == 1">沙发</span>
                    <span v-else-if="item.floor == 2">地板</span>
                    <span v-else>{{item.floor}}楼</span>
                  </span>
                  <span v-if="isTabs == 1">
                   <span class="forecast"
                         :class="{'pink' : parseInt(item.forecast_teamID) == parseInt(matchInfo.teamID_b)}">
                        预测 {{ parseInt(item.forecast_teamID) == parseInt(matchInfo.teamID_a) ? matchInfo.team_a_short_name : matchInfo.team_b_short_name}} 胜
                   </span>

                  </span>
                  <span v-if="isTabs == 0" class="comment-star">
                   <match-star-rate :score="parseInt(item.score)" font-size="14px"
                              :disabled="true"></match-star-rate>
                  </span>
                  <span>
                    <span class="comment_time">{{item.add_time | tsToaGo}}</span>
                  </span>
                </div>
                <div class="post-bottom-right flex ">
                  <!--聊天引用-->
                  <div class="post-good-replay flex align_center"
                       v-if="isTabs == 3"
                       @click="showReplyDialog(0, item.dynamic_id, item.dynamic_comment_id,item.nickname,'', item.content)">
                    <svg class="icon" aria-hidden="true">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink"
                           xlink:href="#icon-quote"></use>
                    </svg>
                    <span class="louzhu-replay-num">引用 </span>
                  </div>
                  <!--聊天回复-->
                  <div class="post-good-replay flex align_center"
                       v-if="isTabs == 3"
                       @click="showReplyDialog(1, item.dynamic_id, item.dynamic_comment_id, item.nickname )">
                    <svg class="icon" aria-hidden="true">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink"
                           xlink:href="#icon-circle__comment"></use>
                    </svg>
                    <span class="louzhu-replay-num"
                          v-if="item.reply">{{item.reply.count > 0 ? item.reply.count : '回复'}}</span>
                  </div>
                  <!--赛评/预测回复-->
                  <span v-else>
                    <div v-if="item.is_delete != 1" class="post-good-replay flex align_center"
                         @click="showForecastReplyDialog(item.member_id, item.cache_key, item.nickname)">
                      <svg class="icon" aria-hidden="true">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink"
                             xlink:href="#icon-circle__comment"></use>
                      </svg>
                      <span class="louzhu-replay-num">{{parseInt(item.comment_count) > 0 ? item.comment_count : '回复'}}</span>
                    </div>
                  </span>

                  <!--聊天点赞-->
                  <div class="post-good-replay post-good-cai flex align_center"
                       :class="{'active' : item.is_praise == 1}"
                       @click="isCommentRaise( item.dynamic_id, item.dynamic_comment_id, item.cache_key, item.is_praise, index)"
                       v-if="isTabs == 3">
                    <svg class="icon icon_hand-top" aria-hidden="true">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink"
                           xlink:href="#icon-circle__good_white"></use>
                    </svg>
                    <span
                      class="louzhu-replay-num">{{ parseInt(item.praise_count) > 0 ? item.praise_count : '点赞'}}</span>
                  </div>
                  <!--赛评/预测点赞-->
                  <span v-else>
                    <div v-if="item.is_delete != 1"
                         class="post-good-replay post-good-cai flex align_center"
                         :class="{'active' : item.is_praise == 1}"
                         @click="isForecastRaise(item.cache_key, item.is_praise, index)">
                      <svg class="icon icon_hand-top" aria-hidden="true">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink"
                             xlink:href="#icon-circle__good_white"></use>
                      </svg>
                      <span class="louzhu-replay-num">{{ parseInt(item.praise_count) > 0 ? item.praise_count : '点赞'}}</span>
                    </div>
                  </span>

                </div>
              </div>
            </div>
            <!--回复的回复样式-->


            <!--预测/赛评-->
            <div class="god-first-replay" v-if="item.comment_list && item.comment_list.length > 0">
              <div class="first-replay-content">
                <div class="first-replay-content-list" v-for="commentItem in item.comment_list">

                  <div class="first-replay-user cl">
                    <div class="first-replay-user-left fll">
                      <a target="_blank" :href="'/u/'+commentItem.member_id">
                        <img class="user-left-img"
                             :src="commentItem.avatar ? commentItem.avatar : '/images/new_index/tx_pic.jpg'"
                             :alt="commentItem.nickname"> </a>
                    </div>
                    <div class="first-replay-user-right fll">
                      <a target="_blank" :href="'/u/'+commentItem.member_id">{{commentItem.nickname}}</a>
                    </div>
                    <img class="badge-icon" :src="commentItem.badge_image">
                  </div>
                  <div class="first-replay-html" v-html="commentItem.content"></div>
                  <div class="first-bottom-btn">
                    <div class="first-bottom-btn-left">
                      <div class="first-bottom-clock">{{commentItem.add_time | tsToaGo}}</div>
                      <div @click="reportAdd(5, commentItem.member_id, matchInfo.matchID, commentItem.cache_key)"
                           class="first-bottom-jubao">举报
                      </div>
                      <span v-if="isLogin && isTabs == 3">
                                        <div class="first-bottom-guanli"
                                             v-if="matchInfo.bm_node_guozi_reward != 0 && matchInfo.bm_node_close_member != 0">
                                            <div class="post-management-btn post-management-btn1">管理</div>
                                            <div class="post-management-show">
                                                <div v-if="matchInfo.bm_node_guozi_reward != 0"
                                                     @click="awardGuozi(commentItem.nickname,commentItem.member_id,commentItem.dynamic_id,commentItem.reply_id,commentItem.dynamic_comment_id)"
                                                     class="post-management-list">奖励果子</div>
                                                <div v-if="matchInfo.bm_node_close_member != 0"
                                                     @click="forbidComment(commentItem.nickname,commentItem.member_id,commentItem.dynamic_id)"
                                                     class="post-management-list">禁言管理</div>
                                            </div>
                                        </div>
                                        </span>
                    </div>
                    <div
                      @click="showForecastReplyDialog(commentItem.member_id, item.cache_key, commentItem.nickname, true, commentItem.cache_key)"
                      class="first-bottom-btn-right">回复
                    </div>
                  </div>
                </div>
              </div>


              <div class="replay-replay-open" v-if="item.comment_count - item.comment_list.length > 0"
                   @click="getMoreMatchComments(item.cache_key, item.comment_list[item.comment_list.length - 1].cache_key, index)">
                还有<span class="reply_total_num">{{item.comment_count - item.comment_list.length}}</span>
                条，点击加载
              </div>
            </div>

            <!--聊天-->
            <div class="god-first-replay" v-if="item.reply && item.reply.count > 0">
              <div class="first-replay-content">
                <div class="first-replay-content-list" v-for="replyItem in item.reply.list">
                  <div class="first-replay-user cl">
                    <div class="first-replay-user-left fl">
                      <a target="_blank" :href="'/u/'+replyItem.member_id">
                        <img class="user-left-img"
                             :src="replyItem.avatar ? replyItem.avatar : '/images/new_index/tx_pic.jpg'"
                             :alt="replyItem.nickname">
                      </a>
                    </div>
                    <div class="first-replay-user-right fl">
                      <a target="_blank" :href="'/u/'+replyItem.member_id">{{replyItem.nickname}}</a>
                    </div>
                    <img class="badge-icon" :src="replyItem.badge_image">
                  </div>aaaaa
                  <div class="first-replay-html" v-html="replyItem.content_html"></div>
                  <div class="first-bottom-btn">
                    <div class="first-bottom-btn-left">
                      <div class="first-bottom-clock">{{replyItem.add_time | tsToaGo}}</div>
                      <div class="first-bottom-jubao"
                           @click="reportIMAdd(replyItem.member_id, replyItem.dynamic_comment_id)">举报
                      </div>
                      <span v-if="isLogin">
                        <div class="first-bottom-guanli"
                             v-if="matchInfo.bm_node_guozi_reward != 0 || matchInfo.bm_node_close_member != 0">
                          <div class="post-management-btn post-management-btn1">管理</div>
                          <div class="post-management-show">
                            <div v-if="matchInfo.bm_node_guozi_reward != 0"
                                 @click="awardGuozi(replyItem.nickname,replyItem.member_id,replyItem.dynamic_id,replyItem.reply_id,replyItem.dynamic_comment_id)"
                                 class="post-management-list">奖励果子</div>
                            <div v-if="matchInfo.bm_node_close_member != 0"
                                 @click="forbidComment(replyItem.nickname,replyItem.member_id,replyItem.dynamic_id)"
                                 class="post-management-list">禁言管理</div>
                          </div>
                        </div>
                      </span>
                    </div>
                    <div
                      @click="showReplyDialog(1, replyItem.dynamic_id, replyItem.reply_id, replyItem.nickname, replyItem.dynamic_comment_id, '', true)"
                      class="first-bottom-btn-right">回复
                    </div>
                  </div>
                </div>

              </div>

              <div class="replay-replay-open" v-if="item.reply.count > 3 && item.reply.count != item.reply.list.length "
                   @click="loadMoreComments(item.dynamic_comment_id, item.reply.list[item.reply.list.length-1].cache_key, index)">
                还有
                <span class="reply_total_num">{{item.reply.count - item.reply.list.length}}</span>条，点击加载
              </div>
            </div>
          </div>
        </div>
        <div class="null" v-if="curCommentList.length < 1">
          <img src="/static/images/no_data.png" width="200" alt="暂无数据">
          <p>暂无内容</p>
        </div>
      </div>
    </div>

    <!--新帖/热帖-->
    <ul class="post-card" v-if="isTabs == 2">
      <li v-for="(item, i) in postList">
        <div class="card_body post_main_body is_hot">
          <div class="card_left fll">
            <p class="num">{{ item.comment_count}}</p>
            <p>参与</p>
          </div>
          <!--{{var noImg = item.picture.length || item.video.length || item.cover_url ? true : false;}}-->
          <div class="card_text fll"
               :class="{'is_img': !item.picture && !item.video && !item.cover_url }">
            <div class="title-wrap cl">
              <p class="title">
                <a :href="item.link_url || '/p/'+item.dynamic_id" target="_blank">{{ item.title
                  }}</a>
                <!--<a :href="item.link_url || '/p/'+item.dynamic_id" target="_blank">{{ cutText(item.title || '', it.isPhone ? noImg ? 38 : 26 : '')}}</a>-->

                <svg class="icon" aria-hidden="true" v-if="item.redPacket_info.length != 0">
                  <use xlink:href="#icon-circle__luckymoney"></use>
                </svg>
                <svg class="icon" aria-hidden="true"
                     v-else-if="item.bet_id != '0' && item.bet_group.length != 0&& item.forward_bet_group.legnth != 0">
                  <use xlink:href="#icon-circle__bet"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-else-if="item.type.indexOf('vote') > 0">
                  <use xlink:href="#icon-circle__vote"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-else-if="item.type.indexOf('sound') > 0">
                  <use xlink:href="#icon-circle__voice"></use>
                </svg>
              </p>

              <svg class="icon" aria-hidden="true" v-if="item.redPacket_info.length != 0">
                <use xlink:href="#icon-circle__luckymoney"></use>
              </svg>
              <svg class="icon" aria-hidden="true"
                   v-else-if="item.bet_id != '0' && item.bet_group.length != 0&& item.forward_bet_group.legnth != 0">
                <use xlink:href="#icon-circle__bet"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-else-if="item.type.indexOf('vote') > 0">
                <use xlink:href="#icon-circle__vote"></use>
              </svg>
              <svg class="icon" aria-hidden="true" v-else-if="item.type.indexOf('sound') > 0">
                <use xlink:href="#icon-circle__voice"></use>
              </svg>
            </div>

            <p class="dec">
              <a :href=" item.link_url || '/p/'+item.dynamic_id" target="_blank">{{
                item.type.indexOf('article') > 0 ? item.content : item.summary}}</a>
            </p>
            <div class="info">
              <label class="avatar">
                <a :href="'/u/' + item.member_id" target="_blank">
                  <img :src="item.avatar ? item.avatar : '/images/index/tx_pic.jpg'" alt="">
                </a>
              </label>
              <label class="nickname">
                <a :href="'/u/' + item.member_id" target="_blank">{{ item.nickname}}</a>
              </label>
              <!--{{? item.badge_image}}-->
              <!--<i class="badeg-icon"><img class="badge-icon" src="{{= item.badge_image}}" alt="{{=item.badge_title}}" title="{{=item.badge_title}}"></i>-->
              <!--{{?}}-->
              <label class="dec" v-if="item.circle_info.length > 0">
                {{item.add_time | tsToaGo}} 发布于
                <a :href="'/c/' + item.circle_info[0].id" target="_blank"> {{ item.circle_info[0].circle_name}}</a>
              </label>
            </div>
          </div>
          <div class="card_right flr" v-if="item.type.indexOf('article') > 0 && item.cover_url">
            <a :href="item.web_link_url || '/p/'+item.dynamic_id" target="_blank">
              <img :src="item.cover_url + '?x-oss-process=image/resize,m_fill,h_64,w_96,limit_0'"
                   alt="">
            </a>
          </div>
          <a :href="item.web_link_url || '/p/'+item.dynamic_id" target="_blank"
             v-else-if="(item.video && item.video.length != 0) || item.video != 0">
            <div class="card_right is_video flr">
              <img
                :src="item.video[0].image_url + '?x-oss-process=image/resize,m_fill,h_64,w_96,limit_0'"
                alt="">
            </div>
          </a>
          <div class="card_right flr" v-else-if="item.picture && item.picture.length > 0">
            <a :href="item.web_link_url || '/p/'+item.dynamic_id" target="_blank">
              <img
                :src="item.picture[0].image_url ? item.picture[0].image_url + '?x-oss-process=image/resize,m_fill,h_64,w_96,limit_0' : '/images/index/tx_pic.jpg'"
                alt="">
              <div class="small_float" v-if="item.picture.length > 1">
                <div class="bj"></div>
                <p>共 {{ item.picture.length}} P</p>
              </div>
            </a>
          </div>
        </div>
      </li>
      <div class="null" v-if="postList.length < 1">
        <img src="/static/images/no_data.png" width="200" alt="暂无数据">
        <p>暂无内容</p>
      </div>
    </ul>

    <!--分页-->
    <div class="footer" :class="{'no': noData}">
      <div class="page-ing fll" v-if="!noData">
        <span class="first" @click="switchPage(1, 'first')" :class="{'in': tabs[isTabs].curPage == 1}">首页</span>
        <span class="prev" @click="switchPage(tabs[isTabs].curPage - 1, 'prev')"
              :class="{'in': tabs[isTabs].curPage == 1}">上一页</span>
        <span v-for="item in tabs[isTabs].sum"
              v-if="(tabs[isTabs].curPage == 1 && item <= 3) ||
                      (tabs[isTabs].curPage > 1 && (item == tabs[isTabs].curPage || item == tabs[isTabs].curPage-1 || item == tabs[isTabs].curPage + 1)) ||
                      tabs[isTabs].curPage == tabs[isTabs].sum && (item == tabs[isTabs].curPage - 1 || item == tabs[isTabs].curPage - 2)"
              :class="{'current-page': item == tabs[isTabs].curPage}" v-text="item" @click="switchPage(item)"></span>
        <span class="next" @click="switchPage(tabs[isTabs].curPage + 1, 'next')"
              :class="{'in': tabs[isTabs].curPage == tabs[isTabs].sum}">下一页</span>
        <span class="last" @click="switchPage(tabs[isTabs].sum, 'last')"
              :class="{'in': tabs[isTabs].curPage == tabs[isTabs].sum}">尾页</span>

        <span class="line">|</span>
        <span class="total">共 {{tabs[isTabs].sum}} 页</span>
        <span class="jump">
                    跳转到<svg class="icon" aria-hidden="true"><use xlink:href="#icon-arrow_blue"></use></svg>
                    <ul>
                        <li v-for="item in tabs[isTabs].sum" :class="{'active': item == tabs[isTabs].curPage}"
                            @click="switchPage(item)">第 {{item}} 页</li>
                    </ul>
                </span>
      </div>
      <div v-if="matchInfo.status == 2 && isTabs == 1"></div>

      <div v-if="tabs[isTabs].name == '预测'" class="btn flr" :class="{'disable' : matchInfo.status != 0}">
        <p v-if="matchInfo.status != 0">{{Object.keys(matchInfo.forecast).length < 1 ? '预测赢果子' : '编辑我的预测'}}</p>
        <p v-else @click="showDialog(isTabs)">{{Object.keys(matchInfo.forecast).length < 1 ? '预测赢果子' : '编辑我的预测'}}</p>
      </div>

      <div v-if="tabs[isTabs].name == '赛评'" class="btn flr" :class="{'disable' : matchInfo.status != 2}">
        <p @click="showDialog(isTabs)">{{Object.keys(matchInfo.comment).length < 1 ? '写赛评' : '编辑我的赛评'}}</p>
      </div>

      <div v-if="tabs[isTabs].name == '话题'" class="btn flr">
        <p @click="showDialog(isTabs)">发话题</p>
      </div>

      <div v-if="tabs[isTabs].name == '聊天'" class="btn flr">
        <p @click="showDialog(isTabs)">回复</p>
      </div>
    </div>


    <!--回复弹窗-->
    <reply-dialog
      :show="isReplyDialog"
      :is-tabs="isTabs"
      :reply-data="replyData"
      @close="closeModal">
    </reply-dialog>
    <!--赛评弹窗-->
    <comment-modal
      :show="isCommentDialog"
      :comment-data="matchInfo.comment"
      @close="closeModal">
    </comment-modal>
    <!--预测弹窗-->
    <forecast-modal
      :show.sync="isForecastDialog"
      :match-info="matchInfo"
      :default-team="forecastDefaultTeam"
      @close="closeModal">
    </forecast-modal>
    <!--举报弹窗-->
    <report-dialog
      :show="isReportDialog"
      :report-data="reportData"
      @close="closeModal">
    </report-dialog>

    <award-dialog
      :show="isAwardDialog"
      :nickname="awardData.nickname"
      :dynamic-id="awardData.dynamicId"
      :dynamic-comment-id="awardData.dynamicCommentId"
      :reply-id="awardData.replyId"
      @on-finish="awardFinish"
      @close="closeModal"></award-dialog>

    <forbid-comment-dialog
      :show="isForbidCommentDialog"
      :nickname="forbidCommentData.nickname"
      :member-id="forbidCommentData.memberId"
      :dynamic-id="forbidCommentData.dynamicId"
      @close="closeModal"></forbid-comment-dialog>


    <post-topic-dialog
      :show="postTopicDialog"
      :match-info="matchInfo"
      @refresh-topic-list="getPost(isSwitch)"
      @close="postTopicDialog=false"></post-topic-dialog>

  </div>
</template>

<script>

  export default {
    name: "match-comments",
    components:{
    },
    data() {
      return {
        matchID: '',  // 传值
        dynamicID: '', // 传值
        // status: 2, // 0:未开始 1:进行中 2:已结束
        comment: {}, // 是否赛评
        forecast: {}, // 是否预测
        tips: {}, // 气泡
        tabs: [   // 评论切换
          {
            id: 0,
            name: '赛评',
            count: 0,
            isSwitch: 1, // 0:最新，1：热门 开关
            sum: 0, // 总分页
            curPage: 1, //当前页

          },
          {
            id: 1,
            name: '预测',
            count: 0,
            isSwitch: 1, // 0:最新，1：热门
            sum: 0, // 总分页
            curPage: 1, //当前页
          },
          {
            id: 2,
            name: '话题',
            isSwitch: 1, // 0:最新，1：热门
            count: 0,
            sum: 0,
            curPage: 1, //当前页
          },
          {
            id: 3,
            name: '聊天',
            count: 0,
            isSwitch: 1,
            sum: 0, //总页数
            curPage: 1, //当前页
          },
        ],
        isTabs: 0, // 切换id值 0:赛评 1:预测 2:话题 3:聊天
        switchs: [
          {
            id: 1,
            name: '热门',
          },
          {
            id: 0,
            name: '最新',
          }
        ],
        isSwitch: 1,  // 0: 热门  1: 最新

        commentStartList: [],  // 预测
        commentEndList: [],  // 赛评
        commentList: [], // 聊天
        curCommentList: [],
        postList: [],  // 话题
        noData: false, // true: 无数据
        // matchInfo: {},

        isReplyDialog: false,  // 回复弹窗展示/隐藏
        isForecastDialog: false, // 预测弹窗展示/隐藏
        forecastDefaultTeam: {},//默认选择的预测对象
        isChatDialog: false, // 话题弹窗展示/隐藏
        isCommentDialog: false, // 赛评弹窗展示/隐藏
        isReportDialog: false, //举报弹窗展示/隐藏
        isAwardDialog: false,  // 奖励弹窗展示/隐藏
        postTopicDialog: false,//发话题弹层展示/隐藏
        awardData: {
          nickname: '',
          memberId: '',
          dynamicId: '',
          dynamicCommentId: '',
          replyId: '',
        },
        isForbidCommentDialog: false,//禁言弹窗展示/隐藏
        forbidCommentData: {
          nickname: '',
          memberId: '',
          dynamicId: '',
        },
        replyData: {}, // 回复弹窗参数
        reportData: {
          broadcast_id: '',  //举报对象member_id
          object_id: '',   //举报帖子或评论id,私信举报时为被举报人member_id
          report_type: 2,  //举报类型： 1帖子 2 评论 3私信
        },

        starNum: 5,  //评分星级
        starScore: 0, //得分
      }
    },
    props:{
      matchInfo:{
        type:Object,
        default:function () {
          return {};
        }
      },

    },
    filters: {
      // 相对时间 转化--前
      fmtTimeData(time) {
        // var result;
        // var minute = 1000 * 60;
        // var hour = minute * 60;
        // var day = hour * 24;
        // var halfamonth = day * 15;
        // var month = day * 30;
        // var now = new Date().getTime();
        // var diffValue = now - time * 1000;
        //
        // if (diffValue < 0) return;
        //
        // var monthC = diffValue / month;
        // var dayC = diffValue / day;
        // var hourC = diffValue / hour;
        // var minC = diffValue / minute;
        // if (monthC >= 1) {
        //   if (monthC <= 12)
        //     result = "" + parseInt(monthC) + "月前";
        //   else {
        //     result = "" + parseInt(monthC / 12) + "年前";
        //   }
        // } else if (dayC >= 1) {
        //   result = "" + parseInt(dayC) + "天前";
        // }
        // else if (hourC >= 1) {
        //   result = "" + parseInt(hourC) + "小时前";
        // }
        // else if (minC >= 1) {
        //   result = "" + parseInt(minC) + "分钟前";
        // } else {
        //   result = "刚刚";
        // }
        // return result;
        //700吴嘉玲修改
        var date = new Date(time * 1000);
        var time_stamp = parseInt(time) * 1000;//数据时间戳
        var time_now = new Date().getTime();//当前时间戳
        var time_leave = (time_now - time_stamp) / (60 * 1000);//时间戳的差值
        var time_string = '';
        var y_now = new Date().getFullYear().toString().substring(2, 4);
        var y = date.getFullYear().toString().substring(2, 4);
        var m = "0" + (date.getMonth() + 1);
        var d = "0" + date.getDate();
        if (time_leave < 1) {
          time_string = '刚刚';
        } else if (time_leave < 60) {
          time_string = Math.floor(time_leave) + '分钟前';
        } else if (time_leave < (60 * 24)) {
          time_string = Math.floor(time_leave / 60) + '小时前';
        } else if (time_leave < (60 * 24 * 2)) {
          time_string = '昨天';
        } else if (y != y_now) {
          time_string = y + '年' + m.substring(m.length - 2, m.length) + '月' + d.substring(d.length - 2, d.length) + '日';
        } else {
          time_string = m.substring(m.length - 2, m.length) + '月' + d.substring(d.length - 2, d.length) + '日';
        }
        return time_string;
      },
    },
    computed: {
      isLogin(){
        if(this.$store.state.modules.login.f_token){
          return true;
        }else{
          return false;
        }
      }
    },
    mounted() {
      this.matchID = this.matchInfo.matchID;
      this.dynamicID = this.matchInfo.dynamic_id;
      // console.log(this.matchInfo);
      // console.log('=====================')
      // console.log(this.dynamicID)
      // console.log('33333333333333333333');
      // 默认显示哪个列表
      this.isTabs = this.matchInfo.status == 2 ? 0 : 1;
      // this.getMatchComments(this.isTabs);
      // 赋值气泡数
      this.tabs[0].count = this.tips.match_comment_count = this.matchInfo.match_comment_count;
      this.tabs[1].count = this.tips.match_forecast_count = this.matchInfo.match_forecast_count;
      this.tabs[2].count = this.tips.topic_count = this.matchInfo.topic_count;
    },
    watch: {
      matchInfo(newVal, oldVal){
        console.log('---------------------')
        this.dynamicID = newVal.dynamic_id;
        this.matchID = this.matchInfo.matchID;
        // this.dynamicID = '7493';  // 7561 表情  7493 第二页表情   7536 语音  7544 有引用  7195 图片+表情  5705 一级回复音频
        this.comment = newVal.comment;
        this.forecast = newVal.forecast;

        // 赋值气泡数
        this.tabs[0].count = this.tips.match_comment_count = newVal.match_comment_count;
        this.tabs[1].count = this.tips.match_forecast_count = newVal.match_forecast_count;
        this.tabs[2].count = this.tips.topic_count = newVal.topic_count;


        console.log('newVal.status='+newVal.status);
        // 获取赛评/预测列表
        this.isTabs = newVal.status == 2 ? 0 : 1;
        // this.getMatchComments(this.isTabs);
      },
      commentList:{
        handler(newVal, oldVal){
        },
        deep: true,
      }
    },
    methods: {
      //管理，奖励果子
      awardGuozi(nickname, memberId, dynamicId, replyId, dynamicCommentId) {

        this.isAwardDialog = true;
        this.awardData.nickname = nickname;
        this.awardData.memberId = memberId;

        this.awardData.dynamicId = dynamicId;
        this.awardData.replyId = replyId;
        this.awardData.dynamicCommentId = dynamicCommentId;
      },
      //奖励果子操作回调
      awardFinish(e) {
        if (e) {
          this.getDynamicComments(this.isTabs);
        }
      },
      //管理，禁言用户
      forbidComment(nickname, memberId, dynamicId) {
        this.isForbidCommentDialog = true;
        this.forbidCommentData.nickname = nickname;
        this.forbidCommentData.memberId = memberId;
        this.forbidCommentData.dynamicId = dynamicId;
      },
      //删除评论
      deleteComment(dynamic_id, deal_type) {
        var params = {
          dynamic_id: dynamic_id, //动态id
          deal_type: deal_type, //
        };

        if (!confirm('确认要删除该评论吗?')) {
          return false;
        };

        this.$api.bar.bmDeal().then((res)=>{
          if (res.code == 200) {
            this.$Message.success(res.message);
            this.getDynamicComments(this.isTabs);
          }else{
            this.$Message.success(res.message);
          }
        });
      },
      /**
       * 获取赛评/预测列表
       * @param
       * @returns
       */
      getMatchComments(tab, isSwitch){
        console.log(tab)
        let params = {
          matchID: this.matchID, //动态id
          page: this.tabs[this.isTabs].curPage,
          type: this.tabs[this.isTabs].isSwitch,
          type2: this.isTabs == 0 ? 1 : 0,
        };
        console.log('============预测===========');
        console.log(params);
        var _this = this;

        this.$api.match.getMatchForecastList({params}).then((res)=> {
//          console.log('success res=');
//          console.log(res.data);

          _this.isTabs == 0 ? _this.commentEndList = res.data.list : _this.commentStartList = res.data.list;
          _this.isTabs == 0 ? _this.tabs[_this.isTabs].sum = _this.mountPage(res.data.count) : _this.tabs[_this.isTabs].sum = _this.mountPage(res.data.count);

          // 赋值给当前数组 (预测 - 赛评)
          _this.curCommentList = _this.isTabs == 0 ? _this.commentEndList : _this.commentStartList;

          // 无数据展示
          _this.funcNoData(_this.curCommentList.length, res.data.list.length, isSwitch);
        });
      },
      /**
       * 获取评论
       * @param parent_cache_key 第一层回复的cache_key
       * @param last_cache_key 分页用
       * @returns
       */
      getMoreMatchComments(parent_cache_key,last_cache_key){
        let params = {
          matchID: this.matchID, //动态id
          parent_cache_key: parent_cache_key,
          last_cache_key: last_cache_key
        };
        console.log('============预测获取评论的评论追加===========');
        console.log(params);
        var _this = this;

        this.$api.match.getForecastCommentList({params}).then((res)=> {
//          console.log('success res=');
//          console.log(_this.curCommentList[0].comment_list);

         _this.curCommentList[0].comment_list = _this.curCommentList[0].comment_list .concat(res.data.list);
        });

      },
      /**
       * 获取聊天列表
       * @param
       * @returns
       */
      getDynamicComments(tab, isSwitch){
        // 0: 热门  1: 最新
        var _this = this;
        var apiPath = _this.tabs[_this.isTabs].isSwitch == 1 ?
          'services/dynamic/dynamic_comment_all_hot_list.php' :
          '/services/dynamic/dynamic_comment_list.php';

        if(this.tabs[this.isTabs].isSwitch == 1){
          // 热门 参数
          let params = {
            dynamic_id: this.dynamicID, //动态id
            page: this.tabs[this.isTabs].page,  //上一页的最后一个key
            comment_sort: 1, // 1倒序 0正序 默认倒序
            limit: 20,
          };
          this.$api.comment.hotsList({params}).then((res)=>{
            if (res.code == 200) {
              // 赋值给当前数组 (聊天)
              var list = res.data.list || [];
              this.commentList = list;
              console.log(this.commentList)

              this.curCommentList = this.commentList;
              this.tabs[_this.isTabs].sum = this.mountPage(res.data.count);

              // 无数据展示
              this.funcNoData(this.curCommentList.length, res.data.list.length, isSwitch);
            } else {
              this.$Message.error(res.message);
            }
          })
        }else{
          // 最新 参数
          let params = {
            dynamic_id: this.dynamicID, //动态id
            page: this.tabs[this.isTabs].page,   //WEB:页码
            limit: 20,
            landlord_only: 0,  // 只看楼主（0表示显示所有，1表示只显示楼主，默认为0显示所有）
            order_switch: 1, // 正序倒序切换(0表示正序，1表示倒序，默认为0正序)
          };
          this.$api.comment.list({params}).then((res)=>{
            if (res.code == 200) {
              // 赋值给当前数组 (聊天)
              var list = res.data.list || [];
              this.commentList = list;
              console.log(this.commentList)

              this.curCommentList = this.commentList;
              this.tabs[_this.isTabs].sum = this.mountPage(res.data.count);

              // 无数据展示
              this.funcNoData(this.curCommentList.length, res.data.list.length, isSwitch);
            } else {
              this.$Message.error(res.message);
            }
          })
        }


      },

      /**
       * 获取新帖/热帖列表
       * @param
       * @returns
       */
      getPost(isSwitch){
        var _this = this;
        var params = {
          matchID: _this.matchID,
          page: _this.tabs[_this.isTabs].curPage,
          type: _this.tabs[_this.isTabs].isSwitch
        };

        this.$api.match.getMatchTopicList({params}).then((res)=> {
//          console.log('success res=');
//          console.log(res.data);
          if (res.code == 200) {
            _this.postList = res.data.list;
            _this.tabs[_this.isTabs].sum = _this.mountPage(res.data.count ? res.data.count : res.data.list.length);

            // 无数据展示
            _this.funcNoData(_this.postList.length, res.data.list.length, isSwitch);
          } else {
            this.$Message.error(res.message, 'tip1');
          }

        });
      },
      // 无数据统一处理
      funcNoData(curListLen, listLen, isSwitch){
        // 无数据展示
        if (curListLen == 0 && listLen == 0 ){

          // 热门无数据，再次调用最新数据
          if (this.isSwitch == 1 && !isSwitch) {
            this.tabs[this.isTabs].isSwitch = 0;
            this.isSwitch = 0;

            // 初次调用-热门无数据，请求最新
            switch(this.isTabs)
            {
              case 2:
                this.getPost();
                break;
              case 3:
                this.getDynamicComments(this.isTabs);
                break;
              default:
                this.getMatchComments(this.isTabs);
                break;
            }
          } else {
            this.noData = true;
          }
        } else {
          this.noData = false;
        }
      },
      // 导航切换
      funcTabs(index){
        console.log('导航切换='+index)
        this.isTabs = index;
        this.noData = false;   // 切换数据初始化
        this.isSwitch = this.tabs[index].isSwitch; // 热门/最新初始化

        // 判断当前tab是否有数据， 有则直接展示， 没有调用接口
        switch(this.isTabs)
        {
          case 0:
            this.commentEndList && this.commentEndList.length == 0 ? this.getMatchComments(this.isTabs) : this.curCommentList = this.commentEndList;
            break;
          case 1:
            this.commentStartList && this.commentStartList.length == 0 ? this.getMatchComments(this.isTabs) : this.curCommentList = this.commentStartList;
            break;
          case 2:
            if (this.postList && this.postList.length == 0) this.getPost();
            break;
          case 3:
            this.commentList && this.commentList.length == 0 ? this.getDynamicComments(this.isTabs) : this.curCommentList = this.commentList;
            break;
        }

      },
      // 开关切换
      funcSwitchs(index){
        this.isSwitch = index;
        this.tabs[this.isTabs].isSwitch = index;
        this.tabs[this.isTabs].curPage = 1;

        switch(this.isTabs)
        {
          case 2:
            this.getPost(index);
            break;
          case 3:
            this.getDynamicComments(this.isTabs, index);
            break;
          default:
            this.getMatchComments(this.isTabs, index);
            break;
        }
      },
      // 根据tab切换弹窗
      showDialog(isTabs) {
        if (!this.$getLoginStatus()) {
          store.commit("modules/login/setLoginModal", true);
          return;
        }

        if (isTabs == 0) {
          if (this.matchInfo.comment.is_delete == 1) {
            this.$Message.warning('该赛评因违规而被删除，不允许编辑！');
            return false;
          }
          ;
          this.isCommentDialog = true;
        } else if (isTabs == 1) {
          if (this.matchInfo.forecast.is_delete == 1) {
            this.$Message.warning('该预测因违规而被删除，不允许编辑！');
            return false;
          };
          this.forecastDefaultTeam = this.matchInfo.forecast;
          this.isForecastDialog = true;
        } else if (isTabs == 2) {
          this.postTopicDialog = true;
        } else if (isTabs == 3) {
          // this.isReplyDialog = true;
          //判断是否通过考试
          alert('判断是否通过考试');
          //if (!components.renderClubTestDialog(isStandard)) return;
          this.showReplyDialog(1, this.dynamicID);
        }
      },
      // 聊天评论回复 type 0:引用  1:聊天
      showReplyDialog(type, dynamic_id, reply_id, nickname, reply_reply_id, quote_content, is_reply_reply) {
        console.log(type, dynamic_id, reply_id, nickname, reply_reply_id, quote_content, is_reply_reply);
        if (!this.$getLoginStatus()) {
          store.commit("modules/login/setLoginModal", true);
          return;
        }
        //判断是否通过考试
        alert('判断是否通过考试');
        // if (!components.renderClubTestDialog(isStandard)) return;

        let replyData = {
          type: type,
          nickname: nickname, //昵称
          dynamic_id: dynamic_id, //动态id
          content_html: '', //回复内容
        };
        if (type == 0) {
          replyData.quote_comment_id = reply_id  //引用回复id
          replyData.quote_content = quote_content; // 引用内容
        } else {
          replyData.reply_id = reply_id;   //回复id
          replyData.reply_reply_id = reply_reply_id; //回复的回复id
        }
        if (is_reply_reply) replyData.is_reply_reply = is_reply_reply;
        this.replyData = replyData;
        console.log(this.replyData);
        this.isReplyDialog = true;
        // this.replyData.nickname = nickname;
        // this.replyData.dynamic_id = dynamic_id;
        // this.replyData.dynamic_comment_id = dynamic_comment_id;
        // this.replyData.reply_reply_id = reply_reply_id;

      },
      // 赛评/预测评论回复   is_reply_reply  是否二级回复按钮
      showForecastReplyDialog(member_id, cache_key, nickname, is_reply_reply, reply_cache_key) {
        if (!this.$getLoginStatus()) {
          store.commit("modules/login/setLoginModal", true);
          return;
        }

        let forecastReplyData = {
          parent_cache_key: cache_key, // cache_key 二级回复是父级的cache_key
          // member_id: member_id,  // 被回复的member_id
          matchID: this.matchID, // 赛事ID
          content: '',
          nickname: nickname,
        };

        if (is_reply_reply) forecastReplyData.is_reply_reply = is_reply_reply;
        if (reply_cache_key)  forecastReplyData.reply_cache_key = reply_cache_key;
        this.replyData = forecastReplyData;
        this.isReplyDialog = true;
      },
      // 裁剪文本
      cutText(val, num) {
        var text = val != null && typeof val === 'string' ? val : '',
          num = num != null && typeof num === 'number' ? num : 999;
        if (text != '' && text.length > num) {
          text = text.slice(0, num) + '...';
        }
        return text;
      },
      // 分页初始化
      getInit(page) {
        //页面初始化函数
        this.tabs[this.isTabs].page = page;

        switch (this.isTabs) {
          case 2:
            this.getPost();
            break;
          case 3:
            this.getDynamicComments(this.isTabs);
            break;
          default:
            this.getMatchComments(this.isTabs);
            break;
        }
      },
      // 分页切换
      switchPage(page, btn) {
        if (page < 1) {
          page = 1;
        } else if (page > this.tabs[this.isTabs].sum) {
          page = this.tabs[this.isTabs].sum;
        }

        if (this.tabs[this.isTabs].curPage == page) {
          return;
        }
        this.tabs[this.isTabs].curPage = page;

        this.getInit(page);
      },
      // 分页总数
      mountPage(num) {
        // 后端给的固定limit 20
        var sum = Math.ceil(num / 20);
        return sum;
      },
      // 子组件返回值
      closeModal(e) {
        if (e.hide == true) {
          if (this.isTabs == 0) this.isCommentDialog = false;  //赛评
          if (this.isTabs == 1) this.isForecastDialog = false;  //预测
          if (this.isTabs == 2) this.isChatDialog = false;  //话题

          this.isReplyDialog = false;  //聊天
          this.isReportDialog = false; // 举报
          this.isAwardDialog = false; // 奖励
          this.isForbidCommentDialog = false; // 禁言
        }
        if (e.success) {   //  success: true   更新数据
          this.getInit(this.tabs[this.isTabs].page);

        }
      },
      /**
       * 举报弹层
       * @param
       * broadcast_id 举报对象member_id
       * object_id 举报帖子或评论id,私信举报时为被举报人member_id
       * report_type 举报类型： 1帖子 2 评论 3私信 4赛评
       */
      reportAdd(report_type, broadcast_id, match_id, cache_key) {
        console.log('report_type = ' + report_type);
        if (!this.$getLoginStatus()) {
          store.commit("modules/login/setLoginModal", true);
          return;
        }

        this.reportData.report_type = report_type;
        this.reportData.broadcast_id = broadcast_id;
        this.reportData.object_id = match_id;
        this.reportData.cache_key = cache_key;
        this.isReportDialog = true;
      },
      /**
       * 聊天举报弹层
       * @param
       * broadcast_id 举报对象member_id
       * object_id  帖子评论 dynamic_comment_id
       */
      reportIMAdd(broadcast_id, dynamic_comment_id) {
        if (!this.$getLoginStatus()) {
          store.commit("modules/login/setLoginModal", true);
          return;
        }

        this.reportData.report_type = 2;
        this.reportData.broadcast_id = broadcast_id;  //举报的用户ID
        this.reportData.object_id = dynamic_comment_id;
        this.reportData.cache_key = "";
        this.isReportDialog = true;
      },
      /**
       * 评论点赞/取消
       * @param
       * dynamic_comment_id 评论id
       * dynamic_id 动态id
       * comment_cache_key 评论的cache_key
       */
      isCommentRaise(dynamic_id, dynamic_comment_id, comment_cache_key, is_praise, index) {
        // 根据isTabs判断 赛评/预测/聊天
        if (!this.$getLoginStatus()) {
          store.commit("modules/login/setLoginModal", true);
          return;
        }

        let params = {
          // member_id: member_id,
          dynamic_id: dynamic_id,
          dynamic_comment_id: dynamic_comment_id,
          comment_cache_key: comment_cache_key
        };

        if(parseInt(is_praise) == 0 || !is_praise){
          this.$api.dynamic.praise({params}).then((res)=>{
            if (res.code == 200) {
              // 改变当前数据
              this.curCommentList[index].is_praise = parseInt(is_praise) == 1 ? '0' : '1';
              this.curCommentList[index].praise_count = parseInt(is_praise) == 1 ? parseInt(this.curCommentList[index].praise_count) - 1 : parseInt(this.curCommentList[index].praise_count) + 1;

              // 变更存储数据
              this.commentList = this.curCommentList;
            }
            this.$Message.info(res.message, 'tip1');
          })
        }else{
          this.$api.dynamic.unPraise({params}).then((res)=>{
            if (res.code == 200) {
              // 改变当前数据
              this.curCommentList[index].is_praise = parseInt(is_praise) == 1 ? '0' : '1';
              this.curCommentList[index].praise_count = parseInt(is_praise) == 1 ? parseInt(this.curCommentList[index].praise_count) - 1 : parseInt(this.curCommentList[index].praise_count) + 1;

              // 变更存储数据
              this.commentList = this.curCommentList;
            }
            this.$Message.info(res.message, 'tip1');
          })
        }
      },
      /**
       * 赛评预测 - 点赞/取消
       * @param
       * matchID 赛事id
       * cache_key
       * type2  0：预测:1：赛评
       */
      isForecastRaise(cache_key, is_praise, index) {
        if (!this.$getLoginStatus()) {
          store.commit("modules/login/setLoginModal", true);
          return;
        }

        let params = {
          matchID: this.matchID,
          cache_key: cache_key,
          type2: this.isTabs == 0 ? 1 : 0,  //0：预测:1：赛评
        };

        if(parseInt(is_praise) == 0 || !is_praise){
          this.$api.match.setForecastPraise({params}).then((res)=>{
            if (res.code == 200) {
              // 改变当前数据
              this.curCommentList[index].is_praise = parseInt(is_praise) == 1 ? '0' : '1';
              this.curCommentList[index].praise_count = parseInt(is_praise) == 1 ? parseInt(this.curCommentList[index].praise_count) - 1 : parseInt(this.curCommentList[index].praise_count) + 1;

              // 更新存储数据
              if (this.isTabs == 0) {
                this.commentEndList = this.curCommentList;
              } else {
                this.commentStartList = this.curCommentList;
              }
            }
            this.$Message.info(res.message);
          });
        }else{
          this.$api.match.setForecastPraiseCancel({params}).then((res)=>{
            if (res.code == 200) {
              // 改变当前数据
              this.curCommentList[index].is_praise = parseInt(is_praise) == 1 ? '0' : '1';
              this.curCommentList[index].praise_count = parseInt(is_praise) == 1 ? parseInt(this.curCommentList[index].praise_count) - 1 : parseInt(this.curCommentList[index].praise_count) + 1;

              // 更新存储数据
              if (this.isTabs == 0) {
                this.commentEndList = this.curCommentList;
              } else {
                this.commentStartList = this.curCommentList;
              }
            }
            this.$Message.info(res.message);
          });
        }
      },
      // 引用图片
      openImg(img) {
        window.open(img);
      },
      // 聊天加载更多
      loadMoreComments(dynamic_comment_id, last_page_key, index) {
        console.log(dynamic_comment_id, last_page_key, index)
        let params = {
          dynamic_comment_id: dynamic_comment_id, // 动态评论id
          last_page_key: last_page_key, // 上一页的最后一个key
          limit: 5, // 上一页的最后一个key
          comment_sort: 1, // 回复的回复排序 1倒序 0正序 默认倒序
        };

        console.log(params);
        this.$api.dynamic.replyList({params}).then((res)=>{
          console.log('success res=');
          console.log(res.data);
          if (res.code == 200) {
            this.curCommentList[index].reply.list = this.curCommentList[index].reply.list.concat(res.data.list);
            // 赋值给当前tab
            this.commentList = this.curCommentList;
          } else {
            this.$Message.error(res.message);
          }
        })

      },
      // 展开
      quoteShow(status, index) {

        this.curCommentList[index].is_show = status == 1 ? 0 : 1;
        console.log(this.curCommentList);

        // 赋值给分类列表
        this.commentList = this.curCommentList;
      },
    },
  };
</script>

<style lang="stylus" scoped>
  /* 音频部分显示*/
  .list-items-radio{
    cursor pointer
    margin-top: 10px
    width: 328px
    height:60px
    border-radius: 8px;
    .cubeshape {
      width: 100%;
      height: 60px;
      position relative

      .item-cube {
        position: absolute;
        width: 100%
        height: 100%
        background: url("/images/banner/radio.png") no-repeat;
        background-size: 100% 100%
        transition opacity .3s, z-index .3s, visibility .3s;
        &.items-radio-first {
          z-index 1
          visibility visible
          opacity 1
          .radio-left{
            margin:15px 0 0 16px
            .radio-icon{
              font-size: 13px
              color: #fff
            }
            .radio-text{
              margin-top: 16px
              margin-left: 9px
              font-size: 14px;
              color: #FFFFFF;
            }
          }
          .radio-right{
            margin-top: 14px
            margin-right: 20px
            font-size: 14px;
            line-height: 20px
            color: #FFFFFF;
          }
        }
        &.items-radio-second {
          z-index -1
          visibility hidden
          opacity 0
          .items-radio-left {
            margin:15px 0 0 16px
            .icon-player{
              font-size 12px
              color: #fff
            }
          }
          .items-radio-right{}
        }
      }

      &.turn {
        .item-cube {
          &.items-radio-first {
            z-index -1
            visibility hidden
            opacity 0
          }
          &.items-radio-second {
            z-index 1
            visibility visible
            opacity 1
          }
        }
      }

      &.rotate {
        animation: rotate-y 0.3s;
      }
    }

    .audiojs {
      width: 98%
      .scrubber {
        width: 60%
      }
      .reset-play {
        right 21%
      }
    }
  }

  //语音翻转
  @keyframes rotate-y {
    50% {
      transform: scaleY(0);
    }
    100% {
      transform: scaleY(1);
    }
  }

  .post-content-comments {
    background: #fff;
    //margin: 10px 0 60px;
    margin-top: 10px;
    box-shadow: 0 0 0 1px #ebebed;

    /* 音频部分显示*/
    .list-items-radio {
      cursor pointer
      margin-top: 10px
      width: 328px
      height: 60px
      border-radius: 8px;
      .cubeshape {
        width: 100%;
        height: 60px;
        position relative
        .item-cube {
          position: absolute;
          width: 100%
          height: 100%
          background: url("/images/banner/radio.png") no-repeat;
          background-size: 100% 100%
          transition opacity .3s, z-index .3s, visibility .3s;
          &.items-radio-first {
            z-index 1
            visibility visible
            opacity 1
            .radio-left {
              margin: -14px 0 0 16px
              .radio-icon {
                font-size: 13px
                color: #fff
              }
              .radio-text {
                margin-top: 16px
                margin-left: 9px
                font-size: 14px;
                color: #FFFFFF;
              }
            }
            .radio-right {
              margin-top: -14px
              margin-right: 20px
              font-size: 14px;
              line-height: 20px
              color: #FFFFFF;
            }
          }
          &.items-radio-second {
            z-index -1
            visibility hidden
            opacity 0
            .items-radio-left {
              margin: -14px 0 0 16px
              .icon-player {
                font-size 12px
                color: #fff
              }
            }
            .items-radio-right {
            }
          }
        }

        &.turn {
          .item-cube {
            &.items-radio-first {
              z-index -1
              visibility hidden
              opacity 0
            }
            &.items-radio-second {
              z-index 1
              visibility visible
              opacity 1
            }
          }
        }
        &.rotate {
          animation: rotate-y 0.3s;
        }
      }

      .audiojs {
        width: 98%
        .scrubber {
          width: 60%
        }
        .reset-play {
          right 21%
        }
      }
    }


    //切换
    .title-nav {
      border-radius: 2px 2px 0 0;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #F0F1F2;
      overflow hidden

      .tabs {
        padding-left 3px
        display flex
        justify-content space-between

        li {
          padding 0 15px
          color #A8ABB3
          cursor pointer
          position relative

          &.active {
            color #2D2F33
            position relative

            .in {
              position absolute
              bottom 2px
              left 50%
              transform translate( -50%, 0)
              width 14px
              height 2px
              background #0D8DFC

            }
          }

          .tips {
            position absolute
            top 5px
            left 36px
            line-height 12px

            span {
              display inline-block
              background #FF5C69
              border 1px solid #fff
              border-radius 5px
              line-height 10px

              .num {
                border 0
                line-height 10px
                color #fff
                padding 0 1px
                -webkit-transform scale(0.75)
                font-size 12px
                min-width: 10px;
                text-align: center;
                border-radius: 50%;
              }
            }
          }
        }
      }
      .switch {
        //width 94px
        line-height 20px
        margin 10px 14px 0
        border-radius 11px
        background #F7F8FA
        display flex
        justify-content space-between

        label {
          display block
          width 44px
          text-align center
          font-size 13px
          color #A8ABB3
          font-weight normal
          margin 0
          cursor pointer


          &.active {
            color #2D2F33
            cursor default
            position relative

            span {
              position absolute
              left 50%
              top 50%
              transform translate(-50%, -50%)
              box-shadow 0 2px 6px -2px rgba(0,0,0,0.04)
              border 1px solid rgba(0,0,0,0.06)
              width 48px
              height 22px
              border-radius 11px
              background #fff
            }
          }

        }
      }

    }


    //回复引用
    .comment-quote {
      width 100%;
      padding-left 8px;
      padding-bottom 7px;
      border-bottom 1px dotted #EBEBED
      position relative;
      margin-bottom 7px;

      &:before {
        display block
        content: ''
        width: 2px
        height: calc(100% - 16px)
        background #0D8DFC
        position absolute
        top 5px
        left 0
        //border-radius 2px 0 0 2px
      }
      .quote-title {
        font-size 13px
        font-weight 400
        span {
          display inline-block
          vertical-align middle
          line-height 20px
          color #4B9CE3
        }
        a {
          color #4B9CE3
        }
        .line {
          margin 0 6px
          background: rgba(13,141,252,0.16)
          width: 1px
          height: 10px
          line-height normal
        }
      }
      .quote-content {
        color #656973
        font-size 13px
        font-weight 400
        position relative;
        .face-icon {
          height: 16px
          margin-top -3px
        }
        .hide-btn {
          //display none
          height: 18px
          line-height 18px
          color: #4B9CE3
          margin-top -3px
          position absolute
          bottom: 0
          right: 4px
          background: #fff
          padding-left: 8px
          cursor: pointer
        }
        .content-text {
          line-height 20px
          max-height 40px
          word-break break-all
          overflow hidden
          position relative

          &.show {
            max-height none
          }
          .hide-btn {
            position static
            bottom: auto
            right: auto
            text-align right;
          }
          .more-btn {
            width: 40px
            height: 20px
            line-height 20px
            color: #4B9CE3
            position absolute
            bottom: 0
            right: 0
            background: #fff
            padding-left: 6px
            cursor: pointer

            &:after {
              display block
              content: '...'
              height 20px
              line-height 14px
              position absolute
              right: 38px
              bottom: 0
              padding-left: 40px
              background: linear-gradient(to right, rgba(255,255,255, 0), #fff 65%)
              color #999
            }
          }
        }
        .quote-toggle-btn{
          display flex;
          justify-content flex-end;

          .more-btn {
            width: 40px
            height: 20px
            line-height 20px
            color: #4B9CE3
            position absolute
            bottom: 0
            right: 0
            background: #fff
            padding-left: 6px
            cursor: pointer

            &:after {
              display block
              content: '...'
              height 20px
              line-height 14px
              position absolute
              right: 38px
              bottom: 0
              padding-left: 40px
              background: linear-gradient(to right, rgba(255,255,255, 0), #fff 65%)
              color #999
            }
          }
        }
        .list-items-radio {
          margin-top 6px
          height: 52px

          .item-cube {
            background-position center
            background-size 101% 100%

            .radio-left {
              margin -14px 0 0 16px

              .radio-text {
                line-height 18px
              }
            }
          }
        }
        .img-wrap {
          //display none
          width: 100%
          padding-top 8px
          padding-bottom 6px

          &.hide {
            display none
          }

          .img-rows {
            overflow hidden
            +.img-rows {
              margin-top 6px
            }
          }
          .img-item {
            border-radius 4px
            cursor pointer;
            +.img-item {
              margin-left 6px
            }
          }
        }

        &.more {
          .hide-btn {
            display inline-block
          }
          .content-text {
            max-height 100%
            .more-btn {
              display none
            }
          }
          .list-items-radio, .img-wrap {
            display block
          }
        }
      }
    }


    //普通评论
    .ordinary-comments {
      min-height:410px;

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
        .god-top-right {
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
              border: 1px solid rgba(0, 0, 0, 0.04);
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


            .god-first-user {

              .god-first-message {
                display flex
                justify-content space-between
                align-items center

                .first-user-nickname {
                  font-size: 15px;
                  color: #2d2f33;
                  line-height: 22px;
                  font-weight: bold;
                  display flex
                  align-items: center

                  a {
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

                .right-btns{
                  width 100px;
                  display flex;
                  justify-content: flex-end;
                }
                .comment_manage {
                  font-size: 12px;
                  color: #a8abb3;
                  display flex

                  .info_line {
                    display: inline-block;
                    color: #ebebed;
                    margin: 0 12px;
                  }

                  .post-report {
                    cursor: pointer;
                  }
                }

                .first-bottom-guanli {
                  font-size: 12px;
                  color: #a8abb3;
                  display flex
                  cursor: pointer;
                  padding-left: 25px;
                  position: relative;



                  .post-management-btn{
                    &:before {
                      content: "";
                      position: absolute;
                      height: 10px;
                      background: #a8abb3;
                      width: 1px;
                      left: 13px;
                      top: 1px;
                    }
                  }

                  .post-management-show {
                    display: none;
                    z-index: 10;
                    position: absolute;
                    top: 10px;
                    left: -50px;
                    width: 120px;
                    background: #fff;
                    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.03), 0 2px 8px 0 rgba(0, 0, 0, 0.08);
                    border-radius: 4px;

                    .post-management-list {
                      font-size: 14px;
                      color: #2d2f33;
                      padding-left: 13px;
                      cursor: pointer;
                      height: 36px;
                      line-height: 36px;
                      margin: 5px;

                      &:hover {
                        background: #f0f1f2;
                        border-radius: 8px;
                      }
                    }

                  }

                  &:hover {
                    .post-management-show {
                      display inline-block;
                    }
                  }
                }





              }

            }
            .god-first-time {
              margin: 4px 0;

              p {
                font-size 12px
                color #A8ABB3
                line-height 17px

              }
            }
            .god-first-desc {
              .god-desc-cont {
                padding-top: 2px;
                margin-bottom: 8px;

                //回复引用
                .comment-quote {
                  .quote-content {
                    .hide-btn {
                      //background: #fffcf5;
                      background: #fff;
                    }
                    .content-text {
                      .more-btn {
                        background: #fff;
                        &:after {
                          //background: linear-gradient(to right, rgba(255,255,255, 0), #fffcf5 65%);
                          background: linear-gradient(to right, rgba(255,255,255, 0), #fff 65%);
                        }
                      }
                    }
                  }
                }

                .god-desc-cont_p {
                  font-size: 14px;
                  color: #2d2f33;
                  line-height: 20px;
                  overflow: hidden;

                  .face-icon{
                    height: 20px;
                    vertical-align: middle;
                    display: inline-block;
                    margin: 0;
                    margin-top: -2px;
                  }

                  &.del{
                    color:#a8abb3;
                  }

                  img {
                    max-width 100%
                  }
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
                  display flex;
                  align-content center;
                  // 预测
                  .forecast {
                    color #0D8DFC

                    &.pink {
                      color #FF5C69
                    }
                  }
                  // 赛评
                  .comment-star {
                    .iconfont{
                      color:#FFCC60;
                    }
                  }
                  .comment_time {
                    margin-left: 8px;
                  }
                }
                .post-bottom-right {
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

                    &.active {
                      .louzhu-replay-num {
                        color: #0d8dfc;
                      }
                      .icon {
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
            .god-first-replay {
              background: rgba(0, 0, 0, 0.03);
              border-radius: 8px;
              margin-bottom: 8px;

              .first-replay-content-list {
                border-top: 1px solid rgba(0,0,0,0.04);
                &:first-Child {
                  border-top: 0;
                }

                .first-replay-user {
                  padding: 12px 0 0 16px;
                  display: flex;
                  align-items: center;

                  .first-replay-user-left {
                    .user-left-img {
                      border: 1px solid rgba(0, 0, 0, 0.04);
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
                  a {
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
                    display: flex;
                    align-items: center;

                    .first-bottom-jubao {
                      display: none;
                      cursor: pointer;
                      margin-left: 25px;
                      position: relative;

                      &:before {
                        content: "";
                        position: absolute
                        height 10px
                        background: #EBEBED;
                        width: 1px
                        left -12px
                        top: 10px
                      }
                    }
                    .first-bottom-guanli {
                      display: none;
                      cursor: pointer;
                      padding-left: 25px;
                      position: relative;


                      &:before {
                        content: "";
                        position: absolute;
                        height: 10px;
                        background: #ebebed;
                        width: 1px;
                        left: 12px;
                        top: 10px;
                      }

                      .post-management-show {
                        display: none;
                        z-index: 10;
                        position: absolute;
                        top: 30px;
                        left: -50px;
                        width: 120px;
                        background: #fff;
                        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.03), 0 2px 8px 0 rgba(0, 0, 0, 0.08);
                        border-radius: 4px;

                        .post-management-list {
                          font-size: 14px;
                          color: #2d2f33;
                          padding-left: 13px;
                          cursor: pointer;
                          height: 36px;
                          line-height: 36px;
                          margin: 5px;

                          &:hover {
                            background: #f0f1f2;
                            border-radius: 8px;
                          }
                        }

                      }

                      &:hover {
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

                  &:hover {
                    .first-bottom-jubao, .first-bottom-guanli, .first-bottom-btn-right {
                      display inline-block;
                      cursor: pointer;
                    }
                  }
                }

              }

              .replay-replay-open {
                border-top: 1px solid rgba(0, 0, 0, 0.04);
                cursor: pointer;
                height: 32px;
                line-height: 30px;
                color: #a8abb3;
                text-align: center;
              }

            }

          }


          &:last-child {
            border-bottom: 0;
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
          .w-e-text {
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

          &.show {
            max-height none
          }
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
            background: linear-gradient(to right, rgba(255, 255, 255, 0), #f7f8fa 65%);
            color: #999;
          }
        }

      }

    }


    // 热帖/新帖
    .post-card {
      min-height 410px;

      .null{
        width: 30%;
        margin: 20px auto;
        height: 100%;
        display: flex;
        justify-items: center;
        align-items: center;
        flex-wrap: wrap;
        text-align: center;

        p{
          width 100%;
          display block;
          text-align center;
        }
      }

      li {
        height 100px;
        padding: 0 15px;

        &:hover{
          background #f6f7f9
        }

        &:last-child {
          border-bottom 0
        }
      }
      .no_hover {
        &:hover,
        &:active {
          background: none;
        }
      }
    }

    .post_main_body {
      padding: 15px 0;

      >p {
        background: #F0F1F2;
        border-radius: 8px;
        font-size: 12px;
        color: #656973;
        text-align: center;
        line-height: 26px;
        margin-right: 10px;
        padding: 0 10px;
        cursor: pointer;

        &:hover {
          background: #E3E4E6;
        }
        &.active {
          background: #0D8DFC;
          color: #FFFFFF;

          &:hover {
            background: #077EE6;
          }
        }
      }

      .card_left {
        margin: 6px 15px 6px 0;
        width: 60px;
        height: 54px;
        background: #F3F9FF;
        border: 1px solid #D9EDFF;
        border-radius: 12px;
        padding: 8px 0 6px;

        p {
          width: 100%;
          text-align: center;
          line-hight: 18px;
          font-size: 13px;
          color: #0D8DFC;

          &.num {
            font-weight: bold;
            font-size: 18px;
            line-height: 22px;
          }
        }
      }
      .card_text {
        width: calc(100% - 125px);
        .title-wrap {
          width 100%
          .icon {
            display inline-block
            vertical-align -0.2em
            margin-left 2px
            font-size 16px
            width 16px
            height 16px
          }
        }

        &.is_img {
          width: calc(100% - 75px);
        }

        p {
          line-height: 22px;
          height: 22px;
          margin-bottom: 3px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          &.title {
            font-size: 16px;
            font-weight: bold;
            color: #2D2F33;
            display inline-block
            vertical-align middle
            max-width calc(100% - 30px)
            .icon {
              vertical-align -0.15em
              display none
            }
          }
        }
        .dec {
          .biaoqing {
            width: 24px;
            vertical-align: middle;
          }
        }
        .info {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #A8ABB3;
          line-height: 16px;

          label {
            font-size: 12px;
            letter-spacing: 0;
            margin-right: 0;
            color: #A8ABB3;
            border-radius: 0;
            font-weight: normal;
            min-width: auto;
            margin-bottom: 0;

            a {
              color: #A8ABB3;
              &:hover {
                color #4B9CE3;
              }
            }
            &.dec {
              margin-left 5px
              span {
                margin-right 5px
                line-height 20px
              }
              a {
                //&:first-child{
                //  margin-right: 10px;
                //}
                &:last-child {
                  margin-left: 2px;
                }
              }
            }
            &.avatar {
              display: inline-block;
              width: 14px;
              height: 14px;
              position: relative;
              vertical-align: middle;

              a {
                display: block;
                width: 14px;
                height: 14px;
                position: absolute;
                top: 0;
                left: 0;
                border-radius: 50%;
                overflow: hidden;

                img {
                  display: block;
                }
              }
            }
          }
        }
      }

      &.is_hot {
        .card_text {
          width: calc(100% - 195px);

          &.is_img {
            width: 100%;
          }
        }
      }

      .card_right {
        width: 96px;
        height: 64px;
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        background: #444;

        &.is_video {
          &:before {
            content: "";
            width: 30px;
            height: 30px;
            background: url('/images/index/video_icon.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
          }
        }


        .small_float {
          position: absolute;
          bottom: 0;
          right: 0;
          border-top-left-radius: 4px;
          width: 48px;
          height: 18px;
          overflow: hidden;

          .bj {
            position: absolute;
            width: 100%;
            height: 100%;
            background: #000;
            opacity: 0.5;
          }
          p {
            position: absolute;
            line-height: 18px;
            width: 48px;
            text-align: center;
            color: #fff;
            z-index: 9;
            font-size: 11px;

          }
        }
      }
    }

    // 无数据
    .null {
      width: 30%;
      margin: 20px auto;

      p {
        text-align: center;
        line-height: 40px;
        opacity: 0.3;
      }
    }

    .footer {
      padding 16px 20px
      box-shadow 0px -3px 12px -2px rgba(0,0,0,0.04)
      display flex
      justify-content: space-between;

      //overflow hidden
      .page-ing {
        width calc(100% - 122px)
        span {
          display: inline-block;
          margin: 0 3px;
          width: 26px;
          height: 26px;
          line-height: 26px;
          text-align: center;
          color: #636873;
          //background: #fff;
          cursor: pointer;
          //border-radius: 5px;
          &.first, &.last {
            width 30px

            &.in {
              color #999FAD
              cursor default
            }
          }
          &.prev, &.next {
            width 46px

            &.in {
              color #999FAD
              cursor default
            }
          }
          &.line {
            width 10px
            font-size 10px
            color #EBEBED
          }
          &.total {
            width 46px
            font-size 13px
            cursor default
            color #A8ABB3
          }
          &.jump {
            width 78px
            background #F7F8FA
            font-size 12px
            padding 0 10px
            border-radius 6px
            position relative



            svg {
              width 10px
              height 10px
              //font-size 12px
              margin-left 10px
              color #A8ABB3
            }

            ul {
              position absolute
              left 0
              top 26px
              display none
              width 100%
              text-align center
              background #FFFFFF
              box-shadow 0 2px 4px 0 rgba(0,0,0,0.04)
              border-radius 4px
              padding 5px
              z-index 0
              max-height 206px
              overflow-y auto


              li {
                color #2D2F33
                width 100%
                line-height 36px
                font-size 14px
                border-radius 4px
                margin-bottom 2px

                &:last-child {
                  margin-bottom 0
                }

                &:hover {
                  background #F0F1F2
                }
                &.active {
                  color #fff
                  background #0D8DFC
                }


              }
            }
            &:hover {
              svg {
                color #0d8dfc
              }
              ul {
                display block
              }
            }
          }
        }
        span.current-page{
          color: #fff;
          background: #0D8DFC;
          border-radius: 50%;
        }
      }

      .btn {
        border-radius:17px;
        padding 0 16px
        border 1px solid #0D8DFC
        line-height 26px
        color #0D8DFC
        font-size 13px
        cursor pointer

        &.disable{
          border 1px solid #a8abb3
          color #a8abb3;
        }

        &:hover {
          background #EDF7FF
        }
      }

      &.no {
        justify-content: flex-end;
      }
    }

  }
</style>
