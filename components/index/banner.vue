<template>

  <div class="swiper-container" id="index_mobile_banner">
      <ul class="swiper-wrapper" id="accordion">
        <li class="swiper-slide" v-for="item in dataList">
          <a :href="item.link_url">
            <img :src="item.picture+'?x-oss-process=image/resize,m_fixed,h_260,w_520,limit_0'">
          </a>
          <div>
            <a :href="item.link_url">
              <h2><span>精选</span>{{item.title}}</h2>
              <p class="gray_3" v-if="item.summary">{{item.summary}}</p>
              <p class="gray_3" v-else>{{item.title}}</p>
            </a>
          </div>
        </li>
      </ul>
    </div>

</template>

<script>

  export default {
    name: "banner",
    components: {},
    data() {
      return {}
    },
    props:{
      dataList:{
        type: Array,
        default:()=>[]
      }
    },
    mounted() {

      $(function () {


        if($(window).width()>768){
          //手风琴
          var opt = {
            "speed": "slow", //变换速度,三速度可选 slow,normal,fast;
            "by": "mouseover", //触发事件,click或者mouseover;
            "auto": true, //是否自动播放;
            "sec": 5000	 		//自动播放间隔;
          };
          $("#accordion").IMGDEMO(opt);

        }else{
          //手机BANNER
          var swiper = new Swiper('#index_mobile_banner', {
            direction: 'horizontal',
            loop: false,
            initialSlide: 0,
          });
        }

      });


    },
    methods: {

    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .swiper-container{
    width auto;
  }
  /* accordion */
  #index_banner{
    box-shadow: 0 0 0 1px #EBEBED;
    border-radius 2px
    margin:0 auto 12px auto;
  }

  /* accordion */
  #index_mobile_banner {
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 2px;
    margin: 0 auto 12px auto;
  }

  #accordion {
    width: 100%;
    height: 312px;
    background-color: #fff;
    position: relative;
    overflow: hidden;
  }

  #accordion li {
    width: 40px;
    height: 100%;
    overflow: hidden;
    opacity: 0.5;
    cursor: pointer;
    float: left;
    position: initial;
  }

  #accordion li img {
    width: 480px;
    height: 240px;
  }

  #accordion li div {
    display: none;
    width: 100%;
    height: 72px;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px 15px;
  }

  #accordion li div h2 {
    width: 100%;
    height: 26px;
    line-height: 26px;
    font-size: 18px;
    overflow: hidden;
    margin-bottom: 4px;
  }

  #accordion li div a:hover h2 {
    color: #4b9ce3;
  }

  #accordion li div h2 span {
    display: inline-block;
    line-height: 20px;
    font-size: 13px;
    color: #fff;
    background-image: linear-gradient(-135deg, #0f97ff 0%, #0d7eff 100%);
    border-radius: 3px;
    padding: 0 6px;
    margin: 4px 4px 0 0;
    float: left;
  }

  #accordion li div p {
    width: 100%;
    height: 22px;
    line-height: 22px;
    overflow: hidden;
  }

  #accordion li:first-child {
    width: 480px;
    opacity: 1;
  }

  #accordion li:first-child div {
    display: block;
  }



  /*手机*/
  @media screen and (max-width: 767px) {

    #index_mobile_banner {
      margin-bottom: 0;
    }
    #accordion {
      height: auto;
      overflow: initial;
    }
    #accordion li {
      opacity: 1;
    }
    #accordion li img {
      width: 100%;
      height: auto;
    }
    #accordion li div h2 {
      height: 26px;
    }
    #accordion li div {
      width: auto;
      display: block;
      position: initial;
    }
    #accordion li:first-child {
      width: auto;
    }
  }
</style>
