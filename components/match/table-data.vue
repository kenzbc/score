<template>
  <div class="table-wrap" v-if="isResultData">
    <table class="table" :class="teamAKey">
      <thead>
      <tr>
        <th>{{resultData[teamAKey + '_name']}} {{resultData[teamAKey + '_result'] ? (resultData[teamAKey + '_result'] == '1' ? '胜利' : '败北') : '' }}</th>
        <th v-for="(item, index) in table.th" :key="index">{{item.field}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="val in strArr" :key="val" v-if="resultData[teamAKey + '_star_' + val + '_playerID']">
        <td>
          <a :href="'/data/player/' + resultData[teamAKey + '_star_' + val + '_playerID']" target="_blank">
            <div class="avatar player mid"><img :src="resultData[teamAKey + '_star_' + val + '_pic'] || $score.defaultPlayerImg" /></div>
          </a>
          <div class="avatar hero mid">
            <img class="role-icon mid" :src="resultData[teamAKey + '_hero_' + val + '_pic'] || $score.defaultPlayerImg" />
            <span class="lv">{{resultData[teamAKey + '_hero_' + val + '_lv']}}</span>
          </div>
          <div class="jn-icon-wrap mid">
            <div class="property-img" v-if="resultData[teamAKey + '_' + val + '_skill_1']">
              <img class="jn-icon" :src="resultData[teamAKey + '_' + val + '_skill_1']" />
            </div>
            <div class="property-img" v-if="resultData[teamAKey + '_' + val + '_skill_2']">
              <img class="jn-icon" :src="resultData[teamAKey + '_' + val + '_skill_2']" />
            </div>
          </div>
          <a :href="'/data/player/' + resultData[teamAKey + '_star_' + val + '_playerID']" target="_blank">
            <span class="nickname mid" :title="resultData[teamAKey + '_star_' + val + '_name']">{{resultData[teamAKey + '_star_' + val + '_name']}}</span>
          </a>
        </td>

        <td>
          <div class="property-img mid" v-for="v in [1,2,3,4,5,6,7]" :key="v">
            <img :src="resultData[teamAKey + '_star_' + val + '_equip_' + v]" v-if="resultData[teamAKey + '_star_' + val + '_equip_' + v]" />
          </div>
        </td>

        <td class="kda">
          <p>{{resultData[teamAKey + '_star_' + val + '_kda']}}</p>
          <p>{{resultData[teamAKey + '_star_' + val + '_kills']}} / {{resultData[teamAKey + '_star_' + val + '_deaths']}} / {{resultData[teamAKey + '_star_' + val + '_assists']}}</p>
        </td>

        <td class="damage atk">
          <p>{{resultData[teamAKey + '_star_' + val + '_atk_p'] || 0}}%</p>
          <div class="data-bar">
            <div class="rate-bar" :style="{width: parseInt(resultData[teamAKey + '_star_' + val + '_atk_o'] || 0) / maxAtk * 100 + '%'}"></div>
            <div class="pop-data"><div>总输出 (分均)</div><p>{{resultData[teamAKey + '_star_' + val + '_atk_o']}} ({{resultData[teamAKey + '_star_' + val + '_atk_m']}})</p></div>
          </div>
        </td>
        <td class="damage def">
          <p>{{resultData[teamAKey + '_star_' + val + '_def_p'] || 0}}%</p>
          <div class="data-bar">
            <div class="rate-bar" :style="{width: parseInt(resultData[teamAKey + '_star_' + val + '_def_o'] || 0) / maxDef * 100 + '%'}"></div>
            <div class="pop-data"><div>总承伤 (分均)</div><p>{{resultData[teamAKey + '_star_' + val + '_def_o']}} ({{resultData[teamAKey + '_star_' + val + '_def_m']}})</p></div>
          </div>
        </td>
        <td class="hits">
          <p>{{resultData[teamAKey + '_star_' + val + '_hits']}}</p>
          <p>{{resultData[teamAKey + '_star_' + val + '_adc_m']}}/分</p>
        </td>
        <td>
          <p>{{resultData[teamAKey + '_star_' + val + '_money']}}</p>
        </td>
        <td class="">{{resultData[teamAKey + '_star_' + val + '_score']}}</td>
      </tr>
      </tbody>
    </table>
    <table class="table" :class="teamBKey">
      <thead>
      <tr>
        <th>{{resultData[teamBKey + '_name']}} {{resultData[teamBKey + '_result'] ? (resultData[teamBKey + '_result'] == '1' ? '胜利' : '败北') : '' }}</th>
        <th v-for="(item, index) in table.th" :key="index">{{item.field}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="val in strArr" :key="val" v-if="resultData[teamBKey + '_star_' + val + '_playerID']">
        <td>
          <a :href="'/data/player/' + resultData[teamBKey + '_star_' + val + '_playerID']" target="_blank">
            <div class="avatar player mid"><img :src="resultData[teamBKey + '_star_' + val + '_pic'] || $score.defaultPlayerImg" /></div>
          </a>
          <div class="avatar hero mid">
            <img class="role-icon mid" :src="resultData[teamBKey + '_hero_' + val + '_pic'] || $score.defaultPlayerImg" />
            <span class="lv">{{resultData[teamBKey + '_hero_' + val + '_lv']}}</span>
          </div>
          <div class="jn-icon-wrap mid">
            <div class="property-img" v-if="resultData[teamBKey + '_' + val + '_skill_1']">
              <img class="jn-icon" :src="resultData[teamBKey + '_' + val + '_skill_1']" />
            </div>
            <div class="property-img" v-if="resultData[teamBKey + '_' + val + '_skill_2']">
              <img class="jn-icon" :src="resultData[teamBKey + '_' + val + '_skill_2']" />
            </div>
          </div>
          <a :href="'/data/player/' + resultData[teamBKey + '_star_' + val + '_playerID']" target="_blank">
            <span class="nickname mid" :title="resultData[teamBKey + '_star_' + val + '_name']">{{resultData[teamBKey + '_star_' + val + '_name']}}</span>
          </a>
        </td>

        <td>
          <div class="property-img mid" v-for="v in [1,2,3,4,5,6,7]" :key="v">
            <img :src="resultData[teamBKey + '_star_' + val + '_equip_' + v]" v-if="resultData[teamBKey + '_star_' + val + '_equip_' + v]" />
          </div>
        </td>

        <td class="kda">
          <p>{{resultData[teamBKey + '_star_' + val + '_kda']}}</p>
          <p>{{resultData[teamBKey + '_star_' + val + '_kills']}} / {{resultData[teamBKey + '_star_' + val + '_deaths']}} / {{resultData[teamBKey + '_star_' + val + '_assists']}}</p>
        </td>

        <td class="damage atk">
          <p>{{resultData[teamBKey + '_star_' + val + '_atk_p'] || 0}}%</p>
          <div class="data-bar">
            <div class="rate-bar" :style="{width: parseInt(resultData[teamBKey + '_star_' + val + '_atk_o'] || 0) / maxAtk * 100 + '%'}"></div>
            <div class="pop-data"><div>总输出 (分均)</div><p>{{resultData[teamBKey + '_star_' + val + '_atk_o']}} ({{resultData[teamBKey + '_star_' + val + '_atk_m']}})</p></div>
          </div>
        </td>
        <td class="damage def">
          <p>{{resultData[teamBKey + '_star_' + val + '_def_p'] || 0}}%</p>
          <div class="data-bar">
            <div class="rate-bar" :style="{width: parseInt(resultData[teamBKey + '_star_' + val + '_def_o'] || 0) / maxDef * 100 + '%'}"></div>
            <div class="pop-data"><div>总承伤 (分均)</div><p>{{resultData[teamBKey + '_star_' + val + '_def_o']}} ({{resultData[teamBKey + '_star_' + val + '_def_m']}})</p></div>
          </div>
        </td>
        <td class="hits">
          <p>{{resultData[teamBKey + '_star_' + val + '_hits']}}</p>
          <p>{{resultData[teamBKey + '_star_' + val + '_adc_m']}}/分</p>
        </td>
        <td>
          <p>{{resultData[teamBKey + '_star_' + val + '_money']}}</p>
        </td>
        <td class="">{{resultData[teamBKey + '_star_' + val + '_score']}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: {
      gameData: {
        type: Object,
        default: {}
      },
      resultData: {
        type: Object,
        default: {}
      },
      strArr: {
        type: Array,
        default: []
      },
      maxAtk: {
        type: Number,
        default: 0
      },
      maxDef: {
        type: Number,
        default: 0
      }
    },
    data: function () {
      return {
        table: {
          th: [
            {field: '出装'},
            {field: 'KDA'},
            {field: '输出'},
            {field: '承伤'},
            {field: '补兵'},
            {field: '金钱'},
            {field: '评分'},
          ]
        }
      };
    },
    watch: {},
    computed: {
      isResultData: function () {
        return Object.keys(this.resultData).length > 0
      },
      teamAKey: function () {
        return this.resultData.teamID_a == this.resultData.blue_teamID ? 'blue' : 'red';
      },
      teamBKey: function () {
        return this.resultData.teamID_b == this.resultData.red_teamID ? 'red' : 'blue';
      }
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style lang="stylus" scoped>
  .table-wrap {
    width: 100%
    .table {
      width: 100%
      margin: 0;
      padding: 0;
      color: #2D2F33
      font-size 15px

      tr {
        th {
          height: 37px
          color #fff
          font-size 14px
          &:nth-of-type(1) {
            padding-left 32px
          }
        }
        td {
          &:nth-of-type(1) {
            padding-left 10px
            white-space nowrap
          }
        }
        th, td {
          text-align center
          font-family: 'Industry-Bold';
          p {
            font-family: 'Industry-Bold';
          }
          &:nth-of-type(1) {
            width: 24%;
            text-align left
          }
          &:nth-of-type(2) {
            width: 24%;
          }
          &:nth-of-type(3) {
            width: 10%;
          }
          &:nth-of-type(4) {
            width: 9%;
          }
          &:nth-of-type(5) {
            width: 9%;
          }
          &:nth-of-type(6) {
            width: 8%;
          }
          &:nth-of-type(7) {
            width: 8%;
          }
          &:nth-of-type(8) {
            width: 8%;
          }
        }
        .kda {
          p:nth-of-type(1) {
            height: 18px;
            font-family: 'Industry-Bold';
            line-height: 16px;
          }
          p:nth-of-type(2) {

            height: 14px;
            font-size: 12px;
            font-family: 'Industry-Demi';
            color: #A8ABB3
            line-height: 12px;
          }
        }
        .damage {
          p {
            font-size: 14px;
          }
          .data-bar {
            width: 50px;
            height: 10px;
            background: rgba(0, 0, 0, 0.04);
            border-radius: 2px;
            margin 0 auto
            margin-top 4px
            position relative
            &:hover {
              .pop-data {
                display block
              }
            }
          }
          .rate-bar {
            height: 100%
            border-radius: 2px;
          }
          .pop-data {
            display: none;
            padding 8px 15px 10px;
            white-space nowrap;
            text-align: center;
            background: #373a41;
            box-shadow: 0 6px 16px 0 rgba(0,0,0,0.12);
            border-radius: 2px;
            font-size: 12px;
            color: #f9f9fa;
            position: absolute;
            bottom: 15px;
            left: 50%;
            transform translate(-50%, 0)
            z-index: 1;
            p {
              margin-top 3px
              font-size 13px
            }
            &:before {
              display: block;
              content: '';
              width: 0;
              height: 0;
              border-bottom: 10px solid #373a41;
              border-right: 10px solid transparent;
              position: absolute;
              bottom: -1px;
              left: calc(50% - 5px);
              transform: rotate(-45deg);
            }
          }
          &.atk {
            .rate-bar {
              background: linear-gradient(135deg, rgba(255, 76, 106, 1) 0%, rgba(255, 107, 137, 1) 100%);
            }
          }
          &.def {
            .rate-bar {
              background: #16DE9B
            }
          }
        }
        .hits {
          p:nth-of-type(1) {
            height: 18px;
            line-height: 16px;
          }
          p:nth-of-type(2) {
            height: 17px;
            font-size: 12px;
            font-weight 500
            color: #A8ABB3
            font-family 'PingFang SC', 'Microsoft Yahei', 'sans-serif'
            line-height: 17px;
          }
        }
      }
      thead {
        tr {
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }
      }
      tbody {
        tr {
          border-top 1px solid rgba(0, 0, 0, 0.04);
        }
        td {
          height: 56px
        }
      }
      .player {
        width: 30px
        height: 30px
        position relative
        z-index 1
        margin-right -10px
      }
      .hero {
        width: 38px
        height: 38px
        position relative
        overflow visible
        img {
          border-radius 50%
        }
        .lv {
          display block
          width: 18px
          height: 18px
          border-radius 50%
          box-shadow: 0 4px 8px -3px rgba(0, 0, 0, 0.12);
          background #fff
          color #373A41
          text-align center
          font-size 12px
          line-height 18px
          font-weight 600
          position absolute
          z-index 1
          bottom -3px
          right -3px
        }
      }
      .nickname {
        height: 20px
        line-height 18px
        font-family: 'Industry-Bold';
        margin-left 5px
        max-width 65px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
      }
      .property-img {
        width: 22px;
        height: 22px;
        border-radius: 3px;
        overflow hidden
        + .property-img {
          margin-left 2px
        }
      }
      .jn-icon-wrap {
        margin-left 3px
        .property-img {
          width: 18px;
          height: 18px;
          border: 1px solid rgba(0, 0, 0, 0.04);
          + .property-img {
            margin-left 0
            margin-top 2px
          }
        }
      }
      &.blue {
        thead {
          tr {
            background: linear-gradient(90deg, rgba(13, 126, 255, 1) 0%, rgba(15, 151, 255, 1) 100%);
          }
        }
        tbody {
          tr {
            &:nth-child(even) {
              background: rgba(13, 141, 252, 0.04);
            }
          }
        }
      }
      &.red {
        thead {
          tr {
            background: linear-gradient(135deg, rgba(255, 76, 106, 1) 0%, rgba(255, 107, 137, 1) 100%);
          }
        }
        tbody {
          tr {
            &:nth-child(even) {
              background: rgba(255, 92, 105, 0.04);
            }
          }
        }
      }
    }
  }
</style>
