<template>
  <div class="circle-recomm">
    <div class="circle-recomm-top">
      <div class="recomm-top-left">
        <span class="recomm-top-left-line"></span>
        <span class="recomm-top-left-text">圈子推荐</span>
      </div>
      <div class="recomm-top-right"><a href="/moment_all">更多</a></div>
    </div>

    <div class="circle-recomm-middle">
      <div class="circle-recomm-middle-line"></div>
      <ul class="circle-recomm-list">
        <li class="circle-recomm-items" v-for="item in hotCircleList">
          <nuxt-link class="recomm-items-hover" :to="'/c/'+item.circle_id">
            <img class="recomm-items-img" :src="item.avatar ? item.avatar : '/static/images/tx_pic.jpg'" alt="">
            <div class="recomm-items-right"><p class="recomm-items-title">{{item.nickname}}</p>
              <p class="recomm-items-desc">{{item.demo}}</p>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>


</template>

<script>
  export default {
    name: "hot-circle-slide",
    components: {},
    props:{
      hotCircleList:{
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

  .circle-recomm {
    background: #fff;
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 2px;

    .circle-recomm-top {
      display flex
      justify-content space-between
      padding: 10px 13px 10px 14px;

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
      }

      .recomm-top-right {
        line-height: 20px;
        font-size: 14px;
        color: #a8abb3;

        a {
          font-size: 14px;
          color: #a8abb3;
        }
      }
    }

    .circle-recomm-middle{
      .circle-recomm-middle-line {
        height: 1px;
        background: #f0f1f2;
        margin: 0 15px;
      }
      .circle-recomm-list{
        .circle-recomm-items {
          .recomm-items-hover {
            display: flex;
            align-items center;
            border-bottom: 1px dotted #f0f1f2;
            margin: 0 15px 0px 15px;
            padding: 8px 0 6px 0;

            .recomm-items-img {
              border-radius: 50%;
              height: 40px;
              width: 40px;
            }
            .recomm-items-right {
              margin-left: 10px;

              .recomm-items-title {
                font-size: 14px;
                color: #2d2f33;
                line-height: 20px;
                width: 220px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .recomm-items-desc {
                font-size: 12px;
                color: #a8abb3;
                line-height: 17px;
                width: 220px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }

            }
          }
        }
      }



    }
  }


</style>
