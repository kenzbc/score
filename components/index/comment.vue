<template>
  <div>
    <div class="index_right_wrap">
      <h4 class="index_slide_title">
        <!--<i class="iconfont icon-remensaishi"></i>-->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shenpinglun"></use>
        </svg>
        神评论
      </h4>

      <ul class="index_right_comment">
        <li v-for="item in dataList">
          <div class="index_right_comment_info">
            <a :href="'/u/'+item.member_id" class="index_right_comment_avatar">
              <img :src="item.avatar" class="fll">
            </a>
            <p class="index_right_comment_name">
              <a :href="'/u/'+item.member_id">{{item.nickname}}</a>
              <span class="gray_3">{{item.add_time}}</span>
            </p>
            <!--<p class="index_right_comment_else gray_3">位于<a href="/c/23" class="gray_3">WE电子竞技俱乐部</a></p>-->
          </div>
          <a :href="'/p/'+item.dynamic_id" class="index_right_comment_main">
            <p class="index_right_comment_title gray_2">来源：{{item.title}}</p>
            <p class="index_right_comment_reply">{{item.summary}}</p>
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
      async requestHotMatch(){
        let res = await this.$scoreApi.getTournamentList();
        this.tournament_list = res.data.list;
      }

    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
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

  .index_right_wrap {

    .index_right_comment {
      padding: 10px 12px 4px 12px

      li{
        margin-bottom: 20px;
      }
    }

    .index_right_comment_info {
      margin-bottom: 8px;
      display flex;
    }

    .index_right_comment_avatar {

      img {
        display: block;
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
    }

    .index_right_comment_name {
      line-height: 20px;
      padding-top: 2px;

      a {
        padding-left: 10px;
      }
      span {
        font-size: 12px;
        margin-left: 10px;
        color: #A8ABB3;
      }
    }

    .index_right_comment_main {
      display: block;
      background: #f7f8fa;
      border-radius: 8px;
      padding: 0px 20px;
    }
    .index_right_comment_title {
      line-height: 20px;
      font-size: 13px;
      border-bottom: 1px dotted #ebebed;
      padding: 8px 0;
    }
    .index_right_comment_reply {
      line-height: 22px;
      padding: 10px 0;
    }

  }












</style>
