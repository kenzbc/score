<template>
  <div>
    聊天室

  </div>
</template>

<script>
  export default {
    name: "direct_messages",
    components: {},
    data() {
      return {}
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

    },
    methods: {},
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>


</style>
