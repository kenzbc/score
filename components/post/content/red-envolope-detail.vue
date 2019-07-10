<template>
  <div class="list-items-redenvolope detail" v-if="detail">
    <a style="display:inline-block;" :href="'http://img1.famulei.com/active/redEnvelope/index.html?ssdb_key='+detail.ssdb_key" target="_blank">
      <div class="items-redenvolope-cont">
        <div class="redenvolope-cont-top cl">
          <div class="redenvolope-top-left fl">
            <img class="redenvolope-avatar" :src="detail.member_avatar">
            <p class="redenvolope-name">{{detail.member_nickname}}</p>
          </div>
          <div class="redenvolope-top-right fr">
            <p class="redenvolope-type" v-if="detail.currency_type == 0">拼手气红包<img class="redenvolope-type-img" src="/static/images/dynamic/icon_pin@2x.png" alt="拼手气红包"></p>
            <p class="redenvolope-type" v-if="detail.currency_type == 1">普通红包<img class="redenvolope-type-img" src="/static/images/dynamic/icon_putong@2x.png" alt="普通红包"></p>
            <p class="redenvolope-type" v-if="detail.currency_type == 2">口令红包<img class="redenvolope-type-img" src="/static/images/dynamic/icon_ling@2x.png" alt="口令红包"></p>
          </div>
        </div>
        <div class="redenvolope-cont-middle">{{detail.desc}}</div>
      </div>
    </a>
  </div>
</template>

<script>
  // 红包帖子
  export default {
    name: "red-envolope-detail",
    components: {},
    props:{
      detail:{
        type: Object,
        default: ()=>{}
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
  .detail{
    margin: 10px 0 0 0px;

    .items-redenvolope-cont {
      width: 343px;
      height: 140px;
      background: url(/images/lucky-money-bg@2x.png) no-repeat;
      background-size: 100% 100%;

      .redenvolope-cont-top{
        display: flex;
        justify-content: space-between;

        .redenvolope-top-left {
          display: flex;
          align-items center;
          justify-content: space-between;
          margin: 11px 0 0 12px;

          .redenvolope-avatar {
            height: 32px;
            width: 32px;
            border-radius: 50%;
            background: #fff;
            border: 2px solid #ffdd8d;
          }
          .redenvolope-name {
            margin-left: 5px;
            display: inline-block;
            font-size: 14px;
            font-weight 600;
            color: #ffdd8d;
          }
        }


        .redenvolope-top-right {
          margin: 8px 14px 0 0;
          display: flex;
          align-items center;


          .redenvolope-type {
            display: inline-flex;
            align-items center;
            font-size: 14px;
            color: #fff;
            font-weight 600;
            margin-right: 3px;

            .redenvolope-type-img {
              margin-left:6px;
              height: 18px;
              width: 18px;
              border-radius: 4px;
            }
          }

        }

      }


      .redenvolope-cont-middle{
        margin: 40px 0 0 0;
        font-size: 16px;
        color: #ffdd8d;
        text-align: center;
      }
    }


  }

</style>
