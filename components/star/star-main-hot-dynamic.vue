<template>
  <div class="star_article_list star_cms_list">
    <ul class="index_article_list">

      <li class="index_article_1" v-for="item in dynamicList">
        <div class="index_article_border cl">
          <div class="index_article_main">
            <a :href="'/p/'+item.dynamic_id" target="_blank" class="index_article_main_link">
              <h2>{{item.title}}</h2>
              <p v-html="item.summary"></p>
            </a>
            <div class="star_hot_pic_wrap cl" v-if="item.picture && item.picture.length > 0">
              <a v-for="itp in item.picture.slice(0,3)" :href="'/p/'+item.dynamic_id" target="_blank" class="star_hot_pic score_list_pic">
                <img :src="itp.image_url+'?x-oss-process=image/resize,m_fill,w_120,h_120,limit_0'">
                <span class="score_list_pic_num" v-if="item.picture.length > 3">共 {{item.picture.length}} P</span>
              </a>
            </div>


            <p class="index_article_info cl">
              <a :href="'/u/'+item.member_id" target="_blank" class="index_article_info_user">
                <img :src="item.avatar ? item.avatar : '/static/images/tx_pic.jpg'+'?x-oss-process=image/resize,m_fill,h_14,w_14,limit_0'">
              </a>
              <a :href="'/u/'+item.member_id" target="_blank" class="gray_3">{{item.nickname}}</a>
              <span class="gray_3 flr">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-CombinedShape1"></use>
                </svg>
                {{item.comment_count}} 人参与
              </span>
            </p>
          </div>
        </div>
      </li>

    </ul>


    <a v-if="isMore" href="javascript:" class="star_article_list_more gray_2" @click="getMore()">加载更多</a>

  </div>
</template>

<script>
  export default {
    name: "star-main-hot-dynamic",
    components: {},
    props:{
      circleId:{
        type: String,
        default:''
      },
      list:{
        type: Array,
        default:()=>[]
      }
    },
    data() {
      return {
        page:2,
        limit:20,
        isMore:true,
        dynamicList:[],
      }
    },
    mounted() {
      this.dynamicList = this.list;
    },
    methods: {
      async getMore(){
        let params = {
          circle_id: this.circleId,
          page: this.page,
          limit: this.limit
        };

        this.$api.dynamic.circleHotDynamicList({params}).then((res)=>{
          if(res.code == '200'){
            if(res.data.list.length > 0){
              this.isMore = true;
              this.page = this.page + 1;
              this.dynamicList = this.dynamicList.concat(res.data.list);
            }else{
              this.isMore = false;
              this.page = this.page + 1;
            }
          }else{
            this.$Message.error(res.message);
          }
        });

      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .index_article_list {
    li {
      cursor: pointer;
      padding: 0px 15px;

      .index_article_border {
        border-bottom: 1px dotted #F0F1F2;
        padding: 10px 0;
        display flex
        justify-content space-between;

        .index_article_pic {
          display: block;
          width: 195px;
          height: 130px;
          border-radius: 4px;
          overflow: hidden;
          float: left;

          img {
            width: 100%;
            transition: ease all .8s;
          }
        }


        .index_article_main {
          width 100%;
          /*width: 400px;*/
          float: right;

          a.index_article_main_link {
            display: block;
            /*height: 110px;*/
            color #2D2F33;

            h2 {
              width: 100%;
              max-height: 50px;
              line-height: 25px;
              font-size: 18px;
              font-weight: 700;
              overflow: hidden;
              padding: 2px 0 2px 0;
            }
            p {
              min-height: 42px;
              line-height: 21px;
              overflow: hidden;
              margin-top: 6px;
            }
          }

          .star_hot_pic_wrap{
            display flex;
            align-items center;

            .star_hot_pic{
              display: block;
              width: 120px;
              height: 120px;
              border-radius: 4px;
              overflow: hidden;
              position: relative;
              float: left;
              margin-right: 4px;

              &:hover {
                img{
                  width: 100%;
                  transition: all 0.3s;
                }
              }

              &:last-child .score_list_pic_num {
                display: block;
              }

              .score_list_pic_num{
                display none;
                line-height: 16px;
                font-size: 12px;
                color: #fff;
                background: rgb(0,0,0,0.5);
                border-radius: 4px 0 0 0;
                padding: 0 4px;
                position: absolute;
                right: 0;
                bottom: 0;
              }
            }
          }


          .index_article_info {
            line-height: 20px;
            font-size: 12px;
            display block;

            a {
              float: left;

              &.index_article_info_user {
                padding-top: 3px;
              }

              img {
                display: block;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                margin-right: 4px;
              }
            }

            svg {
              width: 14px;
              height: 12px;
              margin-right: 4px;
            }
          }
        }

      }
    }
  }



  .star_article_list_more {
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
