<template>
  <div class="details-data cl">
    <div class="team-data fll" :class="teamAKey">
      <ul class="player-list cl">
        <li class="team-img fll"><img :src="resultData[teamAKey + '_flag'] || $score.defaultScoreImg" alt="" /></li>
        <li class="player-item fll" :class="{active: index == activeBluePlayerIndex}" v-for="(item, index) in teamA" :key="item.playerID" v-if="index < 5" @click="togglePlayer('a', index)">
          <div class="avatar player"><img :src="item.player_image_thumb || $score.defaultPlayerImg" alt=""/></div>
        </li>
      </ul>
      <div class="player-data-tab" v-show="index == activeBluePlayerIndex" v-for="(player, index) in teamA" :key="player.playerID" v-if="index < 5">
        <div class="use-hero">
          <div class="avatar hero fll"><img :src="player.hero_image || $score.defaultPlayerImg" alt="" /></div>
          <div class="name-info fll">
            <p class="nickname"><a :href="'/data/player/' + player.playerID" target="_blank">{{player.nickname}}</a></p>
            <p class="hero-name">{{player.hero_name}}</p>
          </div>
        </div>
        <div class="process-wrap">
          <!--出装-->
          <div class="top-bar"><span>出装</span></div>
          <div class="zb-process cl" v-if="equipmentBuilds[player.playerID]">
            <div class="node-group fll" v-for="(group, index) in equipmentBuilds[player.playerID]" :key="index" v-if="group.length > 0">
              <div class="group cl">
                <div class="time-node fll" v-for="(node, j) in group" :key="j">
                  <div class="property-img equipment" :title="node.name">
                    <img v-if="node.image" :src="node.image"/>
                  </div>
                  <div class="mask-layer" :title="node.name" v-if="node.type != 'ITEM_PURCHASED'"><i class="iconfont">&#xe6d7;</i></div>
                </div>
              </div>
              <p class="zb-time">{{group[0].date}}</p>
            </div>
            <div class="arrow fll" v-else><i class="iconfont icon-icon4 arrow-icon"></i></div>
          </div>

          <!--技能-->
          <div class="top-bar"><span>技能</span></div>
          <div class="jn-process cl" v-if="skillBuilds[player.playerID]">
            <div class="skill-node fll" v-for="(s, index) in skillBuilds[player.playerID]">
              <div class="property-img skill">
                <img class="zb-icon" v-if="s.image_url" :src="s.image_url" />
                <div class="key">{{s.skillSlotTxt}}</div>
              </div>
              <div class="lv">LV.{{index + 1}}</div>
            </div>
          </div>
        </div>

        <!--符文-->
        <div class="rune-wrap">
          <div class="top-bar"><span>符文</span></div>
          <div class="rune-box cl" v-if="runeBuilds[player.playerID]">
            <div class="slot fll" :class="{master: item.key == 'perkPrimaryStyle' || item.key == 'perkSubStyle'}" v-for="(item, index) in runeBuilds[player.playerID]">
              <div class="null-box" v-if="index < 5 && item.key == 'perkSubStyle'"></div>
              <div v-else>
                <div class="rune-img-box">
                  <div class="rune-img">
                    <img :src="item.image || $score.defaultScoreImg"/>
                    <div class="pop-sub-info">
                      <span :style="{color: item.color}">{{item.name}}</span>
                      <p>{{item.desc}}</p>
                    </div>
                  </div>
                </div>
                <p class="rune-name" :style="{color: item.color}" :title="item.name">{{item.name}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="team-data flr" :class="teamBKey">
      <ul class="player-list cl">
        <li class="team-img fll"><img :src="resultData[teamBKey + '_flag'] || $score.defaultScoreImg" alt="" /></li>
        <li class="player-item fll" :class="{active: index == activeRedPlayerIndex}" v-for="(item, index) in teamB" :key="item.playerID" v-if="index < 5" @click="togglePlayer('b', index)">
          <div class="avatar player"><img :src="item.player_image_thumb || $score.defaultPlayerImg" alt="" /></div>
        </li>
      </ul>
      <div class="player-data-tab" v-show="index == activeRedPlayerIndex" v-for="(player, index) in teamB" :key="player.playerID" v-if="index < 5">
        <div class="use-hero">
          <div class="avatar hero fll"><img :src="player.hero_image || $score.defaultPlayerImg" alt="" /></div>
          <div class="name-info fll">
            <p class="nickname"><a :href="'/data/player/' + player.playerID" target="_blank">{{player.nickname}}</a></p>
            <p class="hero-name">{{player.hero_name}}</p>
          </div>
        </div>
        <div class="process-wrap">
          <!--出装-->
          <div class="top-bar"><span>出装</span></div>
          <div class="zb-process cl" v-if="equipmentBuilds[player.playerID]">
            <div class="node-group fll" v-for="(group, index) in equipmentBuilds[player.playerID]" :key="index" v-if="group.length > 0">
              <div class="group cl">
                <div class="time-node fll" v-for="(node, j) in group" :key="j">
                  <div class="property-img equipment" :title="node.name">
                    <img v-if="node.image" :src="node.image"/>
                  </div>
                  <div class="mask-layer" :title="node.name" v-if="node.type != 'ITEM_PURCHASED'"><i class="iconfont">&#xe6d7;</i></div>
                </div>
              </div>
              <p class="zb-time">{{group[0].date}}</p>
            </div>
            <div class="arrow fll" v-else><i class="iconfont icon-icon4 arrow-icon"></i></div>
          </div>

          <!--技能-->
          <div class="top-bar"><span>技能</span></div>
          <div class="jn-process cl" v-if="skillBuilds[player.playerID]">
            <div class="skill-node fll" v-for="(s, index) in skillBuilds[player.playerID]">
              <div class="property-img skill">
                <img class="zb-icon" v-if="s.image_url" :src="s.image_url" />
                <div class="key">{{s.skillSlotTxt}}</div>
              </div>
              <div class="lv">LV.{{index + 1}}</div>
            </div>
          </div>
        </div>

        <!--符文-->
        <div class="rune-wrap">
          <div class="top-bar"><span>符文</span></div>
          <div class="rune-box cl" v-if="runeBuilds[player.playerID]">
            <div class="slot fll" :class="{master: item.key == 'perkPrimaryStyle' || item.key == 'perkSubStyle'}" v-for="(item, index) in runeBuilds[player.playerID]">
              <div class="null-box" v-if="index < 5 && item.key == 'perkSubStyle'"></div>
              <div v-else>
                <div class="rune-img-box">
                  <div class="rune-img">
                    <img :src="item.image || $score.defaultScoreImg" />
                    <div class="pop-sub-info">
                      <span :style="{color: item.color}">{{item.name}}</span>
                      <p>{{item.desc}}</p>
                    </div>
                  </div>
                </div>
                <p class="rune-name" :style="{color: item.color}" :title="item.name">{{item.name}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        activeBluePlayerIndex: 0,
        activeRedPlayerIndex: 0,
//        rune: {
//          '80': {color: '#BBA87B'},
//          '81': {color: '#D74444'},
//          '82': {color: '#8691F9'},
//          '83': {color: '#49AEBB'},
//          '84': {color: '#A3D28A'},
//          '91': {color: '#BBA87B'},
//          '99': {color: ''}
//        },
        defaultColor: '#999FAD'
      };
    },
    watch: {},
    computed: {
      teams: function () {
        return this.groupBy(this.gameData.teams || [], function(player) {
          return player.color || '';
        });
      },
      teamA: function () {
        return this.teams[this.teamAKey] || [];
      },
      teamB: function () {
        return this.teams[this.teamBKey] || [];
      },
      teamAKey: function () {
        return this.resultData.teamID_a == this.resultData.blue_teamID ? 'blue' : 'red';
      },
      teamBKey: function () {
        return this.resultData.teamID_b == this.resultData.red_teamID ? 'red' : 'blue';
      },
      equipmentBuilds: function () {
        var data = this.gameData.item_builds || [];
        var builds = {};
        var _builds = {};
        data.forEach(function(player) {
          builds[player.playerID] = player.data || [];
        });
        for (var p in builds) {
          var players = builds[p] || [];
          var groups = this.groupBy(players, function (item) {
            return [item.group_time];
          });
          var _player = this.objToArr(groups);
          var list = [];
          for (var i = 0; i < _player.length; i++) {
            if (i > 0) {
              list.push([]);
              list.push(_player[i]);
            } else {
              list.push(_player[i]);
            }
          }
          _builds[p] = list;
        }
        return _builds;
      },
      skillBuilds: function () {
        var data = this.gameData.skill_builds || [];
        var builds = {};
        data.forEach(function(player) {
          builds[player.playerID] = player.data || [];
        });
        return builds;
      },
      runeBuilds: function () {
        var _this = this;
        var data = [].concat(this.gameData.perks || []);
        var perks = {};
        var color = '';
        data.forEach(function(player) {
          (player.data || []).forEach(function (o) {
//            o.color = _this.rune[_this.getSliceStr(o.perkID)] && _this.rune[_this.getSliceStr(o.perkID)].color || _this.defaultColor
            if (o.key == 'perkPrimaryStyle') color = o.color || '';
            if (o.key == 'perkSubStyle') color = o.color || '';
            o.color = color;
          });
          perks[player.playerID] = player.data || [];
        });
        return perks;
      }
    },
    mounted() {
//      console.log(this.gameData);
    },
    methods: {
      togglePlayer: function (team, index) {
        if (team == 'a') {
          this.activeBluePlayerIndex = index;
        } else if (team == 'b') {
          this.activeRedPlayerIndex = index;
        }
      },
      getSliceStr: function (str) {
        var s = typeof str == 'string' ? str : '';
        return s.slice(0, 2);
      },
      groupBy: function (arr, f) {
        var groups = {};
//        arr.forEach(function (o) {
//          var group = JSON.stringify(f(o));
//          groups[group] = groups[group] || [];
//          groups[group].push(o);
//        });

        for (var i = 0; i < arr.length; i++) {
          var group = f(arr[i]);
          groups[group] = groups[group] || [];
          groups[group].push(arr[i]);
        }
        return groups;
      },
      objToArr: function (groups) {
        return Object.keys(groups).map(function (group) {
          return groups[group];
        });
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .details-data {
    width: 100%
    margin-top 10px
    padding-bottom 26px
    .team-data {
      width: 50%
      .top-bar {
        border-bottom none
        height: 40px
        line-height: 40px
        margin 0
      }
      .player-list {
        width: 100%
        padding 0 29px
        .team-img {
          width: 40px
          height: 40px
          margin-top 1px
          margin-left 1px
        }
        .player-item {
          width: 42px
          height: 42px
          margin-left 12px
          border-radius 50%
          background: linear-gradient(180deg, rgba(212, 214, 217, 1) 0%, rgba(235, 235, 237, 1) 100%);
          position relative
          cursor pointer
          &:before {
            display none
            content ''
            width: 52px
            height: 52px
            border-radius 50%
            position: absolute
            top -5px
            left -5px
          }
        }
        .player {
          width: 42px
          height: 42px
        }
      }
      .use-hero {
        width: 334px;
        height: 60px;
        background: #F7F8FA
        border-radius: 6px;
        margin 0 auto
        margin-top 20px
        padding 11px 12px
        .hero {
          width: 38px
          height: 38px
          border-radius: 4px;
          margin 0
        }
        .name-info {
          padding-left 10px
        }
        .nickname {
          height: 20px;
          font-size: 16px;
          font-family: 'Industry-Bold';
          color: #2D2F33
          line-height: 18px;
        }
        .hero-name {
          height: 17px;
          font-size: 12px;
          font-weight: 400;
          color: #A8ABB3
          line-height: 17px;
        }
      }
      .process-wrap {
        padding 0 28px
        padding-top 6px
        .zb-process {
          width: 100%;
          overflow: hidden;
          .node-group {
            padding-bottom 10px
          }
          .time-node {
            border-radius: 2px;
            position: relative;
            overflow hidden;
            + .time-node {
              margin-left: 3px;
            }
            .equipment {
              width: 32px
              height: 32px
            }
            .mask-layer {
              width: 100%;
              height: 100%;
              text-align: center;
              line-height: 32px;
              color: #FFF;
              background: rgba(255, 255, 255, .6);
              z-index: 9;
              position: absolute;
              top: 0;
              left: 0;
              cursor default
              .iconfont {
                font-size 14px
              }
            }
          }
          .zb-time {
            font-size 12px
            margin-top 2px
            font-family: 'Industry-Bold';
            color #373A41
            text-align center
            height: 14px
            line-height 14px
          }
          .arrow {
            height: 58px;
            line-height: 30px;
            .arrow-icon {
              font-size: 20px;
              color: #A8ABB3;
            }
          }
        }
        .jn-process {
          width: 100%
          .skill-node {
            padding-bottom 15px
            + .skill-node {
              margin-left 3px
            }
            &:nth-of-type(10) {
              margin-left 0
            }
            .skill {
              width: 32px
              height: 32px
              border-radius: 2px;
              position relative
              overflow hidden
              .key {
                width: 16px;
                height: 16px;
                background: rgba(0, 0, 0, 1);
                border-radius: 2px;
                position absolute
                right: 0
                bottom 0
                font-size: 12px;
                text-align center
                line-height 14px
                font-family: 'Industry-Bold';
                color #fff
              }
            }
            .lv {
              height: 14px;
              font-size: 12px;
              font-family: 'Industry-Bold';
              color: #2D2F33
              line-height: 14px;
              text-align center
              margin-top 2px
            }
          }
        }
      }
      .rune-wrap {
        padding 0 18px
        .top-bar {
          margin 0 10px
        }
        .rune-box {
          width: 100%
        }
        .slot {
          width: 65px
          margin-bottom 10px
          position relative
          .rune-img-box {
            width: 100%
            height: 70px
            position relative
          }
          .rune-img {
            width: 36px
            height: 36px
            position absolute
            top 0
            left 0
            right 0
            bottom 0
            margin auto
            &:hover {
              .pop-sub-info {
                visibility: visible;
                opacity: 1;
                z-index 3;
              }
            }
          }
          img {
            display block
            width: 100%
            height: 100%
          }
          .rune-name {
            width: 100%
            text-align center
            height: 17px;
            font-size: 12px;
            font-weight: 400;
            color: #A4A4A4;
            line-height: 17px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis
          }
          .pop-sub-info {
            visibility: hidden;
            width: 220px;
            padding: 15px;
            position: absolute;
            bottom: 52px;
            left: calc(50% - 110px);
            background: #373a41;
            border-radius: 4px;
            opacity: 0;
            z-index -1;
            box-shadow: 0 3px 5px 0 rgba(2, 5, 13, 0.15);
            transition-property: visibility, opacity;
            transition-duration: 0.2s;
            span {
              font-size: 15px;
            }
            p {
              color: #636873;
              margin-top: 7px;
              text-align: justify;
              color: #fff;
              font-size: 13px;
              line-height 16px
            }
            &:after {
              display: block;
              content: '';
              position: absolute;
              border-top: 7px solid #373a41;
              border-left: 7px solid transparent;
              border-right: 7px solid transparent;
              left: calc(50% - 7px);
              bottom: -7px;
              z-index: 2;
            }
          }
          &:nth-of-type(2) {
            .rune-img {
              width: 40px
              height: 40px
            }
            .pop-sub-info {
              bottom 55px
            }
          }
          &.master {
            width: 70px
            .rune-img {
              width: 100%
              height: 100%
            }
            .pop-sub-info {
              bottom 80px
            }
          }
        }
      }
      &.blue {
        border-right 1px solid rgba(0, 0, 0, 0.06);
        .player-list {
          .player-item {
            &.active {
              &:before {
                display block
                border 3px solid #0D8DFC
              }
            }
          }
        }
      }
      &.red {
        .player-list {
          .player-item {
            &.active {
              &:before {
                display block
                border 3px solid #FF5C69
              }
            }
          }
        }
      }
    }
  }
</style>
