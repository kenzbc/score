<template>
  <div class="post_slide_user" style="display: block;">
    <h4 class="score_slide_title title">
      活跃用户
    </h4>
    <ul class="card_ul">
      <li v-for="item in hotUserList">
        <nuxt-link :to="'/u/'+item.member_id">
          <div class="card_body post_user_body">
            <div class="card_left fll">
              <img :src="item.avatar ? item.avatar : '/static/images/tx_pic.jpg'" class="avatar" alt="">
            </div>
            <div class="card_text fll"><p class="title"><nuxt-link :to="'/u/'+item.member_id">{{item.nickname}}</nuxt-link></p></div>
            <div class="card_right flr">
              <p>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-hotcomment"></use>
                </svg>
                {{item.hot}}
              </p>
            </div>
            <div class="certified" v-if="item.type == '1'"><img src="/static/images/member/v.png" alt="认证"></div>
            <div class="certified" v-if="item.type == '2'"><img src="/static/images/member/staff.png"></div>
            <div class="clear"></div>
          </div>
        </nuxt-link>
      </li>


    </ul>
  </div>
</template>

<script>
  export default {
    name: "hot-user-slide",
    components: {},
    props:{
      hotUserList:{
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


  .post_slide_user{
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

    .card_ul li:hover,
    .card_ul li:active {
      background-color: #f7f8fa;
    }
    .card_ul {
      padding-bottom: 10px;


      li {
        padding: 0 15px;

        .card_body {
          border-bottom: 1px dotted #f0f1f2;
          overflow: hidden;
        }

        .post_circle_body {
          padding: 10px 0;
          cursor: pointer;

          .card_left {
            width: 40px;
            height: 40px;
            margin-right: 15px;
            overflow: hidden;

            .avatar{
              width 40px;
            }
          }

          .card_text {
            width: calc(100% - 55px);
            padding: 1px 0;

            p {
              line-height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            p.dec {
              line-height: 18px;
              font-size: 12px;
              color: #a8abb3;
            }
          }
        }
      }
    }



    img {
      width: 100%;
    }

    .post_user_body {
      padding: 10px 0;
      cursor: pointer;
      position: relative;
      border-bottom: 1px dotted #f0f1f2;
      overflow: hidden;


    }
    .certified {
      position: absolute;
      left: 26px;
      top: 36px;
      width: 16px;
      height: 16px;
    }

    .card_left {
      width: 40px;
      height: 40px;
      margin-right: 15px;
      border-radius: 50%;
      overflow: hidden;

    }

    .card_text {
      width: calc(100% - 155px);

      p {
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .card_right {
      margin: 9px 0;
      height: 22px;
      background: #fff0f1;
      border-radius: 16px;
      overflow: hidden;
      padding: 0 10px 0 6px;

      p {
        text-align: center;
        line-height: 22px;
        font-size: 12px;
        color: #ff5c69;
      }

      svg {
        width: 20px;
        height: 20px;
        margin-bottom: -3px;
      }
    }
  }

</style>
