<template>
  <div class="faq_pop_wrap" v-if="showMyFaqBlock">
    <div class="faq_pop_main">
      <label class="dialog_close1" @click="sentMsgToParents()"><i class="icon iconfont icon-quxiao"></i></label>
      <h2 class="faq_pop_title">我的提问</h2>
      <div class="faq_pop_list">
        <div class="faq_pop_row_th">
          <div class="faq_pop_cell detail_cell_1">工单号</div>
          <div class="faq_pop_cell detail_cell_2">提交时间</div>
          <div class="faq_pop_cell detail_cell_3">问题分类</div>
          <div class="faq_pop_cell detail_cell_4">状态</div>
        </div>
        <div class="faq_pop_list_main">
          <div class="faq_pop_row" v-for="item in faqMyList" v-if="faqMyList && faqMyList.length > 0">
            <div class="faq_pop_cell detail_cell_1">{{item.id}}</div>
            <div class="faq_pop_cell detail_cell_2">{{item.add_time}}</div>
            <div class="faq_pop_cell detail_cell_3">{{item.name}}</div>
            <div class="faq_pop_cell detail_cell_4"
                 :class="item.is_delete == '1' ? 'status_red' : item.status == '0' ? 'status_red' : 'status_green'">
                {{item.is_delete == '1' ? '已删除' : item.status == '0' ? '未处理' : '已处理'}}
            </div>
          </div>
        </div>
        <div class="faq_pop_list_more_wrap" v-if="loadMore">
          <div class="faq_pop_list_more" @click="loadMoreBtn();">
            <p>LOAD</p>
            <img src="/static/images/load_more.png" alt="">
            <p>MORE</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'faq-my-list',
    data(){
      return {
        showMyFaqBlock: false,
        loadMore: true,
        faqMyList:[],
        faqMyListParams: {
          page: 1,
          limit: 10
        },
      }
    },
    methods: {
      sentMsgToParents(){
        var params = {
          showMyFaqBlock: false
        }
        this.$emit('listenToMyList', params)
      },
      // 点击加载
      async showMyFaq(){
        let res = await this.$api.faq.getFaqMyList({ params: this.faqMyListParams});
        console.log('searchCategory 数据');

        if (res.code == '200'){
          if (res.data.list.length == 0) this.loadMore = false;
          this.faqMyList = this.faqMyListParams.page == 1 ? res.data.list || [] : this.faqMyList.concat(res.data.list)
          this.showMyFaqBlock = true;
        }

      },
      // 点击加载
      loadMoreBtn (){
        this.faqMyListParams.page ++;
        this.showMyFaq();
      }
    },
    mounted(){
      this.showMyFaq();
    }
  }
</script>

<style lang="stylus" scoped>
  /*我的提问弹出框*/
  .faq_pop_wrap {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 11;
  }

  .faq_pop_main {
    width: 100%;
    max-width: 600px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 15px 15px;
    z-index: 12;
  }

  .dialog_close1 {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    background: #BFC2C9;
    border: 1px solid #B2B6BD;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
  }

  .dialog_close1 .icon {
    font-size: 12px;
    color: #fff;
  }

  .faq_pop_title {
    font-size: 16px;
    color: #5F6575;
    margin: 0 0 20px 0;
  }

  .faq_pop_list {

  }

  .faq_pop_list_main {
    max-height: 300px;
    overflow-y: scroll;
    margin-bottom: 10px;
  }

  .faq_pop_list .faq_pop_row, .faq_pop_list .faq_pop_row_th {
    display: table-row;
    width: 100%;
    height: 38px;
    font-size: 13px;
  }

  .faq_pop_list .faq_pop_cell {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    color: #5F6575;
  }

  .faq_pop_list .faq_pop_cell.detail_cell_1 {
    width: 90px;
  }

  .faq_pop_list .faq_pop_cell.detail_cell_2 {
    width: 200px;
  }

  .faq_pop_list .faq_pop_cell.detail_cell_3 {
    width: 200px;
  }

  .faq_pop_list .faq_pop_cell.detail_cell_4 {
    width: 80px;
  }

  .faq_pop_list .faq_pop_cell.status_red {
    color: #FF5C69
  }

  .faq_pop_list .faq_pop_cell.status_green {
    color: #16DE9B;
  }

  .faq_pop_list .faq_pop_row_th {
    font-weight: bold;
  }

  faq_pop_row_th {
    background: #F9FAFB;
  }

  .faq_pop_list .faq_pop_row:nth-child(2n+2) {
    background: #F9FAFB;
  }

  .faq_pop_list_more_wrap {
    position: relative;
    width: 100%;
    height: 40px;
    /*display: none;*/
  }

  .faq_pop_list_more {
    position: absolute;
    width: 120px;
    height: 30px;
    left: 50%;
    top: 50%;
    margin-left: -60px;
    margin-top: -13px;
    text-align: center;
    color: #a5a8b2;
    //display: -webkit-box;
    //display: -moz-box;
    //display: -webkit-flex;
    //display: -ms-flexbox;
    //display: box;
    display: flex;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -o-box-orient: horizontal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: justify;
    -moz-box-pack: justify;
    -o-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    cursor: pointer;
  }

  .faq_pop_list_more p {
    line-height: 30px;
    font-size: 13px;
    color: #999;
    font-family: "Industry-BoldItalic", "Microsoft YaHei", sans-serif;
  }

  .faq_pop_list_more img {
    width: 26px;
    height: 26px;
  }

  @media screen and (max-width: 768px) {
    .faq_pop_wrap{
      .faq_pop_main {
        width calc(100% - 28px)
        padding 0 14px
      }
    }
  }
</style>
