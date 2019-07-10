<template>
  <div id="login_component" class="login sign" v-if="loginModalShow">

    <div class="form">
      <div class="head">
        <img src="https://dev.famulei.com/images/index/score.png" class="score_logo">
        <a href="javascript:" class="sign_close" @click="closeLoginModal();"><i class="iconfont icon-iconx"></i></a>
      </div>
      <div class="wrap">
        <form class="login-form" @keyup.enter.native="loginSubmit()" :model="formItem">
          <div class="country-code">
            <div class="input-box left" >
              <i class="iconfont icon-earth"></i>
              <input type="text" name="country" readonly />
              <i class="iconfont icon-icon4"></i>
            </div>
            <div class="input-box right">
              <input type="text" name="code" :value="countryKey=='中国' ? '+86' : '+'+countryKey" readonly maxlength="30" />
            </div>
            <Select class="country-list" v-model="countryKey" :placeholder="currentCity" style="border:1px solid transparent">
              <Option v-for="item in countryList" :key="item.country" :value="item.area_code">{{ item.country }}</Option>
            </Select>
          </div>
          <div class="h5_dialog" style="display: none">
            <ul class="country-all" >

            </ul>
          </div>
          <div class="input-box">
            <i class="iconfont icon-shouji-"></i>
            <input type="text" name="username" v-model="formItem.username" placeholder="请输入您的用户名..." maxlength="30" />
          </div>
          <div class="input-box">
            <i class="iconfont icon-password"></i>
            <input :type="isShowPassword==true ? 'text' : 'password'" name="password" id="loginPassword"  v-model="formItem.password" placeholder="请输入您的密码..." maxlength="20" />
            <i class="login_icon_eye iconfont icon-login__eyes_open" v-if="isShowPassword==true" @click="isShowPassword=!isShowPassword"></i>
            <i class="login_icon_eye iconfont icon-login__eyes_closed" v-else @click="isShowPassword=!isShowPassword"></i>
          </div>
          <div class="input-box">
            <!--<i class="iconfont icon-verification"></i><input class="verify" type="text" name="img_code" maxlength="4" placeholder="{{=score.languagePackage.currPackage['VerificationCode']}}" /><img class="verify-image" src="" onclick="setImageCode(this)"/>-->
            <no-captcha :width="320" :height="40" :isReset="isResetCaptcha" @captchaCallback="captchaCallback($event)"></no-captcha>
          </div>
          <p class="ext">
            <span class="gray_3">没有账号？<a href="javascript:signEvent('register');">点击注册</a></span>
            <a href="/password" class="gray_3 f-right">忘记密码</a>
          </p>
          <button class="submit-btn" type="button" @click="loginSubmit()"><span class="sign-type">{{$t('global.login')}}</span></button>
        </form>

      </div>
      <div class="footer cl">
        <div class="ptlogin f-left">
          <p class="title gray_3" v-show="isOtherLoginType == false" @click="isOtherLoginType = true">合作平台登录</p>
          <ul class="ptlogin_list" v-show="isOtherLoginType == true">
            <li class="hide">
              <a href="/services/weibo/l.sign .form .footer .ptlogin ul.ptlogin_listogin.php" class="link-btn">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-weibo1"></use></svg>
              </a>
            </li>
            <li class="hide">
              <a href="/services/qq/login.php" class="link-btn">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-qq1"></use></svg>
              </a>
            </li>
            <li class="hide">
              <a href="/services/weixin/login.php" class="link-btn">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-wechat1"></use></svg>
              </a>
            </li>
            <li class="hide none">
              <a href="https://pass.famulei.com/google_login.php?redirect_url=/index" class="link-btn">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-google"></use></svg>
              </a>
            </li>
            <li class="hide none">
              <a href="https://pass.famulei.com/reddit_login.php?redirect_url=/index" class="link-btn">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-reddit"></use></svg>
              </a>
            </li>
            <li class="hide none">
              <a href="https://pass.famulei.com/instagram_login.php?redirect_url=/index" class="link-btn">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-instagram"></use></svg>
              </a>
            </li>
            <li class="hide none">
              <a href="https://pass.famulei.com/facebook_login.php?redirect_url=/index" class="link-btn">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-facebook"></use></svg>
              </a>
            </li>
          </ul>
        </div>
        <a href="https://img1.famulei.com/download/index.html" target="_blank" class="flr"> Score App »</a>
      </div>
    </div>
  </div>
</template>

<script>
  import noCaptcha from '~/components/common/no-captcha.vue'
  import {jsonUtils} from '~/utils/cookie-utils'
  import Cookie from 'js-cookie'

  export default {
    name: "login",
    components: {
      noCaptcha
    },
    props:{
      loginModalShow:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentCity:'中国',
        countryKey:'86',
        countryList:[],

        formItem: {
          username: '',
          password: '',
        },
        isShowPassword:false,
        isOtherLoginType:false,
        isResetCaptcha:false,
      }
    },
    watch:{
      loginModalShow (newValue, oldValue) {
        if(newValue == true){
          this.getCountryList();
        }
      },
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
          area_code:_this.countryKey,
          username:_this.formItem.username,
          password:_this.formItem.password,
          phone_type:1,
        };


        let res = await this.$api.member.getLogin({params});
        if (res.code == '200'){
          this.$Message.success('登录成功!');
          this.$setLogin(res.data);
          this.closeLoginModal();

          if(process.client){
            //window.location.reload();
          }


        }else{
          this.isResetCaptcha = true;
          this.$Message.info(res.message);
          setTimeout(()=>{
            this.isResetCaptcha = false;
          },500)
        }

      },
      closeLoginModal(){
        this.$emit('closeLoginModal',true);
      }


    },
    destroyed() {
    }
  }
</script>

<style lang="stylus">
  .sign {
    /*display: none;*/
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
    color: #D2D4D9;
    /*background-color: #0D8DFC;*/
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .sign .form .head .sign_close .iconfont{
    font-size: 12px;
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

  .box.en .login-form .input-box span.form_icon {
    width: 84px;
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
    clip: inherit;
  }
  .login-form .country-code .right input{
    text-align: center;
    background: transparent;
  }
  .login-form .input-box .verify-image {
    width: 70px;
    /*height: 20px;*/
    cursor: pointer;
    position: absolute;
    right: 8px;
    top: 7px;
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
    display: flex;
    justify-content: space-between;
  }
  .sign .form .footer >>> a.flr {
    line-height: 24px;
    font-size: 13px;
    color: #0D8DFC;
  }
  .sign .form .footer .ptlogin .title{
    height: 24px;
    line-height: 24px;
    font-size: 13px;
    cursor: pointer;
  }

  .sign .form .footer .ptlogin ul.ptlogin_list{
    //display: none;
  }

  .sign .form .footer .ptlogin ul li{
    margin-right: 14px;
    float: left;
  }
  .sign .form .footer .ptlogin ul li a{
    display: block;
    width: 24px;
    height: 24px;
    position: relative;
  }
  .sign .form .footer .ptlogin_list li a:hover:before{
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0,0,0,0.15);
  }
  .sign .form .footer .ptlogin ul li a .icon{
    width: 24px;
    height: 24px;
  }
  .sign .form .footer a.flr{
    line-height: 24px;
    font-size: 13px;
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

  .nc-lang-cnt {
    padding-left: 35px;
  }




  .country-list{
    width: 160px;
    position: absolute;
    left: 50px;
    top: 5px;

    .ivu-select-selected-value{
      font-size:14px!important;
      color:#000;
    }
  }

  #login_component{
    .ivu-select {
      .ivu-select-selection {
        border: 0px solid transparent;
      }
    }
  }

</style>
