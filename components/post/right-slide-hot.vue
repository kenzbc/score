<template>
  <div class="hot-dynamic-list">
    <div class="circle-recomm ">
      <div class="circle-recomm-top cl">
        <div class="recomm-top-left fl">
          <span class="recomm-top-left-line"></span>
          <span class="recomm-top-left-text">{{title}}</span>
        </div>
        <div class="recomm-top-right fr" v-if="url">
          <nuxt-link class="more-a" :to="url">更多</nuxt-link>
        </div>
      </div>
      <div class="circle-recomm-middle">
        <div class="circle-recomm-middle-line"></div>
        <ul class="circle-recomm-list">

          <li class="circle-recomm-items cl" v-for="item in list">
            <nuxt-link :to="'/p/'+item.dynamic_id" class="recomm-items-hover cl">
              <img class="recomm-items-img fl" :class="{'square' : type == 'square'}" :src="item.cover_url ? item.cover_url : '/static/images/tx_pic.jpg'" alt="">
              <div v-if="type=='circle'" class="recomm-items-right fl">
                <div class="recomm-items-title">{{item.title}}</div>
              </div>
              <div v-else class="rec_article_info">
                <h3>{{item.title}}</h3>
                <p class="gray_3">{{item.add_time | tsToDate('YYYY-MM-DD hh:mm:ss')}}</p>
              </div>
            </nuxt-link>
          </li>

        </ul>

        <no-data v-if="list && list.length < 1" :show="true"></no-data>

      </div>
    </div>
  </div>
</template>

<script>
  import noData from '~/components/no-data'
  export default {
    name: "right-slide-hot",
    components: {noData},
    props:{
      list:{
        type: Array,
        default: ()=>[]
      },
      type:{
        type: String,
        default: 'circle'
      },
      title:{
        type: String,
        default: '热贴推荐'
      },
      url:{
        type: String,
        default: '#'
      },
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
  //圈子推荐
  .circle-recomm {
    margin-top: 12px;
    background: #fff;
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 2px;

    .circle-recomm-middle {

      .circle-recomm-middle-line {
        height: 1px;
        background: #f0f1f2;
        margin: 0 15px;
      }
      .circle-recomm-list {
        margin-top: 3px;

        .circle-recomm-items {

          .recomm-items-hover {
            display: flex;
            border-bottom: 1px dotted #f0f1f2;
            margin: 0 15px 0px 15px;
            padding: 8px 0 8px 0;
            position: relative;

            .recomm-items-img {
              border-radius: 50%;
              height: 24px;
              width: 24px;

              &.square{
                width: 87px;
                height: 58px;
                border-radius: 5px;
                margin-right: 10px;
              }
            }
            .recomm-items-right {
              margin-left: 10px;

              .recomm-items-title {
                margin-top: 0px;
                font-size: 14px;
                color: #656973;
                line-height: 24px;
                width: 262px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }

            //文章类型
            .rec_article_info{
              width: calc(100% - 97px);

              h3 {
                height: 40px;
                line-height: 20px;
                font-size: 15px;
                font-weight: 600;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                margin-bottom: 2px;
              }
              p {
                line-height: 18px;
                font-size: 12px;
              }
            }


          }
        }
      }
    }

    .circle-recomm-top {
      padding: 10px 13px 10px 14px;
      display flex;
      justify-content space-between;

      .recomm-top-left{
        .recomm-top-left-line {
          display: inline-block;
          height: 12px;
          width: 4px;
          background: #0d8dfc;
          vertical-align: middle;
        }
        .recomm-top-left-text {
          line-height: 20px;
          margin-left: 3px;
          font-size: 15px;
          color: #2d2f33;
          font-weight: bold;
          vertical-align: middle;
        }

      }

      .recomm-top-right{

        .more-a {
          line-height: 20px;
          font-size: 14px;
          color: #a8abb3;
        }
      }
    }

    .circle-recomm-middle{

    }

  }


</style>
