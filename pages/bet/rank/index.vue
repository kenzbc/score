<template>
  <div class="page-main bet-ranking">
    <div class="container clearfix">
      <rank-list title="周榜" type="blue" :data="week.data"  @scrollDown="scrollDown('week')" ></rank-list>
      <rank-list title="月榜" type="violet" :data="month.data"  @scrollDown="scrollDown('month')"></rank-list>
      <rank-list title="总榜" type="red" :data="total.data" @scrollDown="scrollDown('total')" ></rank-list>
    </div>
  </div>
</template>

<script>
  import rankList from '~/components/bet/rank-list.vue'
  export default {
    name: "index",
    components: {
      rankList
    },
    data () {
      return {
        week: {
          data: {
            list:[],
            // me:{}
          },
          lastCount: 0,
          page: 1,
          end: false,
          loading: true
        },
        month: {
          data: {
            list:[],
            // me:{}
          },
          lastCount: 0,
          page: 1,
          end: false,
          loading: true
        },
        total: {
          data: {
            list:[],
            // me:{}
          },
          lastCount: 0,
          page: 1,
          end: false,
          loading: true
        }
      }
    },
    mounted () {
      this.requestList()
      // document.title = '排行榜';
    },
    watch: {
    },
    methods: {
      scrollDown(type) {
        // let data = this[type]
        // if (data.loading || !data.data.list.length || data.lastCount != 100) return
        // data.page++
        // this.requestList(type)
      },
      requestList (type) {
        if (type) {
          this.requestRankList(type)
        } else {
          let types = ['week','month','total']

          let weekList = [
            {
              "position": "21",
              "member_id": "5692600",
              "profit": "2558",
              "period": "2019-04-22-2019-04-28",
              "nickname": "绉Zenobia",
              "avatar": "https://img1.famulei.com/z/5692600/p/1811/1722572748143_100x100.png",
              "type": "",
              "is_girl": "",
              "win_times": 9,
              "total_times": "11",
              "win_num": "81%",
              "record_ratio": "9/11"
            },
            {
              "position": "22",
              "member_id": "6259657",
              "profit": "2490",
              "period": "2019-04-22-2019-04-28",
              "nickname": "ytt1204",
              "avatar": "",
              "type": "",
              "is_girl": "",
              "win_times": 5,
              "total_times": "6",
              "win_num": "83%",
              "record_ratio": "5/6"
            },
            {
              "position": "23",
              "member_id": "5688096",
              "profit": "2414",
              "period": "2019-04-22-2019-04-28",
              "nickname": "兔子喵",
              "avatar": "https://img1.famulei.com/m/5688096/p/194/1111361810657_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 5,
              "total_times": "10",
              "win_num": "50%",
              "record_ratio": "5/10"
            },
            {
              "position": "24",
              "member_id": "1630614",
              "profit": "2310",
              "period": "2019-04-22-2019-04-28",
              "nickname": "zzzmdf",
              "avatar": "https://img1.famulei.com/m/1630614/p/1611/1511433138222_100x100.png",
              "type": "",
              "is_girl": "",
              "win_times": 5,
              "total_times": "5",
              "win_num": "100%",
              "record_ratio": "5/5"
            },
            {
              "position": "25",
              "member_id": "3032452",
              "profit": "2240",
              "period": "2019-04-22-2019-04-28",
              "nickname": "去什么",
              "avatar": "https://img1.famulei.com/z/3032452/p/185/2714113222930_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 1,
              "total_times": "1",
              "win_num": "100%",
              "record_ratio": "1/1"
            },
            {
              "position": "26",
              "member_id": "2211777",
              "profit": "2240",
              "period": "2019-04-22-2019-04-28",
              "nickname": "apresto",
              "avatar": "https://img1.famulei.com/z/2211777/p/1811/1401050726955_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 2,
              "total_times": "2",
              "win_num": "100%",
              "record_ratio": "2/2"
            },
            {
              "position": "27",
              "member_id": "3103699",
              "profit": "2075",
              "period": "2019-04-22-2019-04-28",
              "nickname": "我来自1997i",
              "avatar": "https://img1.famulei.com/z/3103699/p/185/2415524245855_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 1,
              "total_times": "1",
              "win_num": "100%",
              "record_ratio": "1/1"
            },
            {
              "position": "28",
              "member_id": "5705225",
              "profit": "2060",
              "period": "2019-04-22-2019-04-28",
              "nickname": "單城記",
              "avatar": "https://img1.famulei.com/z/5705225/p/183/3023344827013_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 3,
              "total_times": "3",
              "win_num": "100%",
              "record_ratio": "3/3"
            },
            {
              "position": "29",
              "member_id": "6296043",
              "profit": "1979",
              "period": "2019-04-22-2019-04-28",
              "nickname": "清风舞袖",
              "avatar": "https://img1.famulei.com/z/6296043/p/191/3022415914911_100x100.png",
              "type": "",
              "is_girl": "",
              "win_times": 7,
              "total_times": "10",
              "win_num": "70%",
              "record_ratio": "7/10"
            },
            {
              "position": "30",
              "member_id": "2308057",
              "profit": "1979",
              "period": "2019-04-22-2019-04-28",
              "nickname": "无欲无求灬",
              "avatar": "https://img1.famulei.com/m/2308057/p/163/0613031284102_100x100.png",
              "type": "",
              "is_girl": "",
              "win_times": 7,
              "total_times": "10",
              "win_num": "70%",
              "record_ratio": "7/10"
            },
            {
              "position": "31",
              "member_id": "6261104",
              "profit": "1945",
              "period": "2019-04-22-2019-04-28",
              "nickname": "晒晒小迷妹",
              "avatar": "https://img1.famulei.com/z/6261104/p/1810/3022193563942_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 4,
              "total_times": "5",
              "win_num": "80%",
              "record_ratio": "4/5"
            },
            {
              "position": "32",
              "member_id": "1346303",
              "profit": "1940",
              "period": "2019-04-22-2019-04-28",
              "nickname": "zty丶",
              "avatar": "https://img.famulei.com/member/1346303/picture/15/11/05/2015110523051286608_100x100.png",
              "type": "",
              "is_girl": "",
              "win_times": 4,
              "total_times": "4",
              "win_num": "100%",
              "record_ratio": "4/4"
            },
            {
              "position": "33",
              "member_id": "5661265",
              "profit": "1930",
              "period": "2019-04-22-2019-04-28",
              "nickname": "圣俊大jiuzi",
              "avatar": "https://img1.famulei.com/m/5661265/p/1710/0714101210743_90x90.png",
              "type": "",
              "is_girl": "",
              "win_times": 2,
              "total_times": "2",
              "win_num": "100%",
              "record_ratio": "2/2"
            },
            {
              "position": "34",
              "member_id": "2925263",
              "profit": "1928",
              "period": "2019-04-22-2019-04-28",
              "nickname": "西发林",
              "avatar": "https://img1.famulei.com/z/2925263/p/171/0510090631943_100x100.jpg",
              "type": "1",
              "is_girl": "",
              "win_times": 2,
              "total_times": "2",
              "win_num": "100%",
              "record_ratio": "2/2"
            },
            {
              "position": "35",
              "member_id": "2991732",
              "profit": "1830",
              "period": "2019-04-22-2019-04-28",
              "nickname": "勇敢的螃蟹",
              "avatar": "https://img1.famulei.com/z/2991732/p/185/2915421851995_100x99.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 3,
              "total_times": "4",
              "win_num": "75%",
              "record_ratio": "3/4"
            },
            {
              "position": "36",
              "member_id": "2653844",
              "profit": "1830",
              "period": "2019-04-22-2019-04-28",
              "nickname": "苦瓜小周",
              "avatar": "https://img1.famulei.com/m/2653844/p/175/2021140030073_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 3,
              "total_times": "4",
              "win_num": "75%",
              "record_ratio": "3/4"
            },
            {
              "position": "37",
              "member_id": "5640026",
              "profit": "1802",
              "period": "2019-04-22-2019-04-28",
              "nickname": "雨落残荷",
              "avatar": "https://img1.famulei.com/m/5640026/p/179/0412155364012_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 7,
              "total_times": "12",
              "win_num": "58%",
              "record_ratio": "7/12"
            },
            {
              "position": "38",
              "member_id": "1306587",
              "profit": "1740",
              "period": "2019-04-22-2019-04-28",
              "nickname": "提伯斯的召唤师",
              "avatar": "https://img.famulei.com/member/1306587/picture/15/11/03/2015110310112094969_100x100.png",
              "type": "",
              "is_girl": "",
              "win_times": 3,
              "total_times": "4",
              "win_num": "75%",
              "record_ratio": "3/4"
            },
            {
              "position": "39",
              "member_id": "3066659",
              "profit": "1720",
              "period": "2019-04-22-2019-04-28",
              "nickname": "9023",
              "avatar": "https://img1.famulei.com/z/3066659/p/185/2521280215949_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 1,
              "total_times": "1",
              "win_num": "100%",
              "record_ratio": "1/1"
            },
            {
              "position": "40",
              "member_id": "5705411",
              "profit": "1720",
              "period": "2019-04-22-2019-04-28",
              "nickname": "踏雪追魂",
              "avatar": "https://img1.famulei.com/z/5705411/p/184/0116153419358_90x90.png",
              "type": "",
              "is_girl": "",
              "win_times": 1,
              "total_times": "1",
              "win_num": "100%",
              "record_ratio": "1/1"
            }
          ]
          let monthList = [
            {
              "position": "21",
              "member_id": "6249251",
              "profit": "7470",
              "period": "2019-04-01-2019-04-30",
              "nickname": "浩风起波",
              "avatar": "https://img1.famulei.com/z/6249251/p/189/1222344418463_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 6,
              "total_times": "6",
              "win_num": "100%",
              "record_ratio": "6/6"
            },
            {
              "position": "22",
              "member_id": "2843049",
              "profit": "7365",
              "period": "2019-04-01-2019-04-30",
              "nickname": "丨轻语",
              "avatar": "https://img1.famulei.com/m/2843049/p/1611/2312095568744_90x90.png",
              "type": "",
              "is_girl": "",
              "win_times": 13,
              "total_times": "26",
              "win_num": "50%",
              "record_ratio": "13/26"
            },
            {
              "position": "23",
              "member_id": "3018009",
              "profit": "7347",
              "period": "2019-04-01-2019-04-30",
              "nickname": "毒霸霸",
              "avatar": "https://img1.famulei.com/m/3018009/p/173/0123423982389_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 7,
              "total_times": "15",
              "win_num": "46%",
              "record_ratio": "7/15"
            },
            {
              "position": "24",
              "member_id": "3018540",
              "profit": "7221",
              "period": "2019-04-01-2019-04-30",
              "nickname": "鲲鹏大大大",
              "avatar": "https://img1.famulei.com/m/3018540/p/173/0201031946300_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 11,
              "total_times": "14",
              "win_num": "78%",
              "record_ratio": "11/14"
            },
            {
              "position": "25",
              "member_id": "1346303",
              "profit": "7008",
              "period": "2019-04-01-2019-04-30",
              "nickname": "zty丶",
              "avatar": "https://img.famulei.com/member/1346303/picture/15/11/05/2015110523051286608_100x100.png",
              "type": "",
              "is_girl": "",
              "win_times": 19,
              "total_times": "23",
              "win_num": "82%",
              "record_ratio": "19/23"
            },
            {
              "position": "26",
              "member_id": "6263857",
              "profit": "6858",
              "period": "2019-04-01-2019-04-30",
              "nickname": "宛若安如",
              "avatar": "https://img1.famulei.com/z/6263857/p/1812/2814482546181_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 19,
              "total_times": "21",
              "win_num": "90%",
              "record_ratio": "19/21"
            },
            {
              "position": "27",
              "member_id": "6273678",
              "profit": "6751",
              "period": "2019-04-01-2019-04-30",
              "nickname": "好烦吖",
              "avatar": "https://img1.famulei.com/z/6273678/p/1811/0719584428306_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 19,
              "total_times": "27",
              "win_num": "70%",
              "record_ratio": "19/27"
            },
            {
              "position": "28",
              "member_id": "6264091",
              "profit": "6299",
              "period": "2019-04-01-2019-04-30",
              "nickname": "大浪斗池鱼",
              "avatar": "https://img1.famulei.com/z/6264091/p/192/0200371757860_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 25,
              "total_times": "51",
              "win_num": "49%",
              "record_ratio": "25/51"
            },
            {
              "position": "29",
              "member_id": "2842911",
              "profit": "6248",
              "period": "2019-04-01-2019-04-30",
              "nickname": "没了奇迹丶也不在红",
              "avatar": "https://img1.famulei.com/m/2842911/p/173/2302563951605_90x90.png",
              "type": "",
              "is_girl": "",
              "win_times": 8,
              "total_times": "12",
              "win_num": "66%",
              "record_ratio": "8/12"
            },
            {
              "position": "30",
              "member_id": "5665793",
              "profit": "6170",
              "period": "2019-04-01-2019-04-30",
              "nickname": "pener",
              "avatar": "https://img1.famulei.com/m/5665793/p/1711/0406382733132_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 3,
              "total_times": "3",
              "win_num": "100%",
              "record_ratio": "3/3"
            },
            {
              "position": "31",
              "member_id": "5692105",
              "profit": "5947",
              "period": "2019-04-01-2019-04-30",
              "nickname": "lzzz_",
              "avatar": "https://img1.famulei.com/m/5692105/p/1712/2112520135090_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 15,
              "total_times": "30",
              "win_num": "50%",
              "record_ratio": "15/30"
            },
            {
              "position": "32",
              "member_id": "5599067",
              "profit": "5798",
              "period": "2019-04-01-2019-04-30",
              "nickname": "有梦想的人不睡觉O",
              "avatar": "https://img1.famulei.com/z/5599067/p/185/2307242662819_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 10,
              "total_times": "13",
              "win_num": "76%",
              "record_ratio": "10/13"
            },
            {
              "position": "33",
              "member_id": "1889113",
              "profit": "5775",
              "period": "2019-04-01-2019-04-30",
              "nickname": "叫我蒙面超人",
              "avatar": "https://img1.famulei.com/m/1889113/p/191/1610501073788_100x100.jpg",
              "type": "1",
              "is_girl": "",
              "win_times": 4,
              "total_times": "6",
              "win_num": "66%",
              "record_ratio": "4/6"
            },
            {
              "position": "34",
              "member_id": "2926785",
              "profit": "5558",
              "period": "2019-04-01-2019-04-30",
              "nickname": "夕阳山外山v",
              "avatar": "https://img1.famulei.com/z/2926785/p/1812/2218174554786_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 6,
              "total_times": "12",
              "win_num": "50%",
              "record_ratio": "6/12"
            },
            {
              "position": "35",
              "member_id": "422922",
              "profit": "5470",
              "period": "2019-04-01-2019-04-30",
              "nickname": "夜笙歌",
              "avatar": "https://img.famulei.com/member/422922/picture/15/10/09/2015100923013888476.png",
              "type": "1",
              "is_girl": "",
              "win_times": 6,
              "total_times": "8",
              "win_num": "75%",
              "record_ratio": "6/8"
            },
            {
              "position": "36",
              "member_id": "6258194",
              "profit": "5470",
              "period": "2019-04-01-2019-04-30",
              "nickname": "王聪明",
              "avatar": "https://img1.famulei.com/z/6258194/p/1810/2319233660230_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 3,
              "total_times": "4",
              "win_num": "75%",
              "record_ratio": "3/4"
            },
            {
              "position": "37",
              "member_id": "3060933",
              "profit": "5440",
              "period": "2019-04-01-2019-04-30",
              "nickname": "mk血杀",
              "avatar": "https://img1.famulei.com/z/3060933/p/185/2602483364440_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 13,
              "total_times": "20",
              "win_num": "65%",
              "record_ratio": "13/20"
            },
            {
              "position": "38",
              "member_id": "745318",
              "profit": "5434",
              "period": "2019-04-01-2019-04-30",
              "nickname": "且听风雨诉离殇",
              "avatar": "https://img.famulei.com/member/745318/picture/15/9/06/2015090620254288977_100x100.png",
              "type": "",
              "is_girl": "",
              "win_times": 22,
              "total_times": "30",
              "win_num": "73%",
              "record_ratio": "22/30"
            },
            {
              "position": "39",
              "member_id": "6248640",
              "profit": "5390",
              "period": "2019-04-01-2019-04-30",
              "nickname": "iG阿弃",
              "avatar": "https://img1.famulei.com/z/6248640/p/192/0921323739944_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 6,
              "total_times": "6",
              "win_num": "100%",
              "record_ratio": "6/6"
            },
            {
              "position": "40",
              "member_id": "5590864",
              "profit": "5200",
              "period": "2019-04-01-2019-04-30",
              "nickname": "汉源第十八",
              "avatar": "https://img1.famulei.com/z/5590864/p/185/2317512493277_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 4,
              "total_times": "7",
              "win_num": "57%",
              "record_ratio": "4/7"
            }
          ]
          let totalList = [
            {
              "position": "21",
              "member_id": "2953759",
              "profit": "36k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "王者无始",
              "avatar": "https://img1.famulei.com/z/2953759/p/185/3105585396969_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 248,
              "total_times": "368",
              "win_num": "67%",
              "record_ratio": "248/368"
            },
            {
              "position": "22",
              "member_id": "3072315",
              "profit": "36k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "阿喜lol",
              "avatar": "https://img1.famulei.com/z/3072315/p/185/2516314865408_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 53,
              "total_times": "115",
              "win_num": "46%",
              "record_ratio": "53/115"
            },
            {
              "position": "23",
              "member_id": "3052421",
              "profit": "36k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "猫酱猫酱猫酱",
              "avatar": "https://img1.famulei.com/m/3052421/p/178/3110545111090_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 1324,
              "total_times": "2098",
              "win_num": "63%",
              "record_ratio": "1324/2098"
            },
            {
              "position": "24",
              "member_id": "3020454",
              "profit": "35k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "辰晨程",
              "avatar": "https://img1.famulei.com/z/3020454/p/173/0610130231154_100x100.png",
              "type": "",
              "is_girl": "",
              "win_times": 160,
              "total_times": "448",
              "win_num": "35%",
              "record_ratio": "160/448"
            },
            {
              "position": "25",
              "member_id": "1047109",
              "profit": "35k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "strage",
              "avatar": "https://img1.famulei.com/m/1047109/p/168/2514264345991_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 43,
              "total_times": "56",
              "win_num": "76%",
              "record_ratio": "43/56"
            },
            {
              "position": "26",
              "member_id": "6156455",
              "profit": "35k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "团团jason",
              "avatar": "https://img1.famulei.com/z/6156455/p/186/1116051049426_100x100.png",
              "type": "",
              "is_girl": "",
              "win_times": 58,
              "total_times": "112",
              "win_num": "51%",
              "record_ratio": "58/112"
            },
            {
              "position": "27",
              "member_id": "2793756",
              "profit": "33k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "林子君",
              "avatar": "",
              "type": "",
              "is_girl": "",
              "win_times": 299,
              "total_times": "582",
              "win_num": "51%",
              "record_ratio": "299/582"
            },
            {
              "position": "28",
              "member_id": "2954039",
              "profit": "32k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "李哥哥丶",
              "avatar": "https://img1.famulei.com/z/2954039/p/185/3105364725447_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 111,
              "total_times": "211",
              "win_num": "52%",
              "record_ratio": "111/211"
            },
            {
              "position": "29",
              "member_id": "3052831",
              "profit": "32k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "王财运",
              "avatar": "https://img1.famulei.com/z/3052831/p/173/2710123782312_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 96,
              "total_times": "289",
              "win_num": "33%",
              "record_ratio": "96/289"
            },
            {
              "position": "30",
              "member_id": "5614323",
              "profit": "31k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "农妇三拳",
              "avatar": "https://img1.famulei.com/z/5614323/p/185/2219062843402_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 33,
              "total_times": "71",
              "win_num": "46%",
              "record_ratio": "33/71"
            },
            {
              "position": "31",
              "member_id": "2975648",
              "profit": "30k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "Cc你是阳光",
              "avatar": "https://img1.famulei.com/z/2975648/p/185/3009062222737_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 69,
              "total_times": "190",
              "win_num": "36%",
              "record_ratio": "69/190"
            },
            {
              "position": "32",
              "member_id": "2796940",
              "profit": "30k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "拥有CARRY的心",
              "avatar": "https://img1.famulei.com/m/2796940/p/1611/2719504757151_90x90.png",
              "type": "",
              "is_girl": "",
              "win_times": 94,
              "total_times": "209",
              "win_num": "44%",
              "record_ratio": "94/209"
            },
            {
              "position": "33",
              "member_id": "1910414",
              "profit": "29k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "只待蓦然回首",
              "avatar": "https://img.famulei.com/member/1910414/picture/15/12/30/2015123019070760434_100x100.png",
              "type": "",
              "is_girl": "",
              "win_times": 195,
              "total_times": "368",
              "win_num": "52%",
              "record_ratio": "195/368"
            },
            {
              "position": "34",
              "member_id": "2513100",
              "profit": "29k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "前所未有的凌",
              "avatar": "https://img1.famulei.com/z/2513100/p/182/1311362180871_90x90.png",
              "type": "",
              "is_girl": "",
              "win_times": 89,
              "total_times": "205",
              "win_num": "43%",
              "record_ratio": "89/205"
            },
            {
              "position": "35",
              "member_id": "952709",
              "profit": "29k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "少夫白杰",
              "avatar": "https://img.famulei.com/member/952709/picture/15/9/28/2015092818181324260_100x100.png",
              "type": "",
              "is_girl": "",
              "win_times": 220,
              "total_times": "453",
              "win_num": "48%",
              "record_ratio": "220/453"
            },
            {
              "position": "36",
              "member_id": "5580740",
              "profit": "28k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "兮夜的旺仔牛奶",
              "avatar": "https://img1.famulei.com/m/5580740/p/176/2310371911690_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 367,
              "total_times": "670",
              "win_num": "54%",
              "record_ratio": "367/670"
            },
            {
              "position": "37",
              "member_id": "2615579",
              "profit": "28k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "熊本菠菜王",
              "avatar": "https://img1.famulei.com/m/2615579/p/167/0607555430823_100x100.png",
              "type": "",
              "is_girl": "",
              "win_times": 60,
              "total_times": "97",
              "win_num": "61%",
              "record_ratio": "60/97"
            },
            {
              "position": "38",
              "member_id": "2553360",
              "profit": "28k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "之犬",
              "avatar": "https://img1.famulei.com/z/2553360/p/169/0222131931930_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 49,
              "total_times": "81",
              "win_num": "60%",
              "record_ratio": "49/81"
            },
            {
              "position": "39",
              "member_id": "2961215",
              "profit": "27k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "锦go绣",
              "avatar": "https://img1.famulei.com/z/2961215/p/185/2522465887949_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 41,
              "total_times": "114",
              "win_num": "35%",
              "record_ratio": "41/114"
            },
            {
              "position": "40",
              "member_id": "554377",
              "profit": "27k",
              "period": "2016-01-05-2019-04-29",
              "nickname": "撸龄30年",
              "avatar": "https://img1.famulei.com/z/554377/p/193/2713574385443_100x100.jpg",
              "type": "",
              "is_girl": "",
              "win_times": 259,
              "total_times": "477",
              "win_num": "54%",
              "record_ratio": "259/477"
            }
          ]

          this.week.data.list = weekList
          this.month.data.list = monthList
          this.total.data.list = totalList


          // 异步数据
          // for (let i in types) {
          //   this.requestRankList(types[i])
          // }
        }
      },
      async requestRankList (type) {
        this[type].loading = true
        console.log(type);
        let params = {
          limit: 20,
          page: 1,
        }


        // let res = await this.$api.bet.getBetRankList({ params: {type: type, limit: 100, page: this[type].page} })
        // console.log(res)

        // if (res.code == 200) {
        //   let list = res.data.list
        //   for (let i in list) {
        //     this[type].data.list.push(list[i])
        //   }
        //
        //   if (!this[type].data.period) {
        //     this[type].data.period = res.data.period
        //     this[type].data.update = res.data.update
        //     // this[type].data.me = res.data.me
        //   }
        //   this[type].lastCount = list.length
        //   this[type].loading = false
        // }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .layout-default .page-content .page-main {
    max-width: 1200px;
    width: 100%;
    zoom: 1;
    margin: 20px auto 20px;
    padding: 0;
  }

  .bet-ranking {
    .container {
      overflow hidden
      display block
    }
    .rank-list {
      float left
      box-shadow 0 0 16px rgba(0, 0, 0, 0.1)

      + .rank-list {
        margin-left 12px
      }
    }

    .remark {
      text-align center
      font-size: 14px;
      color: #A5A8B2;
      margin-top 12px
    }
  }
  @media screen and (max-width: 768px) {
    .bet-ranking {
      .rank-list {
        + .rank-list {
          margin-left 0
          margin-top 12px
        }
      }
    }
  }
</style>
