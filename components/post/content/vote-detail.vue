<template>
  <div class="editor-vote-list">
    <div class="editor-vote-list-top">
      <div class="vote-list-left">
        <svg aria-hidden="true" class="icon-list-toupiao"><use xlink:href="#icon-circle__vote"></use></svg> 投票
      </div>
      <div class="vote-list-number">已有<span class="vote-list-n">{{detail.vote_number_count}}</span>人投票</div>
    </div>

    <div class="editor-vote-list-bottom">

      <div class="editor-vote-items" v-for="item,index in detail.item" @click="choose(item.item_id, detail.is_vote)" :class="{'active' : chooseItem == item.item_id}">
        <div class="editor-vote-first" :class="{'active' : item.number}">
          <div class="editor-vote-first-left fl">{{index+1}}<span class="zhijiao-down"></span></div>
          <div class="editor-vote-first-right fl">{{item.item}}</div>
          <div class="editor-vote-first-line editor-vote-first-line1">
            <div class="inner-vote-bar" :style="'width:'+item.percent"></div>
          </div>
          <div class="editor-vote-first-border"></div>
        </div>
      </div>

    </div>
    <div class="toggle-num">
      <div class="toggle-num-left">{{detail.vote.number == '1' ? '单选' : '多选'}}</div>
      <div class="toggle-num-right">截止时间 : {{detail.vote.end_time | tsToDate}}</div>
    </div>
    <div class="add-vote-btn">
      <p class="add-vote-button add-vote-button-jiezhi add-vote-btn1 fr" v-if="detail.vote.status == '1'">已截止</p>
      <p class="add-vote-button moment_votebtn_active" v-else :class="{'active' : detail.is_vote == '1'}" @click="voteAct(detail.vote.dynamic_id, chooseItem)">{{detail.is_vote == '1' ? '已投票' : '投票'}}</p>
    </div>
  </div>
</template>

<script>
  // 投票类型的帖子
  export default {
    name: "vote-detail",
    components: {},
    props:{
      detail:{
        type: Object,
        default: ()=>{}
      }
    },
    data() {
      return {
        chooseItem:''
      }
    },
    mounted() {

    },
    methods: {
      choose(itemId, isVote){
        if(isVote == '1'){
          return false;
        };
        this.chooseItem = itemId;
      },
      voteAct(dynamicId, chooseItem){

      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .editor-vote-list{
    padding: 14px 20px 20px;
    margin: 10px 0px 0;
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 2px;

    .editor-vote-list-top {
      padding-bottom: 4px;
      display flex
      justify-content space-between;

      .vote-list-left {
        font-size: 16px;
        color: #2d2f33;
        font-weight: bold;

        .icon-list-toupiao {
          height: 16px;
          width: 16px;
          vertical-align: -2px;
          margin-right: 4px;
        }
      }
      .vote-list-number {
        .vote-list-n {
          color: #f00;
        }
      }
    }


    .editor-vote-list-bottom{
      .editor-vote-items {

        &.active{
          .editor-vote-first{
            .editor-vote-first-border {
              display: inline-block;
              border: 2px solid #0d8dfc;
            }
          }

        }


        .editor-vote-first {
          cursor: pointer;
          margin-top: 10px;
          background: #f7f8fa;
          border-radius: 4px;
          height: 44px;
          line-height: 44px;
          position: relative;


          &.active{

            .editor-vote-first-left {
              background: #0d8dfc;
            }
            .editor-vote-first-line {
              .inner-vote-bar {
                background: #0d8dfc;
              }
            }
          }

          .editor-vote-first-left {
            border-radius: 4px 0 0 4px;
            background: #D2D4D9;
            width: 40px;
            padding-left: 13px;
            font-size: 14px;
            color: #fff;
            position: relative;

            .zhijiao-down {
              position: absolute;
              top: 0;
              right: 0;
              width: 0;
              height: 0;
              border-color: transparent #f7f8fa;
              border-width: 0 10px 44px 0;
              border-style: solid;
            }
          }

          .editor-vote-first-right {
            font-weight: bold;
            margin-left: 12px;
            line-height: 44px;
            font-size: 14px;
            color: #656973;
          }
          .editor-vote-first-line {
            position: absolute;
            height: 4px;
            left: 39px;
            bottom: 0;
            width: calc(100% - 40px);

            .inner-vote-bar {
              height: 100%;
              background: #D2D4D9;
              border-radius: 0 8px 0 0;
            }
          }

          .editor-vote-first-border {
            display: none;
            position: absolute;
            top: 0px;
            left: 0;
            width: 100%;
            height: 44px;
            border: 2px solid #D2D4D9;
            border-radius: 4px;
            z-index: 0;
          }
        }
      }
    }


    .toggle-num {
      margin-top: 10px;
      display:flex;
      justify-content space-between;

      .toggle-num-left {
        font-size: 12px;
        color: #a8abb3;
      }
      .toggle-num-right {
        font-size: 12px;
        color: #a8abb3;
      }
    }


    .add-vote-btn {
      margin-top: 23px;
      display flex;
      justify-content flex-end;

      .add-vote-button {
        cursor: pointer;
        width: 120px;
        height: 34px;
        border: 1px solid #0d8dfc;
        border-radius: 24px;
        line-height: 32px;
        text-align: center;
        font-size: 14px;
        color: #0d8dfc;

        &.active{
          cursor: auto;
          color: #fff;
          background: #0d8dfc;
        }
      }
    }
  }

</style>
