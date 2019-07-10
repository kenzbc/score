<template>
  <div>

    <nuxt-link class="my-button" to="/"><div class="my-button">{{$t('links.home')}}</div></nuxt-link><br>
    <nuxt-link to="/iview"><div class="my-button">iview</div></nuxt-link>
    <br>

    <div>
      <div class="prim">iView</div>
      <i-button type="primary" @click="show">Click me!</i-button>
      <Modal v-model="visible" class="-color-primary" title="Welcome">Welcome to iView</Modal>
    </div><br>

    <div>
      <Slider v-model="value1"></Slider>
      <Slider v-model="value2" range></Slider>
      <Slider v-model="value3" range disabled></Slider>
    </div><br>

    <div style="width:300px;">
      <Cascader :data="addressData" v-model="addressValue"></Cascader>
      {{addressValue}}
    </div><br>

    <div>
      <Col class="demo-spin-col" span="8">
        <Spin fix>
          <div class="loader">
            <svg class="circular" viewBox="25 25 50 50">
              <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
            </svg>
          </div>
        </Spin>
      </Col>
    </div><br>

    <div>
      <Button @click="drawerLeft = true" type="primary">Open Left Drawer</Button>
      <Drawer title="左侧抽屉" placement="left" :closable="false" v-model="drawerLeft">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>

      <Button @click="drawerRight = true" type="primary">Open Right Drawer</Button>
      <Drawer width="720" title="右侧抽屉" :closable="false" :styles="styles" v-model="drawerRight">
        <Form :model="formData">
          <Row :gutter="32">
            <Col span="12">
              <FormItem label="Name" label-position="top">
                <Input v-model="formData.name" placeholder="please enter user name" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="Url" label-position="top">
                <Input v-model="formData.url" placeholder="please enter url">
                  <span slot="prepend">http://</span>
                  <span slot="append">.com</span>
                </Input>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="12">
              <FormItem label="Owner" label-position="top">
                <Select v-model="formData.owner" placeholder="please select an owner">
                  <Option value="jobs">Steven Paul Jobs</Option>
                  <Option value="ive">Sir Jonathan Paul Ive</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="Type" label-position="top">
                <Select v-model="formData.type" placeholder="please choose the type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="12">
              <FormItem label="Approver" label-position="top">
                <Select v-model="formData.approver" placeholder="please choose the approver">
                  <Option value="jobs">Steven Paul Jobs</Option>
                  <Option value="ive">Sir Jonathan Paul Ive</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="DateTime" label-position="top">
                <DatePicker v-model="formData.date" type="daterange" placeholder="please select the date" style="display: block" placement="bottom-end"></DatePicker>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="Description" label-position="top">
            <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="please enter the description" />
          </FormItem>
        </Form>
        <div class="demo-drawer-footer">
          <Button style="margin-right: 8px" @click="drawerRight = false">Cancel</Button>
          <Button type="primary" @click="drawerRight = false">Submit</Button>
        </div>
      </Drawer>
    </div><br>

    <div>
      <i-circle :percent="80">
        <span class="demo-Circle-inner" style="font-size:24px">80%</span>
      </i-circle>
      <i-circle :percent="100" stroke-color="#5cb85c">
        <Icon type="ios-checkmark" size="60" style="color:#5cb85c"></Icon>
      </i-circle>
      <i-circle :percent="35" stroke-color="#ff5500">
        <span class="demo-Circle-inner">
            <Icon type="ios-close" size="50" style="color:#ff5500"></Icon>
        </span>
      </i-circle>
      <i-circle :percent="80" dashboard>
        <span class="demo-Circle-inner" style="font-size:24px">80%</span>
      </i-circle>
      <circle-color
        :size="175"
        :percent="80"
        :stroke-width="8"
        :trail-width="5"
        :stroke-color="['#B848FF','#5348FF']"
        trail-color="#c5c1ff">
        <span style="font-size:36px;color:#5B579A;font-family:Industry-Demi;font-weight:600;">80%</span>
        <span style="font-size:24px;color:#B2B0D2;font-family:PingFangSC-Semibold;font-weight:600;">胜率</span>
      </circle-color>
    </div><br>

    <input v-focus type="text"><br>

    <i-button @click="modal7 = true">禁用右上角关闭（含Esc键）</i-button>
    <Modal
      title="对话框标题"
      v-model="modal7"
      :closable="false">
      <p>对话框内容</p>
      <p>对话框内容</p>
      <p>对话框内容</p>
    </Modal>

  </div>
</template>

<script>
  import circleColor from '~/components/tools/charts/circle-color.vue'
export default {
  name: "",
  components: {
    circleColor
  },
  data() {
    return {
      middleware: 'auth',
      visible: false,
      value1: 25,
      value2: [20, 50],
      value3: [20, 50],
      addressValue: ['jiangsu', 'suzhou', 'zhuozhengyuan'],
      addressData: [{
        value: 'beijing',
        label: '北京',
        children: [
          {value: 'gugong', label: '故宫'},
          {value: 'tiantan', label: '天坛'},
          {value: 'wangfujing', label: '王府井'}
        ]
      }, {
        value: 'jiangsu',
        label: '江苏',
        children: [
          {
            value: 'nanjing',
            label: '南京',
            children: [
              {value: 'fuzimiao', label: '夫子庙',}
            ]
          },
          {
            value: 'suzhou',
            label: '苏州',
            children: [
              {value: 'zhuozhengyuan', label: '拙政园',},
              {value: 'shizilin', label: '狮子林',}
            ]
          }
        ],
      }],

      drawerLeft:false,
      drawerRight:false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      formData: {
        name: '',
        url: '',
        owner: '',
        type: '',
        approver: '',
        date: '',
        desc: ''
      },
      modal7: false,
    }
  },
  async asyncData({app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
    /*
    let res = await ({
      method: 'get',
      url: `/apiUrl.do?id=parameters`
    })
    return {
      dataList:res.data.list,
    }
    */
  }
  ,
  fetch() {
    // 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。
  }
  ,
  head: {
    // 配置当前页面的 Meta 标签
  }
  ,
  mounted() {
    console.log('iview mounted store');
    console.log('iview mounted title='+this.$store.app.head.title);
    console.log('iview mounted store.f_token='+this.$store.state.f_token);
    console.log(this.$store);
  }
  ,
  methods: {
    show: function () {
      this.visible = true;
    }
  }
  ,
  destroyed() {
  }
}
</script>

<style lang="stylus" scoped>
  @font-face{
    font-family:'Industry-Demi';
    src:url("https://www.famulei.com/css/font/Industry-Demi.woff") format('woff'),
    url("https://www.famulei.com/css/font/Industry-Demi.otf") format('truetype');
  }
  .demo-Circle-inner{
    font-family: 'Industry-Demi';
  }
  .demo-Circle-custom{
    & h1{
      color: #3f414d;
      font-size: 28px;
      font-weight: normal;
    }
    & p{
      color: #657180;
      font-size: 14px;
      margin: 10px 0 15px;
    }
    & span{
      display: block;
      padding-top: 15px;
      color: #657180;
      font-size: 14px;
      &:before{
        content: '';
        display: block;
        width: 50px;
        height: 1px;
        margin: 0 auto;
        background: #e0e3e6;
        position: relative;
        top: -15px;
      };
    }
    & span i{
      font-style: normal;
      color: #3f414d;
    }
  }
</style>
