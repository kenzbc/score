<template>
  <div class="search_circle_all-list">
    <div class="search_circle_wrap moment_all_circle" v-for="item in dataList">
      <img :src="item.circle_avatar_background ? item.circle_avatar_background : '/static/images/moment/bg.png'" class="search_circle_bg" width="100%">
      <div class="search_circle_main">
        <a href="/c/44" target="_blank" class="search_circle_pic">
          <img :src="item.circle_picture ? item.circle_picture : '/images/default_avatar.jpg'" width="100%">
        </a>
        <p class="search_circle_name"><a href="/c/44" target="_blank">{{item.circle_name}}</a></p>
      </div>
      <div class="search_circle_count">
        <a href="/c/44" target="_blank">
          <span class="iconfont-text">粉丝</span>
          <span class="fan-num">{{item.fans_num}}</span>
        </a>
        <span class="search_circle_count_line"></span>
        <a href="/c/44" target="_blank">
          <span class="iconfont-text">贴子</span>
          <span class="fan-num">{{item.dynamic_num}}</span>
        </a>
      </div>
      <p class="search_circle_btn_wrap">
        <a href="javascript:;" class="btn-button" v-if="item.is_attention == '0'" @click="setJoinCircleAttention(item.circle_id)" id="abtn_44">加入</a>
        <a href="javascript:;" class="btn-button active" v-if="item.is_attention == '1'" @click="setCancelCircleAttention(item.circle_id)">已加入</a>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "moment-son",
    components: {},
    props:{
      dataList:{
        type: Array,
        default: ()=> []
      }
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {
      //加入圈子
      async setJoinCircleAttention(circleId){
        let res = await this.$api.circle.setJoinCircleAttention({params:{circle_id:circleId}});

        if(res.code == '200'){
          this.$Message.success('关注成功!');
          this.$emit('reload')
        }else{
          this.$Message.warning(`关注失败! ${res.message}`);
        }

      },
      //退出圈子
      async setCancelCircleAttention(circleId){
        let res = await this.$api.circle.setCancelCircleAttention({params:{circle_id:circleId}});

        if(res.code == '200'){
          this.$Message.success('取消成功!');
          this.$emit('reload')
        }else{
          this.$Message.warning(`取消失败! ${res.message}`);
        }
      },
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .search_circle_all-list {

  }

  .moment_all_circle {
    position: relative;
    width: 310px;
    height: 164px;
    float: left;
    margin: 0 10px 20px;
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.04);
    border-radius: 4px;
    overflow hidden;

    .search_circle_bg {
      height: 64px;
    }

    .search_circle_main {
      position: relative;

      .search_circle_name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-bottom: 14px;
      }

      .search_circle_pic {
        display: inline-block;
        width: 90px;
        height: 90px;
        position: absolute;
        top: -45px;
        left: 16px;
        border-radius: 50%;
        box-shadow: 0 1px 0px 0 rgba(0,0,0,0.04);

        img {
          background: #fff;
          border: 3px solid #FFFFFF;
          border-radius: 50%;
          height: 90px;
        }
      }

      p {
        padding-top: 12px;
        border-bottom: 1px solid #F0F1F2;
        font-size: 16px;
        color: #2D2F33;
        margin-left: 122px;
        margin-right: 20px;
        overflow: hidden;
        text-align: left;
      }
    }

    .search_circle_count {
      line-height: 24px;
      font-size: 14px;
      padding: 14px 0 0 0;
      margin-left: 122px;
      text-align: left;

      a {
        color: #999;

        .fan-num {
          font-size: 13px;
          color: #2D2F33;
        }
      }

      .iconfont-text {
        font-size: 13px;
        color: #A8ABB3;
        margin-right: 8px;
      }

    }

    .search_circle_btn_wrap {
      position: absolute;
      left: 21px;
      bottom: 15px;

      .btn-button {
        width: 80px;
        border: 1px solid #0D8DFC;
        border-radius: 20px;
        height: 28px;
        line-height: 26px;
        text-align: center;
        font-size: 13px;
        color: #0D8DFC;
        display: block;
      }

      .active {
        background: #0D8DFC;
        color: #fff !important;
      }

    }
  }






  @media all and (max-width: 768px) {
    .moment_all_pic {
      display: block;
      width: 110px !important;
      height: 110px !important;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      background: #fff;
      top: -48px !important;
      left: 24px !important;
      background: #FCFCFC;
      border: 3px solid #FFFFFF;
    }

    .moment_all_main {
      width: 660px;
      margin: 0 auto;
    }

    .moment_all_title .moment_all_title-left {
      width: 60%;
    }

    .moment_all_title .moment_all_title-right {
      width: 40%;
      margin-top: 15px;
      padding-left: 22px;
      position: relative;
    }
  }

  @media all and (max-width: 767px) {
    .moment_all_wrap {

      padding: 0 12px 0;
      border-radius: 0;
    }

    .moment_all_title .user-right {
      margin-left: 10px;
    }

    .moment_all_main {
      width: 100%;
      margin: 0 auto;
    }

    .moment_all_main {
      margin: 0;
      padding: 0;
      border-bottom: none;
    }

    .moment_all_title {

    }

    .moment_all_title .moment_all_title-left .moment-all-desc-left {
      float: none;
      width: 100%;
      margin-left: 8px;
    }

    .moment_all_title div.f-left {
      border-right: none;
    }

    .moment_all_title_length {
      width: 90%;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .moment_all_title .moment_all_endro {
      border-bottom: 1px solid #F0F1F2;
      padding-bottom: 0px;
      height: 20px;
    }

    .moment_all_user {
      padding-top: 0;
    }

    .moment_all_title_text {
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      color: #0D8DFC;
      margin-left: 4px;
    }

    .moment_all_title .moment_all_title-right {
      margin-top: 4px;
      padding-bottom: 100px;
    }

    .moment_all_title ul {
      width: 100%;
      height: auto;
      padding: 0 21px 0 0px;
    }

    .moment_all_title_avatar {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .moment_all_title ul li:first-child {
      margin-top: 5px;
    }

    .moment_all_title ul li {
      height: 34px;
      line-height: 34px;
      font-size: 13px;
      color: #333333;
    }

    .moment_all_title ul li a {
      display: inline-block;
    }

    /* .moment_all_circle,
     .moment_all_title div {
         margin: 0;
         padding: 0;
     }*/
    .moment_all_title_icon {
      text-align: center;
      margin: 0 20px 0 12px;
      font-size: 13px;
      color: #FF5C5C;
      width: 80px;
      height: 40px;
      float: none;
    }

    .moment_all_title_icon i {
      font-size: 32px;
      color: #0D8DFC;
      display: inline-block;
      vertical-align: middle;
    }

    .moment_all_circle {
      margin: 20px auto 0;
      width: 90%;
      float: none;
    }

    .search_circle_pic {
      display: inline-block;
      width: 90px;
      height: 90px;
      position: absolute;
      top: -45px;
      left: 16px;
    }

    .search_circle_name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-bottom: 14px;

      p {
        padding-top: 12px;
        border-bottom: 1px solid #F0F1F2;
        font-size: 16px;
        color: #2D2F33;
        margin-left: 122px;
        margin-right: 20px;
        overflow: hidden;
        text-align: left;
      }
    }

    .search_circle_count {
      line-height: 24px;
      font-size: 14px;
      padding: 7px 0 0 0;
      margin-left: 122px;
      text-align: left;
    }



    .search_circle_btn_wrap {
      position: absolute;
      left: 21px;
      bottom: 15px;
    }

    .moment_all_circle {
      height: 164px;
    }

    .search_circle_pic img {
      background: #fff;
      border: 3px solid #FFFFFF;
      border-radius: 50%;
      height: 90px;
    }

    .search_circle_bg {
      height: 70px;
    }

    .moment_all_cont-bg {
      height: 90px;
      background-size: 100% 100%;
    }

    .moment_all_title {
      height: 100%;
      position: relative;
      display: table;
    }

    .moment_all_title h3 {
      margin-top: 10px;
      font-size: 16px;
      margin-left: 130px;
      margin-bottom: 0;
    }

    .moment_all_title .user-left {
      margin-left: 0;
      font-size: 13px;
      color: #2D2F33
    }

    .moment_all_title .moment_all_title-left {
      width: 100%;
    }

    .moment_all_title .moment_all_title-right {
      width: 100%;
      max-width: 100%;
      border: none;
    }

    .moment_all_title .moment_all_title-right:before {
      color: #F00;
      position: absolute;
      top: 5px;
      left: 0;
      width: 0;
      height: 80px;
      background: #F0F0F0;
    }

    .moment_all_title .moment_all_title-right:after {
      color: #F00;
      position: absolute;
      top: 5px;
      right: 0;
      width: 0;
      height: 80px;
      background: #F0F0F0;
    }

    .moment_all_title .moment_all_endro, .moment_all_title .moment_all_user {
      color: #333333;
      font-size: 10px;
      margin-left: 130px;
      width: 50%;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .moment_all_title .moment_all_endro {
      margin-top: 2px;
    }

    .moment_all_title .moment_all_user {
      margin-top: 5px;
      height: 20px;
    }

    .moment_all_title .moment_all_user .moment_all_user-message {
      border-radius: 4px;
      line-height: 20px;
      position: absolute;
    }

    .moment_all_title div.f-left .parent_attention_btn {
      position: absolute;
      right: 0px;
      top: auto;
      bottom: 24px;
      left: 6%;
      z-index: 10;
    }

    .search_circle_btn {
      display: inline-block;
      line-height: 24px;
      font-size: 13px;
      color: #0D8DFC;
      text-align: center;
      border: 1px solid #0D8DFC;
      border-radius: 30px;
      width: 94%;
      height: 50px;
      text-align: center;
      line-height: 48px;
    }

    .search_circle_btn1 {
      display: inline-block;
      line-height: 24px;
      font-size: 13px;
      color: #805618;
      text-align: center;
      background: #FFEB79;
      border: 1px solid #FFD651;
      border-radius: 30px;
      width: 94%;
      height: 50px;
      text-align: center;
      line-height: 48px;
    }

    .btn_active {
      background: #0D8DFC;
      border: 1px solid #0D8DFC;
      border-radius: 30px;
      font-size: 13px;
      color: #fff;
    }
  }

  @media all and (max-width: 320px) {
    .moment_all_title .user-left {
      display: block;
    }

    .moment_all_title .user-right {
      display: block;
      margin-left: 0px;
    }
  }

</style>
