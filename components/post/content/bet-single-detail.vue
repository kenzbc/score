<template>
  <div>
    <div class="bet-single bet-single-list" v-if="betType=='single'" v-for="detail in dataList">
      <div class="bet-single-top">
        <div class="bet-single-match">
          <div class="match-title">
            <img class="single-match-img" :src="detail.image">
            <div class="single-match-name">{{detail.name}}</div>
            <div class="single-match-status button_blue" v-if="detail.status == 1">竞猜中</div>
            <div class="single-match-status button_gray" v-if="detail.status == 2">已关闭</div>
            <div class="single-match-status button_gray" v-if="detail.status == 3">已结束</div>
            <div class="single-match-status button_green" v-if="detail.status == 4">已结算</div>
            <div class="single-match-status button_green" v-if="detail.status == 5">退款中</div>
            <div class="single-match-status button_gray" v-if="detail.status == 6">已截止</div>
            <div class="single-match-status button_gray" v-if="detail.status == 7">已截止</div>
            <div class="single-match-status button_gray" v-if="detail.status == 8">已截止</div>

          </div>
          <div class="go-bet-center">
            <a target="_blank" class="go-bet-center-a" href="/bet">菠菜中心
              <i class="iconfont go-bet-btn icon-general__arrow"></i>
            </a>
          </div>
        </div>

        <div class="bet-single-team cl">
          <div class="single-team-left fl">
            <p class="single-team-time Industry-Demi">{{detail.match_date}}</p>
            <p class="single-team-Bo Industry-Demi">{{detail.match_date}} BO</p>
            <div class="single-team-line"></div>
          </div>
          <div class="single-team-middle fl">
            <div class="single-team-a fl">
              <p class="single-team-a-name Industry-Demi">{{detail.match_team_a}}</p>
              <img class="single-team-a-logo" :src="detail.team_image_thumb_a" alt="">
            </div>
            <div class="single-team-vs Industry-Demi fl">VS</div>
            <div class="single-team-b fl">
              <img class="single-team-b-logo" :src="detail.team_image_thumb_b" alt="">
              <p class="single-team-b-name Industry-Demi">{{detail.match_team_b}}</p>
            </div>
          </div>
          <div class="single-team-right fr">
            <a :href="'/match?matchID='+detail.match_id+'&status=0'"><div class="single-team-qianzhan">前瞻</div></a>

            <div class="single-team-line"></div>
          </div>
        </div>
      </div>

      <div class="bet-single-vote">
        <div class="single-vote-top cl">
          <div class="single-vote-top-title fl">{{detail.title}}</div>
          <div class="single-vote-top-desc fr">
            <p class="single-vote-num">{{detail.people_num}} 人已投注 {{detail.total_price}} {{detail.bet_end_time_txt}}</p>
            <p class="single-vote-see" onclick="dataContent.bet_single_record(667)"></p>
          </div>
        </div>

        <div class="single-vote-list">

          <div class="single-vote-list-items cl" v-for="item in detail.items">
            <svg class="icon-select" aria-hidden="true">
              <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-general_checkbox_on"></use>
            </svg>
            <div class="vote-items-left fl">{{item.item_name}}</div>
            <div class="vote-items-right fr">赔率：{{item.odds}}</div>
          </div>

        </div>


      </div>

    </div>
  </div>

</template>

<script>
  /**
   * 单个菠菜贴，或转发的单个菠菜贴
   */
  import {oneOf} from "~/utils/assist";

  export default {
    name: "bet-single-detail",
    components: {},
    props:{
      betType:{
        type: String,
        default: 'single',
        validator (value) {
          return oneOf(value, ['single', 'forward']);
        }
      },
      dataList:{
        type: Array,
        default: ()=>[]
      }
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {},
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .bet-single {
    background: #fff;
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 2px;

    .bet-single-top {
      margin-top: 20px;

      .bet-single-match {
        background: #fafafa;
        height: 38px;
        position: relative;
        display flex
        justify-content space-between;

        .match-title{
          display flex;
          align-items center;

          .single-match-img {
              margin: 7px 0 0 14px;
              vertical-align: middle;
              height: 24px;
              width: 24px;
            }
          .single-match-name {
            display: inline-block;
            vertical-align: middle;
            margin: 7px 0 0 10px;
            font-size: 14px;
            color: #2d2f33;
            font-weight: bold;
            line-height: 20px;
          }
          .single-match-status {
            margin: 7px 0 0 6px;
            vertical-align: middle;
            display: inline-block;
            width: 50px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            font-size: 12px;
            background: #a8abb3;
            color: #fff;
            border-radius: 4px;

            &.button_blue {
              background: #0d8dfc;
              color: #fff;
            }
            &.button_orange {
              background: orange;
              color: #fff;
            }
            &.button_green {
              background: #16de9b;
              color: #fff;
            }
            &.button_red {
              background: #ff5c69;
              color: #fff;
            }
            &.button_gray {
              background: #a8abb3;
              color: #fff;
            }


          }

        }


        .go-bet-center {
          cursor: pointer;
          padding-right: 14px;
          padding-top: 12px;

          .go-bet-center-a {
            font-size: 12px;
            color: #a8abb3;

            .icon-general__arrow {
              display: inline-block;
              transform: rotate(-90deg);
              margin-left: 2px;
              vertical-align: middle;
              margin-bottom: 1px;
              font-size: 12px;
              color: #a8abb3;
            }
          }
        }
      }


      .bet-single-team {
        height: 72px;
        box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.04);
        border-bottom: 1px solid #f0f1f2;

        .single-team-left {
          width: 150px;
          margin-top: 17px;
          position: relative;

          .single-team-time {
            font-size: 16px;
            color: #2d2f33;
            text-align: center;
          }
          .single-team-Bo {
            margin-top: 2px;
            font-size: 12px;
            color: #a8abb3;
            text-align: center;
          }
          .single-team-line {
            position: absolute;
            top: 0;
            right: 0;
            height: 36px;
            width: 1px;
            background: #f0f1f2;
          }
        }

        .single-team-middle{
          .single-team-a {
            width: 132px;
            text-align: center;
            margin-top: 16px;

            .single-team-a-name {
              vertical-align: middle;
              display: inline-block;
              font-size: 16px;
              color: #2d2f33;
            }
            .single-team-a-logo {
              vertical-align: middle;
              margin-left: 7px;
              height: 40px;
              width: 40px;
            }
          }
          .single-team-vs {
            margin-top: 22px;
            height: 28px;
            width: 28px;
            background: rgba(0,0,0,0.04);
            border-radius: 50%;
            text-align: center;
            line-height: 28px;
            font-size: 13px;
            color: #656973;
          }
          .single-team-b {
            width: 138px;
            text-align: center;
            margin-top: 16px;

            .single-team-b-logo {
              vertical-align: middle;
              height: 40px;
              width: 40px;
            }
            .single-team-b-name {
              vertical-align: middle;
              display: inline-block;
              font-size: 16px;
              color: #2d2f33;
              margin-left: 7px;
            }
          }
        }

        .single-team-right {
          width: 140px;
          position: relative;

          .single-team-qianzhan {
            margin: 24px 0 0 35px;
            width: 70px;
            height: 26px;
            line-height: 24px;
            border: 1px solid #0d8dfc;
            border-radius: 20px;
            font-size: 13px;
            color: #0d8dfc;
            text-align: center;
          }
          .single-team-line {
            position: absolute;
            top: 17px;
            left: 0;
            height: 36px;
            width: 1px;
            background: #f0f1f2;
          }
        }

      }


    }



    .bet-single-vote{


      .single-vote-top {
        margin: 12px 20px 0 24px;
        display flex;
        justify-content space-between;
        align-items center;

        .single-vote-top-title {
          font-size: 14px;
          color: #2d2f33;
          font-weight: bold;
        }

        .single-vote-top-desc {

          .single-vote-num {
            display: inline-block;
            vertical-align: middle;
            font-size: 12px;
            color: #a8abb
          }
          .single-vote-see {
            margin-left: 5px;
            cursor: pointer;
            display: inline-block;
            vertical-align: middle;
            font-size: 12px;
            color: #a8abb3;
            height: 16px;
            width: 16px;
            background: url(/images/more-dot-icon.svg) no-repeat;
            background-size: 100% 100%;
          }
        }

      }


      .single-vote-list {
        margin: 8px 20px 0;
        padding-bottom: 2px;
        display: flow-root;

        .single-vote-list-items {
          width: 271px;
          height: 34px;
          background: #fff;
          border: 1px solid #ebebed;
          border-radius: 24px;
          margin-bottom: 10px;
          position: relative;

          &:nth-child(2n+1) {
            float: left;
          }
          &:nth-child(2n) {
            float: right;
          }

          .icon-select {
            display: none;
            position: absolute;
            height: 16px;
            width: 16px;
            top: 8px;
            left: 14px;
          }
          .vote-items-left {
            margin-left: 18px;
            line-height: 32px;
            font-size: 14px;
            color: #2d2f33;
          }
          .vote-items-right {
            position: absolute;
            top: -1px;
            right: -1px;
            width: 108px;
            font-size: 14px;
            color: #656973;
            height: 34px;
            line-height: 34px;
            text-align: center;
            background: url(/images/bet/bet-white@2x.png) no-repeat;
            background-size: 100% 100%;
          }
        }

      }

    }


  }


</style>
