<template>
  <div class="share-modal comments" v-if="show">
    <div class="close-btn" @click="close">×</div>

    <div v-if="loadingDialog" style="background:rgba(0, 0, 0, 0.46);position:fixed;left:0px;top:0px;width:100%;height:100%;z-index:9999;">
      <div style="width:200px;height:140px;transform:translate(-50%, -50%);position:absolute;top:50%;left:50%;z-index:50;text-align:center;">
        <div><img width="60" src="/static/images/score_loading.gif"></div>
        <div style="margin-top:10px;color:#fff;">正在创建图片，请稍等...</div>
      </div>
    </div>

    <div class="dialog-container">
      <div class="capture-box" id="capture">
        <div class="dialog-box">

          <div class="title">{{matchInfo.tournament_name}}</div>
          <div class="share-head">
            <img :src="matchInfo.team_a_image_thumb" width="44">
            <span class="team-name">{{matchInfo.team_a_short_name}}</span>
            <div class="vs">VS</div>
            <span class="team-name">{{matchInfo.team_b_short_name}}</span>
            <img :src="matchInfo.team_b_image_thumb" width="44">
          </div>
          <div class="date">{{matchInfo.start_time_string }}</div>

          <div class="text-content">
            <span class="right-line"><img src="/static/images/match/combinedShape@2x.png" width="27"></span>
            <div class="avatar"><img :src="$store.state.modules.login.member_avatar" width="42"></div>
            <div class="nickname">{{$store.state.modules.login.member_nickname}}</div>
            <div class="post-tips">{{matchInfo.comment.update_time ? matchInfo.comment.update_time : matchInfo.comment.add_time | tsToaGo}} 发布了一条 赛评</div>
            <div class="quote-content">
              <img src="/static/images/match/icon_quote-left@2x.png" width="20">
              <div style="width:100%;">
                <div class="share-my-score">
                  <vue-star-score :score="Number(matchInfo.comment.score)" left-distance="2px" font-size="14px" :disabled="true"></vue-star-score>
                  <span class="score-num">{{matchInfo.comment.score}}分</span>
                </div>
                <p class="text">
                  {{matchInfo.comment.content ? matchInfo.comment.content : '还没有发表看法' | stringEllipsis(74) }}
                </p>
              </div>
              <img src="/static/images/match/icon_quote-right@2x.png" width="20" class="fr">
            </div>

            <div class="footer-score">
              <div class="f-title">Score 评分</div>

              <div class="score">
                <div class="count-score">
                  <span class="c-score-text">{{matchInfo.score_average}}</span>
                  <div class="count-star">
                    <vue-star-score :score="matchInfo.score_average" font-size="10px" :disabled="true"></vue-star-score>
                  </div>
                  <span class="count-people">{{matchInfo.score_count}} 人看过</span>
                </div>
                <div class="star-score">
                  <div class="star-list">
                    <span class="star">
                      <vue-star-score :score="5" color="#8991a3" font-size="10px" :disabled="true"></vue-star-score>
                    </span>
                    <span class="progress-bar">
                      <div class="progress" :style="'width:'+matchInfo.score_count_5+'%'"></div>
                    </span>
                    <span class="percent">{{matchInfo.score_count_5}}%</span>
                  </div>
                  <div class="star-list">
                    <span class="star">
                      <vue-star-score :score="4" color="#8991a3" font-size="10px" :disabled="true"></vue-star-score>
                    </span>
                    <span class="progress-bar">
                      <div class="progress" :style="'width:'+matchInfo.score_count_4+'%'"></div>
                    </span>
                    <span class="percent">{{matchInfo.score_count_4}}%</span>
                  </div>
                  <div class="star-list">
                    <span class="star">
                      <vue-star-score :score="3" color="#8991a3" font-size="10px" :disabled="true"></vue-star-score>
                    </span>
                    <span class="progress-bar">
                      <div class="progress" :style="'width:'+matchInfo.score_count_3+'%'"></div>
                    </span>
                    <span class="percent">{{matchInfo.score_count_3}}%</span>
                  </div>
                  <div class="star-list">
                    <span class="star">
                      <vue-star-score :score="2" color="#8991a3" font-size="10px" :disabled="true"></vue-star-score>
                    </span>
                    <span class="progress-bar">
                      <div class="progress" :style="'width:'+matchInfo.score_count_2+'%'"></div>
                    </span>
                    <span class="percent">{{matchInfo.score_count_2}}%</span>
                  </div>
                  <div class="star-list">
                    <span class="star">
                      <vue-star-score :score="1" color="#8991a3" font-size="10px" :disabled="true"></vue-star-score>
                    </span>
                    <span class="progress-bar">
                      <div class="progress" :style="'width:'+matchInfo.score_count_1+'%'"></div>
                    </span>
                    <span class="percent">{{matchInfo.score_count_1}}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="qrlogo">
              <img src="/static/images/twocode.png" width="48">
              <div class="text">
                <div><img src="/static/images/score.png" width="54"></div>
                <span class="qr-text">长按识别二维码参与讨论</span>
              </div>
            </div>

          </div>

          <div class="footer-logo"><img src="/static/images/match/share-footer-logo.png" width="140"></div>

        </div>
      </div>

      <div class="download-btn" @click="createImg">点击下载图片</div>
    </div>

  </div>
</template>

<script>
  //赛评分享 创建图片
  export default {
    name: "share-comments",
    components: {
    },
    props:{
      show:{
        type: Boolean,
        default: false
      },
      matchInfo:{
        type: Object,
        default:function () {
          return {}
        }
      }
    },
    head(){
      return{
        script: [
          {src: '/static/lib/canvas2image.js'},
          {src: '/static/lib/html2canvas.min.js'},
        ]
      }
    },
    data() {
      return {
        loadingDialog:false,
      }
    },
    mounted() {

    },
    methods: {
      createImg(){
        let _this = this;

        _this.loadingDialog = true;

        html2canvas(document.querySelector("#capture"),{
          scale: 2,
          useCORS:true,
          logging:true
        }).then(function(canvas) {
          let strDataURI = canvas.toDataURL("image/jpg");
          // Canvas2Image.saveAsPNG(canvas);  // 这将会提示用户保存PNG图片

          //console.log(canvas.toDataURL("image/jpeg"))

          _this.saveFile(strDataURI,'myComment');
          //_this.saveFile(strDataURI);
        });
        //
        // html2canvas(document.querySelector("#capture"), {
        //   allowTaint: true,
        //   taintTest: false,
        //   onrendered : function(canvas) {
        //     var imgData = canvas.toDataURL(type);
        //     window.open(imgData,"_blank");
        //     // Canvas2Image.saveAsPNG(imgData);  // 这将会提示用户保存PNG图片
        //   }
        // });



      },
      /**
       * 在本地进行文件保存
       * @param  {String} data     要保存到本地的图片数据
       * @param  {String} filename 文件名
       */
      saveFile(data, filename) {

        const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = data;
        save_link.download = filename;

        const event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
        this.loadingDialog = false;
      },
      close:function () {
        this.$emit('close', false);
      }

    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .share-modal.comments {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0,0,0,0.7);
    position: fixed;


    .close-btn{
      width: 60px;
      height: 60px;
      background: rgba(0,0,0,0.3);
      position: absolute;
      z-index 101;
      top: 50px;
      right: 50px;
      color: #fff;
      font-size: 54px;
      border-radius: 50%;
      cursor: pointer;
      line-height: 50px;
      text-align: center;
    }


    .dialog-container {
      transform: translate(-50%, -50%);
      position: absolute;
      top: 50%;
      left: 50%;
      background: #000;
      overflow hidden;

      .download-btn{
        height:40px;
        line-height:40px;
        text-align:center;
        color:#fff;
        cursor:pointer;
      }

      .capture-box{
        background:linear-gradient(360deg,rgba(45,47,51,1) 0%,rgba(5,6,10,1) 100%);
      }

      .dialog-box {
        width: 320px;
        height: 100%;
        background:url(/static/images/match/share-comments-bg.png) top no-repeat #000;
        //background-image: url("/images/match_new/share-comments-bg.png");
        //background-size auto cover;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08), 0px 0px 0px 1px rgba(0, 0, 0, 0.03);
        position: relative;

        .title{
          padding-top: 22px;
          height: 40px;
          font-size: 12px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: #fff;
          line-height: 17px;
          text-align: center;
        }

        .share-head{
          margin:3px 24px 0 24px;
          display flex;
          justify-content space-around;
          align-items center;

          .team-name{
            text-align center;
            width:50px;
            height:18px;
            font-size:15px;
            font-family:Industry-Bold;
            font-weight:bold;
            color:#FFFFFF;
            line-height:18px;
          }
          .vs{
            width:26px;
            height:26px;
            line-height 24px;
            background:rgba(255,255,255,0.12);
            border-radius:50%;
            text-align center;
            font-size:13px;
            font-family:Industry-Bold;
            font-weight:bold;
            color:#FFFFFF;
          }
        }
        .date{
          margin-top:3px;
          height:12px;
          font-size:10px;
          font-family:Industry-Demi;
          font-weight:normal;
          text-align center;
          color:rgba(255,255,255,0.6);
          line-height:12px;
        }

        .text-content{
          margin:0 auto;
          margin-top:21px;
          width:300px;
          min-height:375px;
          background:#fff;
          border-radius:6px;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
          position relative;

          .right-line{
            position absolute;
            top:38px;
            right:22px;
          }

          .avatar{
            width:48px;
            height:48px;
            background:#FFFFFF;
            border:3px solid #fff;
            border-radius:50%;
            position absolute;
            top:-18px;
            left:14px;
            overflow: hidden;
          }

          .nickname{
            margin-top 33px;
            margin-left:16px;
            width 100%;
            height:20px;
            font-size:14px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:#2D2F33;
            line-height:20px;
          }
          .post-tips{
            margin-top:1px;
            margin-left:16px;
            width 100%;
            height:16px;
            font-size:11px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:#A8ABB3;
            line-height:16px;
          }
          .quote-content{
            margin:22px 16px 0 18px;


            .share-my-score{
              margin-top:18px;
              text-align left;
              font-size:14px;
              font-family:PingFangSC-Semibold;
              font-weight:600;
              color:#FFCC60;
              line-height:20px;
              display flex;
              align-items center;
              position relative;

              .score-num{
                display inline-block;
                margin-left:8px;
                height: 22px;
                line-height: 22px;
                position: absolute;
                left: 90px;
              }
            }
            .text{
              width:268px;
              margin-top 6px;
              margin-bottom:14px;
              text-align left;
              font-size:14px;
              font-family:PingFangSC-Semibold;
              font-weight:600;
              color:#2D2F33;
              line-height:24px;
            }


          }


          .footer-score{
            width 100%;
            margin-top:16px;

            .f-title{
              text-align left;
              width:100%;
              height:18px;
              font-size:14px;
              padding-left:16px;
              font-family:PingFangSC-Semibold;
              font-weight:600;
              color:#2D2F33;
              line-height:18px;
              position: relative;

              &:after{
                content: '';
                display: block;
                width: 4px;
                height: 12px;
                background: #0d8dfc;
                position: absolute;
                left: 0;
                top: 4px;
              }
            }
            .subtitle{
              margin-top 1px;
              margin-left:16px;
              width:100%;
              height:16px;
              font-size:11px;
              font-family:PingFangSC-Medium;
              font-weight:500;
              color:#A8ABB3;
              line-height:16px;
            }

            .score{
              width 100%;
              padding:12px 16px 0 16px;
              display flex;

              >>> .iconfont{
                margin-left:2px;
              }

              .count-score{
                width: 85px;
                padding-right: 10px;
                text-align: center;
                position: relative;

                &:before{
                  content: '';
                  display: block;
                  width: 1px;
                  height: 50px;
                  background: rgba(0,0,0,0.06);
                  position: absolute;
                  right: 0;
                  top: 13px;
                }

                .c-score-text{
                  height:32px;
                  font-size:28px;
                  font-family:D-DINExp-Bold;
                  font-weight:bold;
                  color:#2D2F33;
                  line-height:32px;
                }

                .count-people{
                  height:14px;
                  font-size:12px;
                  font-family:PingFangSC-Medium;
                  font-weight:500;
                  color:#2D2F33;
                  line-height:14px;
                  -webkit-transform: scale(0.83);
                  margin-top: 4px;
                  display: block;
                }
              }

              .star-score{
                width 100%;
                margin-left: 10px

                .star-list{
                  width 100%;
                  display flex;
                  align-items center;

                  .progress-bar{
                    margin: 0 4px;
                    width:58px;
                    height:2px;
                    background:#F0F1F2;
                    border-radius:2px;

                    .progress{
                      height 2px;
                      display block;
                      border-radius:2px;
                      background:#8991A3;
                    }
                  }
                  .percent{
                    width:20px;
                    height:10px;
                    font-size:12px;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    color:#2D2F33;
                    line-height:10px;
                    -webkit-transform: scale(0.8);
                  }
                }
              }

            }
          }


          .qrlogo{
            width calc(100% - 32px);
            margin:20px 16px 16px 16px;
            padding:7px;
            height:62px;
            border-radius:6px;
            border:1px solid rgba(0,0,0,0.06);
            display flex;
            align-items center;

            .text{
              margin-left:10px;
            }

            .qr-text{
              width:121px;
              height:16px;
              font-size:11px;
              font-family:PingFangSC-Medium;
              font-weight:500;
              color:#A8ABB3;
              line-height:16px;
            }
          }
        }

        .footer-logo{
          text-align center;
          margin:14px auto;
        }





      }
    }




  }

</style>
