<template>
  <div class="piece news-wrap cl" v-if="news.picList.length > 0 && news.txtList.length > 0">
    <!--新闻轮播-->
    <div class="swiper-container news-swiper fll">
      <div class="swiper-wrapper news-pic">
        <div class="swiper-slide" v-if="index < 5" v-for="(item, index) in news.picList" :key="index">
          <a :href="item.link_url" target="_blank">
            <div class="image" :style="'background-image: url(' + item.image_url + ')'"></div>
          </a>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!--新闻列表-->
    <ul class="news-list fll">
      <li class="news-item" v-if="index < 7" v-for="(item, index) in news.txtList" :key="index">
        <p class="title"><a :href="item.link_url" target="_blank">{{item.title}}</a></p><span class="release-date">{{item.time_string}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "tournament-news",
    props: {
      news: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        newsSwiper: null
      }
    },
    mounted() {
      if (this.news.picList.length > 0) this.initSwiper()
    },
    methods: {
      initSwiper() {
        this.newsSwiper = new Swiper('.news-swiper', {
          pagination: {
            el: '.swiper-pagination',
            clickable :true
          },
          autoplay: {
            autoplay: true,
            disableOnInteraction: false
          },
          loop: true,
          speed: 500
        })
      }
    },
    destroyed() {
      this.newsSwiper && this.newsSwiper.destroy(false)
    }
  }
</script>

<style lang="stylus" scoped>
  .news-wrap {
    padding 20px
  }

  .swiper-container {
    border-radius 6px
    width: 520px
    height: 260px
    .swiper-slide {
      border-radius 6px
      overflow hidden
      background url('//img1.famulei.com/common/images/index/img_null.png') no-repeat center
      background-size cover
    }
    .swiper-pagination {
      text-align left
      padding-left 20px
      .swiper-pagination-bullet {
        background: #fff;
        opacity: 0.3;
        &.swiper-pagination-bullet-active {
          opacity: 1;
        }
      }
    }
  }


  .news-pic {
    .image {
      width: 100%
      height: 100%
      background-repeat no-repeat
      background-position center
      background-size cover
    }
  }

  .news-list {
    width calc(100% - 520px)
    padding-left 23px
    .news-item {
      overflow hidden

      + .news-item {
        border-top 1px dotted #F0F1F2
      }

      .title {
        float left
        font-size 15px
        line-height 36px
        max-width: 320px
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
      }
      .release-date {
        float right
        font-size: 12px
        color: $gray
        margin-top 10px
      }
    }
  }

</style>
