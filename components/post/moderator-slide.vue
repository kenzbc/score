<template>
  <div class="moderator-message">
    <div class="moderator-message-top">
      <div class="moderator-top-left">
        <span class="moderator-top-left-line"></span>
        <span class="moderator-top-left-text">版主</span>
      </div>
    </div>

    <div class="moderator-middle">
      <div class="moderator-middle-line"></div>
      <div class="moderator-list">
        <div class="moderator-middle-item" v-for="item in bmList">
          <a :href="'/u/'+item.member_id">
            <img class="moderator-middle-img" :src="item.avatar ? item.avatar : '/static/images/tx_pic.jpg'" :alt="item.nickname">
            <p class="moderator-middle-text">{{item.nickname}}</p>
          </a>
        </div>

      </div>
      <div class="moderator-middle-open">展开 <i class="iconfont icon-down  icon-general__arrow_bel"></i></div>
    </div>
  </div>


</template>

<script>
  export default {
    name: "moderator-slide",
    components: {},
    props:{
      bmList:{
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

  .moderator-message {
    background: #fff;
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 2px;

    .moderator-message-top {
      display flex
      justify-content space-between
      padding: 10px 13px 10px 14px;

      .moderator-top-left-line {
        display: inline-block;
        height: 12px;
        width: 4px;
        background: #0d8dfc;
        vertical-align: middle;
      }
      .moderator-top-left-text {
        line-height: 20px;
        margin-left: 3px;
        font-size: 15px;
        color: #2d2f33;
        font-weight: bold;
      }
    }

    .moderator-middle{
      .moderator-middle-line {
        height: 1px;
        background: #f0f1f2;
        margin: 0 15px;
      }
      .moderator-list{
        display flex
        flex-wrap wrap;

        .moderator-middle-item {
          position: relative;
          padding: 16px 0 0 0;
          width: calc(100% / 3);
          text-align: center;

          .moderator-middle-img {
            height: 50px;
            width: 50px;
            border-radius: 50%;
          }
          .moderator-middle-text {
            margin-top: 8px;
            font-size: 14px;
            color: #2d2f33;
            line-height: 20px;
            word-wrap: break-word;
            height: 40px;
          }
        }


      }


      .moderator-middle-open {
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-top: 1px solid #f5f6f7;
        font-size: 13px;
        color: #a8abb3;

        .icon-down {
          margin-left: 1px;
          font-size: 12px;
          display: inline-block;
          vertical-align: 1px;
        }
      }
    }
  }


</style>
