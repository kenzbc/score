<template>
  <div>
    <s-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
      <ul>
        <li style="height: 50px;" v-for="(item,index) in listdata" >{{item.title}}</li>
      </ul>
    </s-scroll>
  </div>
</template>

<script>
  import sScroll from '~/components/common/s-scroll';
  export default {
    name: "",
    components: {
      sScroll
    },
    data() {
      return {
        limit : 10,  // 一次显示多少条
        page : 0, // 开始页数
        orderBy:'reply_time',//排序
        listdata: [], // 数据存放数组
      }
    },
    async asyncData() {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
      /*
    let res = await ({
      method: 'get',
      url: `/apiUrl.do?id=parameters`
    })
    return {
      dataList:res.data.list,
    }
    */
    },
    mounted() {
      this.getList();
    },
    methods: {
      //获取帖子列表
      async getPostList(isReload){
        let params = {
          page:this.page,
          limit: this.limit,
          order: this.orderBy
        };
        let res = await this.$api.dynamic.getPostPageListData({params});
        if (res.code == '200'){
          if(isReload){
            this.listdata = res.data.list;
          }else{
            this.listdata = this.listdata.concat(res.data.list);
          }
        }else{
          this.$Message.warning(res.message);
        }

      },
      getList(){
        let vm = this;
        console.log(`getList`)
      },
      onRefresh(done) {
        this.getPostList(true);
        console.log(`onRefresh`)
        done() // call done
      },
      onInfinite(done) {
        let vm = this;
        console.log(`onInfinite`)
        this.getPostList(false);
        done() // call done
      }
    },
    destroyed() {
    }
  }
</script>

<style scoped>

</style>
