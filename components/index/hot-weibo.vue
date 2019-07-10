<template>
  <div title="名人微博">
    <div class="index_left_wrap">
      <h4 class="index_slide_title">
        <!--<i class="iconfont icon-remensaishi"></i>-->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weibo"></use>
        </svg>
        名人微博
      </h4>

      <ul class="index_left_weibo">
        <li v-if="dataList && dataList.length > 0" v-for="item in dataList.slice(0,limit)">
          <a :href="'/u/'+item.member_id" class="index_left_weibo_avatar">
            <img :src="item.avatar" class="fll">
            {{item.nickname}}
          </a>
          <a :href="'/p/'+item.dynamic_id" class="index_left_weibo_main">
            <p v-html="item.content"></p>
            <span v-for="item in item.picture.slice(0,1)"><img :src="item.image_url"></span>
          </a>
          <p class="index_left_weibo_info">
            {{item.add_time}}
            <a :href="'/p/'+item.dynamic_id" class="flr"><i class="gray_2 iconfont icon-circle__comment"></i></a>
            <a :href="'/p/'+item.dynamic_id" class="flr"><i class="gray_2 iconfont icon-circle__good_Gray"></i></a>
          </p>
        </li>

      </ul>

    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    components: {},
    data() {
      return {}
    },
    props:{
      dataList:{
        type: Array,
        default: ()=> []
      },
      limit:{
        type: Number,
        default: 10
      },
    },
    mounted() {


    },
    methods: {


    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .index_left_wrap {
    width: 230px;
    background: #fff;
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 3px;
    margin-bottom: 14px;
  }
  .index_slide_title {
    width: calc(100% - 24px);
    line-height: 44px;
    font-size: 16px;
    border-bottom: 1px solid #f0f1f2;
    margin: 0 auto;
  }
  .index_slide_title .icon {
    width: 24px;
    height: 24px;
    margin: 10px 8px 0 0;
    float: left;
  }
  .index_slide_title .index_slide_more {
    font-size: 14px;
    font-weight: normal;
    color:#A8ABB3;
    float: right;
  }


  .index_left_weibo {
    padding: 0px 12px 4px 12px;

    li {
      border-top: 1px solid #f0f1f2;
      padding: 10px 0;
    }
    li:first-child {
      border-top: none;
    }

    .index_left_weibo_avatar {
      display: block;
      width: 100%;
      line-height: 28px;
      font-weight: 700;

      img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin-right: 8px;
      }
    }

    .index_left_weibo_main {
      display: block;
      line-height: 22px;
      padding: 4px 0;

      p {
        max-height: 66px;
        line-height: 22px;
        overflow: hidden;
        margin-bottom: 4px;
      }

      img {
        display: block;
        width: 100%;
        margin-bottom: 4px;
      }
    }
    .index_left_weibo_info {
      line-height: 20px;
      font-size: 12px;
      color: #A8ABB3;

      i {
        font-size: 18px;
        margin: 0 4px 0 10px;
      }
    }
  }



</style>
