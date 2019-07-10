<template>
  <nuxt-link v-if="item.forward_dynamic && item.forward_dynamic.length > 0" class="forward-post cl" :to="'/p/'+item.forward_dynamic[0].dynamic_id" target="_blank">
    <div class="img-wrap">
      <img v-if="item.forward_dynamic[0].video && item.forward_dynamic[0].video.length > 0" :src="item.forward_dynamic[0].video[0].image_url+'?x-oss-process=image/resize,m_fill,h_120,w_120,limit_0'" alt="" />

      <img class="f-img" src="/static/images/default_score.png" alt="">
    </div>
    <div class="post-conent">
      <h2>{{item.forward_dynamic[0].title || ''}}</h2>
      <p>{{item.forward_dynamic[0].summary || ''}}</p>
      <div class="author">
        <img :src="item.forward_dynamic[0].avatar || '/images/homepage/tx_pic.jpg'+'?x-oss-process=image/resize,m_fill,h_20,w_20,limit_0'" alt="">
        <span>{{item.forward_dynamic[0].nickname || ''}}</span>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
  //转发引用帖子
  export default {
    name: "forward-dynamic",
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

  //被转发的帖子
  .forward-post {
    display: block;
    background: #fafafa;

    .img-wrap {
      width: 120px;
      height: 120px;
      float: left;

      img {
        width: 100%;
        border-radius: 4px 0 0 4px;
      }
    }


    .post-conent {
      width: calc(100% - 120px);
      height: 120px;
      background: #fafafa;
      float: left;
      overflow: hidden;
      padding: 8px 15px;

      img {
        width: 18px;
        height: 18px;
        border-radius: 50%;
      }
      span {
        font-size: 12px;
        color: #656973;
        margin-left: 8px;
      }

      h2 {
        font-size: 16px;
        color: #656973;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      p {
        color: #a8abb3;
        height: 44px;
        line-height: 22px;
        margin-top: 8px;
        overflow: hidden;
      }

      .author {
        margin-top: 15px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
</style>
