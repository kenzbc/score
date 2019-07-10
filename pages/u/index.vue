<template>
  <div class="homepage-main">

  </div>
</template>

<script>

  export default {
    name: "homepage",
    components: {
      // momentSon
    },
    data() {
      return {
        // dynamicShow:'0',
        // category_id:'-1',
        // categoryList:[],
      }
    },
    watch:{
      // categoryList(newVal, oldVal){
      //
      // },
      // deep: true
    },
    async asyncData({app, $axios, error, query}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。

      let res = await app.$api.circle.getCircleList({category_id:'-1'});
      return {
        categoryList: res.data.category_list,
        dataList: res.data.data_list
      }

    },
    fetch() {
      // 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。
    },
    head() {
      // 配置当前页面的 Meta 标签
      return this.$seo(
        `个人主页`,
        `明星圈子,互动社区,主播互动`,
        `Score,致力于为电竞玩家提供专业、快速、全面的赛事信息及专业化的数据查询功能，是电竞玩家赛事互动平台。在这里，还可以关注你喜爱电竞选手，为他打CALL`,
        {
          script: [],
          link: []
        }
      );
    },
    mounted() {

    },
    methods: {
      async getCircle(){
        let res = await this.$api.circle.getCircleList({params:{category_id:'-1'}});
        this.dataList = res.data.data_list;
      },
      //加入圈子
      async setJoinCircleAttention(circleId){
        let res = await this.$api.circle.setJoinCircleAttention({params:{circle_id:circleId}});

        if(res.code == '200'){
          this.$Message.success('关注成功!');
          this.dataList.forEach((item)=>{
            if(item.parent_circle_info.circle_id == circleId){
              item.parent_circle_info.is_attention = 1;
              return;
            }
          });
          this.getCircle();
        }else{
          this.$Message.warning(`关注失败! ${res.message}`);
        }

      },
      //退出圈子
      async setCancelCircleAttention(circleId){
        let res = await this.$api.circle.setCancelCircleAttention({params:{circle_id:circleId}});

        if(res.code == '200'){
          this.$Message.success('取消成功!');
          this.dataList.forEach((item)=>{
            if(item.parent_circle_info.circle_id == circleId){
              item.parent_circle_info.is_attention = 0;
            }
          });
          this.getCircle();
        }else{
          this.$Message.warning(`取消失败! ${res.message}`);
        }
      },
      reload(){
        console.log('reload')
        this.getCircle();
      },
      showSon(id){
        this.dynamicShow == id ? this.dynamicShow = 0 : this.dynamicShow = id;
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>



  @media all and (max-width: 768px) {


  }

</style>
