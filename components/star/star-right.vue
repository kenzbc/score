<template>
  <div class="score_star_right">

    <div class="score_slide_wrap star_slide_trip_wrap">
      <h4 class="score_slide_title">最近行程</h4>
      <ul class="score_slide_main" id="slide_trip_list">
        <li v-for="item in data.trip_list">

          <a :href="item.type == '1' ? '/p/'+item.web_url :
             item.type == '2' ? '/match/'+item.web_url :
             item.type == '3' ? item.web_url : 'javascript:;'">

            <!--<a  href="/match?matchID=6684">-->
            <div class="score_slide_border star_slide_trip cl">
              <p class="star_slide_trip_day fll" :class="item.week == '今天' ? 'active' : 'gray_2'">
                <span>{{item.d}}</span><br>
                {{item.week}}
              </p>
              <div class="star_slide_trip_info fll">
                <p class="star_slide_trip_name">{{item.title}}</p>
                <p class="star_slide_trip_part gray_3">
                  <span class="fll">{{item.time}}</span>
                  {{item.place}}
                </p>
              </div>
            </div>
          </a>
        </li>

      </ul>
    </div>


    <div class="score_slide_wrap star_slide_member_wrap">
      <h4 class="score_slide_title">阵容</h4>
      <ul class="score_slide_main">

        <li v-for="item,index in memberList">
          <div class="score_slide_border star_right_player cl">
            <a :href="'/u/'+item.member_id" class="fll">
              <img :src="item.avatar" class="star_right_player_avatar fll">
              <img v-if="item.type == '1'" src="/static/images/member/v.png" class="star_right_staff">
              <img v-if="item.type == '2'" src="/static/images/member/staff.png" class="star_right_staff">
              <div class="fll">
                <p class="star_right_player_name">{{item.nickname}}</p>
                <p class="star_right_player_summary gray_3">{{item.demo}}</p>
              </div>
            </a>
            <a href="javascript:" class="star_right_player_btn flr"
               :class="{'active' : item.is_attention}"
               @click="attentionMember(item.member_id, item.is_attention, index)">
              {{item.is_attention == '1' ? '已关注' : '关注'}}
            </a>
          </div>
        </li>


      </ul>
    </div>


    <div class="score_slide_wrap">
      <div class="star_slide_download cl">
        <img src="/static/images/star/we_code.png" class="star_slide_twocode fll">
        <div class="star_slide_download_info flr">
          <img src="/static/images/score.png" class="">
          <p><span>最新的电竞资讯</span><span class="flr">独家的战队动态</span></p>
          <p><span>最全的赛事数据</span><span class="flr">超多的专属周边</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "star-right",
    components: {},
    props:{
      data:{
        type: Object,
        default: ()=>{}
      }
    },
    data() {
      return {
        memberList:[],
      }
    },
    watch:{
      watch:{
        data(newVal, oldVal){
          this.memberList = newVal.member_list;
        }
      },
    },
    mounted() {
      this.memberList = this.data.member_list;
    },
    methods: {
      async attentionMember(memberId, isAtt, index){
        let params = {
          attention_member_id: memberId
        };
        let res;
        if(isAtt == 1){
          res = await this.$api.member.unAttention({params});
        }else{
          res = await this.$api.member.setAttention({params});
        }

        if(res.code == '200'){
          this.$Message.success(res.message);
          if(isAtt == 1){
            this.memberList[index].is_attention = 0;
          }else{
            this.memberList[index].is_attention = 1;
          }
        }else{
          this.$Message.error(res.message);
        }
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>

  .score_star_right{
    width: 280px;
    float: right;
  }

  .score_slide_wrap {
    background: #FFFFFF;
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 2px;
    margin-bottom: 12px;

    .score_slide_title {
      line-height: 40px;
      border-bottom: 1px solid #F0F1F2;
      position: relative;
      margin: 0 12px;
      padding-left: 14px;

      &:before {
        content: '';
        display: block;
        width: 4px;
        height: 12px;
        background: #0D8DFC;
        position: absolute;
        left: 2px;
        top: 14px;
      }
    }

    .score_slide_main {

      li {
        padding: 0 12px;
        .score_slide_border {
          line-height: 24px;
          border-bottom: 1px dotted #F0F1F2;
          padding: 8px 0;
          display flex
          justify-content space-between;
        }


        .star_slide_trip{
          .star_slide_trip_day {
            width: 40px;
            line-height: 16px;
            text-align: center;
            font-size: 12px;
            margin-right: 16px;
            padding-bottom: 4px;

            &.active {
              color: #0D8DFC;
            }

            span {
              line-height: 24px;
              font-size: 17px;
            }
          }

          .star_slide_trip_info {
            width: 200px;

            .star_slide_trip_name {
              line-height: 24px;
            }
            .star_slide_trip_part {
              line-height: 16px;
              font-size: 12px;

              span {
                margin-right: 8px;
              }
            }
          }

        }



        .star_right_player {
           position: relative;

          .star_right_staff {
            position: absolute;
            height: 14px;
            width: 14px;
            bottom: 6px;
            left: 24px;
          }

          img.star_right_player_avatar {
            display: block;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin-right: 8px;
          }

          .star_right_player_name {
            line-height: 20px;
            font-size: 14px;
          }
          .star_right_player_summary {
            max-width: 133px;
            height: 16px;
            line-height: 16px;
            font-size: 12px;
            overflow: hidden;
          }
          .star_right_player_btn {
            width: 64px;
            height: 28px;
            line-height: 28px;
            font-size: 12px;
            color: #0D8DFC;
            text-align: center;
            border: 1px solid #0D8DFC;
            border-radius: 100px;
            margin-top: 5px;

            &.active {
              color: #fff;
              background: #0D8DFC;
            }
          }

        }


      }
    }


    .star_slide_download {
      display: flex;
      justify-content space-between;
      padding: 12px;

      .star_slide_twocode {
        width: 70px;
        height: 70px;
      }

      .star_slide_download_info {
        width: 176px;

        img {
          width: 70px;
          margin-left: -4px;
        }
        p {
          line-height: 16px;
          font-size: 12px;
        }
      }
    }

  }



</style>
