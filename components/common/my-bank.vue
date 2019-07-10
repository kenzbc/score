<template>
    <span v-if="type == 1">{{myBank.guozi1}}</span>
    <span v-else-if="type == 2">{{myBank.diamond}}</span>
    <span v-else-if="type == 3">{{myBank.ticket}}</span>
    <span v-else-if="type == 4">{{myBank.fantasy_key}}</span>
</template>

<script>

  export default {
    name: "my-bank",
    data(){
      return {
        myBank: {},  // 我的钱包
      }
    },
    // async asyncData({$axios, app}) {
    //   // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
    //   let [my_bank] = await Promise.all([
    //     app.$api.user.getMyBank()
    //   ]);
    //   // console.log(bet_single_list.data)
    //   console.log('-------------------->');
    //   return {
    //     myBank: my_bank.data || {}, // 个人信息
    //   }
    // },
    props: {
      // 1: 果子  2.钻石  3.门票  4.钥匙
      type: {
        type: String,
        default: ''
      },
    },
    mounted(){
      this.getMyBank();
    },
    methods: {
      async getMyBank() {
        let res = await this.$api.user.getMyBank();
        console.log(res);
        if (res.code == '200') {
          this.myBank = res.data;
        } else {
          this.$Message.warning(res.message);
        }
      },
    }
  }
</script>

<style scoped>

</style>
