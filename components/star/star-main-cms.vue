<template>
  <div class="star_article_list star_cms_list">
    <ul class="index_article_list">
      <li class="index_article_1" v-for="item in articlelist">
        <div class="index_article_border cl">
          <a :href="'/p/'+item.object_id" target="_blank" class="index_article_pic">
            <img :src="item.picture_list.length>0 ? item.picture_list[0] : '/static/images/img_null.png'+'?x-oss-process=image/resize,m_fill,h_130,w_195,limit_0'">
          </a>
          <div class="index_article_main">
            <a :href="'/p/'+item.object_id" target="_blank" class="index_article_main_link">
              <h2>{{item.title}}</h2>
              <p class="gray_3">{{item.summary}}</p>
            </a>
            <p class="index_article_info cl">
              <a :href="'/u/'+item.member_id" target="_blank" class="index_article_info_user">
                <img :src="item.avatar ? item.avatar : '/static/images/tx_pic.jpg'+'?x-oss-process=image/resize,m_fill,h_14,w_14,limit_0'">
              </a>
              <a :href="'/u/'+item.member_id" target="_blank" class="gray_3">{{item.nickname}}</a>
              <span class="gray_3 flr">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-CombinedShape1"></use>
                </svg>
                {{item.view_count}} 阅
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
    name: "star-main-cms",
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
        page:3,
        isMore:true,
        articlelist:[],
      }
    },
    watch:{
      list(newVal, oldVal){
        this.articlelist = newVal;
      }
    },
    mounted() {
      this.articlelist = this.list;
    },
    methods: {
      async getMore(){
        let params = {
          star_id: this.starId,
          page: this.page,
        };
        let res = await this.$api.star.getArticleList({params});
        if(res.code == '200'){
          if(res.data.article_list.length > 0){
            this.isMore = true;
            this.page = this.page + 1;
            this.articlelist = this.articlelist.concat(res.data.article_list);
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
          width: 400px;
          float: right;

          a.index_article_main_link {
            display: block;
            height: 110px;

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
              max-height: 42px;
              line-height: 21px;
              overflow: hidden;
              margin-top: 6px;
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


  @media all and (max-width:768px){
    .score-star-home{
      margin: 0;

      .star-homepage-wrap{

        .star_article_list{
          .index_article_list{

            li{
              .index_article_border{

                .index_article_pic{
                  margin-right: 10px;
                }
              }
            }



          }
        }

      }


    }
  }

</style>
