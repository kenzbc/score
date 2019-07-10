<template>
  <div class="net-chart" id="netChart"></div>
</template>

<script>
  export default {
    props: {
      dataA: {
        type: Array,
        default: [0, 0, 0, 0, 0, 0]
      },
      dataB: {
        type: Array,
        default: [0, 0, 0, 0, 0, 0]
      }
    },
    data: function () {
      return {
        chart: null
      };
    },
    watch: {
      dataA: {
        deep: true,
        handler: function (newVal, oldVal) {
          if (newVal != oldVal) {
            this.updateChart();
          }
        }
      },
      dataB: {
        deep: true,
        handler: function (newVal, oldVal) {
          if (newVal != oldVal) {
            this.updateChart();
          }
        }
      }
    },
    mounted() {
      this.initNetChart();
    },
    methods: {
      // 对阵数据蜘蛛图
      initNetChart: function () {
        var _this = this;
        this.chart = new Highcharts.Chart('netChart', {
          chart: {
            width: 200,
            height: 200,
            backgroundColor: null,
            polar: true,
            type: 'area',
            spacing: 25
            // marginTop: 0
          },
          title: {
            text: null
          },
          pane: {
            size: '80%'
          },
          xAxis: {
            categories: ['经济', '击杀', '生存', '助攻', '补刀', '视野'],
            tickmarkPlacement: 'on',
            lineWidth: 0,
            gridLineWidth: 1,
            labels: {
              distance: 20,
              style: {
                color: '#373A41',
                fontSize: 13
              }
            }
          },
          yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0,
            max: 1,
            tickAmount: 5,
            gridLineColor: '#D4DAE0',
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
          series: [{
            data: _this.dataA,
//            data: [.3, .2, .5, .4, .7, .9],
            type: 'area',
            pointPlacement: 'on',
            color: '#0C9DFC',
            fillOpacity: .1,
            lineWidth: 1,
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
          }, {
            type: 'area',
            data: _this.dataB,
//            data: [.5, .6, .8, .2, .4, .6],
            pointPlacement: 'on',
            color: '#FF5C5C',
            fillOpacity: .1,
            lineWidth: 1,
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
          }],
          exporting: {
            enabled: false
          },
          credits: {
            enabled: false
          }
        });
      },
      updateChart: function (type, val) {
        var _this = this;
        this.chart.update({
          series: [{
            data: _this.dataA
          }, {
            data: _this.dataB
          }]
        });
      }
    }
  };
</script>
