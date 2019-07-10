<template>
  <div>
    <header-sub-menus>
      <li><nuxt-link to="/moment" :class="{'active':category_id == '-1'}" @click="changeCategory('-1')" class="link">推荐圈子
        <svg class="icon schdule_icon_active" aria-hidden="true">
          <use xlink:href="#icon-circle_blue"></use>
        </svg>
      </nuxt-link></li>
      <li><nuxt-link to="/moment/my" class="link">我的圈子
        <svg class="icon schdule_icon_active" aria-hidden="true">
          <use xlink:href="#icon-circle_blue"></use>
        </svg>
      </nuxt-link></li>
      <li v-for="item in categoryList" v-if="item.id != '0'">
        <nuxt-link :to="'/moment/'+item.id" :class="{'active':$route.path == '/moment/'+item.id}" class="link">{{item.category_name}}
        <svg class="icon schdule_icon_active" aria-hidden="true">
          <use xlink:href="#icon-circle_blue"></use>
        </svg>
      </nuxt-link></li>
    </header-sub-menus>

    <article class="page-main content moment_all_wrap" id="moment_all">
      <div id="moment_all_info" v-if="dataList">
        <div class="moment_all_circle_list" v-for="item,index in dataList">
          <hgroup class="moment_all_cont">
            <div class="moment_all_cont-bg"
                 style="background: url(/static/images/moment/bg.png) no-repeat;background-size: cover;background-position:center;border-radius: 4px 4px 0 0;"></div>
            <div class="moment_all_title">
              <div class="moment_all_title-left f-left">

                <div class="moment-all-desc-left f-left">
                  <a :href="'/c/'+item.parent_circle_info.id" target="_blank" class="moment_all_pic f-left">
                    <img :src="item.parent_circle_info.circle_picture ? item.parent_circle_info.circle_picture : '/static/images/tx_pic.jpg'" width="100%">
                  </a>
                  <h3><a class="moment_all_title_length" :href="'/c/'+item.parent_circle_info.id" target="_blank">{{item.parent_circle_info.circle_name}}</a></h3>
                  <p class="moment_all_endro">{{item.parent_circle_info.circle_intro}}</p>
                  <div class="moment_all_user">
                    <p class="moment_all_user-message">
                      <span class="user-left">
                        <span class="iconfont-text">粉丝</span>{{item.parent_circle_info.fans_num}}
                      </span>
                      <span class="user-right">
                        <span class="iconfont-text">贴子</span>{{item.parent_circle_info.dynamic_num}}
                      </span>
                    </p>
                  </div>
                </div>

                <div class="moment_all_title_icon f-right">
                  <p class="moment_all_title_icon-top">
                    <i class="iconfont icon-retie"></i>
                    <span class="moment_all_title_text">热贴</span>
                  </p>
                </div>
                <p class="parent_attention_btn">
                  <a href="javascript:;" class="search_circle_btn" v-if="item.parent_circle_info.is_attention == '0'" @click="setJoinCircleAttention(item.parent_circle_info.id)">加入</a>
                  <a href="javascript:;" class="search_circle_btn active" v-if="item.parent_circle_info.is_attention == '1'" @click="setCancelCircleAttention(item.parent_circle_info.id)">已加入</a>
                </p>
              </div>

              <!--热帖列表-->
              <div class="f-left moment_all_title-right">
                <ul class="fll">
                  <li v-for="item in item.hot_dynamic_list">
                    <img class="moment_all_title_avatar" :src="item.member_avatar ? item.member_avatar : '/images/default_avatar.jpg'" alt="">
                    <a :href="'/p/'+item.dynamic_id" target="_blank">{{item.title}}</a>
                  </li>
                </ul>
              </div>

              <div style="clear:both;"></div>
            </div>
            <div class="moment_all_open" @click="showSon(item.parent_circle_info.id)" v-if="item.son_circle_list.length > 0">子版块 <i class="iconfont open-arrow icon-icon4" :class="{'open-arrow-close' : dynamicShow == item.parent_circle_info.id}"></i></div>
          </hgroup>
          <section class="moment_all_main cl" v-if="dynamicShow == item.parent_circle_info.id">
            <moment-son :dataList="item.son_circle_list" @reload="reload()"></moment-son>
          </section>

        </div>
        <no-data :show="true" v-if="dataList && dataList.length < 1"></no-data>
      </div>
    </article>
  </div>
</template>

<script>
  import momentSon from '@/components/moment/moment-son'
  export default {
    name: "moment",
    components: {
      momentSon
    },
    data() {
      return {
        dynamicShow:'0',
        category_id:'-1',
        categoryList:[],
      }
    },
    watch:{
      categoryList(newVal, oldVal){

      },
      deep: true
    },
    async asyncData({app, $axios, error, query}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。

      let res = await app.$api.circle.getCircleList({category_id:'-1'});
      return {
        categoryList: res.data.category_list,
        dataList: res.data.data_list
      }

    },
    fetch() {
      // 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。
    },
    head() {
      // 配置当前页面的 Meta 标签
      return this.$seo(
        `推荐圈子`,
        `明星圈子,互动社区,主播互动`,
        `Score,致力于为电竞玩家提供专业、快速、全面的赛事信息及专业化的数据查询功能，是电竞玩家赛事互动平台。在这里，还可以关注你喜爱电竞选手，为他打CALL`,
        {
          script: [],
          link: []
        }
      );
    },
    mounted() {

    },
    methods: {
      async getCircle(){
        let res = await this.$api.circle.getCircleList({params:{category_id:'-1'}});
        this.dataList = res.data.data_list;
      },
      //加入圈子
      async setJoinCircleAttention(circleId){
        let res = await this.$api.circle.setJoinCircleAttention({params:{circle_id:circleId}});

        if(res.code == '200'){
          this.$Message.success('关注成功!');
          this.dataList.forEach((item)=>{
            if(item.parent_circle_info.circle_id == circleId){
              item.parent_circle_info.is_attention = 1;
              return;
            }
          });
          this.getCircle();
        }else{
          this.$Message.warning(`关注失败! ${res.message}`);
        }

      },
      //退出圈子
      async setCancelCircleAttention(circleId){
        let res = await this.$api.circle.setCancelCircleAttention({params:{circle_id:circleId}});

        if(res.code == '200'){
          this.$Message.success('取消成功!');
          this.dataList.forEach((item)=>{
            if(item.parent_circle_info.circle_id == circleId){
              item.parent_circle_info.is_attention = 0;
            }
          });
          this.getCircle();
        }else{
          this.$Message.warning(`取消失败! ${res.message}`);
        }
      },
      reload(){
        console.log('reload')
        this.getCircle();
      },
      showSon(id){
        this.dynamicShow == id ? this.dynamicShow = 0 : this.dynamicShow = id;
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .moment_all_wrap {
    max-width: 990px;
    border-radius: 5px;
    margin: 36px auto;
    padding-top: 20px;
    min-height: 590px;
    position: relative;
  }

  .moment_all_user {
    padding-top: 13px;
  }

  .moment_all_cont {
    margin-bottom: 30px;
    background: #FFFFFF;
    box-shadow: 0 3px 6px 0 rgba(0,0,0,0.04);
    border-radius: 4px;

    .moment_all_title .moment_all_endro, .moment_all_title .moment_all_user {
      color: #999;
    }

    .moment_all_cont-bg {
      height: 72px;
      background-size: 100% 100%;
    }

    .moment_all_title {
      height: 120px;
      position: relative;

      .moment_all_title-left {
        width: 45%;

        h3{
          margin-top: 14px;
          font-size: 16px;
          margin-bottom: 5px;
          color: #333333;
        }

        .moment-all-desc-left {
          margin-left: 152px;

          .moment_all_pic {
            display: block;
            width: 110px;
            height:110px;
            border-radius: 50%;
            overflow: hidden;
            position: absolute;
            background: #fff;
            top:-48px;
            left:24px;
            background: #FCFCFC;
            box-shadow: 0 1px 0px 0 rgba(0,0,0,0.04);
            border: 3px solid #FFFFFF;
          }
          .moment_all_title_length {
            width: 188px;
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .moment_all_endro{
            margin-top: 2px;
            height:32px;
            line-height:20px;
            font-size: 12px;
            color: #999999;
            width:210px;
            padding-bottom:12px;
            border-bottom:1px solid #F0F1F2;
            display: inline-block;
            overflow: hidden;
            white-space:nowrap;
            text-overflow: ellipsis;
          }

          .iconfont-text {
            font-size: 13px;
            color: #A8ABB3;
            vertical-align: top;
            margin-right: 8px;
          }
          .user-left {
            font-size: 13px;
            color: #2D2F33;
            vertical-align: top;
          }
          .user-right {
            margin-left: 30px;
            font-size: 13px;
            color: #2D2F33;
            vertical-align: top;
          }

        }


        .moment_all_title_icon {
          text-align: center;
          margin: 34px 14px 0 0;
          font-size: 13px;
          color: #FF5C5C;
          width: 40px;
          height: 60px;

          i {
            font-size: 32px;
            color: #0D8DFC;
          }
          .moment_all_title_text {
            margin-top: 4px;
            display: block;
            line-height: 20px;
            color: #0D8DFC;
            font-size: 14px;
          }
        }


        .parent_attention_btn {
          position: absolute;
          left: 39px;
          bottom: 15px;

          .search_circle_btn {
            display: inline-block;
            line-height: 26px;
            font-size: 13px;
            color: #0D8DFC;
            text-align: center;
            border: 1px solid #0D8DFC;
            border-radius: 20px;
            width: 80px;
            height: 28px;
            text-align: center;
          }

          .active {
            background: #0D8DFC;
            color: #fff !important;
          }
        }

      }


      .moment_all_title-right {
        width: 55%;
        margin-top: 15px;
        padding-left: 22px;
        position: relative;

        ul{
          width: 95%;
          height: 90px;
          overflow: hidden;

          li {
            line-height: 28px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 13px;
            color: #656973;

            a {
              vertical-align: middle;
            }

            .moment_all_title_avatar {
              height: 20px;
              width: 20px;
              border-radius: 50%;
              margin-right: 10px;
              vertical-align: middle;
            }
          }
        }
      }


    }


    .moment_all_open {
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 13px;
      color: #999999;
      cursor: pointer;
      border-top: 1px solid #F0F0F0;

      .open-arrow {
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 2px;
        transform: rotate(90deg);
      }

      .open-arrow-close {
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 2px;
        transform: rotate(-90deg);
      }


    }

  }

  .moment_all_main{
    margin-top:20px;
  }





  @media all and (max-width: 768px) {

    #moment_all {
      padding-top: 36px;
    }

    .moment_all_user {
      padding-top: 13px;
    }

    .moment_all_wrap {
      padding: 0 12px 0;
      border-radius: 0;
    }

    .moment_all_main{
      margin-top: 0px;
    }

    .moment_all_cont{

      .moment_all_cont-bg {
        height: 90px;
        background-size: 100% 100%;
      }

      .moment_all_title {
        height: 100%;
        position: relative;

        div.fll {
          border-right: none;
        }


        .moment_all_endro, .moment_all_title .moment_all_user {
          color: #333333;
          font-size: 10px;
          margin-left: 130px;
          width: 50%;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }



        .moment_all_title-left {
          width: 100%;

          .moment-all-desc-left {
            float: none;
            width: 100%;
            margin-left: 8px;

            .moment_all_pic {
              display: block;
              width: 100px;
              height: 100px;
              border-radius: 50%;
              overflow: hidden;
              position: absolute;
              background: #fff;
              top: -30px;
              left: 20px;
              background: #fcfcfc;
              border: 4px solid #fff;
              box-shadow: 0 1px 0 0 rgba(0,0,0,0.02), 0 2px 6px 0 rgba(0,0,0,0.07);
            }

            h3 {
              margin-top: 10px;
              font-size: 16px;
              margin-left: 130px;
              margin-bottom:0;
            }

            .moment_all_title_length {
              width: 90%;
              display: inline-block;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            .moment_all_user {
              color: #333333;
              font-size:10px;
              margin-left: 130px;
              width:50%;
              display: inline-block;
              overflow: hidden;
              white-space:nowrap;
              text-overflow: ellipsis;
            }
            .moment_all_user {
              margin-top: 5px;
              height: 20px;

              .moment_all_user-message {
                border-radius: 4px;
                line-height: 20px;
                position: absolute;

                .iconfont-text {
                  font-size: 13px;
                  color: #A8ABB3;
                  vertical-align: top;
                  margin-right: 8px;
                }

                .user-left {
                  margin-left: 0;
                  font-size: 13px;
                  color: #2D2F33;
                }
                .user-right {
                  margin-left: 10px;
                }

              }
            }

          }


          .moment_all_title_icon {
            text-align: center;
            margin: 0 20px 0 12px;
            font-size: 13px;
            color: #FF5C5C;
            width: 80px;
            height: 40px;
            float: none;

            i {
              font-size: 32px;
              color: #0D8DFC;
              display: inline-block;
              vertical-align: middle;
            }
            .moment_all_title_text {
              display: inline-block;
              vertical-align: middle;
              font-size: 14px;
              color: #0D8DFC;
              margin-left: 4px;
            }
          }

          .parent_attention_btn {
            position: absolute;
            right: 0px;
            top: auto;
            bottom: 24px;
            left: 6%;
            z-index: 10;

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
            .search_circle_btn.active {
              background: #0D8DFC;
              border: 1px solid #0D8DFC;
              border-radius: 30px;
              font-size: 13px;
              color: #fff;
            }
          }


        }


        .moment_all_title-right{
          width: 100%;
          max-width:100%;
          border:none;
          margin-top: 4px;
          padding-bottom: 100px;
        }
        .moment_all_title-right:before{
          color:#F00;
          position: absolute;
          top:5px;
          left:0;
          width:0;
          height:80px;
          background: #F0F0F0;
        }
        .moment_all_title-right:after{
          color:#F00;
          position: absolute;
          top:5px;
          right:0;
          width:0;
          height:80px;
          background: #F0F0F0;
        }





      }



    }

  }





</style>
