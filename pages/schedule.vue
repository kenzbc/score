<template>
  <div>
    <header-sub-menus>
      <li v-for="item in headerSubMenu">
        <nuxt-link :to="item.url" :class="{active : item.active}" class="link">{{item.title}}
          <svg class="icon schdule_icon_active" aria-hidden="true">
            <use xlink:href="#icon-circle_blue"></use>
          </svg>
        </nuxt-link>
      </li>
    </header-sub-menus>
    <div class="page-main schedule cl" :class="{scroll: isFixed}" id="scheduleMain">
      <div class="cont-left fl">
        <div class="schedule-select-wrap">
          <div class="schedule-select cl">
            <div class="week-wrap fl">
              <div class="week-list cl">
                <div class="week-item fl" :class="{active: item.dateKey === activeKey, nothing: item.nothing}" v-for="(item) in weekDate" :key="item.dateKey" @click="toggleWeek(item)">
                  <p class="date Industry-Demi">{{item.dateMD}}</p>
                  <p class="week">{{item.week}}</p>
                  <div class="no-match">
                    <p class="row">当日</p>
                    <p class="row">无比赛</p>
                  </div>
                </div>
              </div>
              <div class="btn btn-prev" @click="prevWeeks"><i class="iconfont icon-general__arrow_left"></i></div>
              <div class="btn btn-next" @click="nextWeeks"><i class="iconfont icon-general__arrow_right"></i></div>

            </div>
            <div class="data-toggle fr cl">
              <!--日历-->
              <div class="calendar-wrap fl" :class="{'back-show': isBack}">
                <match-date-picker
                    :language="lang.zh"
                    format="MM-dd"
                    placeholder="查看日历"
                    input-class="input-btn"
                    :calendar-button="true"
                    calendar-button-icon="calendar-btn"
                    calendar-button-icon-content="查看日历"
                    :disabled-dates="pickerDisabledDate"
                    @changedMonth="changedMonthHandle"
                    @selected="changedDayHandle"
                    :value="dateYMD">
                </match-date-picker>
              </div>

              <!--赛事筛选-->
              <div class="match-select fr">
                <Dropdown trigger="custom" :visible="dropDownVisible">
                  <Button type="primary" @click="dropDownVisible = !dropDownVisible">赛事筛选</Button>
                  <DropdownMenu slot="list">
                    <li class="dropdown-wrap">
                      <CheckboxGroup v-model="checkedGroup">
                        <Checkbox :label="item.tournamentID" v-for="item in tournamentList" :key="item.tournamentID">{{item.name}}</Checkbox>
                      </CheckboxGroup>
                    </li>
                    <li class="btn-wrap cl">
                      <div class="btn fl" @click="resetTournament">重置</div>
                      <div class="btn fr" @click="filterTournament">确定</div>
                    </li>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>

        <div class="schedule-list">
          <div class="item-day" v-for="(val, key) in weekSchedule" :key="key" :id="`d${key}`">
            <div class="date-wrap cl">
              <div class="date fl">{{key | dateFormat('YYYY.MM.DD', 'MM.DD')}}</div>
              <div class="week fl today" v-if="getTodayKey() == key">今天</div>
              <div class="week fl" v-else>{{key | weekDay('YYYY.MM.DD')}}</div>
            </div>
            <div class="tournament-list">
              <div v-if="val.info">
                <div class="tournament-item" v-for="(t, k) in val.info" :key="k">
                  <div class="tournament-info cl">
                    <nuxt-link :to="`/tournament_list/${k}`">
                      <img class="t-logo fl" :src="t.tournamentinfo.image_thumb" alt=""/>
                      <span class="t-name fl">{{t.tournamentinfo.name}}</span>
                    </nuxt-link>
                  </div>
                  <div class="match-item" :class="{pre: item.status == '0', playing: item.status == '1', end: item.status == '2'}" v-for="item in t.list">
                    <nuxt-link :to="`/match/${item.match_id}`">
                      <div class="left-box fl">
                        <div class="left-cont">
                          <p class="m-time">{{item.start_time}}</p>
                          <div class="m-status" v-if="item.status == '1'">LIVE</div>
                          <p class="m-place" v-if="item.status != '1' && item.homesite">{{item.homesite}}</p>
                        </div>
                      </div>

                      <div class="middle-box fl">
                        <div class="row cl">
                          <div class="row-left fl">
                            <img class="team-logo fl" :src="item.team_a_image" alt=""/>
                            <p class="team-name fl">{{item.team_a_short_name || '-'}}</p>
                            <p class="team-area fl" :class="{home: item.homesite_a == '1'}" v-if="item.homesite_a == '1' ||item.homesite_a == '2'">{{item.homesite_a == '1' ? '主' : '客'}}</p>
                          </div>
                          <div class="row-right fr">
                            <ul class="game-list fl">
                              <li class="game-status fl" :class="{win: item.result && item.result[i] && item.result[i].win_teamID == item.teamID_a}" v-for="i in numToArr(item.game_count)"></li>
                            </ul>
                            <div class="score fr" :class="{win: item.team_a_win > item.team_b_win}">{{item.status == '0' ? '-' : item.team_a_win}}</div>
                          </div>
                        </div>
                        <div class="row cl">
                          <div class="row-left fl">
                            <img class="team-logo fl" :src="item.team_b_image" alt=""/>
                            <p class="team-name fl">{{item.team_b_short_name || '-'}}</p>
                            <p class="team-area fl" :class="{home: item.homesite_b == '1'}" v-if="item.homesite_b == '1' ||item.homesite_b == '2'">{{item.homesite_b == '1' ? '主' : '客'}}</p>
                          </div>
                          <div class="row-right fr">
                            <ul class="game-list fl">
                              <li class="game-status fl" :class="{win: item.result && item.result[i] && item.result[i].win_teamID == item.teamID_b}" v-for="i in numToArr(item.game_count)"></li>
                            </ul>
                            <div class="score fr" :class="{win: item.team_b_win > item.team_a_win}">{{item.status == '0' ? '-' : item.team_b_win}}</div>
                          </div>
                        </div>
                      </div>
                    </nuxt-link>
                    <div class="right-box fl">
                      <div class="match-pre cl" v-if="item.status == '0'">
                        <div class="history-compare fl">
                          <div class="top-box cl">
                            <img class="team-logo fl" :src="item.team_a_image" alt=""/>
                            <img class="team-logo fr" :src="item.team_b_image" alt=""/>
                            <p class="title">近 {{item.near_ten && item.near_ten.team_a_win_count + item.near_ten.team_b_win_count || '0'}} 场交战</p>
                          </div>
                          <div class="bottom-box">
                            <div class="compare-win cl">
                              <div class="fl">{{item.near_ten && item.near_ten.team_a_win_count || '0'}}</div>
                              <div class="fr">{{item.near_ten && item.near_ten.team_b_win_count || '0'}}</div>
                              <p>胜场数</p>
                            </div>
                            <div class="compare-bar cl" v-if="item.near_ten.team_a_win_count == item.near_ten.team_b_win_count">
                              <div class="t-a-bar fl" :style="{width: `calc((100% - 1px) / 2)`}"></div>
                              <div class="t-b-bar fr" :style="{width: `calc((100% - 1px) / 2)`}"></div>
                            </div>
                            <div class="compare-bar cl" v-else-if="item.near_ten.team_a_win_count == 0">
                              <div class="t-a-bar fl" :style="{width: 0}"></div>
                              <div class="t-b-bar fr" :style="{width: '100%'}"></div>
                            </div>
                            <div class="compare-bar cl" v-else-if="item.near_ten.team_b_win_count == 0">
                              <div class="t-a-bar fl" :style="{width: '100%'}"></div>
                              <div class="t-b-bar fr" :style="{width: 0}"></div>
                            </div>
                            <div class="compare-bar cl" v-else>
                              <div class="t-a-bar fl" :style="{width: `calc((100% - 1px) * ${item.near_ten.team_a_win_count / (item.near_ten.team_a_win_count + item.near_ten.team_b_win_count)})`}"></div>
                              <div class="t-b-bar fr" :style="{width: `calc((100% - 1px) * ${item.near_ten.team_b_win_count / (item.near_ten.team_a_win_count + item.near_ten.team_b_win_count)})`}"></div>
                            </div>
                          </div>
                        </div>
                        <div class="link-wrap fr">
                          <nuxt-link class="link-btn" :to="`/match/${item.match_id}?analyse=2`">比赛竞猜</nuxt-link>
                          <div class="link-btn remind-btn" :class="{remind: item.remind == '1'}" @click="setRemind(item.match_id)">{{item.remind == '1' ? '已预约' : '预约'}}</div>
                        </div>

                        <!--<div class="mobile-match-pre cl" style="display: none">-->
                        <!--<div class="match-Bo fl">BO{{item.game_count}}</div>-->
                        <!--<p class="appointment-mobile fl">{{item.remind == 1 ? '已预约' : '预约'}}</p>-->
                        <!--</div>-->
                      </div>
                      <div class="match-live" v-if="item.status == '1'">
                        <ul class="live-list cl">
                          <li class="live-item fl" v-for="live in getLiveList(item)" :key="live.liveId">
                            <nuxt-link :to="`/match/${live.matchId}?live_room=${live.liveId}`">
                              <img class="live-icon" :src="live.liveIconSrc" alt=""/>
                              <p class="live-name">{{live.liveName}}</p>
                            </nuxt-link>
                          </li>

                          <li class="live-item fl" v-if="item.dynamic_id && item.dynamic_id != '0'">
                            <nuxt-link :to="`/match/${item.match_id}?analyse=3`">
                              <img class="live-icon" src="/static/images/score_icon.png" alt=""/>
                              <p class="live-name">直播互动</p>
                            </nuxt-link>
                          </li>
                        </ul>
                      </div>
                      <div class="match-end cl" v-if="item.status == '2'">
                        <div class="video-link fl">
                          <nuxt-link :to="`/match/${item.match_id}?isVideo=1`" v-if="item.video">
                            <img class="video-img" :src="item.video[0].image_url | catImg(112, 62)" alt=""/>
                            <i class="iconfont icon-general__play c-m"></i>
                          </nuxt-link>
                          <div class="video-tip" v-else>视频搬运中</div>
                        </div>
                        <div class="link-wrap fr">
                          <div class="c-m">
                            <nuxt-link :to="`/match/${item.match_id}?analyse=1`" class="link-btn" v-if="item.has_real_time == 1">比赛复盘</nuxt-link>
                            <nuxt-link :to="`/match/${item.match_id}`" class="link-btn">赛后数据</nuxt-link>
                          </div>
                        </div>

                        <!--<div class="mobile">-->
                        <!--<a :href="`/match/${item.match_id}?isVideo=1`"><i class="iconfont icon-video-button icon-general__play"></i></a>-->
                        <!--<a :href="`/match/${item.match_id}`"><i class="iconfont icon-match-data icon-remensaishi"></i></a>-->
                        <!--</div>-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="no-match" v-else>当日无比赛</div>
            </div>
          </div>
        </div>
      </div>
      <div class="cont-right fr">
        <hot-match :dataList="tournamentList"/>
      </div>
    </div>

    <!--数据加载等待-->
    <Spin size="large" fix v-if="loading">
      <Loading :show="true" size="large" />
    </Spin>
  </div>
</template>

<script>
  import hotMatch from '~/components/index/hot-match'
  import matchDatePicker from 'vuejs-datepicker'
  import * as lang from '~/node_modules/vuejs-datepicker/dist/locale'

  export default {
    name: "schedule",
    components: {hotMatch, matchDatePicker},
    data() {
      return {
        loading: false,
        lang: lang,
        params: {
          date: '',
          tournament_id: ''
        },
        headerSubMenu: [
          {title: '热门', url: '/schedule', active: true},
          {title: '赛事', url: '/tournament_list', active: false},
          {title: '大数据', url: '/data', active: false}
        ],
        liveIconSrc: {
          '斗鱼': '/images/tournament/douyu_icon.png',
          '虎牙': '/images/tournament/huya_icon.png',
          'B站': '/images/tournament/bili_icon.png'
        },
        enabledDateObj: {},
        disabledDate: [],
        datePickerOpen: false,
        dropDownVisible: false,
        checkedGroup: [], // 赛事筛选id
        activeKey: '',
        datePattern: 'YYYY.MM.DD',
        dateYMD: '',
        today: '',
        isBack: false,
        isFixed: false,
        diffHeight: 87 + 64 + 10 // header高度 + schedule-select容器高度 + 外边距,
      }
    },
    async asyncData({app}) {
      const simpleTournament = (await app.$api.tournament.list()).data || {}
      const weekScheduleData = (await app.$api.tournament.weekSchedule()).data || {}
      return {
        tournamentList: simpleTournament.list || [],
        weekSchedule: weekScheduleData.list || {}
      }
    },
    computed: {
      weekDate() {
        let weeks = []
        for (let key in this.weekSchedule) {
          weeks.push({
            dateKey: key,
            dateYMD: this.moment(key, this.datePattern).format('YYYY-MM-DD'),
            dateMD: this.moment(key, this.datePattern).format('MM.DD'),
            week: this.getTodayKey() === key ? '今天' : this.moment(key, this.datePattern).format('ddd'),
            today: this.weekSchedule[key].today === '',
            nothing: !this.weekSchedule[key].info
          })
        }
        return weeks
      },
      beforeDay() {
        return this.weekDate.length > 0 ? this.moment(this.weekDate[0].dateYMD).subtract(1, 'd').format('YYYY-MM-DD') : ''
      },
      afterDay() {
        return this.weekDate.length > 0 ? this.moment(this.weekDate[this.weekDate.length - 1].dateYMD).add(1, 'd').format('YYYY-MM-DD') : ''
      },
      pickerDisabledDate() {
        return {
          daysOfMonth: this.disabledDate
        }
      }
    },
    async created() {
      this.activeKey = this.getTodayKey()
      this.dateYMD = this.activeKey.replace(/\./g, '-')
//      this.today = this.dateYMD
      this.addMatchDate(this.moment(this.dateYMD).format('YYYY-MM'))
    },
    methods: {
      // 日期切换
      toggleWeek(item) {
        if (item.nothing) return
        if (this.activeKey === item.dateKey) return
        this.activeKey = item.dateKey
        this.scrollToDay(this.keyToEleId(item.dateKey))
        this.dateYMD = item.dateYMD
        this.addMatchDate(this.moment(item.dateYMD).format('YYYY-MM'))
//        this.isBack = (this.moment(item.dateYMD).format('YYYY-MM') !== this.moment(this.today).format('YYYY-MM'))
      },
      // 重置赛事筛选
      resetTournament() {
        this.checkedGroup = []
        this.params.tournament_id = ''
        this.getWeekSchedule()
        this.dropDownVisible = false
      },
      // 赛事筛选
      filterTournament() {
        this.params.tournament_id = this.checkedGroup.join(',')
        this.getWeekSchedule()
        this.dropDownVisible = false
      },
      // 选中日期触发
      async changedDayHandle(date) {
        const key = this.moment(date).format('YYYY.MM.DD')
        this.activeKey = key
//        this.isBack = (this.moment(date).format('YYYY-MM') !== this.moment(this.today).format('YYYY-MM'))
        if (!!this.weekSchedule[key]) {
          this.scrollToDay(this.keyToEleId(key))
        } else {
          this.params.date = this.moment(date).format('YYYY-MM-DD')
          await this.getWeekSchedule()
          this.scrollToDay(this.keyToEleId(key))
        }
      },
      // 月份变化触发
      changedMonthHandle(date) {
        const ts = date.timestamp ? this.moment(date.timestamp, 'x').unix() : this.moment(date).unix()
//        this.isBack = (this.moment.unix(ts).format('YYYY-MM') !== this.moment(this.today).format('YYYY-MM'))
        this.addMatchDate(this.moment.unix(ts).format('YYYY-MM'))
      },
      // 返回今天key
      getTodayKey() {
        let todayKey = ''
        for (let key in this.weekSchedule) {
          if (!!this.weekSchedule[key].info) {
            if (this.weekSchedule[key].today === '' ) todayKey = key
          } else {
            if (this.moment().format('YYYY.MM.DD') == key) todayKey = key
          }
        }
        return todayKey
      },
      // 滚动到当前日期
      scrollToDay(id) {
        this.setWinScrollTo(document.getElementById(id).offsetTop - this.diffHeight)
      },
      // 设置页面滚动
      setWinScrollTo(scrollTop) {
        window.scrollTo(0, scrollTop)
      },
      // 上一周
      async prevWeeks() {
        this.params.date = this.beforeDay
        await this.getWeekSchedule()
        this.setWinScrollTo(0)
      },
      // 下一周
      async nextWeeks() {
        this.params.date = this.afterDay
        await this.getWeekSchedule()
        this.setWinScrollTo(0)
      },
      // 获得周赛程
      async getWeekSchedule() {
        this.loading = true
        const data = (await this.$api.tournament.weekSchedule({params: this.params})).data || {}
        this.weekSchedule = data.list || {}
        this.loading = false
      },
      // 比赛提醒
      setRemind(matchId) {
        this.$api.tournament.matchRemind({params: {match_id: matchId}}).then(resp => {
          console.log(resp)
//          this.item.is_remind = this.item.is_remind == 1 ? 0 : 1
        })
      },
      async addMatchDate(date) {
        if (!this.enabledDateObj[date]) {
          this.enabledDateObj[date] = (await this.getMatchDate(date)).map(v => parseInt(v))
        }
        this.disabledDate = this.getDisabledDays(date)
      },
      // 获得月比赛日列表
      async getMatchDate(date) {
        return ((await this.$api.tournament.matchCalendar({params: {date: date}})).data || {}).calendar_match_list || []
      },
      // 获得非比赛日列表
      getDisabledDays(date) {
        let daysOfMonth = []
        for (let i = 0; i < this.moment(date).daysInMonth(); i++) {
          daysOfMonth[i] = i + 1
        }
        return daysOfMonth.filter(v => !this.enabledDateObj[date].includes(v))
      },
      numToArr(num) {
        let arr = []
        for (let i = 0; i < parseInt(num); i++) {
          arr.push(i)
        }
        return arr
      },
      keyToEleId(key) {
        return `d${key}`
      },
      getLiveList(obj) {
        return [1, 2, 3].map((v, i) => {
          return {
            liveName: obj[`live_video_name${v}`] || '',
            liveUrl: obj[`live_video_url${v}`],
            liveId: i,
            liveIconSrc: this.liveIconSrc[obj[`live_video_name${v}`]] || '',
            matchId: obj.match_id || ''
          }
        }).filter(item => {
          return item.liveUrl
        })
      },
      closeDropDown(e) {
        const dropDownClassName = e.target.parentElement.offsetParent.className
        const btnClassName = e.target.offsetParent.className

        if (dropDownClassName != 'ivu-select-dropdown' && btnClassName != 'ivu-dropdown-rel') {
          this.dropDownVisible = false
        }

//        if (dropDownClassName != 'vdp-datepicker' && dropDownClassName != 'vdp-datepicker__calendar') {
//          this.datePickerOpen = false
//          console.log(document.querySelectorAll('.vdp-datepicker__calendar')[0].style.display = 'none')
//          console.log(document.querySelectorAll('.vdp-datepicker__calendar')[1].style.display = 'none')
//          console.log(document.querySelectorAll('.vdp-datepicker__calendar')[2].style.display = 'none')
//        }
      },
      // window滚动事件
      winHandleScroll(e) {
        const scrollTop = e.target.documentElement.scrollTop   // document滚动偏移量

        if (scrollTop > 18) {
          this.isFixed = true
        } else {
          this.isFixed = false
        }
      },
      backToToday() {
        this.dateYMD = this.today
        this.isBack = false
      },
      createBtn() {
        const div = document.createElement('div')
        const textNode = document.createTextNode("返回今天")
        div.className = 'back-btn'
        div.id = 'backBtn'
        div.appendChild(textNode)
        div.addEventListener('click', this.backToToday, true)
        document.querySelector('.vdp-datepicker__calendar').appendChild(div)
      }
    },
    mounted() {
      window.addEventListener('scroll', this.winHandleScroll, true)  // 监听（绑定）滚轮滚动事件
      document.addEventListener('click', this.closeDropDown, true)  // 监听（绑定）点击事件
//      this.createBtn()

//      console.log(this.weekSchedule)
//      console.log(this.weekDate)
//      console.log(this.beforeDay)
//      console.log(this.afterDay)

    },
    filters: {
      changeEelId(val) {
        return `d${val}`
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.winHandleScroll, true);  // 监听（解绑）滚轮滚动事件
      document.removeEventListener('click', this.closeDropDown, true);  // 监听（解绑）点击事件
    }
  }
</script>

<style lang="stylus">
  .ivu-spin-fix {
    position fixed
    top 0
    left: 0
  }
  .page-main.schedule {
    width: 990px;
    padding-bottom: 40px;
    margin: 0 auto;
    margin-top: 36px;
    padding-top: 20px;

    .ivu-dropdown {
      position relative
      .ivu-btn {
        display block
        width 86px
        text-align center
        background: #fff
        color: #656973;
        border: 0;
        padding: 0
        line-height 32px
        border-radius 16px
        font-size 14px
        border: 1px solid #EBEBED;
        &:focus {
          box-shadow none;
        }
        > span {
          vertical-align baseline
        }
      }
      .ivu-select-dropdown {
        padding 3px
      }
      .ivu-checkbox-wrapper {
        display block
        white-space nowrap
        text-align left
        font-size 14px
        margin 0
        padding-left 6px
        + .ivu-checkbox-wrapper {
          margin-top 1px
        }
        &:hover {
          background #f0f1f2
        }
      }
      .dropdown-wrap {
        min-width 240px
        max-height 300px
        overflow-y auto
        padding 2px
      }
      .btn-wrap {
        width: 100%
        padding 10px
        cursor default
        .btn {
          cursor: pointer;
          border-radius: 20px;
          width: 100px;
          line-height: 28px;
          text-align: center;
          font-size: 13px;
          color: #0d8dfc;
          border: 1px solid #0d8dfc;
        }
      }
    }

    .vdp-datepicker {
      .input-btn {
        display none
        width: 86px
        height: 34px
      }
      .vdp-datepicker__calendar {
        width: 272px
        top 38px
        left calc(50% - 136px)
        background: #fff;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px 0 rgba(0,0,0,0.08);
        border-radius: 4px;
        border: none
        padding 10px
        header {
          line-height 36px
          span {
            width calc(100% - 36px * 2)
          }
          .prev, .next {
            width: 36px
            border-radius 8px
            &:not(.disabled):hover {
              background #F0F1F2
            }
          }
          .prev {
            &:after {
              border-right 10px solid #A8ABB3;
            }
            &:not(.disabled):hover:after {
              border-right 10px solid #656973
            }
          }
          .next {
            &:after {
              border-left 10px solid #A8ABB3;
            }
            &:not(.disabled):hover:after {
              border-left 10px solid #656973
            }
          }
        }
        .day-header {
          width: 36px
          height: 36px
          line-height 32px
        }
        .cell {
          border 2px solid #fff
          height: 36px
          line-height 32px
          border-radius 8px
          &.day {
            width: 36px
            border-radius 50%
          }
          &.disabled {
            cursor not-allowed
          }
          &.selected {
            background #fff
            &.disabled.day {
              background #f0f1f2
              color: #A8ABB3
            }
            &:not(.disabled).day {
              background #0D8DFC
              color #fff
            }
          }
          &:not(.blank):not(.disabled).day:hover,
          &:not(.blank):not(.disabled).month:hover,
          &:not(.blank):not(.disabled).year:hover {
            border 2px solid #fff
            background #f0f1f2
          }
          &:not(.disabled).selected.day:hover {
            background #0D8DFC !important
          }
        }
      }
    }


    &.scroll {
      .schedule-select,
      .index_left_wrap {
        position fixed
        top 88px
        z-index 1
      }
      .schedule-select {
        z-index 2
      }
    }
  }
  .cont-left {
    width: 740px
  }
  .cont-right {
    width 230px
  }
  .schedule-select-wrap {
    height: 64px
  }
  .schedule-select {
    width: 740px
    height: 64px
    background: #FFFFFF;
    box-shadow: 0 0 0 1px #EBEBED;
    border-radius: 2px;
    padding-left 8px

    .week-wrap {
      height: 50px
      position: relative
      width 520px
      margin-top: 7px
      padding 0 33px
      .week-list-desc {
        display: none
      }
      .week-list {
        width: 100%
        height: 50px
        overflow hidden
        .week-item {
          width: 58px;
          height: 50px;
          border-radius: 4px;
          position: relative;
          cursor: pointer;
          padding-top 6px
          font-size 14px
          text-align center
          + .week-item {
            margin-left 8px
          }
          .date {
            font-family 'Industry-Demi'
            color #2d2f33
          }
          .week {
            line-height 20px
            color: #656973
            margin-top 5px
          }
          .no-match {
            display none
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #f0f1f2;
            border-radius: 4px;
            padding-top 3px
            color #656973
            text-align center
            .row {
              padding-top 5px
            }
          }
          &:not(.nothing).active {
            background #0d8dfc
            cursor default
            .date, .week {
              color: #fff
            }
          }
          &:not(.active):hover {
            .date, .week {
              color: #0d8dfc
            }
          }
          &.nothing {
            cursor not-allowed
            .date, .week {
              color: #a8abb3
            }
            &:hover {
              .no-match {
                display block
              }
            }
          }
        }
      }
      .btn {
        background: transparent
        line-height: 50px
        text-align center
        color #656973
        position absolute
        top 0
        cursor pointer
        .iconfont {
          display block
          font-size: 26px

        }
        &.btn-prev {
          left: 0
        }
        &.btn-next {
          right: 0
        }
        &.btn-disabled {
          color: #A8ABB3;
        }
      }
    }

    .data-toggle {
      margin-right 15px
      margin-top: 15px
      .calendar-wrap {
        position relative
        margin-right: 14px
        .calendar-btn {
          display block
          width: 86px
          height: 34px
          color: #656973
          line-height 34px
          text-align center
          border: 1px solid #ebebed
          border-radius 17px
          cursor pointer
        }
        .calendar-dropdown {
          z-index: 11;
          position: absolute;
          right: 8px;
          top: 50px;
          width: 300px;
          background: #fff;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px 0 rgba(0,0,0,0.08);
          border-radius: 4px;
          padding-bottom: 10px;
        }
        .back-btn {
          width: 240px
          height: 34px
          line-height 34px
          background: rgba(13, 141, 252, 1)
          border-radius: 17px
          color: #fff
          text-align center
          margin 6px auto 0
          cursor pointer
          display none
        }
        &.back-show {
          .back-btn {
            display block
          }
        }
      }
      .match-select {
        cursor: pointer
        height: 34px
        line-height: 32px
        font-size: 14px;
        color: #656973;
        text-align: center;
        border-radius: 20px;
      }
    }
  }

  .schedule-list {
    margin-top 10px
    .item-day {
      background: #fff;
      box-shadow: 0 0 0 1px #ebebed;
      border-radius: 2px;
      padding-bottom: 20px;
      + .item-day {
        margin-top 12px
      }
      .date-wrap {
        padding-top 12px
        padding-left 20px
        .date {
          font-size: 22px;
          color: #2d2f33;
          font-family 'Industry-Demi'
          line-height 27px
        }
        .week {
          height 20px
          margin: 6px 0 0 12px;
          font-size: 14px;
          color: #656973;
          line-height 20px
          &.today {
            width: 40px;
            background: linear-gradient(135deg, rgba(0, 113, 242, 1) 0%, rgba(5, 147, 255, 1) 100%);
            border-radius: 4px;
            text-align center
            color #fff
            font-size 14px
            font-weight 600
          }
        }
      }
      .tournament-item {
        padding-top 16px
      }
      .no-match {
        width: 100%
        font-size: 14px;
        font-weight: 400;
        color: #2D2F33
        line-height: 20px;
        text-align center
        padding-bottom 10px
      }
      .tournament-info {
        padding 0 18px
        .t-logo {
          display block
          width: 24px
          height: 24px
        }
        .t-name {
          display block
          line-height: 24px;
          margin-left: 4px;
          font-size: 14px;
          color: #2d2f33;
          font-weight: bold;
        }
      }
      .match-item {
        width: 700px;
        height: 88px;
        background: #fff;
        border: 1px solid #f0f1f2;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.02);
        border-radius: 6px;
        margin 0 auto;
        margin-top 10px
        .left-box {
          width 104px
          height: 100%
          position relative
          overflow hidden
          .left-cont {
            position absolute
            top 50%
            left 50%
            transform: translate(-50%, -50%)
            text-align center
          }
          .m-time {
            height: 22px;
            font-size: 18px;
            font-family: 'Industry-Bold';
            font-weight: bold;
            color: #2D2F33
            line-height: 22px;
            margin 0 auto
          }
          .m-status {
            width: 41px;
            height: 17px;
            line-height 17px;
            background: linear-gradient(315deg, rgba(255, 101, 121, 1) 0%, rgba(255, 81, 96, 1) 100%);
            border-radius: 12px;
            font-size 12px
            color: #fff
            font-weight: 600;
            margin 5px auto 0;
          }
          .m-place {
            height: 17px;
            font-size: 12px;
            font-weight: 400;
            color: #A8ABB3
            line-height: 17px;
            white-space nowrap
            margin 5px auto 0
          }
        }
        .middle-box {
          width: 300px
          height: 100%
          position: relative
          padding 11px 20px
          margin-left 1px
          .row {
            width: 100%
          }
          .row-right {
            height: 32px
            padding-top 8px
          }
          .team-logo {
            display block
            width: 32px
            height: 32px
          }
          .team-name {
            height: 32px;
            font-size: 16px;
            font-family: 'Industry-Demi';
            color: #2D2F33
            line-height: 30px;
            margin-left 8px
          }
          .team-area {
            width: 16px;
            height: 16px;
            line-height 16px
            text-align center
            background: #656973;
            border-radius: 4px;
            font-weight 600
            font-size 12px
            color #fff
            margin-left 6px
            &.home {
              background #0D8DFC
            }
          }
          .game-list {
            padding 5px 12px
            background #F7F8FA
            border-radius: 8px;
            .game-status {
              width: 6px;
              height: 6px;
              background: #D2D4D9
              border-radius 50%
              + .game-status {
                margin-left 7px
              }
              &.win {
                background #0D8DFC
              }
            }
          }
          .score {
            width 14px
            height: 16px;
            font-size: 18px;
            font-family: 'Industry-Bold';
            font-weight: bold;
            color: #A8ABB3
            line-height: 12px;
            text-align center
            margin-left 12px
          }
          &:before, &:after {
            display block
            content: ''
            width: 1px
            height: 60px
            background #F0F1F2
            position absolute
            top: 13px
          }
          &:before {
            left: -1px
          }
          &:after {
            right: -1px
          }
        }

        .right-box {
          width calc(100% - 106px - 300px)
          height: 100%
          margin-left 1px
          .link-wrap {
            .link-btn {
              display block
              border: 1px solid #0D8DFC;
              border-radius: 20px;
              font-size: 13px;
              color: #0D8DFC;
              text-align: center;
              width: 94px
              height: 26px
              line-height: 24px
              cursor pointer
              &:hover {
                background: #EDF7FF;
              }
              &.remind-btn {
                margin-top 8px
              }
              &.remind {
                background #0D8DFC
                color: #fff
                &:hover {
                  background: #077EE6;
                }
              }
            }
          }
          .match-pre {
            width: 100%
            padding 13px 20px 0 32px
            .history-compare {
              min-width: 116px
              padding-top 2px
              text-align: center
              .top-box {
                width: 100%
                .team-logo {
                  display block
                  width: 20px
                  height: 20px
                }
                .title {
                  height: 20px;
                  font-size: 12px;
                  font-weight: 400;
                  color: #2D2F33
                  line-height: 20px;
                  margin 0 25px
                  overflow hidden
                }
              }
              .bottom-box {
                margin-top 9px
                .compare-win {
                  width: 100%
                  color: #656973
                  height: 18px;
                  font-size: 12px;
                  font-weight: 400;
                  line-height: 18px;
                  text-align center
                }
                .compare-bar {
                  width: 100%
                  margin-top 3px
                  .t-a-bar {
                    height: 4px;
                    background: #0D8DFC
                    border-radius: 2px 0px 0px 2px;
                  }
                  .t-b-bar {
                    height: 4px;
                    background: #FF5C69
                    border-radius: 0px 2px 2px 0px;
                  }
                }
              }
            }
          }
          .match-live {
            width: 100%
            height: 100%
            overflow hidden
            position relative
            .live-list {
              position absolute
              top 50%
              left 50%
              transform translate(-50%, -50%)
            }
            .live-item {
              + .live-item {
                margin-left 24px
              }
            }
            .live-icon {
              display block
              width: 36px
              height: 36px
              margin 0 auto
            }
            .live-name {
              height: 17px;
              font-size: 12px;
              font-weight: 400;
              color: #2D2F33
              line-height: 17px;
              white-space nowrap
              text-align center
              margin-top 6px
            }
          }
          .match-end {
            width: 100%
            height: 100%
            padding 12px 20px 12px 33px
            .video-link {
              width: 112px
              height: 62px
              border-radius: 4px
              background #F7F8FA
              overflow hidden
              position relative
              img {
                display block
                width: 100%
                height: 100%
              }
              .iconfont {
                z-index 1
                color #fff
                font-size 17px
              }
            }
            .video-tip {
              width: 100%
              line-height 62px
              text-align center
              font-weight: 400
              color: #A8ABB3
              font-size 14px
            }
            .link-wrap {
              width 94px
              height: 100%
              position relative
              .link-btn {
                + .link-btn {
                  margin-top 8px
                }
              }
            }
          }
        }
        &.pre, &.playing {
          .middle-box {
            .score {
              color #2D2F33
            }
          }
        }
        &.end {
          .left-box {
            .m-time {
              color #A8ABB3
            }
          }
          .middle-box {
            .score.win {
              color #0D8DFC
            }
          }
        }
      }
    }
  }


  @media screen and (max-width: 600px) {
    .page-main.schedule {
      width: 100%
    }

    .cont-right {
      display none
    }
  }
</style>
