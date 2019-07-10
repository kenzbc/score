<template>
  <div class="modal-wrap" v-show="show">
    <div class="modal-mask" :style="{backgroundColor: bgColor}" @click="$emit('update:maskShow', false)"></div>
    <slot></slot>
  </div>
</template>

<script>

  export default {
    data() {
      return {}
    },
    props: {
      bgColor: {
        type: String,
        default: 'rgba(0,0,0, 0.3)'
      },
      show: Boolean
    },
    computed: {},
    mounted() {},
    methods: {},
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .modal-mask {
    position fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index 110
  }

  @media screen and (max-width: 1200px) {

  }

  @media screen and (max-width: 768px) {

  }

  @media screen and (max-width: 600px) {

  }
</style>
