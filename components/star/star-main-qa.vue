<template>
  <div class="star_article_list star_qa_list">
    <ul class="index_article_list">
      <li class="index_v4_qa" data-id="7117" v-for="item in list">
        <div class="index_article_border">
          <p class="index_v4_qa_top gray_3">
            来自 <a :href="'/u/'+item.qa.member_id" target="_blank" class="gray_3">{{item.qa.nickname}}</a> 的问题
            <span class="asker_price gray_3 flr">
              {{item.qa.profit_diamond}}
              <i class="iconfont icon-icon_zuanshi icon_zuanshi gray_3"></i>
            </span>
          </p>
          <a :href="'/p/'+item.dynamic_id" target="_blank" class="index_v4_qa_title">{{item.title}}</a>
          <div class="index_v4_qa_main">
            <a :href="'/u/'+item.qa.asked_member_id" target="_blank" class="index_v4_qa_pic fll">
              <img :src="item.qa.asked_avatar ? item.qa.asked_avatar : '/static/images/tx_pic.jpg'" class="star_qa_img">
              <img v-if="item.broadcast_info.type == '1'" src="/static/images/member/v.png" class="score_member_type">
              <img v-if="item.broadcast_info.type == '2'" src="/static/images/member/staff.png" class="score_member_type">
            </a>
            <div class="index_v4_qa_right fll">
              <!--语音-->
              <a v-if="item.type.indexOf('sound') > 0" :href="'/p/'+item.dynamic_id" target="_blank" class="index_v4_qa_sound ">
                <i class="iconfont icon-general__voice"></i>
                <span class="index_v4_qa_sound_info">{{item.qa.is_limit == 0 ? item.qa.listen_diamond+'钻石偷偷听' : '限免中  点击偷听'}}</span>
                <span class="index_v4_qa_sound_time">{{item.sound[0].seconds}}″</span>
              </a>
              <!--视频-->
              <a v-if="item.type.indexOf('video') > 0" :href="'/p/'+item.dynamic_id" target="_blank" class="index_v4_qa_video">
                <img :src="item.video[0].image_url ? item.video[0].image_url+'?x-oss-process=image/resize,m_fill,h_135,w_240' : '/images/img_null.png'"
                     class="index_v4_qa_video_pic">
                <p class="index_v4_qa_video_info">
                  <span>{{item.qa.is_limit == 0 ? item.qa.listen_diamond+'钻石偷偷看' : '限时免费'}}</span>
                  <span class="flr">{{item.video[0].seconds}}″</span>
                </p>
              </a>

              <p class="index_v4_qa_info gray_3">
                <a :href="'/u/'+item.qa.asked_member_id" target="_blank" class="gray_3">{{item.qa.asked_nickname}}</a>
                回答于{{item.qa.answer_time}}
                <span class="gray_3 flr"><i class="iconfont icon-general__headphone gray_3"></i>{{item.qa.listen_num}}</span>
                <span class="gray_3 flr"><i class="iconfont icon-general__good gray_3"></i>{{item.qa.praise_num}}</span>
              </p>
            </div>
          </div>
        </div>
      </li>



    </ul>

  </div>
</template>

<script>
  export default {
    name: "star-main-qa",
    components: {},
    props:{
      list:{
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
  .star_qa_list{
    width 100%;
    display flex
    flex-wrap wrap


    .index_article_list {
      width 100%;
      display: flex;
      flex-wrap wrap;

      li {
        width 100%;
        display: flex;
        flex-wrap wrap;
        cursor: pointer;
        padding: 0px 15px;

        .index_article_border {
          width 100%;
          border-bottom: 1px dotted #F0F1F2;
          padding: 10px 0;

          .index_v4_qa_top {
            line-height: 24px;
            font-size: 12px;
            margin-bottom: 4px;

            i {
              font-size: 12px;
              vertical-align: top;
              margin-left: 4px;
            }
          }


          .index_v4_qa_title {
            display: block;
            line-height: 24px;
            font-weight: bold;
            font-size: 16px;
            padding-bottom: 8px;
            margin-bottom: 4px;
          }
          .index_v4_qa_main {
            .index_v4_qa_pic {
              width: 50px;
              position: relative;
              margin-right: 14px;

              img.star_qa_img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
              }
              img.score_member_type {
                width: 20px;
                height: 20px;
                position: absolute;
                right: -2px;
                bottom: -2px;
              }
            }


            .index_v4_qa_right {
              width: calc(100% - 64px);

              .index_v4_qa_sound {
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

                .index_v4_qa_sound_info {
                  font-size: 12px;
                  color: #fff;
                }
                .index_v4_qa_sound_time {
                  font-size: 12px;
                  color: #fff;
                  float: right;
                }
              }


              .index_v4_qa_video {
                display: block;
                width: 240px;
                border-radius: 10px;
                margin-bottom: 8px;
                position: relative;
                overflow: hidden;

                &:before {
                  content: "";
                  width: 50px;
                  height: 50px;
                  background: url(/static/images/video/video-icon.png) no-repeat;
                  background-size: 100% 100%;
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%,-50%);
                  z-index: 3;
                }

                .index_v4_qa_video_pic {
                  display: block;
                  width: 100%;
                }
                .index_v4_qa_video_info {
                  width: 100%;
                  line-height: 24px;
                  padding: 4px;
                  position: absolute;
                  left: 0;
                  bottom: 0;
                  z-index: 3;

                  span {
                    display: inline-block;
                    font-size: 12px;
                    color: #fff;
                    padding: 0 4px;
                  }
                }

              }

              .index_v4_qa_info {
                width: 100%;
                line-height: 22px;
                font-size: 12px;
                color: #c4c8cf;

                i {
                  font-size: 12px;
                  vertical-align: top;
                  margin-right: 4px;
                }
                a {
                  margin-right: 12px;
                }

                span {
                  display: inline-block;
                  padding-left: 16px;
                }
              }

            }

          }

        }
      }
    }
  }
</style>
