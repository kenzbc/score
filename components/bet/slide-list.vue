<template>
  <!--周榜-->
  <div class="bet-right-padding">
    <!--用户信息-->
    <div class="det-login cl" v-if="!$store.state.modules.login.f_token">
      <div class="fll">您还没有登录！</div>
      <div class="flr"><a href="javascript:;" @click="$store.commit('modules/login/setLoginModal',true)">登录Score</a></div>
    </div>
    <div class="bet-user" v-else-if="userInfo" >
      <div class="bet-img cl">
        <img class="bet-avatar fll" :src="userInfo.avatar ? userInfo.avatar : '/static/images/tx_pic.jpg'" :alt="userInfo.nickname">
        <div class="bet-name fll">
          <a class="bet-nickname" :href="'/u/' + userInfo.member_id">
            {{ userInfo.nickname }}
            <img class="boy" src="/static/images/bet/sex_boy_big.png"  alt="男" v-if="userInfo.sex == 1">
            <img class="girl" src="/static/images/bet/sex_girl_big.png"  alt="女" v-else>
          </a>

          <div class="bet-user-guozi">
            <a class="bet-guozi-a"  href="/account?status=1&bank_status=3" target="_blank">
              <svg class="icon" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg>
              <span class="bet-guozi-span" id="guozi_int">{{ myBank.guozi1 }}</span>
            </a>
          </div>

        </div>
        <div class="bet-today flr">
          <a href="/task">(每日任务赚果子)</a>
        </div>
      </div>
      <div class="bet-record">
        <div class="bet-record-top cl">
          <div class="fll"></div>
          <div class="fll">总战绩</div>
          <div class="flr"></div>
        </div>
        <div class="bet-record-middle cl">

          <div class="bet-record-middle-left fll">
            <p>战绩</p>
            <p>{{ singleRecord.record_ratio ? singleRecord.record_ratio : '0/0' }}</p>
          </div>
          <div class="bet-record-middle-middle fll">
            <p>命中率</p>
            <p>{{ singleRecord.win_num ? singleRecord.win_num : '0' }}</p>
          </div>
          <div class="bet-record-middle-right flr">
            <p>收益</p>
            <p>{{ singleRecord.profit ? singleRecord.profit : '0' }}</p>
          </div>

        </div>
        <div class="bet-record-bottom cl">
          <nuxt-link to="/bet/my">
            <div class="bet-record-bottom-left fll cl">
              <p>
                <i class="iconfont">&#xe6d8;</i>
                <span>竞猜记录</span>
              </p>
            </div>
          </nuxt-link>
          <nuxt-link to="/bet/create">
            <div class="bet-record-bottom-middle fll">
              <p>
                <i class="iconfont">&#xe645;</i>
                <span>创建菠菜组合</span>
              </p>
            </div>
          </nuxt-link>
          <nuxt-link to="/bet/my/1">
            <div class="bet-record-bottom-right flr">
              <p>
                <i class="iconfont">&#xe6bc;</i>
                <span>我的战绩</span>
              </p>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="guide cl">
      <section>
        <div class="guide-left fll"><img src="/static/images/bet/gride.png"/></div>
        <div class="guide-right flr">
          <p>投注指南</p>
          <p>1分钟玩转组合菠菜</p>
        </div>
      </section>
    </div>
    <!--周榜-->
    <div class="bet-ranking">
      <div class="bet-ranking-top cl">
        <ul class="fll cl">
          <li class="fll" :class="{'active': tabsListNavCurr == index }"
              @click="tabsListNav(index)"
              v-for="(item, index) in tabsListNavText">
            {{ item.value }}<br>
            <span class="bet-ranking-top-line" v-if="tabsListNavCurr == index"></span>
          </li>
        </ul>
        <a class="flr" href="/bet/rank">查看更多+</a>
      </div>
      <div class="bet-ranking-middle">
        <ul class="cl">
          <li class="bet-ranking-middle-1 fll">名次</li>
          <li class="bet-ranking-middle-2 fll">用户</li>
          <li class="bet-ranking-middle-3 fll">命中率</li>
          <li class="bet-ranking-middle-4 fll">收益</li>
        </ul>
      </div>

      <div class="bet-ranking-bottom">
        <img class="bet-update" src="/static/images/bet/update.jpg" v-if="!tabsListCurr.list || tabsListCurr.list.length == 0" />
        <ul class="ul-top  cl" v-for="item in tabsListCurr.list" v-else>
          <li class="bet-ranking-bottom-1 fll"><span class="bet_list_top">{{ item.position }}</span></li>
          <li class="bet-ranking-bottom-2 fll"><a :href="'/u/' + item.member_id"><img :src="item.avatar ? item.avatar : '/static/images/tx_pic.jpg'"/><p class="bottom-left">{{ item.nickname }}</p></a></li>
          <li class="bet-ranking-bottom-3 fll">{{ item.win_num }}</li>
          <li class="bet-ranking-bottom-4 fll">
            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg>
            <p>{{ item.profit }}</p>
          </li>
        </ul>

        <ul class="bet-our cl" v-if="$store.state.f_token">
          <li class="bet-ranking-bottom-1 fll" v-if="tabsListCurr.record">
            <span>{{ tabsListCurr.record.position ? tabsListCurr.record.position : '--' }}</span>
          </li>
          <li class="bet-ranking-bottom-2 fll">
            <a :href="'/u/' + memberInfo.member_id"><img :src="memberInfo.avatar ? memberInfo.avatar : '/static/images/tx_pic.jpg'"/></a>
            <p><a :href="'/u/' + memberInfo.member_id">{{ memberInfo.nickname }}</a></p>
          </li>
          <li class="bet-ranking-bottom-3 fll" v-if="tabsListCurr.record">{{ tabsListCurr.record.win_num ? tabsListCurr.record.win_num : 0 }}</li>
          <li class="bet-ranking-bottom-4 fll" v-if="tabsListCurr.record">
            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg>
            <p>{{ tabsListCurr.record.profit ? tabsListCurr.record.profit : 0 }}</p>
          </li>
        </ul>

        <div class="bet-ranking-bottom-time cl">
          <p class="fll" v-if="tabsListCurr.list && tabsListCurr.list.length > 0">{{ tabsListCurr.list[0].period }}</p>
          <p class="flr">本排行每天1点更新</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "slide-list",
    data(){
      return {
        tabsListNavCurr: 0, // 榜单选择
        tabsListNavText: [
          {
            index: 0,
            value: '周榜'
          },
          {
            index: 1,
            value: '月榜'
          },
          {
            index: 2,
            value: '总榜'
          },
        ],
        userInfo: '',  // 个人信息
        tabsListCurr: {}, // 当前榜单
        myBank: {},
      }
    },
    // async asyncData({$axios, app}) {
    //   let [my_bank] = await Promise.all([
    //     app.$api.user.getMyBank()
    //   ]);
    //   return {
    //     myBank: my_bank.data || {}
    //   }
    // },
    props: {
      memberInfo: {
        type: Object,
        default: null
      },
      singleRecord: {
        type: Object,
        default: null
      },
      totalRecord: {
        type: Object,
        default: null
      },
      monthRecord: {
        type: Object,
        default: null
      },
      weekRecord: {
        type: Object,
        default: null
      },
      totalList: {
        type: Array,
        default: null
      },
      monthList: {
        type: Array,
        default: null
      },
      weekList: {
        type: Array,
        default: null
      },
    },
    methods: {
      tabsListNav(index){
        this.tabsListNavCurr = index;
        if (process.client) { // true: 客户端
          if ( index == 0 ) {   // 0: 周榜  1: 月榜  3: 总榜
            this.tabsListCurr.list = this.weekList;
            this.tabsListCurr.record = this.weekRecord;
          } else if ( index == 1 ) {
            this.tabsListCurr.list = this.monthList;
            this.tabsListCurr.record = this.monthRecord;
          } else if ( index == 2 ){
            this.tabsListCurr.list = this.totalList;
            this.tabsListCurr.record = this.totalRecord;
          }
        }
      },
      // 获取我的钱包
      async getMyBank() {
        let res = await this.$api.user.getMyBank();
        console.log(res);
        if (res.code == '200') {
          this.myBank = res.data || {};
        } else {
          this.$Message.warning(res.message);
        }
      },
    },
    mounted(){
      if (this.$store.state.modules.login.f_token) {
        this.userInfo =  JSON.parse(sessionStorage.getItem('userInfo'));
        this.tabsListNav(this.tabsListNavCurr);
        this.getMyBank();
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .bet-right-padding {
    width 100%

    /*用户没有登录*/
    .det-login{
      width: 100%;
      /*border: 1px solid #EBEBEC;*/
      background: url('/static/images/bet/bet_bj1.png') no-repeat;
      background-size: 100% 100%;
      div {

        &:nth-of-type(1){
          padding: 30px 0 30px 30px;
          opacity: 0.96;
          font-family:"微软雅黑" ;
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
        }
        &:nth-of-type(2){
          margin: 22px 30px 22px 0;
          padding: 9px 30px;
          opacity: 0.96;
          font-family:"微软雅黑";
          font-weight: bold;
          font-size: 14px;
          color: #8C6600;
          letter-spacing: 0;
          background: #FFEB79;
          border: 1px solid #FFE23B;
          border-radius: 8px;
          cursor: pointer;
        }
      }
    }

    /*指南*/
    .guide{
      width: 100%;
      margin-top: 10px;
      background: #fff;
      height: 100px;
      cursor: pointer;
      border: 1px solid #EBEBEC;
      margin-bottom: 10px;
      position relative

      section {
        width 170px
        margin 0 auto
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
      }

      .guide-left{
        img{
          width: 47px;
          height: 48px;
        }
      }
      .guide-right{
        p{
          text-align center
          &:nth-of-type(1){
            font-size: 20px;
            line-height: 28px;
            font-weight: bold;
            color: #5f6575;
          }
          &:nth-of-type(2){
            font-size: 13px;
            color: #5f6575;
          }
        }
      }
    }


    /*用户信息*/
    .bet-user{

      border: 1px solid #EBEBEC;

      .bet-img{
        padding: 20px;
        background: url('/static/images/bet/group1.png') no-repeat;
        background-size: 100% 100%;
        width 100%

        .bet-avatar{
          border-radius: 50%;
          width: 70px;
          height: 70px;
        }
        .bet-name{
          padding: 10px 0 0 22px;
        }
        .bet-today{
          font-size: 12px;
          color: #5F6575;
          padding-top: 30px;
          font-family:"微软雅黑" ;
          cursor: pointer;
        }
      }
      .bet-record{
        background: #FFF;

        .bet-record-top{
          padding: 15px 25px 5px 25px;
          width 100%

          div {
            width: 33%;
            &:nth-of-type(1){
              height: 1px;
              background: #EBEBEC;
              margin-top: 10px;
            }
            &:nth-of-type(2){
              text-align: center;
              font-weight:bold;
              font-size: 16px;
              color: #5F6575;
            }
            &:nth-of-type(3){
              height: 1px;
              background: #EBEBEC;
              margin-top: 10px;
            }
          }
        }
        .bet-record-middle{
          padding-top: 23px;
          width: 100%;

          .bet-record-middle-left,
          .bet-record-middle-middle,
          .bet-record-middle-right {
            width: 33.3%;
            text-align: center;

            p {
              &:nth-of-type(1){

                font-size: 14px;
                color: #626368;
              }
              &:nth-of-type(2){
                opacity: 0.96;
                font-size: 22px;
                color: #FF9700;
                padding-top: 3px;
              }
            }
          }


        }
        .bet-record-bottom{
          width: 100%;
          margin-top: 25px;
          padding:16px 0;
          border-top: 1px solid #EBEBEC;

          .bet-record-bottom-left,
          .bet-record-bottom-middle,
          .bet-record-bottom-right {
            width: 33.3%;
            text-align: center;
            cursor: pointer;
            position: relative;

            p {
              height: 33px;
            }
            i{
              font-size: 20px;
            }
            span {
              font-family:"微软雅黑" ;
              font-size: 14px;
              color: #5F6575;
              display: inline-block;
              line-height: 33px;
            }
          }
          .bet-record-bottom-left {
            p {
              i {
                font-size 16px
              }
            }
          }
        }
      }
    }
    .bet-nickname{
      font-size: 16px;

      .boy,
      .girl{
        width 12px
        height 12px
      }
    }
    .bet-user-guozi{
      color: #666;
      font-size: 14px;
      margin-top: 8px;
      height: 14px;

      .bet-guozi-img{
        height: 16px;
        width: 13px;
        vertical-align: middle;
        position: absolute;
        left: 0;
        top: 2px;
      }
      .bet-guozi-span {
        font-size: 12px;
        padding: 0 10px 0 20px;
        line-height: 15px;
        background: #FFEB79;
        border-radius: 6px;
        border: 1px solid #FFDD18;
      }
      .bet-guozi-a {
        color: #8C6600;
        position: relative;

        svg {
          width 16px
          height 16px
          position absolute
          top 50%
          transform translate(0, -50%)
        }
      }
    }

    /*排行榜*/
    .bet-ranking{
      background: #FFFFFF;
      border-top: 1px solid #EBEBEC;
      margin-top: 10px;
      margin-bottom: 10px;

      .bet-ranking-top{
        width 100%
        padding: 15px 21px;
        border-left: 1px solid #EBEBEC;
        border-right: 1px solid #EBEBEC;

        ul{
          width: 70%;
          font-family:"微软雅黑" ;

          li{
            width: 33.3%;
            font-size: 16px;
            color: #5F6575;
            opacity: 0.5;
            cursor: pointer;

            &.active{
              font-weight: bold;
              font-size: 16px;
              color: #5F6575;
              opacity: 1;
            }
          }
        }
        a{
          width: 30%;
          font-family: "微软雅黑";
          text-align: right;
          font-weight: bold;
          font-size: 14px;
          color: #5F6575;
        }
      }
    }


    .bet-ranking-top-line{
      margin-top: 4px;
      display: block;
      width: 32px;
      height: 2px;
      background: #5F6575;
    }
    .bet-ranking-middle{

      padding-bottom: 7px;
      border-left: 1px solid #EBEBEC;
      border-right: 1px solid #EBEBEC;

      ul {
        width 100%
        li {
          font-size: 13px;
          color: #5F6575;
          text-align: center;

          &.bet-ranking-middle-1,
          &.bet-ranking-middle-3,
          &.bet-ranking-middle-4{
            width: 20%;
          }
          &.bet-ranking-middle-2{
            width: 40%;
            text-align: center;
          }
        }
      }
    }


    .bet-update{
      width: calc(90% - 2px);
      padding: 0 5%;
      display: block;
      margin: 0 auto;
    }
    .bet-ranking-bottom {
      border-left: 1px solid #EBEBEC;
      border-right: 1px solid #EBEBEC;

      ul {
        width 100%
      }
      .ul-top2{
        background: #FCFCFD;
      }

      .bet-ranking-bottom-1{
        padding-top: 20px;
        width: 20%;

        span{
          margin: auto;
          text-align: center;
          line-height: 20px;
          font-size: 13px;
          height: 20px;
          width: 20px;
          display: block;
        }
      }
      .bet-ranking-bottom-2{
        padding: 10px 0 6px 0;
        width: 40%;
        text-align: center;
        cursor: pointer;

        img{
          height: 40px;
          width: 40px;
          border-radius: 50%;
          display: inline-block;
          vertical-align: top;
        }
        p{
          display: inline-block;
          padding-left: 11px;
          width: 95px;
          text-align: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
          color: #333333;
          line-height: 40px;
        }
      }

      .bet-ranking-bottom-3{
        padding-top: 20px;
        width: 20%;
        text-align: center;
        opacity: 0.96;
        font-size: 14px;
        color: #FFA626;
        letter-spacing: 0;
        font-weight: bold;
      }
      .bet-ranking-bottom-4{
        padding-top: 20px;
        /*width: 15%;*/
        padding-left: 5%;

        img{
          width: 10px;
          height: 13px;
          display: inline-block;
          vertical-align: middle;
        }

        p{
          padding-left: 3px;
          font-size: 12px;
          color: #917359;
          display: inline-block;
        }
      }

    }
    .ul-top{
      border-top: 1px solid #EBEBEC;
      /*border-left: 1px solid #EBEBEC;*/
      /*border-right: 1px solid #EBEBEC;*/
    }

    .bet_list_top1{
      background: #FFEB79;
      border: 1px solid #FFE23B;
      border-radius: 50%;
    }
    .bet_list_top2{
      background: #F2F2F2;
      border: 1px solid #D8D8D8;
      border-radius: 50%;
    }
    .bet_list_top3{
      background: #FFE4C3;
      border: 1px solid #FFD29A;
      border-radius: 50%;
    }

    .bet-our{
      background: #FFF8F0;
      border-top: 1px solid #FFE4C6;
      border-bottom: 1px solid #FFE4C6;
    }
    .bet-ranking-bottom-time{
      width 100%
      padding: 8px 22px;
      /*border-top: 1px solid #EBEBEC;*/
      border-bottom: 1px solid #EBEBEC;
      /*border-top: 0;*/
    }
    .bet-ranking-bottom-time p:nth-of-type(1){
      opacity: 0.5;
      font-family:"微软雅黑" ;
      font-size: 12px;
      color: #5F6575;
    }
    .bet-ranking-bottom-time p:nth-of-type(2){
      opacity: 0.5;
      font-weight: bold;
      font-size: 12px;
      color: #5F6575;

    }
    .bet-ranking-bottom-time1{
      padding: 8px 22px;
      border: 1px solid #EBEBEC;
    }
    .bet-ranking-bottom-time1 p:nth-of-type(1){
      opacity: 0.5;
      font-family:"微软雅黑" ;
      font-size: 12px;
      color: #5F6575;
    }
    .bet-ranking-bottom-time1 p:nth-of-type(2){
      opacity: 0.5;
      font-weight: bold;
      font-size: 12px;
      color: #5F6575;

    }
  }

</style>


