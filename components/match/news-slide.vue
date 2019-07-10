<template>
  <div class="match-news block">

    <h4 class="title">
      资讯
      <span class="random-btn" v-if="dataList.length > showNum" @click="randomNews()">换一批</span>
    </h4>
    <div class="news-list">
      <a target="_blank" class="item" v-for="item in newsList" :href="'/p/'+item.object_id">
        <span><img class="pic" :src="item.picture_list[0] ? item.picture_list[0] : '//img1.famulei.com/common/images/index/img_null.png'"></span>
        <div class="text">
          <span class="news-title">{{item.title | stringEllipsis(25)}}</span>
          <span class="footer-text">
            <span class="f-text">{{item.nickname}}</span>
            <span class="f-text">{{item.comment_count > 0 ? item.comment_count +'评' : ''}} {{item.god_count > 0 ? item.god_count + '神' : ''}}</span>
          </span>

        </div>
      </a>

      <no-data v-if="dataList.length < 1"></no-data>
    </div>

  </div>
</template>


<script>
  export default {
    name: 'news-slide',
    components:{
    },
    props:{
      size:{
        type: String,
        default: ''
      },
      dataList:{
        type:Array,
        default:function () {
          return [];
        }
      }
    },
    data:function() {
      return {
        showNum:5,
        newsList:[],
      }
    },
    watch: {
      dataList(newVal, oldVal){
        if(!Object.is(newVal, oldVal)){
          this.randomNews();
        }
      }
    },
    mounted(){
      this.randomNews();
    },
    methods: {
      randomNews(){
        this.newsList = this.makeRandomArr(this.dataList, this.showNum);
      },
      /**
       * 每次随机从数组抽出指定的数据
       * @param arrList
       * @param num
       * @returns newArrayList
       */
      makeRandomArr(arrList,num){
        if(arrList.length <= num){
          return arrList;
        }
        // var tempArr=arrList.concat();
        var tempArr=arrList.slice(0);
        var newArrList=[];
        for(var i=0;i<num;i++){
          var random=Math.floor(Math.random()*(tempArr.length));
          var arr=tempArr[random];
          tempArr.splice(random, 1);
          newArrList.push(arr);
        }
        return newArrList;
      }
    }
  };
</script>

<style lang="stylus" scoped>

  .match-news{
    width: 100%;
    background:rgba(255,255,255,1);
    border-radius:2px;

    .title{
      line-height: 40px;
      border-bottom: 1px solid #F0F1F2;
      position: relative;
      margin: 0 12px;
      padding-left: 14px;
      font-size:15px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:#2D2F33;
      display flex
      align-items center;
      justify-content space-between;

      &:before{
        content: '';
        display: block;
        width: 4px;
        height: 12px;
        background: #0D8DFC;
        position: absolute;
        left: 2px;
        top: 14px;
      }

      .random-btn{
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#A8ABB3;
        line-height:20px;
        cursor pointer;
      }


    }
    .news-list{
      width 100%;
      padding:14px;

      .item{
        width 100%;
        display flex
        padding:8px 0;
        border-bottom: 1px dotted #f0f1f2;

        &:first-child{
          padding-top:0;
        }
        &:last-child{
          padding-bottom: 0;
          border-bottom: 1px dotted transparent;
        }

        .pic{
          width:87px;
          height:58px;
          margin-right:10px;
          border-radius:2px;
        }

        .text{
          width 100%;
          display flex
          flex-wrap wrap;

          .news-title{
            width 100%;
            height: 40px;
            line-height: 18px;
            font-size:15px;
            font-family:SFProDisplay-Semibold;
            font-weight:600;
            color:#2D2F33;
          }
          .footer-text{
            width 100%;
            display flex
            justify-content space-between;

            .f-text{
              font-size:12px;
              font-family:SFProDisplay-Regular;
              font-weight:400;
              color:#A8ABB3;
              line-height:14px;
            }
          }


        }


      }

    }

  }


  @media screen and (min-width: 320px) and (max-width: 1130px) {
    .news-title {
      width: 143px!important;
      overflow: hidden;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
