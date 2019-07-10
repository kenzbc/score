<template>
  <div class="score-loading" v-if="show">
    <img :style="classSize" src="~/static/static/images/score_loading.gif" alt="" />
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: false
    }),
    props: {
      show: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'default' // default small large
      }
    },
    computed: {
      classSize() {
        let size = this.size === 'large' ? '50px' : this.size === 'small' ? '30px' : '40px'
        return {
          width: size,
          height: size
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .score-loading {
    width: 100%
    text-align center
    padding-top 10px
  }
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
  }
</style>
