<template>
  <div class="piece header-box">
    <div class="share-btn" @click="shareDialogShow=true"><i class="iconfont icon-share-51"></i></div>
    <div class="title">
      <div class="m-info">{{matchInfo.tournament_name }} {{matchInfo.round_name }}</div>
      <div class="m-date">{{matchInfo.start_time_string }} Best of {{matchInfo.game_count }}</div>
    </div>

    <!--战队VS-->
    <div class="team-vs">
      <div class="left-team fll">
        <a :href="'/data/team/' + matchInfo.teamID_a" target="_blank">
          <div class="team-img">
            <img :src="matchInfo.team_a_image_thumb || $score.defaultScoreImg" alt=""/>
          </div>
        </a>
        <div class="np">
          <p class="team-name">
            <a :href="'/data/team/' + matchInfo.teamID_a" target="_blank">{{matchInfo.team_a_short_name || ''}}</a>
          </p>
          <p class="rank" v-if="matchInfo.ranking_a != 0">积分第 {{matchInfo.ranking_a}}</p>
        </div>
      </div>
      <div class="score-wrap cl fll">
        <div class="score-l fll">
          <div class="top-bg"></div>
          <div class="bottom-bg"></div>
          <span class="score" :class="{'t-win': matchInfo.status != '0' && (parseInt(matchInfo.team_a_win || 0) > parseInt(matchInfo.team_b_win || 0))}">{{matchInfo.status != '0' ? matchInfo.team_a_win || '' : '-'}}</span>
        </div>
        <div class="score-r flr">
          <div class="top-bg"></div>
          <div class="bottom-bg"></div>
          <span class="score" :class="{'t-win': matchInfo.status != '0' && (parseInt(matchInfo.team_b_win || 0) > parseInt(matchInfo.team_a_win || 0))}">{{matchInfo.status != '0' ? matchInfo.team_b_win || '' : '-'}}</span>
        </div>
      </div>
      <div class="right-team flr">
        <div class="np">
          <p class="team-name">
            <a :href="'/data/team/' + matchInfo.teamID_b" target="_blank">{{matchInfo.team_b_short_name || ''}}</a>
          </p>
          <p class="rank" v-if="matchInfo.ranking_b != 0">积分第 {{matchInfo.ranking_b}}</p>
        </div>
        <a :href="'/data/team/' + matchInfo.teamID_b" target="_blank">
          <div class="team-img">
            <img :src="matchInfo.team_b_image_thumb || $score.defaultScoreImg" alt=""/>
          </div>
        </a>
      </div>
    </div>

    <!--购票想看比赛复盘-->
    <div class="link-wrap">
      <div class="link-btn ticket-btn" v-if="matchInfo.status == '0' && matchInfo.buy_ticket_list.length > 0 && matchInfo.buy_ticket_list.length > 1">
        购票
        <div class="ticket" v-if="matchInfo.buy_ticket_list && matchInfo.buy_ticket_list.length>0">
          <div class="ticket-channel-list" v-for="it in matchInfo.buy_ticket_list" @click="buyTickets(it)">
            <span><img :src="it.image_url"></span>
            <span class="ticket-title">{{it.name}}</span>
            <span><i class="iconfont icon-export"></i></span>
          </div>
        </div>
      </div>
      <div class="link-btn ticket-btn" v-else-if="matchInfo.status == '0' && matchInfo.buy_ticket_list.length == 1" @click="buyTickets(matchInfo.buy_ticket_list[0])">购票</div>
      <div class="link-btn" v-if="matchInfo.status == '0'" :class="{'live' : matchInfo.is_remind == 1}" @click="subscribe()">{{matchInfo.is_remind == 1 ? '已想看' : '想看'}}</div>

      <div v-if="matchInfo.status == '1'">
        <div class="link-btn room-btn" :class="{live: liveRoomIndex == index}" v-if="item.src" v-for="(item, index) in getLiveRoomList()" @click="toggleLiveRoom(item.src, index)">{{item.name}}</div>
      </div>
      <div v-if="matchInfo.status == '2'">
        <div class="link-btn" @click="showReview(0)">赛前分析</div>
        <div class="link-btn" @click="showReview(2)">比赛复盘</div>
        <div class="link-btn"><a href="#comments">查看赛评</a></div>
      </div>
    </div>

    <!--预测评分-->
    <div class="line-wrap cl" v-if="matchInfo.status != '1'">
      <div class="left-line"></div>
      <div class="tips">
        <p class="t-g" v-if="matchInfo.status == '0'">预测正确可得 3 果子</p>
        <p class="t-p" v-if="matchInfo.status == '0'">{{matchInfo.total_forecast_count}} 位玩家参与预测</p>
        <p class="t-s" v-if="matchInfo.status == '2'">Score 评分</p>
      </div>
      <div class="right-line"></div>
    </div>

    <!--赛前预测-->
    <div class="vote-box cl" v-if="matchInfo.status == '0'">
      <div class="support-btn l-btn fll" :class="{'active' : matchInfo.teamID_a == matchInfo.forecast.forecast_teamID}" @click="forecast(matchInfo.teamID_a)">{{matchInfo.teamID_a == matchInfo.forecast.forecast_teamID ? '已预测' : '预测'}}</div>
      <div class="support-btn r-btn flr" :class="{'active' : matchInfo.teamID_b == matchInfo.forecast.forecast_teamID}" @click="forecast(matchInfo.teamID_b)">{{matchInfo.teamID_b == matchInfo.forecast.forecast_teamID ? '已预测' : '预测'}}</div>
      <div class="mid-wrap">
        <div class="info-bar cl">
          <div class="l-team fll">
            <span>{{matchInfo.team_a_short_name}}</span>
            <span>{{matchInfo.forecast_a_p}}</span>
          </div>
          <div class="r-team flr">
            <span>{{matchInfo.forecast_b_p}}</span>
            <span>{{matchInfo.team_b_short_name}}</span>
          </div>
        </div>
        <div class="compare-bar" v-if="matchInfo.forecast_a_p == matchInfo.forecast_b_p">
          <div class="l-bar fll" :style="{width: '50%'}"></div>
          <div class="r-bar flr" :style="{width: '50%'}"></div>
        </div>
        <div class="compare-bar" :class="{full: matchInfo.forecast_a_p == '100%' || matchInfo.forecast_b_p == '100%'}" v-else>
          <div class="l-bar fll" :style="{width: matchInfo.forecast_a_p}"></div>
          <div class="r-bar flr" :style="{width: matchInfo.forecast_b_p}"></div>
        </div>
      </div>
    </div>
    <!--预测-->
    <div class="my-forecast" v-if="matchInfo.status == '0' && Object.keys(matchInfo.forecast).length > 0">
      <div class="avatar fll"><img :src="member_avatar" alt="" /></div>
      <div class="avatar-info fll">
        <p class="forecast">我已预测
          <span class="team" :class="{'red': matchInfo.forecast.forecast_teamID == matchInfo.teamID_b}">{{matchInfo.forecast.forecast_teamID | getTeamId2Name(matchInfo)}}</span>胜利

          <span class="date" v-if="matchInfo.forecast.update_time != ''">
            {{matchInfo.forecast.update_time !='' ? '编辑于' : ''}}{{matchInfo.forecast.update_time | timestampToDate}}
          </span>
          <span class="date" v-else>{{matchInfo.forecast.add_time | tsToaGo}}</span>

        </p>

        <p class="idea del" v-if="matchInfo.forecast.is_delete == 1">该预测因违规而被删除！</p>
        <p class="idea" v-else :class="{'active' : matchInfo.forecast.content}">
          {{matchInfo.forecast.content ? matchInfo.forecast.content : '我还没有发表看法' | stringEllipsis(44)}}
        </p>

      </div>
      <div class="btn-wrap flr cl">
        <div class="btn edit-btn fll" @click="shareForecastDialog=true"><i class="iconfont icon-share1"></i></div>
        <div class="btn edit-btn fll" @click="forecast(matchInfo.forecast)"><i class="iconfont icon-edit"></i></div>
      </div>
    </div>

    <!--赛后评分-->
    <div class="my-score" v-if="matchInfo.status == '2'">
      <div class="count-score">
        <span class="c-score-text">{{matchInfo.score_average}}</span>
        <div class="count-star">
          <match-star-rate :score="parseFloat(matchInfo.score_average) | starNum" font-size="20px" :disabled="true"></match-star-rate>
        </div>
        <span class="count-people">{{matchInfo.score_count}} 人看过</span>
      </div>
      <div class="star-score">
        <div class="star-list">
          <span class="star">
            <i class="iconfont icon-staron"></i>
            <i class="iconfont icon-staron"></i>
            <i class="iconfont icon-staron"></i>
            <i class="iconfont icon-staron"></i>
            <i class="iconfont icon-staron"></i>
          </span>
          <span class="progress-bar"><div class="progress" :style="'width:'+ matchInfo.score_count_5 +'%'"></div></span>
          <span class="percent">{{matchInfo.score_count_5}}%</span>
        </div>
        <div class="star-list">
          <span class="star">
            <i class="iconfont icon-staron"></i>
            <i class="iconfont icon-staron"></i>
            <i class="iconfont icon-staron"></i>
            <i class="iconfont icon-staron"></i>
            <i class="iconfont icon-staron no"></i>
          </span>
          <span class="progress-bar"><div class="progress" :style="'width:'+ matchInfo.score_count_4 +'%'"></div></span>
          <span class="percent">{{matchInfo.score_count_4}}%</span>
        </div>
        <div class="star-list">
          <span class="star">
            <i class="iconfont icon-staron"></i>
            <i class="iconfont icon-staron"></i>
            <i class="iconfont icon-staron"></i>
            <i class="iconfont icon-staron no"></i>
            <i class="iconfont icon-staron no"></i>
          </span>
          <span class="progress-bar"><div class="progress" :style="'width:'+ matchInfo.score_count_3 +'%'"></div></span>
          <span class="percent">{{matchInfo.score_count_3}}%</span>
        </div>
        <div class="star-list">
          <span class="star">
            <i class="iconfont icon-staron"></i>
            <i class="iconfont icon-staron"></i>
            <i class="iconfont icon-staron no"></i>
            <i class="iconfont icon-staron no"></i>
            <i class="iconfont icon-staron no"></i>
          </span>
          <span class="progress-bar"><div class="progress" :style="'width:'+ matchInfo.score_count_2 +'%'"></div></span>
          <span class="percent">{{matchInfo.score_count_2}}%</span>
        </div>
        <div class="star-list">
          <span class="star">
            <i class="iconfont icon-staron"></i>
            <i class="iconfont icon-staron no"></i>
            <i class="iconfont icon-staron no"></i>
            <i class="iconfont icon-staron no"></i>
            <i class="iconfont icon-staron no"></i>
          </span>
          <span class="progress-bar"><div class="progress" :style="'width:'+ matchInfo.score_count_1 +'%'"></div></span>
          <span class="percent">{{matchInfo.score_count_1}}%</span>
        </div>
      </div>

      <div class="my-score-comm">
        <span v-if="matchInfo.comment && Object.keys(matchInfo.comment).length > 0">
          <div class="t">
            <span class="title">我已看过</span>
            <div class="my-star">
              <match-star-rate :score="matchInfo.comment.score" :disabled="true"></match-star-rate>
            </div>
          </div>

          <div v-if="matchInfo.comment.content != ''" class="c" :class="{'del' : matchInfo.comment.is_delete == 1}">{{matchInfo.comment.is_delete == 1 ? "该预测内容因违规而被删除" : matchInfo.comment.content | stringEllipsis(28)}}</div>
          <div class="c del" v-else>我还没有发表看法</div>

          <div class="b">
            <span>{{matchInfo.comment.update_time ? matchInfo.comment.update_time : matchInfo.comment.add_time | tsToaGo}}</span>
            <span>
              <a href="javascript:;" @click="shareCommentsDialog=true">分享</a>
              <a href="javascript:;" @click="modifyComment()">修改</a>
            </span>
          </div>
        </span>
        <div class="post-score-comment" v-else @click="onComment()">
          <i class="iconfont icon-edit"></i> 写赛评
        </div>
      </div>
    </div>

    <game-list-menu></game-list-menu>

    <subscribe-dialog
      :show="subscribeDialogShow"
      :match-info="matchInfo"
      @close="subscribeDialogShow=false"></subscribe-dialog>

    <share-url :show.sync="shareDialogShow" :share-url="shareDialogUrl"></share-url>

    <forecast-modal :show="forecastModalShow"
                    :match-info="matchInfo"
                    :default-team="forecastDefaultTeam"
                    @close="forecastModalShow = false"></forecast-modal>

    <comment-modal :show="commentModalShow" :match-info="matchInfo" :comment-data="matchInfo.comment" @close="commentModalShow=false"></comment-modal>

    <share-comments :show="shareCommentsDialog" :match-info="matchInfo" @close="shareCommentsDialog=false"></share-comments>
    <share-forecast :show="shareForecastDialog" :match-info="matchInfo" @close="shareForecastDialog=false"></share-forecast>
  </div>
</template>

<script>
  export default {
    name: "header-box",
    components: {},
    props: {
      matchInfo: {
        type: Object,
        default: ()=>{}
      },
      afterGameList: {
        type: Array,
        default: ()=>[]
      }
    },
    data: function () {
      return {
        gameMenuCurrIndex: 0,
        subscribeDialogShow:false,
        shareDialogShow:false,
        shareDialogUrl:'',
        shareForecastDialog:false,
        shareCommentsDialog:false,
        forecastModalShow:false,
        forecastDefaultTeam:'',
        commentModalShow:false,
      };
    },
    watch: {},
    computed: {
      // 赛后局数列表菜单
      afterGameMenu: function () {
        return this.afterGameList.map(function (item, index) {
          return {
            index: index,
            name: 'GAME ' + (index + 1)
          };
        });
      },
    },
    filters:{
      getTeamId2Name(teamId, Obj) {
        if (teamId == Obj.teamID_a) {
          return Obj.team_a_name;
        } else if (teamId == Obj.teamID_b) {
          return Obj.team_b_name;
        } else {
          return '队伍未知';
        }
      },
      starNum:function(val){
        let newScore;
        if(Math.round(val) > parseInt(val)){
          newScore = val;
        }else if(Math.round(val) == parseInt(val)){
          newScore = parseInt(val);
        }
        return newScore;
      },
    },
    mounted() {
//      console.log(this.matchInfo);
      this.shareDialogUrl = window.location.href;
    },
    methods: {
      toggleGame: function (i, resultId) {
        this.gameMenuCurrIndex = i;
        this.$emit('after-change-game-handler', resultId);
      },
      toggleLiveRoom: function (src, i) {
        if (this.liveRoomIndex == i) return;
        this.liveRoomIndex = i;
        this.$emit('change-live-room', src);
      },
      //预测按钮
      forecast(team) {
        //判断是否登录
        if(!this.$getLoginStatus()){return false;}
        if(this.matchInfo.forecast.is_delete == 1){
          global_tips('该预测因违规而被删除，不允许编辑！');
          return false;
        };
        this.forecastModalShow = true;
        this.forecastDefaultTeam = team;
      },
      //写赛评
      onComment(){
        //判断是否登录
        if(!this.$getLoginStatus()){return false;}
        this.commentModalShow = true;
      },
      //修改赛评按钮
      modifyComment(){
        if(this.matchInfo.comment.is_delete == 1){
          global_tips('该赛评因违规而被删除，不允许编辑！');
          return false;
        };
        this.commentModalShow = true
      },
      refreshData() {
        this.$root.eventHub.$emit('refresh-data', true);
      },
      // 购票
      buyTickets(item){
        //https://lpl.qq.com/es/ticket.shtml?iTicketId=35&logo=https://img1.famulei.com/z/554377/p/196/2410403192719.png&name=LPL赛事
        window.open('/redirect?url='+window.btoa(encodeURIComponent(item.jump_url))+'&logo='+window.btoa(encodeURIComponent(item.image_url))+'&name='+encodeURI(item.name));
      },
      /**
       * 想看，预约
       */
      subscribe: function () {
        if(!this.$getLoginStatus()){return false;}
        let params = {
          match_id: this.matchInfo.matchID
        };
        this.$api.match.setMatchRemind({params}).then((res)=> {
          if (res.code == 200) {
            this.$root.$emit('refresh-data', true);
            if (this.matchInfo.is_remind == 1) {
              this.$Message.success(res.message);
            } else {
              this.subscribeDialogShow = true;
            }
          } else {
            this.$Message.error(res.message);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      showReview: function (type) {
        this.$emit('update-review', type);
      },
      getLiveRoomList () {
        var _this = this;
        var nameKey = 'live_video_name',
          srcKey = 'live_video_url';
//        return [
//          {name: '斗鱼', src: 'https://staticlive.douyucdn.cn/common/share/play.swf?room_id=288017'},
//          {name: '虎牙', src: 'https://staticlive.douyucdn.cn/common/share/play.swf?room_id=288016'},
//          {name: 'B站', src: 'https://staticlive.douyucdn.cn/common/share/play.swf?room_id=288018'}
//        ];
        return [1, 2, 3].map(function(v) {
          return {
            name: _this.matchInfo[nameKey + v] || '',
            src: _this.matchInfo[srcKey + v] || ''
          };
        });
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>

  .header-box {
    padding-top 30px
    position relative;

    .share-btn {
      width: 34px;
      height: 34px;
      line-height 31px;
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-radius: 50%;
      text-align center;
      position absolute;
      top: 14px;
      right: 14px;
      cursor pointer;

      i {
        display block
        font-size 22px;
        color: #656973;
      }
    }

    .title {
      text-align center
      .m-info {
        height: 28px;
        font-size: 20px;
        font-weight: 600;
        color: #2D2F33
        line-height: 28px;
      }
      .m-date {
        height: 17px;
        font-size: 14px;
        font-family: 'Industry-Demi';
        font-weight: normal;
        color: #A8ABB3
        line-height: 17px;
        margin-top 4px
      }
    }
    .team-vs {
      width 100%
      overflow hidden
      position relative
      padding 0 18px
      padding-top 19px
      .score-wrap {
        width: 74px
        margin 0 auto
        padding-top 13px
        .score-l,
        .score-r {
          width: 34px
          height: 46px
          overflow hidden
          border-radius 4px
          position relative

          .top-bg {
            width: 100%
            height: 50%
            background #424447
          }
          .bottom-bg {
            width: 100%
            height: 50%
            background #2d2f33
          }
          .score {
            display block
            position absolute
            top 0
            width: 100%
            height: 100%
            text-align center
            line-height 41px
            color #fff
            font-family 'Industry-Bold'
            font-size 26px
            border 1px solid rgba(0, 0, 0, .15)
            &.t-win {
              color #F2DBB3
            }
          }
        }
      }

      .left-team, .right-team {
        display: flex;
        align-items: center;
        justify-content: center;
        width calc((100% - 74px) / 2)
      }
      .left-team {

        .np {
          margin-right 30px
        }
      }
      .right-team {

        .np {
          margin-left 30px
        }
      }
      .team-img {
        background none;

        mid()
        width 72px
        height 72px
        margin 0
      }
      .np {
        mid()
        width: 137px
        text-align center
        margin-top -2px

        p {
          width: 100%
        }
        .team-name {
          height: 24px
          line-height 22px
          font-family 'Industry-Bold'
          font-size 20px
          color $color-gray
          ellipsis()
        }
        .rank {
          height: 18px
          line-height 18px
          font-size 12px;
          color #A8ABB3
        }
        .place {
          font-size 12px
          color $color-gray-2
          &.home {
            color $color-blue
          }
        }
      }
    }

    .link-wrap {
      text-align center
      margin-top 11px
      .room-btn + .room-btn {
        margin-left 10px !important
      }
    }

    .line-wrap {
      width: 100%
      text-align center
      margin-top 19px
      display: flex;
      justify-content: center;
      align-items: center;

      .left-line,
      .right-line {
        display inline-block;

        mid()
        width: 250px
        height: 7px
        background url('/static/images/match/line.png') no-repeat center
        background-size cover
      }
      .right-line {
        transform rotate(180deg)
      }
      .tips {
        display inline-block;

        mid()
        min-width: 100px
        max-width 170px
        margin 0 20px
        text-align center
        p {
          white-space nowrap
        }
        .t-g {
          height: 21px;
          font-size: 15px;
          font-weight: 600;
          color: #2D2F33
          line-height: 21px;
        }
        .t-p {
          height: 17px;
          font-size: 12px;
          font-weight: 500;
          color: #A8ABB3
          line-height: 17px;
        }
        .t-s {
          height: 22px
          line-height 22px
          font-size: 16px;
          font-weight 600
          color #2D2F33
        }
      }
    }

    .vote-box {
      width: 100%
      padding 0 22px
      margin-top 5px
      overflow hidden
      .support-btn {
        width: 50px;
        height: 22px;
        line-height 18px
        text-align center
        border-radius: 4px;
        font-size: 13px;
        font-weight: 600;
        cursor pointer
        &.l-btn {
          border: 2px solid #0D8DFC
          color #0D8DFC

          &.active{
            background #0D8DFC;
            color:#fff;
          }
        }
        &.r-btn {
          border: 2px solid #FF5C69
          color #FF5C69

          &.active{
            background #FF5C69;
            color:#fff;
          }
        }
      }
      .mid-wrap {
        width: 580px
        margin 0 auto
        position relative
        .info-bar {
          width: 100%
          height: 15px
          margin-top -3px
          span {
            font-size: 13px;
            font-family 'Industry-Bold'
          }
          .l-team {
            color: #0D8DFC
          }
          .r-team {
            color: #FF5C69
          }
        }

        .compare-bar {
          width: 100%
          height: 5px
          margin-top 3px
          border-radius 2px
          overflow hidden
          .l-bar {
            height: 100%
            background: linear-gradient(135deg, rgba(13, 126, 255, 1) 0%, rgba(15, 151, 255, 1) 100%);
            border-radius: 2px 0 0 2px;
            position relative;
            &:before {
              display block
              content ''
              width: 1px
              height: 8px
              background #fff
              position absolute
              right 0
              top -1px
              transform rotate(10deg)
            }
          }
          .r-bar {
            height: 100%
            background: linear-gradient(225deg, rgba(255, 76, 106, 1) 0%, rgba(255, 107, 137, 1) 100%);
            border-radius: 0 2px 2px 0
          }
          &.full {
            .l-bar:before {
              display none
            }
          }
        }
      }
    }
    .my-forecast {
      width: 704px;
      height: 60px;
      background: #FAFBFC
      border-radius: 30px;
      padding 10px 16px 0
      margin 13px auto 0
      .avatar-info {
        padding-left 10px
        padding-top 1px
        .forecast {
          height: 20px;
          font-size: 14px;
          font-weight: 600;
          color: #2d2f33;
          line-height: 20px;
          display: flex;
          align-items: center;

          .team {
            color #0D8DFC
            margin 0 5px

            &.red{
              color:#ff5c69;
            }
          }


          .date {
            display inline-block
            color: #A8ABB3
            font-size: 12px;
            margin-left 8px
          }
        }
        .idea {
          display inline-block;
          width 520px;
          height: 17px;
          font-size: 12px;
          font-weight: 400;
          color: #A8ABB3
          line-height: 17px;
          margin-top 1px
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          &.del{
            color: #a8abb3;
          }

          &.active{
            color: #2d2f33;
          }
        }
      }
      .btn-wrap {
        margin-top 8px
        .btn {
          width: 24px
          height: 24px
          text-align center
          overflow hidden
          cursor pointer
          position relative;

          &.edit-btn {
            margin-left 18px
          }
          &.share-btn {
            position initial;
            line-height: initial;
            border: 1px solid transparent;
            border-radius: initial;

            .iconfont {
              color: #2D2F33;
              font-size 24px
            }
          }
        }
        .iconfont {
          font-size 24px
        }
      }
    }

    .my-score {
      width: 100%;
      min-height: 60px;
      padding: 27px 30px 24px 30px;
      display flex;
      justify-content space-between;

      .count-score {
        width 135px;
        height 90px;
        overflow hidden;
        min-height 60px;
        display flex;
        flex-wrap wrap;
        justify-content center;
        border-right: 1px solid rgba(0, 0, 0, 0.06);

        .c-score-text {
          font-size: 40px;
          font-family: D-DINExp-Bold;
          font-weight: bold;
          color: #2d2f33;
          line-height: 32px;
          height: 32px;
          overflow: hidden;
        }
        .count-star {
          height 20px;

          .iconfont {
            color #FFCC60;
          }
        }
        .count-people {
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #2D2F33;
          line-height: 17px;
          height 17px;
        }
      }

      .star-score {
        width 320px;
        padding-left: 10px;

        .star-list {
          margin-bottom 4px;
          display: flex;
          align-items: center;

          .star {

            .iconfont {
              color: #8991A3;
              width 16px;
              height: 16px;
              display: inline-block;
              float: left;

              &.icon-staron{
                color #8991A3;

                &.no{
                  color rgba(137,145,163,0.2);
                }
              }
            }
          }
          .progress-bar {
            width: 150px;
            margin-left: 4px;
            height: 4px;
            background: #F0F1F2;
            border-radius: 2px;

            .progress {
              height: 4px;
              border-radius: 2px;
              background: #8991A3;
              display flex;
            }

          }
          .percent {
            margin-left: 8px;
            font-size: 12px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: #2D2F33;
            line-height: 16px;
          }
        }
      }

      .my-score-comm {
        width: 226px;
        height: 100px;
        padding: 8px 16px;
        background: #F7F8FA;
        border-radius: 6px;

        .post-score-comment {
          width: 110px;
          height: 32px;
          text-align center;
          background: linear-gradient(90deg, #FF5252 0%, #FF7247 100%);
          border-radius: 19px;
          font-size: 14px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: #FFFFFF;
          margin-top: 24px;
          margin-left: 40px;
          cursor pointer;
          display: flex;
          align-items: center;
          justify-content: center;

          .iconfont {
            font-size 22px;
          }
        }

        .t {
          display flex;
          justify-content space-between;

          .title {
            font-size: 14px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: #2D2F33;
            line-height: 20px;
          }
          .my-star {

            .iconfont {
              color #FFCC60;
            }
          }
        }
        .c {
          height: 40px;
          line-height: 20px;
          margin-top: 2px;
          font-size: 13px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #2D2F33;
          overflow hidden;

          &.del{
            color: #a8abb3;
          }
        }
        .b {
          margin-top: 5px;
          display flex;
          justify-content space-between;

          span, a {
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #A8ABB3;
            line-height: 17px;
          }

        }
      }

    }
  }

  .ticket-btn {
    position relative;

    &:hover {
      .ticket {
        display block;
      }
    }
  }

  .ticket {
    display none;
    position: absolute;
    top: 24px;
    left: 0;
    z-index 30;
    width: 280px;
    background: #fff;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08), 0px 0px 0px 1px rgba(0, 0, 0, 0.03);
    border-radius: 4px;

    .ticket-channel-list {
      display: flex;
      justify-content space-between;
      align-items center;
      padding: 18px;
      width: 280px;
      height: 60px;
      background: #FFFFFF;
      border-radius: 0px 0px 4px 4px;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: #2D2F33;
      line-height: 60px;

      .ticket-title {
        text-align left;
        margin-left: 8px;
        flex-grow: 1;
      }
      .iconfont {
        font-size 24px;
      }

      img {
        width 24px;
      }

      &:hover {
        background: #F7F8FA;
      }
    }
  }

</style>
