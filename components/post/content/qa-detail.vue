<template>
  <div class="qa-detail">
      <p class="qa_top gray_3"> 来自
        <a href="/u/74703" target="_blank" class="gray_3">墨小黑的小马甲</a> 的问题
        <span class="asker_price gray_3 flr">160
          <i class="iconfont icon-icon_zuanshi icon_zuanshi gray_3"></i>
        </span>
      </p>

      <a href="/p/6998" target="_blank" class="qa_title">5555</a>

      <div class="qa_main">
        <a href="/u/74658" target="_blank" class="qa_pic fll">
          <img src="https://img1.famulei.com/z/74658/p/167/2915121046281_100x100.jpg" class="star_qa_img">
          <img src="/static/images/member/v.png" class="score_member_type">
        </a>
        <div class="qa_right fll">
          <!--语音-->
          <a href="/p/6998" target="_blank" class="qa_sound ">
            <i class="iconfont icon-general__voice"></i>
            <span class="index_v4_qa_sound_info">10钻石偷偷听</span>
            <span class="index_v4_qa_sound_time">3″</span>
          </a>
          <p class="qa_info gray_3">
            <a href="/u/74658" target="_blank" class="gray_3">墨小黑1</a>
            回答于2017-09-06
            <span class="gray_3 flr">
              <i class="iconfont icon-general__headphone gray_3"></i>4
            </span>
            <span class="gray_3 flr">
              <i class="iconfont icon-general__good gray_3"></i>2
            </span>
          </p>
        </div>
      </div>

    </div>

</template>

<script>
  //问答帖子 list item
  export default {
    name: "qa-detail",
    components: {},
    props:{
      item:{
        type:Object,
        default:()=>{}
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
  .qa-detail{
    padding: 10px 16px;
    display block
    overflow: hidden;
    border-top: 1px dotted #f0f1f2;

    .qa_top {
      line-height: 24px;
      font-size: 12px;
      margin-bottom: 4px;

      i {
        font-size: 12px;
        vertical-align: top;
        margin-left: 4px;
      }
    }

    .qa_title {
      display: block;
      line-height: 24px;
      font-weight: bold;
      font-size: 16px;
      padding-bottom: 8px;
      margin-bottom: 4px;
    }


    .score_member_type {
      width: 16px;
      height: 16px;
      position: absolute;
      right: -2px;
      bottom: -2px;
    }

    .qa_main{
      display block;

      .qa_pic {
        width: 50px;
        position: relative;
        margin-right: 14px;

        .star_qa_img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .score_member_type {
          width: 20px;
          height: 20px;
        }
      }

      .qa_right {
        width: calc(100% - 64px);
        min-height: 55px;

        .qa_sound .qa_sound_info {
          font-size: 12px;
          color: #fff;
        }
        .qa_sound .qa_sound_time {
          font-size: 12px;
          color: #fff;
          float: right;
        }

        .qa_sound {
          display: block;
          width: 260px;
          height: 30px;
          line-height: 28px;
          text-align: center;
          color: #fff;
          background-image: linear-gradient(-135deg, #0f96ff 0%, #0d7eff 100%);
          border-radius: 12px;
          position: relative;
          padding: 0 8px 0 12px;
          margin-bottom: 6px;

          i {
            font-size: 12px;
            color: #fff;
            float: left;
          }
        }


        .qa_info {
          width: 100%;
          line-height: 22px;
          font-size: 12px;
          color: #c4c8cf;

          a {
            margin-right: 12px;
          }
          span {
            display: inline-block;
            padding-left: 16px;
          }
          i {
            font-size: 12px;
            vertical-align: top;
            margin-right: 4px;
          }
        }
      }
    }


  }

</style>
