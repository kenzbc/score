<template>
  <div>
    <star-header :starInfo="starInfo"></star-header>
    <div class="star-main">
      <star-left :data="starInfo"></star-left>
      <div class="score-star-home">

        <div class="score-star-trip">
          <div class="head-title">
            <h4 class="title">阵容</h4>
            <h4 class="all-f" @click="followAll(followAllIds)">全部关注</h4>
          </div>

          <div class="sizer">
            <div class="item"
                 :class="{'active':thisBranchId == item.branch_id}"
                 @click="getDataList(item.branch_id)"
                 v-for="item in dataType">{{item.name}}</div>
          </div>
          <div class="battle-list">
            <div class="item" v-for="item in dataList">
              <a :href="'/u/'+item.member_id" class="user-avatar">
                <img :src="item.avatar ? item.avatar : '/static/images/index/tx_pic.jpg' | catImg(70,70)" class="avatar">
                <img src="/static/images/member/staff.png" class="member-type" v-if="item.type == '2'">
                <img src="/static/images/member/v.png" class="member-type" v-else-if="item.type == '1'">
              </a>
              <div class="user">
                <a :href="'/u/'+item.member_id" class="nickname">{{item.nickname}}</a>
                <div class="desc">{{item.demo}}</div>
                <div class="follow-btn" @click="followOrCancel(item.member_id, item.is_attention==1 ? 'cancel' : 'follow')" :class="{'active' : item.is_attention==1}">{{item.is_attention==1 ? '已关注' : '关注'}}</div>
              </div>
            </div>

            <no-data :show="dataList == '' || dataList.length < 1"></no-data>
          </div>
        </div>

      </div>
      <!--<star-right :data="starInfo"></star-right>-->
    </div>

  </div>
</template>

<script>
  import StarHeader from "~/components/star/star-header";
  import StarRight from "~/components/star/star-right";
  import StarLeft from "~/components/star/star-left";
  import NoData from "~/components/no-data";

  export default {
    name: "lineup",
    layout: 'layout-simple',
    components: {
      NoData,
      StarLeft,
      StarRight,
      StarHeader
    },
    data() {
      return {
        isLoading:true,
        thisBranchId:0,
        dataType: [],
        followAllIds:[],
        dataList: [],
      }
    },
    async asyncData({app, $axios, error, params, query, route}) {

      let _params = {
        star_id: query.star_id,
        limit: 20,
        page: 1,
      };

      let [starInfo, lineupList] = await Promise.all([
        app.$api.star.getStarInfo({params:_params}),
        app.$api.star.getLineupList({params:_params})
      ]);

      return {
        starInfo: starInfo.data,
        dataList: lineupList.data.member_list,
        dataType: lineupList.data.star_branch_list,
      }

    },
    mounted() {

    },
    methods: {
      /**
       * 获取阵容数据
       * @param
       * @returns
       */
      async getDataList (branchId){
        var _this = this;
        branchId != '' ? _this.thisBranchId = branchId : _this.thisBranchId;
        //console.log('thisBranchId'+_this.thisBranchId);

        let params = {
          star_id: this.$route.query.star_id,
          branch_id: branchId,
        };
        let res = await this.$api.star.getLineupList({params});
        if(res.code == 200){
          this.dataList = res.data.member_list;

          if(this.dataType.length < 1){
            this.dataType = res.data.star_branch_list;
          }

          let reslen = this.dataList.length;
          this.followAllIds = [];
          for(let i=0;i<reslen;i++){
            if(this.dataList[i].is_attention == '0'){
              this.followAllIds.push(this.dataList[i].member_id);
            }
          }

        }else{
          this.$Message.error(res.message);
        }

      },
      //关注或取消关注
      followOrCancel: function(attentionMemberId, type){
        if(type == 'follow'){
          this.follow(attentionMemberId);
        }else{
          this.cancel(attentionMemberId);
        }
      },
      //关注
      async followAll (broadcastIds){
        let params = {
          broadcast_ids: this.arrToString(broadcastIds)
        };

        let res = await this.$api.member.setAttentionAll({params});
        if(res.code == 200){
          this.isBadgeSliderShow = true;
          this.$nextTick(() => {
            this.getDataList(this.thisBranchId);
          });
        }else{
          this.$Message.error(res.message);
        }
      },
      //关注
      async follow (attentionMemberId){
        let params = {
          attention_member_id: attentionMemberId
        };

        let res = await this.$api.member.setAttention({params});
        if(res.code == 200){
          this.isBadgeSliderShow = true;
          this.$nextTick(() => {
            this.getDataList(this.thisBranchId);
          });
        }else{
          this.$Message.error(res.message);
        }
      },
      //取消关注
      async cancel (attentionMemberId){
        let params = {
          attention_member_id: attentionMemberId
        };

        let res = await this.$api.member.unAttention({params});
        if(res.code == 200){
          this.isBadgeSliderShow = true;
          this.$nextTick(() => {
            this.getDataList(this.thisBranchId);
          });
        }
      },
      arrToString(arr){
        var str = '';
        if(arr && arr.length > 0){
          for(var i in arr){
            str += arr[i] + ',';
          }
          str = str.substr(0,str.length-1);
        }
        return str;
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .star-main {
    min-height 600px;
    max-width: 1240px;
    width: 100%;
    padding-top: 118px;
    margin: 0 auto 20px auto;
    display: flex;
    /*justify-content: space-between;*/

    .score-star-home {
      max-width: 640px;
      width: 100%;
      background: #FFFFFF;
      box-shadow: 0 0 0 1px #EBEBED;
      border-radius: 2px;
      margin: 0 20px;
      float: left;
    }



    .score-star-trip{
      padding: 20px 0;

      .head-title{
        padding:8px 20px;
        display flex;
        justify-content space-between;
        align-items center;

        .title{
          font-size:20px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:rgba(45,47,51,1);
          line-height:28px;
        }
        .all-f{
          font-size:17px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:rgba(13,141,252,1);
          line-height:24px;
          cursor pointer;
        }


      }


      .sizer{
        padding:4px 20px;
        display flex
        align-items center;
        flex-wrap wrap;

        .item{
          min-width: 60px;
          height: 26px;
          margin-right: 10px;
          text-align: center;
          line-height: 26px;
          background: #f0f1f2;
          border-radius: 8px;
          font-size: 12px;
          font-family: PingFangSC-Regular;
          color: #656973;
          padding: 0 10px;
          margin-bottom: 10px;

          &:hover,&.active{
            cursor pointer;
            background:#0D8DFC;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:#fff;
          }

        }
      }


      .battle-list{
        margin-top:10px;
        border-top:1px solid #F0F1F2;
        padding:4px 20px;
        padding-top:36px;
        display flex
        flex-wrap wrap;
        align-items center;

        .null-icon{
          color: #656973;
          margin: 30px auto;
          text-align center;

          img{
            margin-bottom:10px;
          }
        }

        .item{
          width 287px;
          padding-left:34px;
          height 100px;
          display flex;

          &:nth-child(odd){
            padding-left:0px;
            border-right:1px solid #F0F1F2;
          }

          .user-avatar{
            position relative;

            .avatar{
              width 70px;
              height 70px;
              border-radius:50%;
            }
            .member-type{
              width 20px;
              height 20px;
              position absolute;
              top:54px;right:0;
            }
          }

          .user{
            margin-left:12px;

            .nickname{
              display block;
              width: 200px;
              font-size:16px;
              font-family:PingFangSC-Semibold;
              font-weight:600;
              color:#2D2F33;
              line-height:22px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .desc{
              width: 200px;
              height: 20px;
              margin-top: 2px;
              font-size: 12px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: #a8abb3;
              line-height: 17px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .follow-btn{
              margin-top:5px;
              width:70px;
              height:23px;
              line-height 21px;
              text-align center;
              border-radius:15px;
              border:1px solid #0D8DFC;
              font-size:12px;
              font-family:PingFangSC-Medium;
              font-weight:500;
              color:#0D8DFC;
              cursor pointer;


              &:hover{
                background: #d1f2fc;
                color:#0D8DFC;
              }

              &.active{
                background:#0D8DFC;
                color #fff;
              }
            }
          }
        }


      }
    }



    .star-get-more{
      display: block;
      line-height: 40px;
      text-align: center;
      border-radius: 8px;
      margin: 15px 15px 0 15px;
      border: 1px solid #f0f1f2;
      /* background: #F7F8FA; */
      background: #fff;
      font-size: 14px;
      color: #a8abb3;
    }

  }


  @media all and (max-width:768px){

    .star-main{
      width 100%;
      display: block;

      .score-star-left{
        width 100%;
      }

      .score-star-home{
        margin: 0;

        .score-star-trip {
          .battle-list {
            padding-top: 0px;

            .item:nth-child(odd) {
              padding-left: 0px;
              border-right: 0px solid transparent;
            }
            .item {
              width: 90%;
              margin:0 auto;
              margin-top:40px;
              padding-left: 0px;
              border-bottom:1px solid #F0F1F2;

              .user{
                width: calc(100% - 70px);
                .follow-btn{
                  width 60%;
                }
              }
            }
          }
        }
      }
    }

  }





</style>
