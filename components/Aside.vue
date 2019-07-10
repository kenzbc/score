<template>
  <div class="aside-container" v-if="$store.state.modules.device.isSideShow && $store.state.modules.device.type == 'pc'">
    <div class="aside-bar">
      <div class="bar-nav">
        <label @click="changeTab('my-info')">
          <div class="bar-nav-name">个人中心</div>
          <i class="iconfont icon-personal__user"></i>
        </label>
        <label @click="changeTab('my-star')">
          <div class="bar-nav-name">官方号</div>
          <i class="iconfont icon-personal_task__off"></i>
        </label>
        <label @click="changeTab('my-moment')">
          <div class="bar-nav-name">我的圈子</div>
          <i class="iconfont icon-personal__circle"></i>
        </label>
      </div>

      <div class="scale-back">
        <label class="app-download">
          <i class="iconfont icon-general__QRcode"></i>
          <div class="load-qrcode"><img src="/static/images/twocode.png" width="120"><p>扫码下载 Score App</p></div>
        </label>
        <!--<label onclick="location.reload();"><i class="iconfont">&#xe6ce;</i></label>-->
        <label @click="backTop()" class="back-top">
          <div class="my-tag">返回顶部</div>
          <i class="iconfont icon-general__Top"></i>
        </label>
      </div>

    </div>

    <!--slide drawer-->
    <Drawer class="aside-container"
            v-if="$store.state.modules.login.f_token"
            :class="{'index' : $route.name == 'index'}" title="Basic Drawer"
            :closable="false" v-model="drawer">

      <div class="aside-bar">
        <div class="scale-btn" @click="close">
          <label><i class="iconfont icon-icon4"></i></label>
        </div>

        <div class="bar-nav">
          <label @click="changeTab('my-info')" :class="{'active' : tab == 'my-info'}">
            <div class="bar-nav-name">个人中心</div>
            <i class="iconfont icon-personal__user"></i>
          </label>
          <label @click="changeTab('my-star')" :class="{'active' : tab == 'my-star'}">
            <div class="bar-nav-name">官方号</div>
            <i class="iconfont icon-personal_task__off"></i>
          </label>
          <label @click="changeTab('my-moment')" :class="{'active' : tab == 'my-moment'}">
            <div class="bar-nav-name">我的圈子</div>
            <i class="iconfont icon-personal__circle"></i>
          </label>
        </div>

        <div class="scale-back">
          <label class="app-download">
            <i class="iconfont icon-general__QRcode"></i>
            <div class="load-qrcode"><img src="/static/images/twocode.png" width="120"><p>扫码下载 Score App</p></div>
          </label>
          <!--<label onclick="location.reload();"><i class="iconfont">&#xe6ce;</i></label>-->
          <label @click="backTop()" class="back-top">
            <div class="my-tag">返回顶部</div>
            <i class="iconfont icon-general__Top"></i>
          </label>
        </div>

      </div>
      <!--个人中心-->
      <div class="sider-container user-info" v-if="tab == 'my-info' && userInfo && Object.keys(userInfo).length > 0">
        <div class="header-title-box" onclick="javascript:window.open('/account')">
          个人中心
        </div>
        <div class="user-info-panel">
          <p class="avatar-info" onclick="javascript:window.open('/homepage')">
            <img class="avatar" :src="userInfo.avatar">
            <img v-if="userInfo.type == '1'" class="vip-icon" src="/static/images/member/v.png">
            <img v-if="userInfo.type == '2'" class="vip-icon" src="/static/images/new_index/staff.png">
          </p>
          <no-ssr>
            <p class="nickname">{{userInfo.nickname}}</p>
          </no-ssr>
          <div class="user-data-msg">
            <p onclick="javascript:window.open('/homepage')"> <span>{{userInfo.bar_count ? userInfo.bar_count : 0}}</span> <span>贴子</span> </p>
            <p onclick="javascript:window.open('/fans')"> <span>{{userInfo.message_count ? userInfo.message_count : 0}}</span> <span>新消息</span> </p>
            <p onclick="javascript:window.open('/follow')"> <span>{{userInfo.attention_count ? userInfo.attention_count : 0}}</span> <span>关注</span> </p>
          </div>

          <div class="my-level">
            <p class="per">
              <span class="level fll">Lv.{{userInfo.rank}}</span>
              <span class="fll">经验值：{{userInfo.next_rank_now_points}} / {{userInfo.next_rank_need_points}}</span>
            </p>
            <p class="rate experience">
              <span class="bj"></span>
              <span class="percent" :style="'width:'+userInfo.percent*100 +'%'"></span>
            </p>
          </div>
        </div>
        <div class="side-boundary-box my-task" onclick="javascript:window.open('/task')">
          <p class="title"><em></em>任务<i class="iconfont icon-icon4"></i></p>
          <div class="desc-box"><p>今天还有 <strong>{{userInfo.no_finish_task_num}}</strong> 个任务可以完成</p></div>
        </div>
        <div class="side-boundary-box wallet">
          <p class="title"><em></em>钱包<i class="iconfont icon-icon4"></i></p>
          <div class="desc-box">
            <li class="diamond" onclick="javascript:window.open('/account?status=1&amp;bank_status=0')">
              <i class="iconfont icon-icon_zuanshi"></i>
              <div class="dec">
                <div class="left"><i class="iconfont icon-wallet_zuanshi"></i></div>
                <div class="right">钻石: {{userInfo.diamond}}</div>
              </div>
            </li>
            <li class="guozi" onclick="javascript:window.open('/account?status=1&amp;bank_status=3')">
              <i class="iconfont icon-guozi1"></i>
              <div class="dec">
                <div class="left"><i class="iconfont icon-wallet_fruit"></i></div>
                <div class="right">果子: {{userInfo.guozi1}}</div>
              </div>
            </li>
          </div>
        </div>
        <div class="side-boundary-box bet" onclick="javascript:window.open('/task')">
          <p class="title"><em></em>菠菜<i class="iconfont icon-icon4"></i></p>
          <div class="desc-box">
            <p>今天还有 <strong>{{userInfo.bet_count_unsettled ? userInfo.bet_count_unsettled : 0}}</strong> 场菠菜未结算</p>
            <p class="rate bet"> <span class="bj"></span> <span class="percent" :style="'width:' + (userInfo.bet_win_rate*100).toFixed(2) +'%'"></span> </p>
            <p class="link">胜率 <span>{{(userInfo.bet_win_rate*100).toFixed(2)}}%</span></p>
          </div>
        </div>

      </div>

      <!--我的官方号-->
      <div class="sider-container star" v-if="tab == 'my-star'">
        <div class="header-title-box" onclick="javascript:window.open('/star_list')">
          我的官方号
        </div>
        <div class="side-boundary-box" onclick="javascript:window.open('/task')">
          <p class="title"><em></em>最爱官方号</p>
          <div class="desc-box">
            <nuxt-link class="official" v-for="item in starListAtt" :to="'/star?star_id='+item.id">
              <div class="avatar fll"><img :src="item.list_image_url ? item.list_image_url : '/images/tx_pic.jpg'"></div>
              <div class="dec fll">
                <p>{{item.name}}</p>
                <p>粉丝：{{item.fans}}</p>
              </div>
            </nuxt-link>
          </div>
        </div>

        <div class="star-list">
          <nuxt-link class="official" v-for="item in starList" :to="'/star?star_id='+item.id">
            <div class="avatar fll"><img :src="item.list_image_url ? item.list_image_url : '/static/images/tx_pic.jpg'"></div>
            <div class="dec fll">
              <p>{{item.name}}</p>
              <p>粉丝：{{item.fans}}</p>
            </div>
          </nuxt-link>
          <nuxt-link class="add-official" to="/star">
            <label><i class="iconfont icon-iconadd"></i></label>
            <span>添加官方号</span>
          </nuxt-link>
        </div>
      </div>

      <!--我的圈子-->
      <div class="sider-container moment" v-if="tab == 'my-moment'">
        <div class="header-title-box" onclick="javascript:window.open('/star_list')">
          我的圈子
        </div>

        <div class="moment-list">
          <nuxt-link class="official" v-for="item in circleList" :to="'/c/'+item.circle_id">
            <div class="avatar fll"><img :src="item.circle_picture"></div>
            <div class="dec fll">
              <p>{{item.circle_name}}</p>
              <p>粉丝：{{item.fans_num}}</p></div>
          </nuxt-link>
          <nuxt-link class="all-text" to="/moment">
            查看全部
          </nuxt-link>
        </div>
      </div>



    </Drawer>
  </div>
</template>

<script>
  export default {
    name: "aside-drawer",
    components: {},
    data() {
      return {
        drawer: false,
        tab:'my-info',

        userInfo:{},
        starListAtt:[],
        starList:[],
        circleList:[]
      }
    },
    watch:{
      drawer(newVal, oldVal){
        if(newVal){

        }
      }
    },
    mounted() {
    },
    methods: {
      getUserInfo(){
        this.$api.member.getMemberInfo({params:{broadcast_id:this.$store.state.modules.login.member_id}}).then((res)=>{
          this.userInfo = res.data;
          this.$store.commit('modules/login/setUserInfo', res.data);
        });
      },
      getStarAttention(){
        this.$api.star.getStarList().then((res)=>{
          res.data.attention_list.forEach((item)=>{
            if(item.is_loved == '1'){
              this.starListAtt = this.starListAtt.concat(item);
            }else{
              this.starList = this.starList.concat(item);
            }
          })
        })
      },
      getCircleAttention(){
        this.$api.circle.getCircleList({params:{category_id: -3}}).then((res)=>{
          this.circleList = res.data.data_list;
        })
      },
      changeTab(tab){
        if(!this.$getLoginStatus()){
          return;
        }

        this.drawer = true;
        this.tab = tab;
        if(tab == 'my-info'){
          this.getUserInfo();
        }else if(tab == 'my-star'){
          this.getStarAttention();
        }else if(tab == 'my-moment'){
          this.getCircleAttention();
        }
      },
      close(){
        this.drawer = false;
      },
      backTop(){
        $("html,body").animate({scrollTop:"0px"},200);
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .aside-container{
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    background: #FFF;
    height: 100%;
    z-index: 99;

    &.index{
      >>> .ivu-drawer-body{
        padding 0;
        padding-top: 64px;
        background: #F7F8FA;
        overflow initial;
      }
    }

    >>> .ivu-drawer-mask{
      background-color: rgba(55,55,55,0);
    }
    >>> .ivu-drawer-body{
      padding 0;
      padding-top: 0;
      background: #F7F8FA;
      overflow initial;

      .aside-bar{
        background: #fff;
        float: left;

        .scale-btn{
          position: absolute;
          right: 0;
          z-index: 100;

          label{
            height: 32px;
            display: block;
            width: 36px;
            position: relative;
            left: 0;
            right: 0;
            cursor: pointer;
            margin: 10px 0 0;

            i{
              display: block;
              color: #5f6575;
              position: absolute;
              font-size: 20px;
              right: 8px;
              line-height: 32px;
              height: 32px;
              z-index: 111;
            }
          }
        }
      }
    }
  }
  .aside-bar{
    width: 36px;
    height: 100%;
    float: right;
    position: relative;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px 0 rgba(0,0,0,0.04);

    .bar-nav{
      position: absolute;
      top: 40%;
      bottom: 45%;
      right: 0;
      z-index: 100;

      label{
        height: 32px;
        display: block;
        width: 36px;
        position: relative;
        left: 0;
        right: 0;
        cursor: pointer;
        margin: 10px 0 0;

        &.active {
          .iconfont{
            color: #fff;
          }
          background: #0D8DFC;
        }

        &:hover{
          .iconfont{
            color: #fff;
          }
          .bar-nav-name{
            display block;
          }
        }
      }

      .iconfont{
        display: block;
        color: #5f6575;
        position: absolute;
        font-size: 20px;
        right: 8px;
        line-height: 32px;
        height: 32px;
        z-index: 111;
      }
      .bar-nav-name{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 106px;
        line-height: 32px;
        color: #fff;
        background: #0D8DFC;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        font-size: 14px;
        padding-left: 12px;
        display: none;
      }
    }


    .scale-back{
      position: absolute;
      bottom: 60px;
      right: 0;
      z-index: 100;

      label{
        height: 32px;
        display: block;
        width: 100%;
        margin: 10px 0;
        position: relative;
        cursor: pointer;

        i{
          display: block;
          color: #5f6575;
          position: absolute;
          line-height: 32px;
          font-size: 20px;
          right: 8px;
        }

        &.app-download{

          &:hover{
            .load-qrcode{
              display inline-block;
            }
          }

          .load-qrcode{
            display: none;
            position: absolute;
            right: 50px;
            bottom: -20px;
            font-size: 12px;
            text-align: center;
            background: #fff;
            padding: 10px;
            border-radius: 4px;
          }
        }
        &.back-top{

          &:hover{
            i{
              color #fff;
            }
            .my-tag{
              display block;
            }
          }

          .my-tag{
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 106px;
            line-height: 32px;
            color: #fff;
            background: #0D8DFC;
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            font-size: 14px;
            padding-left: 12px;
            display: none;
          }
        }
      }
    }
  }


  .header-title-box{
    background: #FFFFFF;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px 0 rgba(0,0,0,0.04);
    border-radius: 2px;
    line-height: 28px;
    text-align: center;
    color: #2D2F33;
    letter-spacing: 0;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
  }
  .sider-container{
    width calc(100% - 36px);
    padding: 10px;
    height 100%;
    float:right;

    .side-boundary-box{
      margin-top:10px;
      padding: 10px 10px;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px 0 rgba(0,0,0,0.04);
      border-radius: 2px;
      background: #ffffff;

      .title{
        height: 22px;
        line-height: 22px;
        text-align: left;
        font-weight: bold;
        font-size: 15px;
        color: #2D2F33;

        em{
          width: 4px;
          height: 14px;
          margin-right: 5px;
          border-bottom: 2px solid #fff;
          display: inline-block;
          vertical-align: middle;
          background: #0D8DFC;
        }
        .iconfont{
          float: right;
          opacity: 0.4;
          font-size: 18px;
        }
      }
      .desc-box{
        margin-top: 10px;
      }
    }
    &.user-info{

      .rate{
        width: 100%;
        border-radius: 2px;
        position: relative;
        overflow: hidden;
        margin: 5px 0;

        &.bet{
          height 12px;
        }

        &.experience{
          height: 6px;
          margin: 8px 0 0;
          border-radius: 8px;

          .bj {
            border-radius: 8px;
          }
          .percent{
            border-radius: 8px;
          }
        }

        .bj{
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          display: block;
          width: 100%;
          height: 100%;
          background: #EBEBED;
          border-radius: 2px;
        }
        .percent{
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 0;
          height: 100%;
          background-image: linear-gradient(45deg,#137FF2 0%,#1A97EB 100%);
          border-radius: 2px;
        }
      }

      .user-info-panel{
        margin-top: 10px;
        padding: 30px 0 10px;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px 0 rgba(0,0,0,0.04);
        border-radius: 2px;
        background: #ffffff;

        .avatar-info{
          width: 60px;
          height: 60px;
          margin: 0 auto;
          position: relative;

          .avatar{
            width: 60px;
            height: 60px;
            margin: 0 auto;
            overflow: hidden;
            border-radius: 50%;
            box-shadow: -1px 0 2px #f1f1f3, -1px 0 3px #f1f1f3, 1px 0 3px #f1f1f3, -1px 0 3px #f1f1f3;

            &>img{
              width: 100%;
            }
          }
          .vip-icon{
            display: block;
            position: absolute;
            bottom: 0;
            right: 0;
            width: 20px;
            height: 20px;
          }
        }

        .nickname{
          width: 164px;
          font-size: 16px;
          text-align: center;
          margin: 20px auto 10px;
          color: #555555;
          font-weight: bold;
        }

        .user-data-msg{
          margin: 20px 10px 0;
          width: calc(100% - 20px);
          border-bottom: 1px solid #F0F1F2;
          padding-bottom: 10px;
          overflow: hidden;

          p{
            text-align: center;
            width: 33%;
            float: left;
            border-right: 1px solid #f3f3f5;
            cursor: pointer;

            &:last-Child {
              border-right: 0;
            }
            span{
              display: block;
              width: 100%;
              line-height: 16px;
              text-align: center;

              &:first-Child {
                font-weight: bold;
                font-size: 14px;
              }
              &:last-Child {
                color: #A8ABB3;
                font-size: 11px;
              }
            }
          }
        }

        .my-level{
          margin: 10px 10px 0;

          .per{
            line-height: 14px;
            overflow: hidden;

            .level{
              color: #fff;
              padding: 0 5px;
              height: 14px;
              border-radius: 4px;
              letter-spacing: -0.1em;
              background-image: linear-gradient(-135deg,#058AFF 0%,#19A7FF 100%);
            }
            span{
              margin-right: 5px;
              color: #A8ABB3;
            }
          }
        }
      }

      .side-boundary-box{
        &.task{
          .desc-box{
            p{
              line-height: 20px;

              strong{
                color: #0D8DFC;
              }
            }
          }
        }

        &.wallet{
          .desc-box{
            li{
              width: 100%;
              margin-top: 10px;
              border-radius: 6px;
              overflow: hidden;
              cursor: pointer;
              position: relative;

              &>.iconfont{
                position: absolute;
                right: -5px;
                top: -10px;
                font-size: 80px;
                opacity: 0.1;
                color: #fff;
                font-weight: bold;
                transform: rotate(15deg);
              }
              .dec{
                padding: 7px 14px;
                overflow: hidden;
                display flex;
                align-items center;

                .left{
                  width: 32px;
                  height: 32px;
                  text-align: center;
                  border-radius: 50%;
                  background-image: linear-gradient(45deg,#EBFFFB 0%,#F7FFFE 100%);

                  i{
                    font-size: 24px;
                    line-height: 32px;
                    color: #005ee6;
                    margin: 0;
                  }
                }
                .right{
                  width: calc(100% - 40px);
                  color: #fff;
                  line-height: 32px;
                  text-align: right;
                  font-size: 16px;
                  text-shadow: 0 1px 1px rgba(0,0,0,0.12);
                }
              }

              &.diamond{
                background-image: linear-gradient(45deg,#005ee6 0%,#1A97EB 100%);

              }
              &.guozi{
                background-image: linear-gradient(45deg,#ff9435 0%,#FFC266 100%);

                .dec{
                  .left{
                    i{
                      color: #ff9b3d;
                    }
                  }
                }
              }


            }
          }
        }


        &.bet{
          .link{
            display flex
            justify-content space-between;
          }
        }
      }
    }

    &.star{
      .desc-box{
        .official{
          background: #ffffff;
          border-radius: 2%;
          overflow: hidden;
          cursor: pointer;
          display table;

          &:last-child {
            border-bottom: 0;
          }

          .avatar{
            width: 40px;
            border-radius: 0;
            margin-right: 0;
            min-width: inherit;

            img{
              width: 100%;
            }
          }
          .dec{
            padding: 5px;
            width: calc(100% - 40px);

            p{
              font-size: 11px;
              line-height: 16px;
              color: #A8ABB3;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;

              &:first-Child {
                font-size: 14px;
                color: #2D2F33;
              }
            }
          }
        }

      }

      .star-list{
        width 100%;
        display flex;
        flex-wrap wrap;
        margin-top: 10px;
        padding: 0 10px;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px 0 rgba(0,0,0,0.04);
        border-radius: 2px;
        background: #fff;

        .official {
          width 100%;
          padding: 10px 0;
          border-bottom: 1px solid #F0F1F2;


          &:last-child {
            border-bottom: 0;
          }

          .avatar{
            width: 40px;
            border-radius: 0;
            margin-right: 0;
            min-width: inherit;

            img{
              width: 100%;
            }
          }
          .dec{
            padding: 5px;
            width: calc(100% - 40px);

            p{
              font-size: 11px;
              line-height: 16px;
              color: #A8ABB3;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;

              &:first-Child {
                font-size: 14px;
                color: #2D2F33;
              }
            }
          }


        }

        .add-official{
          padding: 10px 0;
          line-height: 32px;
          color: #2d2f33;
          cursor: pointer;
          overflow: hidden;
          width: 100%;

          label{
            display: inline-block;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 1px solid #F0F1F2;
            position: relative;
            float: left;
            margin-right: 10px;

            i{
              position: absolute;
              top: 50%;
              left: 50%;
              font-size: 12px;
              transform: translate(-50%,-50%);
              color: #d2d4d9;
            }
          }
          span{
            display: inline-block;
            float: left;
          }
        }
      }

    }


    &.moment{
      .desc-box{
        .official{
          background: #ffffff;
          border-radius: 2%;
          overflow: hidden;
          cursor: pointer;

          &:last-child {
            border-bottom: 0;
          }

          .avatar{
            width: 40px;
            border-radius: 0;
            margin-right: 0;
            min-width: inherit;

            img{
              width: 100%;
            }
          }
          .dec{
            padding: 5px;
            width: calc(100% - 40px);

            p{
              font-size: 11px;
              line-height: 16px;
              color: #A8ABB3;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;

              &:first-Child {
                font-size: 14px;
                color: #2D2F33;
              }
            }
          }
        }

      }

      .moment-list{
        width 100%;
        display flex;
        flex-wrap wrap;
        margin-top: 10px;
        padding: 0 10px;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px 0 rgba(0,0,0,0.04);
        border-radius: 2px;
        background: #fff;

        .official {
          width 100%;
          padding: 10px 0;
          border-bottom: 1px solid #F0F1F2;


          &:last-child {
            border-bottom: 0;
          }

          .avatar{
            width: 40px;
            border-radius: 0;
            margin-right: 0;
            min-width: inherit;

            img{
              width: 100%;
            }
          }
          .dec{
            padding: 5px;
            width: calc(100% - 40px);

            p{
              font-size: 11px;
              line-height: 16px;
              color: #A8ABB3;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;

              &:first-Child {
                font-size: 14px;
                color: #2D2F33;
              }
            }
          }
        }

        .all-text{
          padding: 10px 0;
          line-height: 32px;
          text-align center;
          color: #2d2f33;
          cursor: pointer;
          overflow: hidden;
          width: 100%;
        }
      }
    }
  }



</style>
