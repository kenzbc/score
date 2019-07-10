<template>
  <div>

    <div class="main-bet-group" v-if="betType=='group'" v-for="detail in dataList">
      <div class="list-forward-bet1">
        <div class="forward-bet-left fl">
          <div class="forward-left-top">
            <img class="forward-left-logo" :src="detail.member_avatar ? detail.member_avatar : '/static/images/tx_pic.jpg'" :alt="detail.member_nickname">
            <p class="forward-left-name">{{detail.member_nickname}}</p>
          </div>
          <div class="forward-left-middle">
            <div class="forward-left-title">
              <p class="bet-right-satus button_blue" v-if="detail.status == '0'">竞猜中</p>
              <p class="bet-right-satus button_green" v-if="detail.status == '1'">已结算</p>
              <p class="bet-right-satus button_gray" v-if="detail.status == '2'">已截止</p>

              <p class="forward-left-name">{{detail.title}}</p>
              <p class="forward-left-num">(<span class="forward-left-num-span">{{detail.bet_count}}</span>)</p>
            </div>
            <div class="forward-left-desc">{{detail.content_list_string}}</div>
          </div>
          <div class="forward-left-bottom">
            <p class="forward-left-people">{{detail.member_count}}人已跟单</p>
            <p class="forward-left-time">截止: {{detail.end_time_string}}</p>
          </div>
        </div>
        <div class="forward-bet-right fr">
          <div class="forward-right-ratio">奖金 x{{detail.reward_double}}</div>
          <div class="forward-right-line"></div>
          <div class="forward-right-chart">
            <div class="forward-chart-list circle">
              <i-circle :size="78" :percent="Number(detail.hit_num)" :stroke-width="8" :trail-width="8">
                <span class="demo-Circle-inner" style="font-size:24px">{{detail.hit_num * 100}}%</span>
              </i-circle>
            </div>
            <p class="forward-right-chart-desc">近20场命中率</p>

          </div>
        </div>
      </div>
      <div id="bet_group_id_11634" class="group-betting  cl">
        <div class="group-betting-items fl">
          <div class="group-betting-top cl">
            <p class="betting-top-title fl">比赛会进行几场？</p>
            <p class="betting-top-but fr" onclick="dataContent.dialog_bet_group(7772)">详情</p>
          </div>
          <div class="group-betting-list">
            <svg class="icon-select" aria-hidden="true">
              <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-general_checkbox_on"></use>
            </svg>
            <div class="betting-list-left fl">三场</div>
            <div class="betting-list-right fr">赔率 : 1.28</div>
          </div>
        </div>
        <div class="group-betting-items fl">
          <div class="group-betting-top cl">
            <p class="betting-top-title fl">谁会拿到比赛的胜利？</p>
            <p class="betting-top-but fr" onclick="dataContent.dialog_bet_group(7763)">详情</p>
          </div>
          <div class="group-betting-list">
            <svg class="icon-select" aria-hidden="true">
              <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-general_checkbox_on"></use>
            </svg>
            <div class="betting-list-left fl">IG</div>
            <div class="betting-list-right fr">赔率 : 1.07</div>
          </div>
        </div>
        <div class="group-betting-items fl">
          <div class="group-betting-top cl">
            <p class="betting-top-title fl">谁会拿到比赛的胜利？</p>
            <p class="betting-top-but fr" onclick="dataContent.dialog_bet_group(7764)">详情</p>
          </div>
          <div class="group-betting-list">
            <svg class="icon-select" aria-hidden="true">
              <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-general_checkbox_on"></use>
            </svg>
            <div class="betting-list-left fl">LGD</div>
            <div class="betting-list-right fr">赔率 : 1.83</div>
          </div>
        </div>
        <div class="group-betting-items fl">
          <div class="group-betting-top cl">
            <p class="betting-top-title fl">谁会拿到比赛的胜利？</p>
            <p class="betting-top-but fr" onclick="dataContent.dialog_bet_group(7766)">详情</p>
          </div>
          <div class="group-betting-list">
            <svg class="icon-select" aria-hidden="true">
              <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-general_checkbox_on"></use>
            </svg>
            <div class="betting-list-left fl">EDG</div>
            <div class="betting-list-right fr">赔率 : 1.20</div>
          </div>
        </div>
        <div class="group-betting-items fl">
          <div class="group-betting-top cl">
            <p class="betting-top-title fl">谁会拿到比赛的胜利？</p>
            <p class="betting-top-but fr" onclick="dataContent.dialog_bet_group(7770)">详情</p>
          </div>
          <div class="group-betting-list">
            <svg class="icon-select" aria-hidden="true">
              <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-general_checkbox_on"></use>
            </svg>
            <div class="betting-list-left fl">BLG</div>
            <div class="betting-list-right fr">赔率 : 1.50</div>
          </div>
        </div>
        <div class="group-betting-items fl">
          <div class="group-betting-top cl">
            <p class="betting-top-title fl">TL能否从入围赛突围？</p>
            <p class="betting-top-but fr" onclick="dataContent.dialog_bet_group(7775)">详情</p>
          </div>
          <div class="group-betting-list">
            <svg class="icon-select" aria-hidden="true">
              <use xmlns:xlink="https://www.w3.org/1999/xlink" xlink:href="#icon-general_checkbox_on"></use>
            </svg>
            <div class="betting-list-left fl">能</div>
            <div class="betting-list-right fr">赔率 : 1.17</div>
          </div>
        </div>
      </div>
      <div class="group-betting-follow cl">
        <div class="betting-follow-left fl"></div>
        <div onclick="guessCont(11634)" class="betting-follow-right fr">跟投</div>
      </div>

    </div>

    <div class="main-bet-group" v-if="betType=='forward'" v-for="detail in dataList">
      <div class="list-forward-bet1">
        <div class="forward-bet-left fl">
          <div class="forward-left-top">
            <img class="forward-left-logo" :src="detail.member_avatar ? detail.member_avatar : '/static/images/tx_pic.jpg'" :alt="detail.member_nickname">
            <p class="forward-left-name">{{detail.member_nickname}}</p>
          </div>
          <div class="forward-left-middle">
            <div class="forward-left-title">
              <p class="bet-right-satus button_blue" v-if="detail.status == '0'">竞猜中</p>
              <p class="bet-right-satus button_green" v-if="detail.status == '1'">已结算</p>
              <p class="bet-right-satus button_gray" v-if="detail.status == '2'">已截止</p>

              <p class="forward-left-name">{{detail.title}}</p>
              <p class="forward-left-num">(<span class="forward-left-num-span">{{detail.bet_count}}</span>)</p>
            </div>
            <div class="forward-left-desc">{{detail.content_list_string}}</div>
          </div>
          <div class="forward-left-bottom">
            <p class="forward-left-people">{{detail.member_count}}人已跟单</p>
            <p class="forward-left-time">截止: {{detail.end_time_string}}</p>
          </div>
        </div>
        <div class="forward-bet-right fr">
          <div class="forward-right-ratio">奖金 x{{detail.reward_double}}</div>
          <div class="forward-right-line"></div>
          <div class="forward-right-chart">
            <div class="forward-chart-list circle">
              <i-circle :size="78" :percent="Number(detail.hit_num)" :stroke-width="8" :trail-width="8">
                <span class="demo-Circle-inner" style="font-size:24px">{{detail.hit_num * 100}}%</span>
              </i-circle>
            </div>
            <p class="forward-right-chart-desc">近20场命中率</p>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  /**
   * 组合菠菜贴，或转发的组合菠菜贴
   */
  import {oneOf} from "~/utils/assist";

  export default {
    name: "bet-group-detail",
    components: {},
    props:{
      betType:{
        type: String,
        default: 'group',
        validator (value) {
          return oneOf(value, ['group', 'forward']);
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
  .main-bet-group{
    background: #fff;
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 2px;

    .list-forward-bet1 {
      margin-top: 10px;
      box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.04);
      /*border-bottom: 1px solid #f0f1f2;*/
      height: 156px;
      display flex;
      justify-content space-between;

      .forward-bet-left {
        margin-left: 17px;

        .forward-left-top {
          padding-top: 14px;
          display flex;
          align-items center;

          .forward-left-logo {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            display: inline-block;
            margin initial;
          }

          .forward-left-name {
            margin-left: 8px;
            display: inline-block;
            font-size: 14px;
            color: #a8abb3;
          }
        }
        .forward-left-middle {
          margin-top: 10px;

          .forward-left-title{

            .button_orange {
              background: #0d8dfc;
              color: #fff;
            }

            .bet-right-satus {
              vertical-align: middle;
              width: 50px;
              text-align: center;
              line-height: 17px;
              height: 17px;
              display: inline-block;
              font-size: 12px;
              color: #fff;
              background: #0d8dfc;
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


            .forward-left-name {
              vertical-align: middle;
              margin-left: 3px;
              display: inline-block;
              font-size: 16px;
              color: #2d2f33;
              font-weight: bold;
              max-width: 280px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .forward-left-num {
              vertical-align: middle;
              margin-left: 6px;
              display: inline-block;
              font-size: 16px;
              color: #656973;

              .forward-left-num-span {
                padding: 0 2px;
              }
            }
          }
          .forward-left-desc {
            margin-top: 12px;
            width: 386px;
            font-size: 14px;
            color: #656973;
            line-height: 21px;
            height: 42px;
          }
        }
        .forward-left-bottom {
          margin-top: 10px;

          .forward-left-people {
            display: inline-block;
            font-size: 12px;
            color: #a8abb3;
          }
          .forward-left-time {
            display: inline-block;
            margin-left: 5px;
            font-size: 12px;
            color: #a8abb3;
          }
        }

      }

      .forward-bet-right {
        width: 148px;
        position: relative;

        .forward-right-ratio {
          width: 62px;
          height: 21px;
          line-height: 21px;
          position: absolute;
          top: 0;
          right: 0;
          background-image: linear-gradient(225deg,#f7dd99 0%,#f0cc84 100%);
          border-radius: 0 0 0 4px;
          font-size: 12px;
          color: #fff;
          text-align: center;
        }
        .forward-right-line {
          position: absolute;
          left: 0;
          top: 38px;
          height: 80px;
          width: 1px;
          background: #f0f1f2;
        }
        .forward-right-chart {
          margin-top: 39px;
          margin-left: 36px;
          width: 90px;

          .forward-chart-list {
            height: 78px;
            font-family: 'Industry-Demi';
            font-size: 16px;
            color: #2d2f33;
            font-weight: bold
          }
          .forward-right-chart-desc {
            line-height: 17px;
            margin-top: 10px;
            font-size: 12px;
            color: #a8abb3;
            text-align: center;
          }
        }
      }

    }


    .group-betting{

      .group-betting-items {
        height: 85px;
        width: 50%;
        border-top: 1px solid #f0f1f2;

        &:nth-child(2n+1) {
          border-right: 1px solid #f0f1f2;
        }
        &:nth-child(1) {
           border-top: 0px solid #f0f1f2;
        }

        .group-betting-top {
          margin: 12px 26px 0 24px;

          .betting-top-title {
            font-size: 14px;
            color: #2d2f33;
            font-weight: bold;
          }
          .betting-top-but {
            cursor: pointer;
            font-size: 12px;
            color: #a8abb3;
          }
        }


        .group-betting-list {
          margin: 8px 20px 0;
          background: #fff;
          height: 34px;
          border: 1px solid #ebebed;
          border-radius: 24px;
          position: relative;

          .icon-select {
            display: none;
            position: absolute;
            height: 16px;
            width: 16px;
            top: 8px;
            left: 14px;
          }

          .betting-list-left {
            margin-left: 18px;
            line-height: 32px;
            font-size: 14px;
            color: #2d2f33;
          }
          .betting-list-right {
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


    .group-betting-follow{
      height: 55px;
      border-top: 1px solid #f0f1f2;
      display flex;
      justify-content flex-end

      .betting-follow-left {
        margin: 17px 0 0 24px;
        font-size: 14px;
        color: #656973;
      }

      .betting-follow-right {
        cursor: pointer;
        margin: 10px 20px 0 0;
        width: 120px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        background: #0d8dfc;
        font-size: 14px;
        color: #fff;
        border-radius: 24px;
      }


    }


  }
</style>
