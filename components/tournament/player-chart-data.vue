<template>
  <div class="chart-data cl">
    <div class="chart fll" id="radar"></div>
    <div class="attr-bar-wrap">
      <div class="attr-group">
        <p class="attr-rate"><span class="rate">{{playerModeData.victory_rate || 0}}%</span><span class="text">胜率</span><span class="win-lose">{{gameSum}}场 {{playerModeData.win || 0}}胜 {{playerModeData.lose || 0}}败</span></p>
        <div class="attr-bar win-rate"><span class="inner-bar" :style="{width: `${playerModeData.victory_rate || 0}%`, transition: transitionStyle}"></span></div>
      </div>
      <div class="attr-group">
        <p class="attr-rate"><span class="rate">{{playerModeData.offered_rate || 0}}%</span><span class="text">参团率</span></p>
        <div class="attr-bar join-rate"><span class="inner-bar" :style="{width: `${playerModeData.offered_rate || 0}%`, transition: transitionStyle}"></span></div>
      </div>
      <div class="attr-group">
        <p class="attr-rate"><span class="rate">{{playerModeData.average_DTR || 0}}%</span><span class="text">伤害转化率</span></p>
        <div class="attr-bar damage-rate"><span class="inner-bar" :style="{width: `${playerModeData.average_DTR > 100 ? 100 : playerModeData.average_DTR}%`, transition: transitionStyle}"></span></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      playerModeData: {
        type: Object,
        default: {}
      },
      maxData: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        chart: null,
        chartFields: ['kills', 'assists', 'life', 'offered_rate', 'money', 'wards'],
        transitionStyle: 'width 0.5s'
      }
    },
    computed: {
      gameSum() {
        return (this.playerModeData.win || 0) + (this.playerModeData.lose || 0)
      },
      chartData() {
        return this.chartFields.map(key => Math.round((this.playerModeData[key] || 0) / (this.maxData[key] || 0) * 100) / 100)
      }
    },
    watch: {

    },
    methods: {
      initChart(data) {
        this.chart = new Highcharts.Chart('radar', {
          chart: {
            width: 180,
            height: 180,
            backgroundColor: null,
            spacing: 25,
            type: 'area',
            polar: true
          },
          title: {
            text: null
          },
          pane: {
            size: '80%'
          },
          xAxis: {
            categories: ['击杀', '助攻', '生存', '参团率', '经济', '视野'],
            tickmarkPlacement: 'on',
            lineWidth: 0,
            gridLineWidth: 1,
            labels: {
              distance: 20,
              style: {
                color: '#5F6575',
                fontSize: 14
              }
            }
          },
          yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0,
            max: 1,
            tickAmount: 5,
            gridLineColor: '#d6d6d6',
            labels: {
              enabled: false
            }
          },
          tooltip: {
            enabled: false
          },
          legend: {
            enabled: false
          },
          series: [
            {
              name: 'radar',
              data: data,
              pointPlacement: 'on',
              // color: '#0C9DFC',
              color: {
                // radialGradient: { cx: 0.5, cy: 0.5, r: .7, fx: 0.5, fy: 0.5 },
                // radialGradient: { cx: 0.5, cy: 0.5, r: .7 },
                linearGradient: {x1: 0, y1: 1, x2: 0.6, y2: 0},
                stops: [
                  [0, 'rgba(15, 143, 255, .42)'],
                  [1, 'rgba(93, 13, 255, .5)']
                ]
              },
              // fillColor: {
              //     linearGradient: {x1: 0, y1: 1, x2: 0.6, y2: 0},
              //     stops: [
              //         [0, 'rgba(15, 143, 255, .42)'],
              //         [1, 'rgba(93, 13, 255, .5)']
              //     ]
              // },
              // fillOpacity: .1,
              lineWidth: .5,
              marker: {
                enabled: false,
                states: {
                  hover: {
                    enabled: false
                  }
                }
              },
              states: {
                hover: {
                  enabled: false
                }
              }
            }
          ],
          exporting: {
            enabled: false
          },
          credits: {
            enabled: false
          }
        });
      },
      updateChart() {
        if (this.chart) {
          this.chart.update({
            series: [{
              data: [].concat(this.chartData)
            }]
          })
        }
      }
    },
    mounted() {
      if (!this.chart) this.initChart(this.chartData)
    },
    destroyed() {
      this.chart && this.chart.destroy()
      this.chart = null
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~static/static/css/variable.styl"

  .chart-data {
    width: 100%
    padding 0 30px
    margin-top 10px
    .chart {
      width: 180px
      height: 180px
    }
  }
  .attr-bar-wrap {
    float left
    width calc(100% - 180px)
    padding-left 30px
    padding-top 15px
    .attr-group {
      + .attr-group {
        margin-top 14px
      }
    }
    .attr-rate {
      white-space nowrap
      overflow hidden
      padding-top 2px
      .rate {
        font-size 18px
        font-family 'Industry-Bold'
        font-weight 600
        margin-left 1px
        margin-right 10px
      }
      .text {
        font-size 14px
      }
      .win-lose {
        font-size 12px
        color $color-gray-2
        float right
        margin-right 2px
        margin-top 7px
      }
    }
    .attr-bar {
      width: 100%
      height: 10px
      background #f5f6f7
      border-radius 5px
      margin-top 6px
      .inner-bar {
        display block
        width: 86%
        height: 100%
        border-radius 5px
      }
      &.win-rate {
        .inner-bar {
          background: linear-gradient(315deg, rgba(26, 151, 235, 1) 0%, rgba(19, 127, 242, 1) 100%);
          box-shadow: 0 3px 8px -2px rgba(13, 141, 252, 0.2);
        }

      }
      &.join-rate {
        .inner-bar {
          background: linear-gradient(135deg, rgba(116, 232, 126, 1) 0%, rgba(177, 240, 115, 1) 100%);
          box-shadow: 0 3px 8px -2px rgba(125, 232, 116, 0.26)
        }
      }
      &.damage-rate {
        .inner-bar {
          background: linear-gradient(135deg, rgba(255, 76, 106, 1) 0%, rgba(255, 107, 137, 1) 100%);
          box-shadow: 0 3px 8px -2px rgba(255, 92, 105, 0.2);
        }
      }
    }
  }
</style>
