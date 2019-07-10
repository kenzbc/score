<template>
  <div title="热帖">
    <div class="index_right_wrap">
      <h4 class="index_slide_title">
        <!--<i class="iconfont icon-remensaishi"></i>-->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-retie"></use>
        </svg>
        热帖
        <a href="/post" class="index_slide_more gray_3 flr">更多</a>
      </h4>
      <ul class="index_right_retie">
        <li v-for="item,index in dataList.slice(0,10)">
          <a :href="'/p/'+item.dynamic_id">
            <!--<span class="gray_3">1</span>-->
            <span><i :class="'icon-hot_'+(index+1)" class="iconfont gray_3"></i></span>
            <p>{{item.title}}</p>
          </a>
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
      return {
        tournament_list:[]
      }
    },
    props:{
      dataList:{
        type: Array,
        default: ()=> []
      },
      limit:{
        type: Number,
        default: 5
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

<style scoped>
  .index_right_wrap {
    width: 330px;
    background: #fff;
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 2px;
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
  .index_right_wrap .index_right_retie {
    padding: 12px 12px 4px 12px;
  }
  .index_right_wrap .index_right_retie li {
    background: #f7f8fa;
    border-radius: 8px;
    position: relative;
    margin-bottom: 10px;
  }
  .index_right_wrap .index_right_retie li span {
    width: 30px;
    height: 36px;
    line-height: 36px;
    font-size: 18px;
    text-align: center;
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
  }
  .index_right_wrap .index_right_retie li span .iconfont {
    font-size: 28px;
    opacity: 0.6;
  }
  .index_right_wrap .index_right_retie li p {
    line-height: 20px;
    padding: 8px 8px 8px 44px;
  }










</style>
