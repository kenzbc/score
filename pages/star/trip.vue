<template>
  <div>
    <star-header :starInfo="starInfo"></star-header>
    <div class="star-main">
      <star-left :data="starInfo"></star-left>
      <div class="score-star-home">

        <div class="score-star-trip">
          <div class="head-title">
            <h4 class="title">行程</h4>
            <h4 class="all-f">
              筛选
              <span class="sizer">
                <div class="item" v-for="item in dataType" @click="addType(item.branch_id)">
                    <img src="/static/images/star/checkbox_on@2x.png" v-if="oneOf(item.branch_id, nowTypeIds)" width="16" height="16">
                    <img src="/static/images/star/checkbox_off@2x.png" v-else width="16" height="16">
                    {{item.name}}
                </div>
                <div class="buttons">
                    <div class="rest" @click="nowTypeIds = []">重置</div>
                    <div class="submit" @click="getDataList(nowTripDate)">确定</div>
                </div>
            </span>
            </h4>
          </div>

          <div class="star-trip-day">
            <a href="javascript:" class="fll" id="star_trip_prev" @click="changeMonthTrip('prev')">
              <i class="iconfont icon-general__arrow_left"></i>
            </a>

            <span class="month" id="star_trip_month">{{nowDateString}}</span>

            <a href="javascript:" class="flr" id="star_trip_next" @click="changeMonthTrip('next')">
              <i class="iconfont icon-general__arrow_right"></i>
            </a>
          </div>

          <div class="trip-list">
            <div class="item" v-if="dataList && dataList.length > 0" v-for="item in dataList">
              <div class="item-left" :class="item.timestamp | isToday(item.week)">
                <div>
                  <div class="day">{{item.d}}</div>
                  <div class="week">{{item.week}}</div>
                </div>
                <div>
                  <div class="title">{{item.title}}</div>
                  <div class="time-address">{{item.time}} {{item.place}}</div>
                </div>
              </div>

              <span>
                <a v-if="item.type == '1' && item.web_url" :href="'/p/'+item.web_url"><img src="/static/images/star/circle_jump@2x.png" width="24" height="24" ></a>
                <a v-if="item.type == '2' && item.web_url" :href="'/match/'+item.web_url"><img src="/static/images/star/circle_jump@2x.png" width="24" height="24" ></a>
                <a v-if="item.type == '3' && item.web_url" :href="item.web_url"><img src="/static/images/star/circle_jump@2x.png" width="24" height="24" ></a>
            </span>
            </div>

            <div v-if="dataList == '' || dataList.length < 1" class="null-icon"><img src="/static/images/no_data.png" width="80"><p>暂无数据！</p></div>
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

  export default {
    name: "trip",
    layout: 'layout-simple',
    components: {
      StarLeft,
      StarRight,
      StarHeader
    },
    data() {
      return {
        isLoading:true,
        dataType:[],
        dataList: [],

        nowTripDate:'',
        nowDateString:'',
        nowMonth:'',
        nowTypeIds:[],
      }
    },
    async asyncData({app, $axios, error, params, query, route}) {

      let _params = {
        star_id: query.star_id,
        limit: 20,
        page: 1,
      };
      let [starInfo, tripList] = await Promise.all([
        app.$api.star.getStarInfo({params:_params}),
        app.$api.star.getTripList({params:_params})
      ]);

      return {
        starInfo: starInfo.data,
        dataList: tripList.data.list,
        dataType: tripList.data.branch_list,
        nowTripDate: tripList.data.now_date, //行程日期
        nowDateString: tripList.data.now_date_string //行程日期字符串格式
      }

    },
    filters: {
      isToday(stamp, isToday){
        /*var dataTime = new Date().getFullYear()+'-'+ ((new Date().getMonth()+1) <10 ? '0'+(new Date().getMonth()+ 1) : (new Date().getMonth()+ 1))+'-'+(new Date().getDate()<10 ? '0'+new Date().getDate() : new Date().getDate());*/
        var nowStamp = Date.parse(new Date())/1000;
        if(isToday == '今天'){
          return 'active';
        }else if(nowStamp > stamp){
          return 'finish';
        }else{
          return '';
        }
      }
    },
    mounted() {

    },
    methods: {
      /**
       * 更改月份时
       * @param
       * @returns
       */
      changeMonthTrip (direction){
        var actDate;
        var year = new Date(this.nowTripDate).getFullYear();
        var month = new Date(this.nowTripDate).getMonth()+1;

        if(direction == 'prev'){
          if(month - 1 != 0){
            actDate = year + '-' + (month - 1);
          }else{
            actDate = year - 1 + '-' + 12;
          }
        }else{
          if(month + 1 > 12){
            actDate = year + 1 + '-' + 1;
          }else{
            actDate = year + '-' + (month + 1);
          }
        }

        this.getDataList(actDate,this.nowType);
      },
      /**
       * 获取行程列表
       * @param tripDate 行程日期 2019-04
       * @param nowType 行程分类ID
       * @returns
       */
      async getDataList (tripDate){

        let params = {
          date:tripDate ? tripDate : this.nowTripDate,
          star_id: this.$route.query.star_id,
          star_branch: this.arrToString(this.nowTypeIds),
          platform:'web',
        };
        let res = await this.$api.star.getTripList({params});
        if(res.code == 200){
          this.dataList = res.data.list; //行程列表
          this.dataType = res.data.branch_list; //行程分类
          this.nowTripDate = res.data.now_date; //行程日期
          this.nowDateString = res.data.now_date_string; //行程日期字符串格式

        }else{
          this.$Message.error(res.message);
        }

      },
      addType(nowType){
        if(!this.oneOf(nowType, this.nowTypeIds)){
          this.nowTypeIds = this.nowTypeIds.concat(nowType);
        }else{
          this.nowTypeIds = this.removeArrKey(nowType, this.nowTypeIds);
        }
        console.log(this.nowTypeIds);
      },
      oneOf (value, validList) {
        for (let i = 0; i < validList.length; i++) {
          if (value === validList[i]) {
            return true;
          }
        }
        return false;
      },
      removeArrKey(key, arr){
        let arrList = arr;
        for (let i = 0; i < arrList.length; i++) {
          if (key === arrList[i]) {
            arrList.splice(i,1);
          }
        }
        return arrList;
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
          position relative;

          &:hover{
            .sizer{
              display block;
            }
          }

          .sizer{
            display none;
            position absolute;
            top:24px;
            right:0px;
            z-index 30;
            width:280px;
            padding:12px 0;
            min-height:80px;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 8px 0px rgba(0,0,0,0.08),0px 0px 0px 1px rgba(0,0,0,0.03);
            border-radius:4px;

            .item{
              width:100%;
              padding:0 12px;
              height:40px;
              display flex;
              align-items center;
              font-size:14px;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:#2D2F33;
              line-height:20px;

              &:hover{
                background:#F7F8FA;
              }

              img{
                margin-right:12px;
              }
            }
          }

          .buttons{
            margin-top:20px;
            display flex;
            justify-content space-around;
            align-items center;
            font-size:13px;
            font-family:PingFangSC-Medium;
            font-weight:500;

            .rest{
              width:122px;
              height:30px;
              border-radius:17px;
              border:1px solid #0D8DFC;
              color:#0D8DFC;
              line-height:30px;
              text-align center;
            }
            .submit{
              width:122px;
              height:30px;
              background:#0D8DFC;
              border-radius:20px;
              color:#fff;
              line-height:30px;
              text-align center;
            }
          }
        }
      }

      .star-trip-day{
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        padding: 0 20px;

        .month{
          display inline-block;
          width:222px;
          height:36px;
          background:#F7F8FA;
          border-radius:18px;
          font-size:16px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:#2D2F33;
          line-height:36px;
        }

        i.iconfont {
          font-size: 20px;
          color: #5A5E68;
        }
      }



      .trip-list{
        margin-top:10px;
        padding:4px 15px;
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
          margin-bottom:10px;
          width:600px;
          height:60px;
          padding-right:18px;
          border-radius:30px;
          font-family:PingFangSC-Regular;
          border:1px solid #F0F1F2;
          display flex;
          align-items center;
          justify-content space-between;

          .item-left{
            display flex;
            align-items center;

            &.active{
              .day,.week{
                color:#0D8DFC;
              }
            }
            &.finish{
              .day,.week{
                color:#A8ABB3;
              }
              .title{
                color: #A8ABB3
              }
            }


            .day{
              width:72px;
              height:24px;
              font-size:17px;
              font-family:PingFangSC-Semibold;
              font-weight:600;
              color:#656973;
              line-height:24px;
              text-align center;

            }
            .week{
              width:72px;
              height:17px;
              font-size:12px;
              color:#2D2F33;
              line-height:17px;
              text-align center;
            }
            .title{
              height:20px;
              font-size:14px;
              color:#2D2F33;
              line-height:20px;
            }
            .time-address{
              height:17px;
              font-size:12px;
              color:#D2D4D9;
              line-height:17px;
            }

          }

        }

      }
    }


    @media all and (max-width:768px){
      .score_star_left{
        width 100%;
      }
      .score_star_main{
        margin:0;
      }
      .score-star-trip {
        .trip-list {
          padding-top: 0px;

          .item:nth-child(odd) {
            padding-left: 0px;
            border-right: 0px solid transparent;
          }
          .item {
            width: 100%;
            margin:0 auto;
            margin-top:10px;
            padding-left: 0px;
            border-bottom:1px solid #F0F1F2;

            .item-left{}

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
      }
    }

  }
</style>
