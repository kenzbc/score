<template>
  <div class="star_article_list star_dynamic_list">
    <ul class="index_article_list" id="star_dynamic_list">
      <li class="" v-for="item in dynamicList">
        <div class="index_article_border">
          <detail-head :data="item"></detail-head>
          <nuxt-link :to="'/p/'+item.dynamic_id" target="_blank" class="star_dynamic_link">
            <h2>{{item.title}}</h2>
            <p class="">{{item.summary}}</p>
          </nuxt-link>
          <detail-footer-tools :data="item"></detail-footer-tools>
        </div>

      </li>
    </ul>

    <a v-if="isMore" href="javascript:" class="star_article_list_more gray_2" @click="getMore()">加载更多</a>


  </div>
</template>

<script>
  import DetailHead from '../post/detail-head'
  import DetailFooterTools from "../post/detail-footer-tools";

  export default {
    name: "star-main-dynamic",
    components: {
      DetailHead,
      DetailFooterTools
    },
    props:{
      starId:{
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
        page:1,
        limit:20,
        isMore:true,
        dynamicList:[],
      }
    },
    watch:{
      list(newVal, oldVal){
        this.dynamicList = newVal;
      }
    },
    mounted() {
      this.dynamicList = this.list;
    },
    methods: {
      //获取更多数据
      async getMore(){
        let params = {
          star_id: this.starId,
          page: this.page,
          limit: this.limit
        };
        let res = await this.$api.star.getDynamicList({params});
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
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .star_dynamic_list{

    .index_article_list{

      li{
        cursor: pointer;
        padding: 0px 15px;

        .index_article_border{
          border-bottom: 1px dotted #F0F1F2;
          padding: 10px 0;

          .star_dynamic_link{
            h2 {
              line-height: 24px;
              font-size: 16px;
              margin-bottom: 6px;
            }
            p{
              max-height: 66px;
              line-height: 22px;
              overflow: hidden;
              margin-bottom: 4px;
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
