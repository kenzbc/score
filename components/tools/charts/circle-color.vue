<template>
  <div :style="circleSize" class="circle">
    <svg viewBox="0 0 100 100">
      <defs v-if="isGradient">
        <linearGradient id="vux-circle-gradient" x1="10%" y1="45%" x2="50%" y2="0%">
          <stop offset="0%" :style="{'stop-color': strokeColor[0], 'stop-opacity': 1}"/>
          <stop offset="100%" :style="{'stop-color': strokeColor[1], 'stop-opacity': 1}"/>
        </linearGradient>
      </defs>
      <path :d="pathString"
            :stroke="trailColor"
            :stroke-width="trailWidth"
            :fill-opacity="0"/>
      <path :d="pathString"
            :stroke-linecap="strokeLinecap"
            :stroke="isGradient ? 'url(#vux-circle-gradient)' : strokeColor"
            :stroke-width="strokeWidth"
            fill-opacity="0" :style="pathStyle"/>
    </svg>
    <div class="circle-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  const prefixCls = 'chart-circle';
  export default {
    name: 'CircleColor',
    props: {
      size: {
        type: Number,
        default: 120
      },
      strokeWidth: {
        type: Number,
        default: 1
      },
      strokeColor: {
        type: [Array, String],
        default: '#5348FF'
      },
      trailWidth: {
        type: Number,
        default: 1
      },
      trailColor: {
        type: String,
        default: '#D9D9D9'
      },
      percent: {
        type: Number,
        default: 0
      },
      strokeLinecap: {
        type: String,
        default: 'round'
      },
      anticlockwise: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      circleSize () {
        return {
          width: `${this.size}px`,
          height: `${this.size}px`
        };
      },
      radius () {
        return 50 - this.strokeWidth / 2
      },
      pathString () {
        return `M 50,50 m 0,-${this.radius}
      a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}
      a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}`
      },
      len () {
        return Math.PI * 2 * this.radius
      },
      pathStyle () {
        return {
          'stroke-dasharray': `${this.len}px ${this.len}px`,
          'stroke-dashoffset': `${((this.anticlockwise ? this.percent - 100 : 100 - this.percent) / 100 * this.len)}px`,
          'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
        }
      },
      isGradient () {
        return typeof this.strokeColor !== 'string'
      }
    }
  }
</script>

<style>
  .circle {
    position: relative;
    margin: 0 auto;
  }
  .circle-content {
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
