<template>
  <div class="star_dynamic_btn_wrap" v-if="itemObj">
    <a href="javascript:" class="gray_2" :class="{'is_praise':itemObj.is_praise == 1}" @click="setDynamicPraise(itemObj.dynamic_id,  itemObj.is_praise == 1 ? 'unPraise' : 'praise')">
      <i class="iconfont icon-circle__good_Gray"></i>
      <span>{{itemObj.is_praise == 1 ? '取消' : '点赞'}}</span>
    </a>
    <a :href="'/p/'+itemObj.dynamic_id" target="_blank" class="gray_2">
      <i class="iconfont icon-circle__comment"></i>
      <span>{{itemObj.comment_count}}</span>
    </a>
    <a href="javascript:" class="gray_2" @click="starSharePop(itemObj.dynamic_id, itemObj.summary)">
      <i class="iconfont icon-share"></i>
      <span>分享</span>
    </a>
    <a href="javascript:" class="collect gray_2" :class="{'collected':itemObj.is_collect == '1'}" @click="collect(itemObj.dynamic_id, itemObj.is_collect == 1 ? 'unCollect' : 'collect')">
      <i class="iconfont icon-general__collect_A" v-if="itemObj.is_collect == '1'"></i>
      <i class="iconfont icon-general__collect" v-else></i>
      <span>{{itemObj.is_collect == 1 ? '已收藏' : '收藏'}}</span>
    </a>



    <!--分享动态弹出框-->
    <share-modal :show="shareModal"
                 :share-url="'/p/'+itemObj.dynamic_id"
                 :isRelayScore="true"
                 @shareRelay = 'shareRelay'
                 @setShareModalShow="setShareModalShow"></share-modal>

    <!--转发帖子弹层-->
    <relay-post-modal
      :show="relayPostModal"
      :data="data"
      @setRelayPostModalShow="setRelayPostModalShow"></relay-post-modal>


  </div>
</template>

<script>
  import ShareModal from "../common/share-modal";
  import RelayPostModal from "../post/relay-post-modal";
  export default {
    name: "detail-footer-tools",
    components: {
      RelayPostModal,
      ShareModal,
    },
    props:{
      data:{
        type:Object,
        default:()=>{}
      }
    },
    data() {
      return {
        shareModal:false,//是否显示分享Modal,
        relayPostModal:false,//是否显示帖子转发弹层

        itemObj:{}
      }
    },
    mounted() {
      this.itemObj = this.data;
    },
    methods: {
      //分享弹层
      setShareModalShow(e){
        if(e === false){
          this.shareModal = false;
        };
      },
      //分享转发动作
      shareRelay(e){
        if(e === true){
          this.shareModal = false;
          this.relayPostModal = true;
        };
      },
      //帖子转发弹层回调
      setRelayPostModalShow(e){
        if(e === false){
          this.relayPostModal = false;
        };
      },
      share(e){
        this.shareModal = true;
      },
      //帖子点赞
      async setDynamicPraise(dynamic_id, type) {
        let params = {
          dynamic_id: dynamic_id
        };
        let res;
        if(type == 'praise'){
          res = await this.$api.dynamic.praise({params});
        }else{
          res = await this.$api.dynamic.unPraise({params});
        }
        if(res.code == '200'){
          this.$Message.success(res.message);
          if(type == 'praise'){
            this.itemObj.is_praise = 1;
          }else{
            this.itemObj.is_praise = 0;
          }
          this.$emit('refresh',true);
        }else{
          this.$Message.error(res.message);
        }
      },
      //分享
      starSharePop(dynamic_id, summary){
        this.shareModal = true;
      },
      //收藏
      async collect(dynamic_id, type){
        let params = {
          dynamic_id: dynamic_id
        };

        let res;
        if(type == 'collect'){
          res = await this.$api.dynamic.collect({params});
        }else{
          res = await this.$api.dynamic.unCollect({params});
        }
        if(res.code == '200'){
          this.$Message.success(res.message);
          if(type == 'collect'){
            this.itemObj.is_collect = 1;
          }else{
            this.itemObj.is_collect = 0;
          }
          this.$emit('refresh',true);
        }else{
          this.$Message.error(res.message);
        }

      },
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>

  .star_dynamic_btn_wrap {
    width 100%;
    text-align: center;
    padding-top: 10px;
    display: flex;

    a {
      display: inline-block;
      width: 143px;
      line-height: 32px;
      text-align: center;
      background: #fafafa;
      border-radius: 24px;
      margin: 0 2px;

      &:hover{
        background: #eef7ff;
      }

      &.is_praise {
        color: #0d8dfc;
      }

      .iconfont {
        font-size: 18px;
        margin-top: -2px;
        margin-right: 4px;
      }
      span {
        font-size: 13px;
        margin-left: 2px;
      }

      &.collected {
        color: #ffc157;
      }

    }
  }


</style>
