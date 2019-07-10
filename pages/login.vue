<template>
  <div class="score-login" id="login_component">
    <div class="login_logo fll">
        <div class="login_logo_bg"></div>
        <div class="login_logo_main">
            <h1>陪你做电竞的记录者</h1>
            <p>We do esports seriously</p>
        </div>
    </div>
    <div class="sign login_score flr">
        <div class="form">
            <div class="head">
                <img src="/static/images/score.png" class="score_logo">
                <!--<a href="javascript:" class="sign_close" onclick="closeSign();"><i class="iconfont icon-iconx"></i></a>-->
            </div>
            <div class="wrap">
                <form class="login-form" :model="formItem">
                    <div class="country-code" data-area_code="86">
                      <div class="input-box left">
                          <i class="iconfont icon-earth"></i>
                        <input type="text">
                      </div>

                      <div class="input-box right">
                          <input type="text" name="code" readonly maxlength="30" :value="countryKey=='中国' ? '+86' : '+'+countryKey" />
                      </div>
                      <Select v-model="countryKey" :placeholder="currentCity" style="width:160px;height:34px;margin-left:60px;">
                        <Option v-for="item in countryList" :key="item.country" :value="item.area_code" :label="item.country">
                          <span>{{ item.country }}</span>
                        </Option>
                      </Select>
                    </div>
                    <div class="input-box">
                        <i class="iconfont icon-shouji-"></i><input type="text" name="username" v-model="formItem.username" placeholder="请输入您的用户名..." maxlength="30" />
                    </div>
                    <div class="input-box">
                        <i class="iconfont icon-password"></i>
                        <input type="password" name="password" id="loginPassword" v-model="formItem.password" placeholder="请输入您的密码..." maxlength="20" />
                        <i class="login_icon_eye iconfont icon-login__eyes_closed"></i>
                    </div>
                    <div class="input-box">
                      <no-captcha :width="320" :height="40" :isReset="isResetCaptcha" @captchaCallback="captchaCallback($event)"></no-captcha>
                    </div>
                    <p class="ext">
                        <span class="gray_3">没有账号？<a href="/register">{{$t('global.register')}}</a></span>
                        <a href="/password" class="gray_3 flr">忘记密码？</a>
                    </p>
                    <button class="submit-btn" type="button"><span class="sign-type">{{$t('global.login')}}</span></button>
                    <a href="https://img1.famulei.com/download/index.html" target="_blank" class="score_login_download">下载 Score App</a>
                    <div class="score_login_ptlogin">
                        <div class="title gray_3">合作平台登录</div>
                        <ul class="ptlogin_list">
                            <li data-language="1">
                                <a href="/services/weibo/login.php" class="link-btn">
                                    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-weibo1"></use></svg>
                                </a>
                            </li>
                            <li data-language="1">
                                <a href="/services/qq/login.php" class="link-btn">
                                    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-qq1"></use></svg>
                                </a>
                            </li>
                            <li data-language="1,2,3">
                                <a href="/services/weixin/login.php" class="link-btn">
                                    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-wechat1"></use></svg>
                                </a>
                            </li>
                            <li data-language="2,3" class="hide">
                                <a href="https://pass.famulei.com/google_login.php?redirect_url=/index" class="link-btn">
                                    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-google"></use></svg>
                                </a>
                            </li>
                            <li data-language="2,3" class="hide">
                                <a href="https://pass.famulei.com/reddit_login.php?redirect_url=/index" class="link-btn">
                                    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-reddit"></use></svg>
                                </a>
                            </li>
                            <li data-language="2,3" class="hide">
                                <a href="https://pass.famulei.com/instagram_login.php?redirect_url=/index" class="link-btn">
                                    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-instagram"></use></svg>
                                </a>
                            </li>
                            <li data-language="2,3" class="hide">
                                <a href="https://pass.famulei.com/facebook_login.php?redirect_url=/index" class="link-btn">
                                    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-facebook"></use></svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    </div>

  </div>
</template>


<script>
  import Cookie from 'js-cookie' //npm install js-cookie --save
  import noCaptcha from '~/components/common/no-captcha.vue'

  export default {
    layout: 'layout-simple',
    name: "",
    components: {
        noCaptcha
    },
    data() {
      return {
        currentCity:'中国',
        countryKey:'86',
        countryList:[],

        isResetCaptcha:false,
        formItem: {
          username: '',
          password: '',
        },
        headers:'',
        redirectURL:'/'
      }
    },
    async asyncData({app, route})
    {

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
    },
    fetch() {
      // 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。
    },
    watch:{
      countryKey(newVal, oldVal){
        // this.currentCity;
        this.countryList.forEach((item)=>{
          if(newVal == item.area_code){
            this.currentCity = item.country;
          }
        });
      }
    },
    mounted() {
      let rediretUrl = this.$route.query.ref;
      if (rediretUrl){
        this.redirectURL = rediretUrl;
      }

      this.getCountryList();
    },
    methods: {
      /**
       * 获取国家区号
       * @returns {Promise<void>}
       */
      async getCountryList(){
        let countryCode = await this.$api.member.getCountryCode();
        this.countryList = countryCode.data;
      },
      /**
       * 阿里滑块验证callback
       * @param e
       */
      captchaCallback(e){
        this.csessionid = e.csessionid;
        this.token = e.token;
        this.scene = e.scene;
        this.sig = e.sig;

        this.loginSubmit();
      },
      async loginSubmit(){
        let _this = this;
        console.log(`login username=${this.formItem.username},password=${this.formItem.password}`)

        if (!_this.csessionid || !_this.scene || !_this.sig || !_this.token) {
          this.$Message.warning('请先滑动验证');
          return false;
        }

        if(_this.formItem.username == '' && _this.formItem.password == ''){
          this.$Message.warning('用户名或密码不能为空~');
          return false;
        }

        if(_this.countryKey == "中国"){
          _this.countryKey = 86;
        }

        let params = {
          // api_version: '5.2.0',
          // platform: 'ios',
          area_code:_this.countryKey,
          username:_this.formItem.username,
          password:_this.formItem.password,
          phone_type:1,
        }




        let res = await this.$api.member.getLogin({params});
        if (res.code == '200'){
          this.$Message.success('登录成功!');

          this.$setLogin(res.data);

          //返回上一页
          this.$router.push({
            path: _this.redirectURL
          });

        }else{
          this.isResetCaptcha = true;
          this.$Message.info(res.message);
          setTimeout(()=>{
            this.isResetCaptcha = false;
          },500)
        }


      },
      changeMenu(name) {
        console.log(name)

      }
    }
    ,
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .content-layout {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    height: 600px;
    z-index: 2;
  }


  .score-login{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left:0;
    z-index 100;
  }

  .sign {
    display: none;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(0, 0, 0, .7);
  }

  .sign .form {
    width: 390px;
    /*height: 500px;*/
    background-color: #fff;
    border-radius: 8px;
    top: 50%;
    left: 50%;
    margin-left: -195px;
    margin-top: -250px;
    position: fixed;
    z-index: 101;
    overflow: hidden;
  }
  .sign .form .head {
    text-align: center;
    position: relative;
    padding: 28px 0 20px 0;
  }
  .sign .form .head .sign_close{
    width: 35px;
    height: 35px;
    line-height: 32px;
    color: #fff;
    background-color: #0D8DFC;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .sign .form .head .score_logo{
    width: 150px;
  }

  .sign .form .wrap {
    box-sizing: border-box;
    padding: 0px 35px;
    display: table;
    width: 100%;
  }

  .sign .form .wrap > div {
    display: table-cell;
    vertical-align: top;
  }
  .login-form .input-box {
    display: table;
    width: 320px;
    height: 40px;
    border-bottom: 1px solid #EBEBED;
    margin-bottom: 15px;
    position: relative;
  }
  .login-form .input-box input {
    display: table-cell;
    width: 100%;
    height: 40px;
    font-size: 14px;
    background-color: transparent;
    padding: 0 14px;
  }
  .login-form .input-box input[type=password]{
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 1px;
  }
  .login-form .input-box input::-webkit-input-placeholder{
    font-size: 14px;
    font-weight: normal;
    color:#A8ABB3;
  }
  .login-form .input-box .iconfont {
    display: table-cell;
    color: #656973;
    font-size: 16px;
    font-weight: normal;
    vertical-align: middle;
    width: 40px;
    text-align: center;
    position: relative;
  }
  .login-form .input-box span.form_icon {
    display: table-cell;
    font-size: 14px;
    font-weight: normal;
    vertical-align: middle;
    width: 60px;
    text-align: center;
    position: relative;
  }
  .login-form .country-code .left .icon-icon4{
    width: 20px;
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
  }
  .login-form .input-box .iconfont:after,.login-form .input-box span.form_icon:after{
    content: "";
    width: 1px;
    height: 14px;
    background: #EBEBED;
    position: absolute;
    right: 0px;
    top: 13px;
  }
  .country-code .input-box .iconfont:after,.login-form .country-code .left .icon-icon4:after,.login-form .input-box .iconfont.login_icon_eye:after{
    display: none;
  }
  .login-form .input-box .iconfont.login_icon_eye{
    color: #A8ABB3;
    cursor: pointer;
  }
  .login-form .country-code .left input{
    cursor: pointer;
    background-color: transparent;
    text-align: center;
    padding: 0 10px 0 0;
    margin-top: -3px;
  }
  .login-form .country-code .right{
    position: absolute;
    top:0;
    right:0;
    width: 90px;
    border-bottom: 1px solid #F2F2F2;
    background: transparent;
    border-radius:inherit;
    left: inherit;
  }
  .login-form .country-code .right input{
    text-align: center;
    background: transparent;
  }
  .login-form .input-box .verify-image {
    width: 66px;
    height: 22px;
    cursor: pointer;
    position: absolute;
    right: 8px;
    top: 10px;
  }
  .login-form .ext {
    line-height: 28px;
    font-size: 14px;
    margin-bottom: 18px;
    padding: 0 8px;
  }
  .login-form .ext span a {
    color: #0D8DFC;
  }
  .sign .form .wrap .login-form .submit-btn {
    display: block;
    width: 100%;
    height: 40px;
    text-align: center;
    color: #fff;
    background-color: #0D8DFC;
    border-radius: 20px;
    border: none;
    outline: none;
    /*letter-spacing: 4px;*/
    transition: all 0.3s;
    -webkit-transition: all 0.3s;
    -transition: all 0.3s;
    -ms-transition: all 0.3s;
    -moz-transition: all 0.3s;
    cursor: pointer;
    margin-bottom: 28px;
  }
  .sign .form .wrap .login-form .submit-btn:hover{
    background-color: #077EE6;
  }
  .sign .form .wrap .login-form .submit-btn[disabled] {
    color: #A8ABB3;
    background-color: #F0F1F2;
  }
  .sign .form .footer{
    height: 56px;
    background: #FAFAFA;
    padding: 16px 30px;
  }
  .sign .form .footer .ptlogin .title{
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    cursor: pointer;
  }

  .sign .form .footer .ptlogin ul.ptlogin_list{
    display: none;
  }

  .sign .form .footer .ptlogin ul li{
    margin-right: 14px;
    float: left;
  }
  .sign .form .footer .ptlogin ul li a{
    display: block;
    width: 24px;
    height: 24px;
  }
  .sign .form .footer .ptlogin ul li a .icon{
    width: 24px;
    height: 24px;
    opacity: 0.85;
  }
  .sign .form .footer .ptlogin ul li a:hover .icon{
    opacity: 1;
  }
  .sign .form .footer a.flr{
    line-height: 24px;
    font-size: 14px;
    color: #0D8DFC;
  }





  .sign .sign-type {
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
  }


  .sign.show {
    display: block;
  }

  .sign input {
    outline: none;
  }
  .login-form .country-code{
    height:60px;
    cursor: pointer;
    position: relative;
  }
  .login-form .country-code .left{
    position: absolute;
    top:0;
    left:0;
    width: 210px;
    border-bottom: 1px solid #F2F2F2;
    background: transparent;
    border-radius:inherit;
    left:inherit;
    clip:inherit;
  }



  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }
  /*score登录*/
  .score_login{
    /*height: 974px;*/
  }
  .login_logo{
    width: 50%;
    height: 100%;
    background: url("/static/images/login_bg.jpg") center center no-repeat;
    background-size: auto 135%;
    position: relative;
  }
  .login_logo .login_logo_bg{
    content: '';
    width:0;
    height:0;
    border-top:1px solid transparent;
    border-bottom:0px solid transparent;
    border-right:1px solid #fff;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .login_logo_main{
    text-align: center;
    color: #FFFFFF;
    position: absolute;
    left: 42%;
    top: 50%;
    margin-left: -135px;
    margin-top: -28px;
  }
  .login_logo_main h1{
    font-weight: normal;
    font-size: 20px;
    letter-spacing: 10px;
    margin-bottom: 20px;
  }
  .login_logo_main p{
    font-size: 16px;
    opacity: 0.7;
  }
  .sign.login_score{
    display: block;
    width: 50%;
    height: 100%;
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    background-color: #fff;
  }
  .sign.login_score .form{
    width: 390px;
    background-color: #fff;
    border-radius: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 101;
    overflow: hidden;
    margin-left: -195px;
    margin-top: -280px;
  }
  .sign.login_score .form .wrap .login-form .submit-btn{
    margin-bottom: 14px;
  }
  .score_login_download{
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: 700;
    color: #0D8DFC;
    background-color: #fff;
    border: 1px solid #0D8DFC;
    border-radius: 24px;
    margin-bottom: 20px;
  }
  .score_login_download:hover{
    background: #EDF7FF;
  }
  .score_login_ptlogin{
    /*width: 220px;*/
    margin: 0 auto;
  }
  .score_login_ptlogin .title{
    line-height: 24px;
    text-align: center;
    position: relative;
  }
  .score_login_ptlogin .title:before{
    content: '';
    width: 60px;
    height: 1px;
    background-color: #EBEBED;
    position: absolute;
    left: 0px;
    top: 50%;
  }
  .score_login_ptlogin .title:after{
    content: '';
    width: 60px;
    height: 1px;
    background-color: #EBEBED;
    position: absolute;
    right: 0px;
    top: 50%;
  }
  .score_login_ptlogin .ptlogin_list{
    text-align: center;
    padding-top: 18px;
  }
  .score_login_ptlogin .ptlogin_list li{
    display: inline-block;
  }
  .score_login_ptlogin .ptlogin_list li.hide{
    display: none;
  }
  .score_login_ptlogin .ptlogin_list li a{
    display: block;
    width: 36px;
    height: 36px;
    position: relative;
    margin: 0 12px;
  }
  .score_login_ptlogin .ptlogin_list li a:hover:before{
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0,0,0,0.15);
  }
  .score_login_ptlogin .ptlogin_list li a .icon{
    width: 36px;
    height: 36px;
  }

  /*国家区号弹窗样式*/
  .country-all{
    width: 210px;
    height:228px;
    min-height:300px;
    background: #fff;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px 0 rgba(0,0,0,0.08);
    border-radius: 4px;
    position: absolute;
    top:40px;
    left:0;
    z-index:9;
    transition-duration: .3s;
    padding:5px;
    overflow-y: auto;
  }
  .country-all li{
    line-height:36px;
    padding:0 20px;
    font-size:14px;
    text-align: left;
    color:#2D2F33;
    border-radius: 8px;
  }
  .country-all li:hover{
    color: #fff;
    background: #0D8DFC;
  }
  .country-all li.active{
    background: #F0F1F2;
  }
  .country-all li span{
    display: inline-block;
    max-width: 112px;
    height: 36px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #login_component >>> {
    .ivu-select > {
      .ivu-select-selection {
        background-color transparent;
      }
    }
  }


  @media screen and (max-width: 767px) {
    .sign.login_score .form{
      left:0;
    }
  }

</style>
