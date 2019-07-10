<template>
  <div>
    <header-sub-menus>
      <li v-for="(item, index) in headerSubMenu" :key="index">
        <nuxt-link :to="`${item.url}${tournamentId}`" class="link" :class="{active: item.active}">
          <span>{{item.title}}</span>
          <svg class="icon schdule_icon_active" aria-hidden="true">
            <use xlink:href="#icon-circle_blue"></use>
          </svg>
        </nuxt-link>
      </li>
    </header-sub-menus>
    <div class="tournament-main">
      <!--赛事新闻-->
      <tournament-news :news="news"/>

      <!--本周比赛-->
      <week-schedule :week-match="thisWeekMath"/>

      <!--赛事进度-->
      <whole-schedule :tournament-data="tournament" :week-match-data="weekMatch" :rank-data="rankData" />

      <!--菠菜-->
      <t-bets :bet-data="bet" />

      <!--最佳阵容-->
      <best-group :best-group-data="bestGroup" :positions="positions" />

      <!--参赛战队-->
      <t-teams :teams-data="teams" :positions="positions" />

      <!--一周选手榜-->
      <week-player-rank :player-rank="playerRank" :positions="positions" />

      <!--视频-->
      <t-video :video-data="videoData" />
    </div>
  </div>

</template>

<script>

//  import wholeSchedule from "../../components/tournament/whole-schedule"
  import tVideo from "../../components/tournament/t-video"

  export default {
    components: {tVideo},
    name: "tournament-index",
    data() {
      return {
        headerSubMenu: [
          {title: '赛事主页', url: '/tournament_list/', active: true},
          {title: '战队数据', url: '/tournament_group/', active: false},
          {title: '选手数据', url: '/tournament_player/', active: false},
          {title: '英雄数据', url: '/tournament_hero/', active: false}
        ],
        news: {
          picList: [{
            article_id: "55322",
            image_url: "https://img1.famulei.com/z/5688126/p/193/2413482944808.png",
            link_url: "/p/1012209",
            title: "[赛高专访] SN.SwordArT：春季赛的表现不及格"
          }, {
            article_id: "55174",
            image_url: "https://img1.famulei.com/z/5688126/p/193/2216394730705.png",
            link_url: "/p/1011305",
            title: "RNG战队官宣：RNG.Zz1tai复出 重回赛场"
          }, {
            article_id: "55015",
            image_url: "https://img1.famulei.com/z/5688126/p/193/2017170870990.png",
            link_url: "/p/1010251",
            title: "iG.LOL分部新增教练Kim Karam（김가람）"
          }],
          txtList: [{
            article_id: "55450",
            link_url: "/p/1013197",
            time_string: "51分钟前",
            title: "[幻联赛阵容推荐] 常规赛最后一周 去留一锤定音"
          }, {
            article_id: "55445",
            link_url: "/p/1013156",
            time_string: "2小时前",
            title: "WE.Poss：季后赛目标一直是夺冠"
          }, {
            article_id: "55442",
            link_url: "/p/1013146",
            time_string: "2小时前",
            title: "2019LPL春季赛季后赛赛程及售票信息公布"
          }]
        },
        thisWeekMath: [
          {
            game_count: "3",
            homesite: "上海",
            homesite_a: "0",
            homesite_b: "0",
            is_have_video_link: "0",
            is_publist: 1,
            is_real_time: 1,
            is_remind: 0,
            live_video_url1: "https://staticlive.douyucdn.cn/common/share/play.swf?room_id=288016",
            matchID: "6282",
            start_date: "周一",
            start_time: "03-25 17:00",
            status: "2",
            teamID_a: "1",
            teamID_b: "421",
            team_a_image_thumb: "https://img1.famulei.com/z/5688126/p/191/2116130822405_100X100.png",
            team_a_name: "EDG",
            team_a_win: "2",
            team_b_image_thumb: "https://img1.famulei.com/z/5688126/p/191/2116134425114_100X100.png",
            team_b_name: "V5",
            team_b_win: "1",
            tournament_name: "2019 LPL春季赛	"
          },
          {
            game_count: "3",
            homesite: "北京RNG",
            homesite_a: "1",
            homesite_b: "0",
            is_have_video_link: "1",
            is_publist: 1,
            is_real_time: 1,
            is_remind: 0,
            live_video_url1: "https://staticlive.douyucdn.cn/common/share/play.swf?room_id=424559",
            matchID: "6283",
            start_date: "周一",
            start_time: "03-25 19:00",
            status: "1",
            teamID_a: "5",
            teamID_b: "266",
            team_a_image_thumb: "https://img1.famulei.com/z/5688126/p/191/2116133076803_100X100.png",
            team_a_name: "RNG",
            team_a_win: "0",
            team_b_image_thumb: "https://img1.famulei.com/z/5688126/p/191/2116174274328_100X100.png",
            team_b_name: "SDG",
            team_b_win: "2",
            tournament_name: "2019 LPL春季赛	"
          },
          {
            game_count: "3",
            homesite: "上海",
            homesite_a: "0",
            homesite_b: "0",
            is_have_video_link: "0",
            is_publist: 0,
            is_real_time: 0,
            is_remind: 0,
            live_video_url1: "https://staticlive.douyucdn.cn/common/share/play.swf?room_id=288016",
            matchID: "6284",
            start_date: "周二",
            start_time: "03-26 17:00",
            status: "0",
            teamID_a: "11",
            teamID_b: "18",
            team_a_image_thumb: "https://img1.famulei.com/z/5688126/p/191/0318305067369_100X100.png",
            team_a_name: "BLG",
            team_a_win: "0",
            team_b_image_thumb: "https://img1.famulei.com/z/0/p/171/0411192341360_100X100.png",
            team_b_name: "iG",
            team_b_win: "0",
            tournament_name: "2019 LPL春季赛	"
          },
          {
            game_count: "3",
            homesite: "上海",
            homesite_a: "0",
            homesite_b: "0",
            is_have_video_link: "0",
            is_publist: 0,
            is_real_time: 0,
            is_remind: 0,
            live_video_url1: "https://staticlive.douyucdn.cn/common/share/play.swf?room_id=288016",
            matchID: "6285",
            start_date: "周二",
            start_time: "03-26 17:00",
            status: "0",
            teamID_a: "11",
            teamID_b: "18",
            team_a_image_thumb: "https://img1.famulei.com/z/5688126/p/191/0318305067369_100X100.png",
            team_a_name: "BLG",
            team_a_win: "0",
            team_b_image_thumb: "https://img1.famulei.com/z/0/p/171/0411192341360_100X100.png",
            team_b_name: "iG",
            team_b_win: "0",
            tournament_name: "2019 LPL春季赛	"
          },
          {
            game_count: "3",
            homesite: "上海",
            homesite_a: "0",
            homesite_b: "0",
            is_have_video_link: "0",
            is_publist: 0,
            is_real_time: 0,
            is_remind: 0,
            live_video_url1: "https://staticlive.douyucdn.cn/common/share/play.swf?room_id=288016",
            matchID: "6286",
            start_date: "周二",
            start_time: "03-26 17:00",
            status: "0",
            teamID_a: "11",
            teamID_b: "18",
            team_a_image_thumb: "https://img1.famulei.com/z/5688126/p/191/0318305067369_100X100.png",
            team_a_name: "BLG",
            team_a_win: "0",
            team_b_image_thumb: "https://img1.famulei.com/z/0/p/171/0411192341360_100X100.png",
            team_b_name: "iG",
            team_b_win: "0",
            tournament_name: "2019 LPL春季赛	"
          }
        ],
        rankData: {
          '251': [
            {
              letter: '积分榜',
              list: [
                {
                  los: 2,
                  orderby: 10,
                  percent: "85",
                  sort_one: 12,
                  sort_two: "16",
                  sorting: 1,
                  star_id: "7",
                  team_id: "232",
                  team_image: "https://img1.famulei.com/z/5688126/p/191/2116131268514_100X100.png",
                  team_short_name: "FPX",
                  w_l_num: "16",
                  win: 12,
                  win_lose: "26-10"
                },
                {
                  los: 4,
                  orderby: 6,
                  percent: "71",
                  sort_one: 10,
                  sort_two: "14",
                  sorting: 2,
                  star_id: "9",
                  team_id: "18",
                  team_image: "https://img1.famulei.com/z/5688126/p/191/2116131620647_100X100.png",
                  team_short_name: "iG",
                  w_l_num: "14",
                  win: 10,
                  win_lose: "23-9"
                },
                {
                  los: 4,
                  orderby: 6,
                  percent: "71",
                  sort_one: 10,
                  sort_two: "11",
                  sorting: 2,
                  star_id: "21",
                  team_id: "120",
                  team_image: "https://img1.famulei.com/z/5688126/p/191/2116134049538_100X100.png",
                  team_short_name: "TOP",
                  w_l_num: "11",
                  win: 10,
                  win_lose: "22-11"
                },
                {
                  los: 5,
                  orderby: 4,
                  percent: "64",
                  sort_one: 9,
                  sort_two: "7",
                  sorting: 5,
                  star_id: "10",
                  team_id: "1",
                  team_image: "https://img1.famulei.com/z/5688126/p/191/2116130822405_100X100.png",
                  team_short_name: "EDG",
                  w_l_num: "7",
                  win: 9,
                  win_lose: "20-13"
                }
              ]
            }
          ],
          '270': []
        },
        bet: {
          count: 6,
          list: [
            {
              bet_list: [
                {
                  bet_end_time: "1555146000",
                  bet_end_time_txt: "截止 04-13 17:00",
                  bet_id: "7723",
                  category_name: "赛事",
                  date_txt: "周六 4月13日",
                  image: "https://img1.famulei.com/z/5688126/p/1812/1118553311945.png",
                  items: [
                    {
                      bet_item_id: "16614",
                      init_price: "100",
                      item_name: "FPX",
                      item_name_en: "",
                      item_name_tw: "",
                      member_max_bet: "1000",
                      odds: "1.40",
                      price: "230278",
                      win_rate: "0.69"
                    },
                    {
                      bet_item_id: "16615",
                      init_price: "100",
                      item_name: "JDG",
                      item_name_en: "",
                      item_name_tw: "",
                      member_max_bet: "1000",
                      odds: "2.98",
                      price: "104512",
                      win_rate: "0.31",
                    }
                  ],
                  name: "2019 LPL春季赛	 季后赛 ",
                  people_num: "3622",
                  result_item_id: "0",
                  status: "1",
                  title: "谁能获得比赛胜利？",
                  total_price: "334k",
                  view_type: 1
                },
                {
                  bet_end_time: "1555146000",
                  bet_end_time_txt: "截止 04-13 17:00",
                  bet_id: "7724",
                  category_name: "赛事",
                  date_txt: "周六 4月13日",
                  image: "https://img1.famulei.com/z/5688126/p/1812/1118553311945.png",
                  items: [
                    {
                      bet_item_id: "16616",
                      init_price: "100",
                      item_name: "三局",
                      item_name_en: "",
                      item_name_tw: "",
                      member_max_bet: "1000",
                      odds: "3.72",
                      price: "21573",
                      win_rate: "0.25"
                    },
                    {
                      bet_item_id: "16617",
                      init_price: "100",
                      item_name: "四局",
                      item_name_en: "",
                      item_name_tw: "",
                      member_max_bet: "1000",
                      odds: "2.34",
                      price: "34880",
                      win_rate: "0.4"
                    },
                    {
                      bet_item_id: "16618",
                      init_price: "100",
                      item_name: "五局",
                      item_name_en: "",
                      item_name_tw: "",
                      member_max_bet: "1000",
                      odds: "2.66",
                      price: "30588",
                      win_rate: "0.35"
                    }
                  ],
                  name: "2019 LPL春季赛	 季后赛 ",
                  people_num: "980",
                  result_item_id: "0",
                  status: "1",
                  title: "比赛会进行几局？",
                  total_price: "87k",
                  view_type: 1
                },
                {
                  bet_end_time: "1555146000",
                  bet_end_time_txt: "截止 04-13 17:00",
                  bet_id: "7725",
                  category_name: "赛事",
                  date_txt: "周六 4月13日",
                  image: "https://img1.famulei.com/z/5688126/p/1812/1118553311945.png",
                  items: [
                    {
                      bet_item_id: "16619",
                      init_price: "100",
                      item_name: "FPX",
                      item_name_en: "",
                      item_name_tw: "",
                      member_max_bet: "1000",
                      odds: "1.62",
                      price: "39266",
                      win_rate: "0.59"
                    },
                    {
                      bet_item_id: "16620",
                      init_price: "100",
                      item_name: "JDG",
                      item_name_en: "",
                      item_name_tw: "",
                      member_max_bet: "1000",
                      odds: "2.28",
                      price: "27394",
                      win_rate: "0.41"
                    }
                  ],
                  name: "2019 LPL春季赛	 季后赛 ",
                  people_num: "874",
                  result_item_id: "0",
                  status: "1",
                  title: "哪队将会拿到一血？",
                  total_price: "66k",
                  view_type: 1
                }
              ],
              match_date: "04/13",
              match_id: "7155",
              match_start_time: "1555146000",
              match_status: "0",
              match_team_a: "FPX",
              match_team_b: "JDG",
              team_a_win: "0",
              team_b_win: "0",
              team_image_thumb_a: "https://img1.famulei.com/z/5688126/p/191/2116131268514_100X100.png",
              team_image_thumb_b: "https://img1.famulei.com/z/5688126/p/191/2116161762530_100X100.png",
              tournament_image: "https://img1.famulei.com/z/5688126/p/1812/1118553311945.png",
              tournament_name: "2019 LPL春季赛	"
            },
            {
              bet_list: [],
              match_date: "04/14",
              match_id: "7156",
              match_start_time: "1555232400",
              match_status: "0",
              match_team_a: "iG",
              match_team_b: "TOP",
              team_a_win: "0",
              team_b_win: "0",
              team_image_thumb_a: "https://img1.famulei.com/z/5688126/p/191/2116131620647_100X100.png",
              team_image_thumb_b: "https://img1.famulei.com/z/5688126/p/191/2116134049538_100X100.png",
              tournament_image: "https://img1.famulei.com/z/5688126/p/1812/1118553311945.png",
              tournament_name: "2019 LPL春季赛	"
            }
          ]
        },
        positions: {
          '3': {icon: '#icon-top', pos_name:'上单'},
          '4': {icon: '#icon-jungle', pos_name:'打野'},
          '2': {icon: '#icon-MID', pos_name:'中单'},
          '1': {icon: '#icon-ADC', pos_name:'ADC'},
          '5': {icon: '#icon-SUPPORT', pos_name:'辅助'}
        }
      }
    },
    async asyncData({app, route}) {
      let tournament = initScheduleData(await app.$api.tournament.wholeSchedule({params: {tournamentId: route.params.id}}) || [])  // 赛事进度
      let weekMatch = await app.$api.tournament.weekMatchList({params: {weekId: tournament.current.weekId}}) || []                  // 赛事进度-当前周比赛列表
      let teams = (await app.$api.tournament.teams({params: {tournamentId: route.params.id}})).data || []    // 参赛战队
      let playerRank = (await app.$api.tournament.weekPlayerRank({params: {type: 'KILLS', tournamentID: route.params.id}})).data || {}      // 一周选手榜
      let videoData = (await app.$api.video.tournamentVideoList({params: {page: 1, type: 1, tournamentID: route.params.id}})).data || {}      // 视频

      let weekBestGroupSelect = [
        {cacheID: "251_587", name: "常规赛第六周"},
        {cacheID: "251_588", name: "常规赛第七周"},
        {cacheID: "251_589", name: "常规赛第八周"},
        {cacheID: "251_590", name: "常规赛第九周"},
        {cacheID: "251_591", name: "常规赛第十周"},
        {cacheID: "270_0", name: "季后赛"}
      ]

      // weekBestGroupSelect最后一条数据的索引
      const currIndex = weekBestGroupSelect.length - 1
      const params = {
        tournamentID: route.params.id,
        cacheID: weekBestGroupSelect[currIndex] && weekBestGroupSelect[currIndex].cacheID
      }
      let weekBestGroups = {}
      if (currIndex !== -1) {
        weekBestGroups[weekBestGroupSelect[currIndex].cacheID] = ((await app.$api.tournament.weekBestGroup({params})).data || {}).list || []
      }

      return {
        tournament,
        weekMatch,
        bestGroup: {
          params,
          currIndex,
          select: weekBestGroupSelect,
          groups: weekBestGroups
        },
        teams,
        playerRank,
        videoData
      }

      // 格式化赛程数据
      function initScheduleData(data) {
        let tournament = {
          list: [].concat(data || []),
          current: {
            menuIndex: -1,  // 当前header菜单索引
            weekIndex: 0,  // 当前周索引
            weekId: 0,  // 当前周ID
            roundId: 0,
            roundName: '',
            isRoundSon: false  // 子数据是否为空
          },
        };

        tournament.list.forEach(function (item, index) {
          if (item.is_now_week == '1' || index == 0) {
            tournament.current.menuIndex = index
            tournament.current.roundId = item.roundID
            tournament.current.roundName = item.name

            if (item.round_son && item.round_son.length > 0) {
              tournament.current.isRoundSon = true
              item.round_son.forEach(function (subItem, subIndex) {
                if (subItem.is_now_week == '1' || subIndex == 0) {
                  tournament.current.weekIndex = subIndex
                  tournament.current.weekId = subItem.id
                }
              })
            } else {
              tournament.current.weekId = 'p_' + item.roundID
              tournament.current.isRoundSon = false
            }
          }
        })

        return tournament
      }

    },
    fetch() {
      // 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。
    },
    computed: {
      tournamentId() {
        return this.$route.params.id
      }
    },
    mounted() {
//      this.$scoreApi.getTournamentSchedule(this.tournamentId)
//      console.log(this.weekMatch)
    },
    watch: {
      $route(to, from) {
        console.log(to)
        console.log(from)
      }
    },
    methods: {

    },
    destroyed() {
    }
  }
</script>

<style lang="stylus">
  @import "~static/static/css/variable.styl"

  .tournament-main {
    width: 990px;
    margin: 0 auto;
    min-height: 500px;
    padding-bottom: 50px;
    padding-top: 70px;
  }
  .tools-bar {
    width: 100%
    padding 12px 24px
    h2 {
      position relative
      font-size 20px
      font-weight 400
      color $color-gray-1
      padding-left 14px
      line-height 28px
      &:before {
        content: '';
        display: block;
        width: 4px;
        height: 16px;
        background: #D2D4D9;
        position: absolute;
        left: 0;
        top: 7px;
      }
    }
    .more {
      line-height: 28px;
      font-size: 16px;
      color: $gray;
      a {
        color $color-gray-2
      }
    }
  }

  .piece {
    width 100%
    background: #fff
    box-shadow: 0 0 0 1px #EBEBED
    border-radius: 2px
    +.piece {
      margin-top 30px
    }
    .score-wrap {
      width: 58px
      margin 0 auto
      .score-l,
      .score-r {
        width: 26px
        height: 34px
        overflow hidden
        border-radius 3px
        position relative

        .top-bg {
          width: 100%
          height: 50%
          background #424447
        }
        .bottom-bg {
          width: 100%
          height: 50%
          background #2d2f33
        }
        .score {
          display block
          position absolute
          top 0
          width: 100%
          height: 100%
          text-align center
          line-height 28px
          color #fff
          font-family 'Industry-Bold'
          font-size 20px
          border 1px solid rgba(0, 0, 0, .15)
          &.t-win {
            color #F2DBB3
          }
        }
      }
    }

    .team-logo {
      width 48px
      height 48px
      margin 0 auto
      img {
        display block
        width: 100%
        height: 100%
      }
    }

  }

  .t-pagination {
    .arrow-btn {
      display inline-block
      cursor pointer
      padding 5px 16px
      height: 28px
      border-radius 14px
      border: 1px solid #F0F1F2
      .iconfont {
        font-size 16px
        display inline-block
        color $gray
      }
      &.disabled {
        cursor no-drop
        .iconfont {
          opacity .3
        }
      }
      &:not(.disabled) {
        &:hover {
          box-shadow 0 1px 5px 1px rgba(5,11,26,0.1)
          .iconfont {
            opacity 1
            color $darkGray
          }
        }
      }
      &.prev {
        margin-right 5px
      }
    }
  }
</style>
