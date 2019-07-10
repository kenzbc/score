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

    <div class="tournament-main">

      <div class="tournament-list-wrap">
        <div class="top-bar cl">
          <!--状态菜单-->
          <tag-menus :menus-data="tagMenus" @selectMenu="selectMenu"/>
          <!--年份选择-->
          <Select class="select-component flr" placeholder="全部" @on-change="selectYear">
            <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>

        <!--<div class="score-loading top show">-->
        <!--<img class="score-icon" src="/static/images/index/score_loading.gif" alt="">-->
        <!--</div>-->

        <!--赛事列表-->
        <tournament-list :tournament-data="tournament"/>

        <!--分页-->
        <div class="page-box cl" v-if="tournament.list && tournament.list.length">
          <Page :total="pages" :page-size="18" :current="params.page" size="small" prev-text="上一页" next-text="下一页" @on-change="selectPage"/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

  let params = {
    type: 'all',
    limit: 18,
    page: 1,
    year: ''
  }

  let _data = {
    type: 'get',
    p: params
  }

  export default {
    head() {
      return this.$seo(
        `推荐圈子`,
        `明星圈子,互动社区,主播互动`,
        `竞猜`,
        {
          script: [],
          link: []
        }
      )
    },
    name: "tournament_list",
    data() {
      return {
        headerSubMenu: [
          {title: '热门', url: '/schedule', active: false},
          {title: '赛事', url: '/tournament_list', active: true},
          {title: '大数据', url: '/data', active: false}
        ],
        tagMenus: {
          activeIndex: 0,
          list: [
            {title: '全部', key: 'all', index: 0},
            {title: '进行中', key: 'ing', index: 1},
            {title: '即将开始', key: 'nostart', index: 2},
            {title: '已经结束', key: 'end', index: 3}
          ]
        },
        selectValue: '',
        params: params
      }
    },
    async asyncData({app}) {

      let tournament = (await app.$api.tournament.all({method: 'post', params})).data || {}

      return {
        tournament
      }

    },
    fetch() {
      // 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。
    },
    computed: {
      selectList() {
        let years = this.tournament && this.tournament.year || []
        let list = years.map((item) => {
          return {
            value: item,
            label: item
          }
        })
        return list
      },
      pages() {
        return parseInt(this.tournament.count) || 0
      }
    },
    mounted() {
      console.log(this.selectList)
    },
    methods: {
      // 通过标签筛选赛事，子组件调用
      async selectMenu(item) {
        this.tagMenus.activeIndex = item.index
        this.params.type = item.key
        this.params.page = 1
//        let data = await this.$scoreApi.getTournamentAll(params)
        let data = await this.$api.tournament.all({params: this.params})
        console.log(data)
        this.tournament = data.data
      },
      // 通过年份筛选赛事
      async selectYear(year) {
        console.log(year)
        this.params.year = year === '全部' ? '' : year
        this.params.page = 1
//        let data = await this.$scoreApi.getTournamentAll(params)
        let data = await this.$api.tournament.all({params: this.params})
        this.tournament = data.data
      },
      // 赛事列表翻页
      async selectPage(page) {
        this.params.page = page
        let data = await this.$api.tournament.all({params: this.params})
        this.tournament = data.data
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .tournament-main {
    width: 100%;
    padding-top: 56px;
  }

  .tournament-list-wrap {
    width: 990px;
    background-color: #fff;
    border: 1px solid #eeeeef;
    margin: 0 auto;
  }

  .top-bar {
    width: 100%
    padding 24px 35px 9px
    .select-component {
      display: block
      width: 120px
      height: 32px
      /*border: 1px solid #EBEBED;*/
      /*border-radius: 16px;*/
      /*position relative;*/

      .select-wrap {
        &.drop {
          .active-option {
            .iconfont {
              transform rotate(180deg)
            }
          }
          .option-list-wrap {
            height: 160px
            top 38px
            visibility visible
          }
        }
      }

      .option-list-wrap {
        width: 114px
        height 0
        position absolute
        top 32px
        left 2px
        z-index 2
        background: #FFF;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.03), 0 2px 8px 0 rgba(0, 0, 0, 0.08);
        border-radius: 4px;
        visibility hidden
        transition height .3s, visibility .3s, top .3s;
      }

      .active-option {
        cursor pointer
        .value {
          display inline-block
          vertical-align middle
          width: 78px
          height: 100%
          line-height 30px
          margin-left 15px
          font-size: 14px;
          color: #656973;
        }
        .iconfont {
          display inline-block
          vertical-align middle
          color: #A8ABB3;
          transition-duration .3s
        }

      }
      .option-list {
        .item {
          width: 104px
          height: 36px
          line-height 36px
          border-radius: 8px;
          padding-left 13px
          margin 0 auto;
          cursor pointer
          font-size: 14px;
          color: #2D2F33;
          &:hover {
            background: #F0F1F2;
          }
          &.active {
            background: #0D8DFC;
            color #fff;
          }
          + .item {
            margin-top 2px
          }
        }
      }
      .nano {
        > .nano-pane {
          width 6px
          right 6px
          background transparent
          > .nano-slider {
            opacity: 0.2;
            background: #000;
            border-radius: 4px;
            width: 100%
          }
        }
        .nano-content {
          top 5px
          bottom 5px
        }
      }
    }
  }

  .page-box {
    width 100%
    padding 20px
    padding-top 29px
    .ivu-page {
      float right
    }
  }

  @media screen and (max-width: 1200px) {
    .star-list-box {
      width: 900px;
    }
  }

  @media screen and (max-width: 768px) {
    .star-main {
      padding-top 30px;
    }

    .star-list-box {
      width: 600px;
    }
  }

  @media screen and (max-width: 600px) {
    .star-main {
      padding-top 0;
    }

    .star-list-box {
      width: 300px;
    }
  }
</style>
