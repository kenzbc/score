<template>
  <div class="star_article_list star_video_list">
    <ul class="star_article_list star_video_list">
      <li v-for="item in videoList">
        <a :href="'/p/'+item.object_id" target="_blank" class="">
          <div class="star_video_main">
            <img :src="item.video_info.video_image_url+'?x-oss-process=image/resize,m_fixed,h_170,w_300,limit_0'" width="100%">
            <p class="cl">
              <span class="fll">{{item.view_count}}次播放</span>
              <span class="flr">{{item.video_info.play_time_string}}</span>
            </p>
          </div>
          <p class="star_video_title">{{item.title}}</p>
        </a>
        <p class="star_video_info">
          <a :href="'/u/'+item.member_id" target="_blank" class="gray_3">{{item.nickname}}</a>
          <span class="gray_3 flr">{{item.comment_count}}条评论</span>
        </p>
      </li>
    </ul>

    <a v-if="isMore" href="javascript:" class="star_article_list_more gray_2" @click="getMore()">加载更多</a>

  </div>
</template>

<script>
  export default {
    name: "star-main-video",
    components: {},
    props:{
      starId:{
        type: String,
        default:''
      },
      list:{
        type: Array,
        default: ()=>[]
      }
    },
    data() {
      return {
        page:2,
        limit:20,
        isMore:true,
        videoList:[],
      }
    },
    watch:{
      list(newVal, oldVal){
        this.videoList = newVal;
      }
    },
    mounted() {
      this.videoList = this.list;
    },
    methods: {
      async getMore(){
        let params = {
          star_id: this.starId,
          page: this.page,
          limit: this.limit
        };
        let res = await this.$api.star.getVideoList({params});
        if(res.code == '200'){
          if(res.data.length > 0){
            this.isMore = true;
            this.page = this.page + 1;
            this.videoList = this.videoList.concat(res.data);
          }else{
            this.isMore = false;
            this.page = this.page + 1;
          }
        }else{
          this.$Message.error(res.message);
        }
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .star_video_list {
    padding: 15px;
    margin: 0 -9px;
    display: flex;
    flex-wrap wrap;

    li {
      width: calc(50% - 18px);
      margin: 0px 9px 18px 9px;
      float: left;

      .star_video_main {
        border-radius: 6px;
        overflow: hidden;
        position: relative;
        margin-bottom: 6px;

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

        img {
          display: block;
        }
        p {
          width: 94%;
          color: #fff;
          font-size: 12px;
          position: absolute;
          left: 3%;
          bottom: 5%;
          z-index: 3;
        }
      }

      .star_video_title {
        width: 100%;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
      }


      .star_video_info {
        line-height: 20px;
        font-size: 12px;
      }
    }

  }




  .star_article_list_more {
    width: 100%;
    display: block;
    line-height: 40px;
    text-align: center;
    border-radius: 8px;
    margin: 15px 15px 0 15px;
    border: 1px solid #f0f1f2;
    /* background: #F7F8FA; */
    background: #fff;
    font-size: 14px;
    color: #a8abb3;
  }

</style>
