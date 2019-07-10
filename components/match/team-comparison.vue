<template>
  <div class="piece team-comparison-box">
    <div class="top-bar">
      <span>近期表现</span>
    </div>
    <div class="data-wrap" :class="{more: teamComparisonMore}">
      <div class="visible-box">
        <div class="data-content cl">
          <div class="chart-wrap fll">
            <i-circle :size="96" :stroke-width="8" :trail-width="8" :percent="parseFloat(teamData.score_team_a)">
              <span class="val">{{teamData.score_team_a}}%</span>
            </i-circle>
            <div class="title" slot="title">实力评分</div>
          </div>

          <div class="chart-wrap flr">
            <i-circle :size="96" :stroke-width="8" :trail-width="8" stroke-color="#FF4C6A" :percent="parseFloat(teamData.score_team_b)">
              <span class="val">{{teamData.score_team_b}}%</span>
            </i-circle>
            <div class="title" slot="title">实力评分</div>
          </div>

          <div class="com-wrap">
            <div class="com-box" :class="{'l-max': parseFloat(teamData.hand_win_team_a || 0) > parseFloat(teamData.hand_win_team_b || 0), 'r-max': parseFloat(teamData.hand_win_team_b || 0) > parseFloat(teamData.hand_win_team_a || 0)}">
              <div class="row">
                <div class="result l-r fll">{{teamData.hand_win_team_a}}W {{teamData.hand_lose_team_a}}L</div>
                <div class="result r-r flr">{{teamData.hand_win_team_b}}W {{teamData.hand_lose_team_b}}L</div>
                <div class="mid-title">近 6 场交手</div>
              </div>
              <div class="row cl">
                <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="eachOtherWinA"></div></div>
                <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="eachOtherWinB"></div></div>
              </div>
            </div>
            <div class="com-box" :class="{'l-max': getSixGameResultCompare('left'), 'r-max': getSixGameResultCompare('right')}">
              <div class="row">
                <div class="result l-r fll">{{teamData.record_win_team_a}}W {{teamData.record_lose_team_a}}L</div>
                <div class="result r-r flr">{{teamData.record_win_team_b}}W {{teamData.record_lose_team_b}}L</div>
                <div class="mid-title">近 6 场战绩</div>
              </div>
              <div class="row cl">
                <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="sixGameResultRate('left')"></div></div>
                <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="sixGameResultRate('right')"></div></div>
              </div>
            </div>
            <div class="com-box" :class="{'l-max': parseFloat(teamData.average_kills_team_a || 0) > parseFloat(teamData.average_kills_team_b || 0), 'r-max': parseFloat(teamData.average_kills_team_b || 0) > parseFloat(teamData.average_kills_team_a || 0)}">
              <div class="row">
                <div class="result l-r fll">{{teamData.average_kills_team_a || 0}}</div>
                <div class="result r-r flr">{{teamData.average_kills_team_b || 0}}</div>
                <div class="mid-title">近 6 场场均击杀</div>
              </div>
              <div class="row cl">
                <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="averageKillsA"></div></div>
                <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="averageKillsB"></div></div>
              </div>
            </div>
            <div class="com-box" :class="{'l-max': parseFloat(teamData.average_tower_team_a || 0) > parseFloat(teamData.average_tower_team_b || 0), 'r-max': parseFloat(teamData.average_tower_team_b || 0) > parseFloat(teamData.average_tower_team_a || 0)}">
              <div class="row">
                <div class="result l-r fll">{{teamData.average_tower_team_a || 0}}</div>
                <div class="result r-r flr">{{teamData.average_tower_team_b || 0}}</div>
                <div class="mid-title">近 6 场场均拆塔</div>
              </div>
              <div class="row cl">
                <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="averageTowerA"></div></div>
                <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="averageTowerB"></div></div>
              </div>
            </div>
            <div class="com-box" :class="{'l-max': parseFloat(teamData.average_money_team_a || 0) > parseFloat(teamData.average_money_team_b || 0), 'r-max': parseFloat(teamData.average_money_team_b || 0) > parseFloat(teamData.average_money_team_a || 0)}">
              <div class="row">
                <div class="result l-r fll">{{teamData.average_money_team_a || 0}}</div>
                <div class="result r-r flr">{{teamData.average_money_team_b || 0}}</div>
                <div class="mid-title">近 6 场场均经济</div>
              </div>
              <div class="row cl">
                <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="averageMoneyA"></div></div>
                <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="averageMoneyB"></div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="show-btn" @click="showMore"><span>{{teamComparisonMore ? '收起' : '展开'}}</span><i class="iconfont icon-general__arrow"></i></div>
      </div>
      <div class="hide-box" v-show="teamComparisonMore">
        <div class="c-team-info">
          <div class="team-left">
            <img :src="matchInfo.team_a_image_thumb || $score.defaultScoreImg" :alt="matchInfo.team_a_short_name"/>
            <span>{{matchInfo.team_a_short_name || ''}}</span>
          </div>
          <div class="team-count-title">最近 6 场数据</div>
          <div class="team-right">
            <span>{{matchInfo.team_b_short_name || ''}}</span>
            <img :src="matchInfo.team_b_image_thumb || $score.defaultScoreImg" :alt="matchInfo.team_b_short_name"/>
          </div>
        </div>
        <!--胜率-->
        <div class="hide-top">
          <div class="com-box large">
            <div class="row">
              <div class="result l-r fll">{{teamData.victory_rate_a}}%</div>
              <div class="result r-r flr">{{teamData.victory_rate_b}}%</div>
              <div class="mid-title">胜率</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="winRateA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="winRateB"></div></div>
            </div>
          </div>
        </div>
        <!--场均时长-->
        <div class="hide-bottom bottom-l fll">
          <div class="com-box small" :class="{'l-max': teamData.average_time_a > teamData.average_time_b, 'r-max': teamData.average_time_b > teamData.average_time_a}">
            <div class="row">
              <div class="result l-r fll">{{teamData.average_time_a | sToMs}}</div>
              <div class="result r-r flr">{{teamData.average_time_b | sToMs}}</div>
              <div class="mid-title">场均时长</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="averageTimeA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="averageTimeB"></div></div>
            </div>
          </div>
        </div>
        <!--KDA-->
        <div class="hide-bottom bottom-r flr">
          <div class="com-box small" :class="{'l-max': teamData.average_kda_team_a > teamData.average_kda_team_b, 'r-max': teamData.average_kda_team_b > teamData.average_kda_team_a}">
            <div class="row">
              <div class="result l-r fll"><span class="val">{{teamData.average_kda_team_a}}</span><span class="kda">[{{teamData.average_kills_team_a}}/{{teamData.average_deaths_team_a}}/{{teamData.average_assists_team_a}}]</span></div>
              <div class="result r-r flr"><span class="kda">[{{teamData.average_kills_team_b}}/{{teamData.average_deaths_team_b}}/{{teamData.average_assists_team_b}}]</span><span class="val">{{teamData.average_kda_team_b}}</span></div>
              <div class="mid-title">KDA</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="averageKdaA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="averageKdaB"></div></div>
            </div>
          </div>
        </div>
        <!--场均击杀-->
        <div class="hide-bottom bottom-l fll">
          <div class="com-box small" :class="{'l-max': teamData.average_kills_team_a > teamData.average_kills_team_b, 'r-max': teamData.average_kills_team_b > teamData.average_kills_team_a}">
            <div class="row">
              <div class="result l-r fll">{{teamData.average_kills_team_a || 0}}</div>
              <div class="result r-r flr">{{teamData.average_kills_team_b || 0}}</div>
              <div class="mid-title">场均击杀</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="averageKillsA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="averageKillsB"></div></div>
            </div>
          </div>
        </div>
        <!--分均经济-->
        <div class="hide-bottom bottom-r flr">
          <div class="com-box small" :class="{'l-max': teamData.minute_money_team_a > teamData.minute_money_team_b, 'r-max': teamData.minute_money_team_b > teamData.minute_money_team_a}">
            <div class="row">
              <div class="result l-r fll">{{teamData.minute_money_team_a || 0}}</div>
              <div class="result r-r flr">{{teamData.minute_money_team_b || 0}}</div>
              <div class="mid-title">分均经济</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="minuteMoneyA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="minuteMoneyB"></div></div>
            </div>
          </div>
        </div>

        <div class="hide-bottom bottom-l fll">
          <div class="com-box small" :class="{'l-max': teamData.average_deaths_team_a > teamData.average_deaths_team_b, 'r-max': teamData.average_deaths_team_b > teamData.average_deaths_team_a}">
            <div class="row">
              <div class="result l-r fll">{{teamData.average_deaths_team_a || 0}}</div>
              <div class="result r-r flr">{{teamData.average_deaths_team_b || 0}}</div>
              <div class="mid-title">场均死亡</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="averageDeathsA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="averageDeathsB"></div></div>
            </div>
          </div>
        </div>
        <div class="hide-bottom bottom-r flr">
          <div class="com-box small" :class="{'l-max': teamData.minute_hits_team_a > teamData.minute_hits_team_b, 'r-max': teamData.minute_hits_team_b > teamData.minute_hits_team_a}">
            <div class="row">
              <div class="result l-r fll">{{teamData.minute_hits_team_a || 0}}</div>
              <div class="result r-r flr">{{teamData.minute_hits_team_b || 0}}</div>
              <div class="mid-title">分均补刀</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="minuteHitsA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="minuteHitsB"></div></div>
            </div>
          </div>
        </div>

        <div class="hide-bottom bottom-l fll">
          <div class="com-box small" :class="{'l-max': parseFloat(teamData.average_money_team_a || 0) > parseFloat(teamData.average_money_team_b || 0), 'r-max': parseFloat(teamData.average_money_team_b || 0) > parseFloat(teamData.average_money_team_a || 0)}">
            <div class="row">
              <div class="result l-r fll">{{teamData.average_money_team_a || 0}}</div>
              <div class="result r-r flr">{{teamData.average_money_team_b || 0}}</div>
              <div class="mid-title">场均经济</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="averageMoneyA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="averageMoneyB"></div></div>
            </div>
          </div>
        </div>
        <div class="hide-bottom bottom-r flr">
          <div class="com-box small" :class="{'l-max': parseFloat(teamData.minute_wardsPlaced_team_a || 0) > parseFloat(teamData.minute_wardsPlaced_team_b || 0), 'r-max': parseFloat(teamData.minute_wardsPlaced_team_b || 0) > parseFloat(teamData.minute_wardsPlaced_team_a || 0)}">
            <div class="row">
              <div class="result l-r fll">{{teamData.minute_wardsPlaced_team_a || 0}}</div>
              <div class="result r-r flr">{{teamData.minute_wardsPlaced_team_b || 0}}</div>
              <div class="mid-title">分均插眼</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="minuteWardsPlacedA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="minuteWardsPlacedB"></div></div>
            </div>
          </div>
        </div>

        <div class="hide-bottom bottom-l fll">
          <div class="com-box small" :class="{'l-max': getMoneyDiffCompare('left'), 'r-max': getMoneyDiffCompare('right')}">
            <div class="row">
              <div class="result l-r fll">{{teamData.average_money_diff_team_a || 0}}</div>
              <div class="result r-r flr">{{teamData.average_money_diff_team_b || 0}}</div>
              <div class="mid-title">场均经济差</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="averageMoneyDiff('left')"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="averageMoneyDiff('right')"></div></div>
            </div>
          </div>
        </div>
        <div class="hide-bottom bottom-r flr">
          <div class="com-box small" :class="{'l-max': teamData.minute_wardsKilled_team_a > teamData.minute_wardsKilled_team_b, 'r-max': teamData.minute_wardsKilled_team_b > teamData.minute_wardsKilled_team_a}">
            <div class="row">
              <div class="result l-r fll">{{teamData.minute_wardsKilled_team_a || 0}}</div>
              <div class="result r-r flr">{{teamData.minute_wardsKilled_team_b || 0}}</div>
              <div class="mid-title">分均排眼</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="minuteWardsKillsA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="minuteWardsKillsB"></div></div>
            </div>
          </div>
        </div>

        <div class="hide-bottom bottom-l fll">
          <div class="com-box small" :class="{'l-max': teamData.average_dragon_team_a > teamData.average_dragon_team_b, 'r-max': teamData.average_dragon_team_b > teamData.average_dragon_team_a}">
            <div class="row">
              <div class="result l-r fll">{{teamData.average_dragon_team_a || 0}}</div>
              <div class="result r-r flr">{{teamData.average_dragon_team_b || 0}}</div>
              <div class="mid-title">场均小龙</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="averageDragonA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="averageDragonB"></div></div>
            </div>
          </div>
        </div>
        <div class="hide-bottom bottom-r flr">
          <div class="com-box small" :class="{'l-max': teamData.firstBloodKill_team_a > teamData.firstBloodKill_team_b, 'r-max': teamData.firstBloodKill_team_b > teamData.firstBloodKill_team_a}">
            <div class="row">
              <div class="result l-r fll">{{teamData.firstBloodKill_team_a}}%</div>
              <div class="result r-r flr">{{teamData.firstBloodKill_team_b}}%</div>
              <div class="mid-title">一血率</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="firstBloodA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="firstBloodB"></div></div>
            </div>
          </div>
        </div>

        <div class="hide-bottom bottom-l fll">
          <div class="com-box small" :class="{'l-max': teamData.average_baron_team_a > teamData.average_baron_team_b, 'r-max': teamData.average_baron_team_b > teamData.average_baron_team_a}">
            <div class="row">
              <div class="result l-r fll">{{teamData.average_baron_team_a || 0}}</div>
              <div class="result r-r flr">{{teamData.average_baron_team_b || 0}}</div>
              <div class="mid-title">场均大龙</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="averageBaronA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="averageBaronB"></div></div>
            </div>
          </div>
        </div>
        <div class="hide-bottom bottom-r flr">
          <div class="com-box small" :class="{'l-max': teamData.firstTowerKill_team_a > teamData.firstTowerKill_team_b, 'r-max': teamData.firstTowerKill_team_b > teamData.firstTowerKill_team_a}">
            <div class="row">
              <div class="result l-r fll">{{teamData.firstTowerKill_team_a}}%</div>
              <div class="result r-r flr">{{teamData.firstTowerKill_team_b}}%</div>
              <div class="mid-title">一塔率</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="firstTowerA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="firstTowerB"></div></div>
            </div>
          </div>
        </div>

        <div class="hide-bottom bottom-l fll">
          <div class="com-box small" :class="{'l-max': teamData.average_tower_team_a > teamData.average_tower_team_b, 'r-max': teamData.average_tower_team_b > teamData.average_tower_team_a}">
            <div class="row">
              <div class="result l-r fll">{{teamData.average_tower_team_a || 0}}</div>
              <div class="result r-r flr">{{teamData.average_tower_team_b || 0}}</div>
              <div class="mid-title">场均推塔</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="averageTowerA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="averageTowerB"></div></div>
            </div>
          </div>
        </div>
        <div class="hide-bottom bottom-r flr">
          <div class="com-box small" :class="{'l-max': teamData.rate_baron_team_a > teamData.rate_baron_team_b, 'r-max': teamData.rate_baron_team_b > teamData.rate_baron_team_a}">
            <div class="row">
              <div class="result l-r fll">{{teamData.rate_baron_team_a}}%</div>
              <div class="result r-r flr">{{teamData.rate_baron_team_b}}%</div>
              <div class="mid-title">大龙控制率</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="baronRateA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="baronRateB"></div></div>
            </div>
          </div>
        </div>

        <div class="hide-bottom bottom-l fll">
          <div class="com-box small" :class="{'l-max': teamData.average_be_turretKills_team_a > teamData.average_be_turretKills_team_b, 'r-max': teamData.average_be_turretKills_team_b > teamData.average_be_turretKills_team_a}">
            <div class="row">
              <div class="result l-r fll">{{teamData.average_be_turretKills_team_a}}</div>
              <div class="result r-r flr">{{teamData.average_be_turretKills_team_b}}</div>
              <div class="mid-title">场均被推塔</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="averageByTowerA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="averageByTowerB"></div></div>
            </div>
          </div>
        </div>
        <div class="hide-bottom bottom-r flr">
          <div class="com-box small" :class="{'l-max': teamData.rate_dragon_team_a > teamData.rate_dragon_team_b, 'r-max': teamData.rate_dragon_team_b > teamData.rate_dragon_team_a}">
            <div class="row">
              <div class="result l-r fll">{{teamData.rate_dragon_team_a}}%</div>
              <div class="result r-r flr">{{teamData.rate_dragon_team_b}}%</div>
              <div class="mid-title">小龙控制率</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="dragonRateA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="dragonRateB"></div></div>
            </div>
          </div>
        </div>

        <div class="hide-bottom bottom-l fll">
          <div class="com-box small" :class="{'l-max': teamData.minute_damage_team_a > teamData.minute_damage_team_b, 'r-max': teamData.minute_damage_team_b > teamData.minute_damage_team_a}">
            <div class="row">
              <div class="result l-r fll">{{teamData.minute_damage_team_a || 0}}</div>
              <div class="result r-r flr">{{teamData.minute_damage_team_b || 0}}</div>
              <div class="mid-title">分均伤害</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="minuteDamageA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="minuteDamageB"></div></div>
            </div>
          </div>
        </div>
        <div class="hide-bottom bottom-r flr">
          <div class="com-box small" :class="{'l-max': teamData.rate_full_bureau_team_a > teamData.rate_full_bureau_team_b, 'r-max': teamData.rate_full_bureau_team_b > teamData.rate_full_bureau_team_a}">
            <div class="row">
              <div class="result l-r fll">{{teamData.rate_full_bureau_team_a}}%</div>
              <div class="result r-r flr">{{teamData.rate_full_bureau_team_b}}%</div>
              <div class="mid-title">满局率</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="fullA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="fullB"></div></div>
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
      teamData: {
        type: Object,
        default: {}
      },
      matchInfo: {
        type: Object,
        default: {}
      }
    },
    data: function () {
      return {
        teamComparisonMore: false // 更多实力指数
      };
    },
    filters:{
      sToMs: function (val) {
        if(val < 0){
          return '00:00'
        }
        var _val = parseInt(val || 0);
        var minute = Math.floor(_val / 60);
        var second = _val % 60;
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        return minute + ':' + second;
      },
    },
    computed: {
      eachOtherWinA: function () {
        var val_a = parseFloat(this.teamData.hand_win_team_a || 0) > 0 ? parseFloat(this.teamData.hand_win_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.hand_win_team_b || 0) > 0 ? parseFloat(this.teamData.hand_win_team_b || 0) : 0;
        var sum = val_a + val_b;
        return {
          width: (sum > 0 ? val_a / sum * 100 : 0) + '%'
        }
      },
      eachOtherWinB: function () {
        var val_a = parseFloat(this.teamData.hand_win_team_a || 0) > 0 ? parseFloat(this.teamData.hand_win_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.hand_win_team_b || 0) > 0 ? parseFloat(this.teamData.hand_win_team_b || 0) : 0;
        var sum = val_a + val_b;
        return {
          width: (sum > 0 ? val_b / sum * 100 : 0) + '%'
        }
      },
      resultA: function () {
        var val_a = parseFloat(this.teamData.record_win_team_a || 0) > 0 ? parseFloat(this.teamData.record_win_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.record_lose_team_a || 0) > 0 ? parseFloat(this.teamData.record_lose_team_a || 0) : 0;
        var sum = val_a + val_b;
        return {
          width: (sum > 0 ? val_a / sum * 100 : 0) + '%'
        }
      },
      resultB: function () {
        var val_a = parseFloat(this.teamData.record_win_team_a || 0) > 0 ? parseFloat(this.teamData.record_win_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.record_lose_team_a || 0) > 0 ? parseFloat(this.teamData.record_lose_team_a || 0) : 0;
        var sum = val_a + val_b;
        return {
          width: (sum > 0 ? val_b / sum * 100 : 0) + '%'
        }
      },
      averageKillsA: function () {
        var val_a = parseFloat(this.teamData.average_kills_team_a || 0) > 0 ? parseFloat(this.teamData.average_kills_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_kills_team_b || 0) > 0 ? parseFloat(this.teamData.average_kills_team_b || 0) : 0;
        var sum = val_a + val_b;
        return {
          width: (sum > 0 ? val_a / sum * 100 : 0) + '%'
        }
      },
      averageKillsB: function () {
        var val_a = parseFloat(this.teamData.average_kills_team_a || 0) > 0 ? parseFloat(this.teamData.average_kills_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_kills_team_b || 0) > 0 ? parseFloat(this.teamData.average_kills_team_b || 0) : 0;
        var sum = val_a + val_b;
        return {
          width: (sum > 0 ? val_b / sum * 100 : 0) + '%'
        }
      },
      averageTowerA: function () {
        var val_a = parseFloat(this.teamData.average_tower_team_a || 0) > 0 ? parseFloat(this.teamData.average_tower_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_tower_team_b || 0) > 0 ? parseFloat(this.teamData.average_tower_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_a / sum * 100 : 0) + '%'
        }
      },
      averageTowerB: function () {
        var val_a = parseFloat(this.teamData.average_tower_team_a || 0) > 0 ? parseFloat(this.teamData.average_tower_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_tower_team_b || 0) > 0 ? parseFloat(this.teamData.average_tower_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_b / sum * 100 : 0) + '%'
        }
      },
      winRateA: function () {
        return {
          width: this.teamData.victory_rate_a + '%'
        }
      },
      winRateB: function () {
        return {
          width: this.teamData.victory_rate_b + '%'
        }
      },
      averageTimeA: function () {
        var val_a = parseFloat(this.teamData.average_time_a || 0) > 0 ? parseFloat(this.teamData.average_time_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_time_b || 0) > 0 ? parseFloat(this.teamData.average_time_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_a / sum * 100 : 0) + '%'
        }
      },
      averageTimeB: function () {
        var val_a = parseFloat(this.teamData.average_time_a || 0) > 0 ? parseFloat(this.teamData.average_time_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_time_b || 0) > 0 ? parseFloat(this.teamData.average_time_b || 0) : 0;
        var sum = val_a + val_b;
        return {
          width: (sum > 0 ? val_b / sum * 100 : 0) + '%'
        }
      },
      averageKdaA: function () {
        var val_a = parseFloat(this.teamData.average_kda_team_a || 0) > 0 ? parseFloat(this.teamData.average_kda_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_kda_team_b || 0) > 0 ? parseFloat(this.teamData.average_kda_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_a / sum * 100 : 0) + '%'
        }
      },
      averageKdaB: function () {
        var val_a = parseFloat(this.teamData.average_kda_team_a || 0) > 0 ? parseFloat(this.teamData.average_kda_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_kda_team_b || 0) > 0 ? parseFloat(this.teamData.average_kda_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_b / sum * 100 : 0) + '%'
        }
      },
      minuteMoneyA: function () {
        var val_a = parseFloat(this.teamData.minute_money_team_a || 0) > 0 ? parseFloat(this.teamData.minute_money_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.minute_money_team_b || 0) > 0 ? parseFloat(this.teamData.minute_money_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_a / sum * 100 : 0) + '%'
        }
      },
      minuteMoneyB: function () {
        var val_a = parseFloat(this.teamData.minute_money_team_a || 0) > 0 ? parseFloat(this.teamData.minute_money_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.minute_money_team_b || 0) > 0 ? parseFloat(this.teamData.minute_money_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_b / sum * 100 : 0) + '%'
        }
      },
      averageDeathsA: function () {
        var val_a = parseFloat(this.teamData.average_deaths_team_a || 0) > 0 ? parseFloat(this.teamData.average_deaths_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_deaths_team_b || 0) > 0 ? parseFloat(this.teamData.average_deaths_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_a / sum * 100 : 0) + '%'
        }
      },
      averageDeathsB: function () {
        var val_a = parseFloat(this.teamData.average_deaths_team_a || 0) > 0 ? parseFloat(this.teamData.average_deaths_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_deaths_team_b || 0) > 0 ? parseFloat(this.teamData.average_deaths_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_b / sum * 100 : 0) + '%'
        }
      },
      minuteHitsA: function () {
        var val_a = parseFloat(this.teamData.minute_hits_team_a || 0) > 0 ? parseFloat(this.teamData.minute_hits_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.minute_hits_team_b || 0) > 0 ? parseFloat(this.teamData.minute_hits_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_a / sum * 100 : 0) + '%'
        }
      },
      minuteHitsB: function () {
        var val_a = parseFloat(this.teamData.minute_hits_team_a || 0) > 0 ? parseFloat(this.teamData.minute_hits_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.minute_hits_team_b || 0) > 0 ? parseFloat(this.teamData.minute_hits_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_b / sum * 100 : 0) + '%'
        }
      },
      averageMoneyA: function () {
        var val_a = parseFloat(this.teamData.average_money_team_a || 0) > 0 ? parseFloat(this.teamData.average_money_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_money_team_b || 0) > 0 ? parseFloat(this.teamData.average_money_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_a / sum * 100 : 0) + '%'
        }
      },
      averageMoneyB: function () {
        var val_a = parseFloat(this.teamData.average_money_team_a || 0) > 0 ? parseFloat(this.teamData.average_money_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_money_team_b || 0) > 0 ? parseFloat(this.teamData.average_money_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_b / sum * 100 : 0) + '%'
        }
      },
      minuteWardsPlacedA: function () {
        var val_a = parseFloat(this.teamData.minute_wardsPlaced_team_a || 0) > 0 ? parseFloat(this.teamData.minute_wardsPlaced_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.minute_wardsPlaced_team_b || 0) > 0 ? parseFloat(this.teamData.minute_wardsPlaced_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_a / sum * 100 : 0) + '%'
        }
      },
      minuteWardsPlacedB: function () {
        var val_a = parseFloat(this.teamData.minute_wardsPlaced_team_a || 0) > 0 ? parseFloat(this.teamData.minute_wardsPlaced_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.minute_wardsPlaced_team_b || 0) > 0 ? parseFloat(this.teamData.minute_wardsPlaced_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_b / sum * 100 : 0) + '%'
        }
      },
      averageMoneyDiffA: function (pos) {
        var val_a = parseFloat(this.teamData.average_money_diff_team_a || 0);
        var val_b = parseFloat(this.teamData.average_money_diff_team_b || 0);
        var sum = val_a + val_b;
        if (val_a < 0 && val_b < 0) {
          if (pos == 'left') return {width: Math.abs(val_b) / Math.abs(sum) * 100 + '%'};
          if (pos == 'right') return {width: Math.abs(val_a) / Math.abs(sum) * 100 + '%'};
        } else {
          val_a = val_a > 0 ? val_a : 0;
          val_b = val_b > 0 ? val_b : 0;
          sum = val_a + val_b;
          return {width: (sum > 0 ? val_a / sum * 100 : 0) + '%'};
        }
      },
      averageMoneyDiffB: function () {
        var val_a = parseFloat(this.teamData.average_money_diff_team_a || 0) > 0 ? parseFloat(this.teamData.average_money_diff_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_money_diff_team_b || 0) > 0 ? parseFloat(this.teamData.average_money_diff_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_b / sum * 100 : 0) + '%'
        }
      },
      minuteWardsKillsA: function () {
        var val_a = parseFloat(this.teamData.minute_wardsKilled_team_a || 0) > 0 ? parseFloat(this.teamData.minute_wardsKilled_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.minute_wardsKilled_team_b || 0) > 0 ? parseFloat(this.teamData.minute_wardsKilled_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_a / sum * 100 : 0) + '%'
        }
      },
      minuteWardsKillsB: function () {
        var val_a = parseFloat(this.teamData.minute_wardsKilled_team_a || 0) > 0 ? parseFloat(this.teamData.minute_wardsKilled_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.minute_wardsKilled_team_b || 0) > 0 ? parseFloat(this.teamData.minute_wardsKilled_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_b / sum * 100 : 0) + '%'
        }
      },
      averageDragonA: function () {
        var val_a = parseFloat(this.teamData.average_dragon_team_a || 0) > 0 ? parseFloat(this.teamData.average_dragon_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_dragon_team_b || 0) > 0 ? parseFloat(this.teamData.average_dragon_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_a / sum * 100 : 0) + '%'
        }
      },
      averageDragonB: function () {
        var val_a = parseFloat(this.teamData.average_dragon_team_a || 0) > 0 ? parseFloat(this.teamData.average_dragon_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_dragon_team_b || 0) > 0 ? parseFloat(this.teamData.average_dragon_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_b / sum * 100 : 0) + '%'
        }
      },
      firstBloodA: function () {
        return {
          width: this.teamData.firstBloodKill_team_a + '%'
        }
      },
      firstBloodB: function () {
        return {
          width: this.teamData.firstBloodKill_team_b + '%'
        }
      },
      averageBaronA: function () {
        var val_a = parseFloat(this.teamData.average_baron_team_a || 0) > 0 ? parseFloat(this.teamData.average_baron_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_baron_team_b || 0) > 0 ? parseFloat(this.teamData.average_baron_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_a / sum * 100 : 0) + '%'
        }
      },
      averageBaronB: function () {
        var val_a = parseFloat(this.teamData.average_baron_team_a || 0) > 0 ? parseFloat(this.teamData.average_baron_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_baron_team_b || 0) > 0 ? parseFloat(this.teamData.average_baron_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_b / sum * 100 : 0) + '%'
        }
      },
      firstTowerA: function () {
        return {
          width: this.teamData.firstTowerKill_team_a + '%'
        }
      },
      firstTowerB: function () {
        return {
          width: this.teamData.firstTowerKill_team_b + '%'
        }
      },
      averageByTowerA: function () {
        var val_a = parseFloat(this.teamData.average_be_turretKills_team_a || 0) > 0 ? parseFloat(this.teamData.average_be_turretKills_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_be_turretKills_team_b || 0) > 0 ? parseFloat(this.teamData.average_be_turretKills_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_a / sum * 100 : 0) + '%'
        }
      },
      averageByTowerB: function () {
        var val_a = parseFloat(this.teamData.average_be_turretKills_team_a || 0) > 0 ? parseFloat(this.teamData.average_be_turretKills_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.average_be_turretKills_team_b || 0) > 0 ? parseFloat(this.teamData.average_be_turretKills_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_b / sum * 100 : 0) + '%'
        }
      },
      baronRateA: function () {
        return {
          width: this.teamData.rate_baron_team_a + '%'
        }
      },
      baronRateB: function () {
        return {
          width: this.teamData.rate_baron_team_b + '%'
        }
      },
      dragonRateA: function () {
        return {
          width: this.teamData.rate_dragon_team_a + '%'
        }
      },
      dragonRateB: function () {
        return {
          width: this.teamData.rate_dragon_team_b + '%'
        }
      },
      minuteDamageA: function () {
        var val_a = parseFloat(this.teamData.minute_damage_team_a || 0) > 0 ? parseFloat(this.teamData.minute_damage_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.minute_damage_team_b || 0) > 0 ? parseFloat(this.teamData.minute_damage_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_a / sum * 100 : 0) + '%'
        }
      },
      minuteDamageB: function () {
        var val_a = parseFloat(this.teamData.minute_damage_team_a || 0) > 0 ? parseFloat(this.teamData.minute_damage_team_a || 0) : 0;
        var val_b = parseFloat(this.teamData.minute_damage_team_b || 0) > 0 ? parseFloat(this.teamData.minute_damage_team_b || 0) : 0;
        var sum = val_a + val_b;

        return {
          width: (sum > 0 ? val_b / sum * 100 : 0) + '%'
        }
      },
      fullA: function () {
        return {
          width: this.teamData.rate_full_bureau_team_a + '%'
        }
      },
      fullB: function () {
        return {
          width: this.teamData.rate_full_bureau_team_b + '%'
        }
      }
    },
    methods: {
      showMore: function () {
        this.teamComparisonMore = !this.teamComparisonMore;
      },
      getMoneyDiffCompare: function (pos) {
        var val_a = parseFloat(this.teamData.average_money_diff_team_a || 0);
        var val_b = parseFloat(this.teamData.average_money_diff_team_b || 0);

        if (pos == 'left') return val_a > val_b;
        if (pos == 'right') return val_b > val_a;
      },
      averageMoneyDiff: function (pos) {
        var val_a = parseFloat(this.teamData.average_money_diff_team_a || 0);
        var val_b = parseFloat(this.teamData.average_money_diff_team_b || 0);
        var sum = val_a + val_b;
        var numerator = 0;

        if (val_a < 0 && val_b < 0) {
          if (pos == 'left') numerator = val_b;
          if (pos == 'right') numerator = val_a;
          return {width: Math.abs(numerator) / Math.abs(sum) * 100 + '%'};
        } else {
          val_a = val_a > 0 ? val_a : 0;
          val_b = val_b > 0 ? val_b : 0;
          sum = val_a + val_b;
          if (pos == 'left') numerator = val_a;
          if (pos == 'right') numerator = val_b;
          return {width: (sum > 0 ? numerator / sum * 100 : 0) + '%'};
        }
      },
      getSixGameResultCompare: function (pos) {
        var val_a = parseFloat(this.teamData['record_win_team_a'] || 0) - parseFloat(this.teamData['record_lose_team_a'] || 0);
        var val_b = parseFloat(this.teamData['record_win_team_b'] || 0) - parseFloat(this.teamData['record_lose_team_b'] || 0);

        if (pos == 'left') return val_a > val_b;
        if (pos == 'right') return val_b > val_a;
      },
      sixGameResultRate: function (pos) {
        var val_a = parseFloat(this.teamData['record_win_team_a'] || 0) - parseFloat(this.teamData['record_lose_team_a'] || 0);
        var val_b = parseFloat(this.teamData['record_win_team_b'] || 0) - parseFloat(this.teamData['record_lose_team_b'] || 0);
        var sum = val_a + val_b;
        var numerator = 0;

        if (val_a < 0 && val_b < 0) {
          if (pos == 'left') numerator = val_b;
          if (pos == 'right') numerator = val_a;
          return {width: Math.abs(numerator) / Math.abs(sum) * 100 + '%'};
        } else {
          val_a = val_a > 0 ? val_a : 0;
          val_b = val_b > 0 ? val_b : 0;
          sum = val_a + val_b;
          if (pos == 'left') numerator = val_a;
          if (pos == 'right') numerator = val_b;
          return {width: (sum > 0 ? numerator / sum * 100 : 0) + '%'};
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>



  .team-comparison-box {
    .data-wrap {
      overflow hidden

      .com-box{

        &.large{

          .data-bar{
            &.l-bar{
              .rate-bar {
                background: linear-gradient(135deg, rgba(13, 126, 255, 1) 0%, rgba(15, 151, 255, 1) 100%);
              }
            }

            &.r-bar{
              .rate-bar {
                background: linear-gradient(225deg, rgba(255, 76, 106, 1) 0%, rgba(255, 107, 137, 1) 100%)
              }
            }
          }

          .result{
            font-size: 18px;
            color: #2d2f33;
          }
        }
      }


      &.more {
        .visible-box {
          border-bottom 1px solid rgba(0, 0, 0, 0.06);
          .show-btn {
            .iconfont {
              transform rotate(180deg)
            }
          }
        }
      }
    }

    .visible-box {
      .data-content {
        width: 100%
        padding 28px 40px 24px
        border-bottom 1px solid rgba(0, 0, 0, 0.06);

        .chart-wrap {
          width: 100px
          padding-top 25px

          .val{
            font-size: 24px;
            color: #2d2f33;
            font-family: 'Industry-Bold';
          }

          .title{
            margin-top 12px
            text-align: center;
            color: #2d2f33;
            height: 20px;
            font-size: 14px;
            font-weight: 600;
            line-height: 20px;
          }
        }
        .com-wrap {
          width calc(100% - 200px)
          margin 0 auto
        }
      }

      .show-btn {
        width: 100%
        height: 32px;
        line-height 32px
        background: #fff
        box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.04);
        text-align center
        cursor pointer
        font-size 14px
        color #2D2F33
        .iconfont {
          display inline-block
          margin-left 5px
          color #A8ABB3
          font-size 12px
          transition .2s
        }
      }
    }
    .hide-box {
      padding 26px 36px 40px
      overflow hidden

      .c-team-info{
        display flex;
        justify-content space-between;
        align-items center


        img{
          width 36px
          height:36px
        }

        span{
          /*width:26px;*/
          padding:0 10px;
          height:21px;
          font-size:17px;
          font-family:Industry-Bold;
          font-weight:bold;
          color:#2D2F33;
          line-height:21px;
        }

        .team-left{
          display: flex;
          align-items: center;
        }
        .team-count-title{
          width:210px;
          height:28px;
          background:#F7F8FA;
          border-radius:13px;
          font-size:14px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:#656973;
          text-align center;
          line-height:28px;
        }
        .team-right{
          display: flex;
          align-items: center;
        }
      }

      .hide-top {
        width: 100%
        margin-top:20px;
      }
      .hide-bottom {
        width: 50%
        padding-top 24px
        &.bottom-l {
          padding-right 24px
        }
        &.bottom-r {
          padding-left 24px
        }
      }
    }
  }

</style>
