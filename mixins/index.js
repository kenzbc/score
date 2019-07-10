// mixins/index.js
let mixin={
  data(){
    return{
      userInfo:''
    };
  },
  mounted() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  },
  methods: {
    /**
     * SEO优化
     * @param title 必传
     * @param keywords 必传
     * @param description 必传
     * @param payload 其他的 meta 标签通过 payload 注入，其中，每个 meta 的 hid 需要是唯一的。
     * @returns {{title: *, meta: *[]}}
     */
    $seo(title, keywords, description, payload = []) {
      var title = title || 'Score-陪你做电竞的记录者,伐木累_最宠粉的电竞幻联赛社区！';
      var keywords = keywords || '赛高,Score,电竞,玩家赛事,社区,LOL,英雄联盟,pubg,绝地求生,赛事视频,文字直播,韩服战绩查询';
      var description = description || 'Score,用数据诠释赛事,用专业阐述观点,为热爱电竞的你提供最专业、快速、全面的赛事服务,无论你是喜欢电竞资讯还是赛事数据,当你打开Score会发现,这里就是电竞硬核玩家的乐园。';

      return {
        title,
        meta: [
          {
            hid: 'keywords',
            name: 'keywords',
            keywords
          },
          {
            hid: 'description',
            name: 'description',
            description
          }
        ].concat(payload)
      }
    }
  }
};


export default mixin;
