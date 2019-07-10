<template>
  <div class="page-container">
    <div class="homepage-main">
开发中
    </div>
  </div>
</template>

<script>
  export default {
    name: "homepage",
    middleware:'user-auth',//页面需要登录才能访问
    components: {},
    data() {
      return {
        userInfo:''
      }
    },
    head() {
      return this.$seo(
        `个人中心`,
        `个人中心`,
        `个人中心`
      );
    },
    async asyncData({app, $axios, error}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
      let [res] = await Promise.all([
        //app.$api.task.getTaskCenter()
      ])

      return {
        //dataList: res.data,
      }
    },
    mounted() {
      this.getUserInfo();
    },
    methods: {
      async getUserInfo(){
        let userInfo = await this.$api.member.getUserInfo({params:{broadcast_id:this.$store.state.modules.login.member_id}});
        this.userInfo = userInfo.data;
        this.$store.commit('modules/login/setUserInfo', userInfo.data);
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .page-container {
    max-width: 990px;
    margin: 0 auto;
    width: 100%;
    zoom: 1;
    padding-top: 0px;
    display flex;
    flex-wrap wrap;
    justify-content space-between;
  }

  .homepage-main{
    width: 990px;
    min-height 600px;
    margin: 0 auto;
  }


</style>
