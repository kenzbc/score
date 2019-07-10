<template>
  <div id="page">

    <div class="register-wrap">
      <div class="box-main" :model="formItem">
        <div class="header">
          <!--<h2 class="title" id="score_reg_title">注册Score，与明星面对面</h2>-->
          <h2 class="title" id="score_reg_title">注册Score，与明星面对面</h2>
        </div>
        <div class="step cl">
          <div class="step_main">
            <div class="step_item" :class="{'active' : resisterStep == '1'}"><span class="step_num">1</span></div>
            <!--<i class="iconfont icon-queren"></i>--> </div>
          <div class="step_main">
            <div class="step_item" :class="{'active' : resisterStep == '2'}"><span class="step_num">2</span></div>
          </div>
          <div class="step_main">
            <div class="step_item" :class="{'active' : resisterStep == '3'}"><span class="step_num">3</span></div>
          </div>
        </div> <!--注册第1步 验证手机-->
        <div class="box" id="one" v-show="resisterStep == '1'">
          <div class="login-form score_reg_form">
            <div class="country-code">
              <div class="input-box left">
                <i class="iconfont icon-earth"></i>
                <Select class="country-list" v-model="countryKey" style="border:1px solid transparent">
                  <Option v-for="item in countryList" :key="item.country" :value="item.area_code">{{ item.country }}{{ item.area_code }}</Option>
                </Select>
              </div>
              <div class="input-box right"><input type="text" name="code" value="+86" readonly="" maxlength="30"></div>
              <ul class="country-all" style="display: none;"></ul>
            </div>
            <div class="h5_dialog" style="display: none">
              <ul class="country-all"></ul>
            </div>
            <div class="input-box">
              <i class="iconfont icon-shouji-"></i>
              <input type="text" id="mobile" name="username" v-model="formItem.username" placeholder="请输入手机号" maxlength="30">
            </div>
            <div class="input-box">
              <i class="iconfont icon-Register__pen"></i>
              <input class="verify" type="text" id="mark" name="mark" v-model="formItem.msgCode" maxlength="6" placeholder="请输入手机验证码">
              <div class="send-code-wrap">
                <a href="javascript:" id="getCode" class="send-code-btn" @click="getMsgCode()">获取验证码</a>
              </div>
            </div>
            <div class="input-box nc_slider">
              <no-captcha :width="320" :height="40" @captchaCallback="captchaCallback($event)"></no-captcha>
            </div>
            <div class="reg_user_rule gray_2">
              <!--<input type="checkbox" checked value="1">我已阅读并同意<a href="/user_rule" target="_blank">《用户协议》</a>-->
              <input type="checkbox" checked="" v-model="formItem.mark" id="awesome">
              <label for="awesome" class="agreement">
                <svg class="icon reg_checked" aria-hidden="true">
                  <use xlink:href="#icon-general_checkbox_on"></use>
                </svg>
                <svg class="icon reg_check" aria-hidden="true">
                  <use xlink:href="#icon-general_checkbox_off"></use>
                </svg>
                我已阅读并同意<a href="/user_rule" target="_blank">《用户协议》</a>
              </label>
            </div>
            <a href="javascript:" class="score_reg_btn" id="next" @click="regStep('2')">下一步</a>
            <p class="score_reg_login gray_3">已有账号？<a href="/login" target="_blank" style="margin-left: 2px;">点击登录</a>
            </p>
          </div>
        </div> <!--注册第2步 设置密码-->
        <div class="box" id="two" v-show="resisterStep == '2'">
          <div class="login-form score_reg_form">
            <div class="input-box">
              <i class="iconfont icon-password"></i>
              <input type="password" name="password" id="password" v-model="formItem.password" placeholder="请输入密码" maxlength="20">
              <i class="login_icon_eye iconfont icon-login__eyes_closed"></i>
            </div>
            <div class="input-box">
              <i class="iconfont icon-password"></i>
              <input type="password" name="rePassword" id="rePassword" v-model="formItem.rePassword" placeholder="请再输入一次密码"  maxlength="20">
              <!--<i class="login_icon_eye iconfont icon-login__eyes_closed"></i>-->
            </div>
            <a href="javascript:" class="score_reg_btn" @click="regStep('3')">下一步</a>
          </div>
        </div> <!--注册第3步 完善账户信息-->
        <div class="box" id="three" v-show="resisterStep == '3'">
          <div class="login-form score_reg_form">
            <div id="crop-avatar">
              <div class="avatar-view" title="" title="上传头像" @click="uploadAvatarModal = true">
                <img :src="formItem.image_url ? formItem.image_url : 'https://img1.famulei.com/static/31/images/new_index/tx_pic.jpg'" id="image_url">
              </div>
            </div>
            <div class="input-box">
              <span class="form_icon gray_2">昵称</span>
              <input type="text" id="nickname" name="nickname" v-model="formItem.nickname" placeholder="填写昵称（必填）" maxlength="10" value="">
            </div>
            <div class="input-box">
              <span class="form_icon gray_2">生日</span>
              <Col span="12">
                <DatePicker id="datePicker" type="date" placeholder="选择您的生日" style="width:260px;" @on-change="changeDate($event)"></DatePicker>
              </Col>
            </div>
            <div class="input-box">
              <span class="form_icon gray_2">性别</span>
              <a href="javascript:" class="sex-btn boy gray_3" :class="{'checked' : formItem.sex == '1'}" @click="formItem.sex = '1'">小哥哥
                <span>
                  <i class="iconfont icon-male1"></i>
                </span>
              </a>
              <a href="javascript:" class="sex-btn girl gray_3" :class="{'checked' : formItem.sex == '2'}" @click="formItem.sex = '2'">小姐姐
                <span>
                  <i class="iconfont icon-female1"></i>
                </span>
              </a>
            </div>
            <a href="javascript:" class="score_reg_btn" @click="finish();">完成注册</a>
          </div>
        </div>
      </div>
    </div>


    <Modal
      v-model="uploadAvatarModal"
      title="上传头像"
      width="360"
      :footer-hide='true'
      class="upload-avatar-modal">
      <input class="avatar-src" name="avatar_src" type="hidden">
      <input class="avatar-data" name="avatar_data" type="hidden">

      <div class="avatar">
        <div id="avatarWrapper" class="avatar-wrapper"><img id="image" src=""></div>
      </div>

      <div span="24" class="avatar-size">
        <div class="avatar-preview preview-lg">
          <img src="https://img1.famulei.com/static/31/images/new_index/tx_pic.jpg">
        </div>
        <div class="avatar-preview preview-md">
          <img src="https://img1.famulei.com/static/31/images/new_index/tx_pic.jpg">
        </div>
        <div class="avatar-preview preview-sm">
          <img src="https://img1.famulei.com/static/31/images/new_index/tx_pic.jpg">
        </div>
      </div>
      <div span="24" class="avatar-btns">
        <div>
          <div class="pull-left">
            <a href="javascript:;" class="btn btn-primary btn-block upload-btn not-hover">
              选择图片
              <input class="avatar-input" id="avatarInput" ref="avatarInput" name="Filedata" type="file" @change="selectPic">
            </a>
          </div>
        </div>
        <div>
          <button class="btn btn-success btn-block avatar-save" type="button" @click="saveAvatar()" disabled="disabled">
            保存设置
          </button>
        </div>
      </div>
    </Modal>

  </div>
</template>


<script>
  import noCaptcha from '~/components/common/no-captcha.vue'
  import modalMask from '~/components/modal/modal-mask.vue'


  export default {
    layout: 'page_layout',
    name: "register",
    components: {
      noCaptcha,
      modalMask
    },
    data() {
      return {
        uploadAvatarModal:false,
        countryList:[],
        countryKey:'中国',
        formItem: {
          nickname:'',
          image_url:'',
          username: '',
          password: '',
          rePassword:'',
          msgCode: '',
          mark: '0',
          sex: '1',
          year: '',
          month: '1',
          day: '1',
        },
        headers:'',
        redirectURL:'/',
        resisterNext:false,
        resisterStep:'1',
        defaultAvatar:''
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
    head: {

    },
    mounted() {
      if (process.client) {
        if(this.$store.state.f_token){
          window.location.href = '/';
        }
      }
      this.getCountryList();
    },
    methods: {
      //初始化头像裁剪
      initAvatarCropper(){
        var $image = $('#image');

        $image.cropper({
          aspectRatio: 1,
          // dragCrop: false,
          // dragMode: 'none',
          // autoCropArea: 1,
          // background: false,
          preview: '.avatar-preview',
          // scalable: false,
          // movable: false,
          // resizable: false,
          // mouseWheelZoom: false,
          // touchDragZoom: false,
          minContainerWidth: 328,  //容器的最小宽度
          minContainerHeight: 328,  //容器的最小高度
          minCanvasWidth: 0,  //canvas 的最小宽度（image wrapper）
          minCanvasHeight: 0,  //canvas 的最小高度（image wrapper）
          strict: false,
          // crop: function (data) {
          //   _this.$avatarDataX.val(data.x);
          //   _this.$avatarDataY.val(data.y);
          //   _this.$avatarDataWidth.val(data.width);
          //   _this.$avatarDataHeight.val(data.height);
          // }
          crop:function(event){
            console.log(event.width);
            console.log(event.height);
            console.log(event.rotate);
            console.log(event.scaleX);
            console.log(event.scaleY);
          }
        });
        var cropper = $image.data('cropper');
      },
      //选择图片文件后
      selectPic(e) {
        let _this = this;
        var reads = new FileReader();
        var f = document.getElementById('avatarInput').files[0];
        reads.readAsDataURL(f);
        reads.onload = function(e) {
          $(".avatar-save").removeAttr("disabled");
          $("#avatarWrapper").html('<img id="image" style="max-width:100%;" src="' + this.result + '">');
          _this.initAvatarCropper();
        };
      },
      //保存头像
      saveAvatar(){
        let _this = this;

        //console.log($('#image').cropper('getCroppedCanvas'));
        var cas = $('#image').cropper('getCroppedCanvas');
        //var base64url = cas.toDataURL('image/jpeg');

        cas.toBlob(function (e) {
          //console.log(e);  //生成Blob的图片格式
          var formdata = new FormData();
          formdata.append('uploadImage',e, "image.png");
          formdata.append('file_type',"picture");
          formdata.append('type',"2");
          _this.uploadAvatar(formdata);
        })
        //console.log(base64url); //生成base64图片的格式
        //$('.cavans').html(cas)  //在body显示出canvas元素
      },
      async uploadAvatar(formdata){
        let uploadRes = await this.$scoreApi.uploadImage(formdata);
        this.formItem.image_url = uploadRes.data[0].half_path;
        this.uploadAvatarModal = false;
      },
      /**
       * 获取国家区号
       * @returns {Promise<void>}
       */
      async getCountryList(){
        let countryCode = await this.$scoreApi.getCountryCode();
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
      },
      //选择生日
      changeDate(event){
        let dateArr = event.split('-');
        this.formItem.year = dateArr[0];
        this.formItem.month = dateArr[1];
        this.formItem.day = dateArr[2];
      },
      /**
       * 获取短信验证码
       * @returns {Promise<boolean>}
       */
      async getMsgCode(){
        let _this = this;
        if (!_this.csessionid || !_this.scene || !_this.sig || !_this.token) {
          this.$Message.warning('请先滑动验证');
          return false;
        }

        if(_this.formItem.username == ''){
          this.$Message.warning('请输入您的手机号~');
          return false;
        }

        if(_this.countryKey == "中国"){
          _this.countryKey = 86;
        }

        let params = {
          area_code: _this.countryKey,
          mobile: _this.formItem.username,
          op: 'send',
        };

        let isRegRes = await this.$scoreApi.getMobileIsRegister(params);
        if(isRegRes.code == '200'){
          let postMsgCodeRes = await this.$scoreApi.getMsgCode(params);
          this.$Message.success(postMsgCodeRes.message);
        }else{
          this.$Message.warning(isRegRes.message);
        }

      },
      //注册，下一步
      async regStep(step){
        let _this = this;
        //下一步验证短信验证码
        if(step == '2'){
          if(_this.formItem.username == ''){
            this.$Message.warning('请输入您的手机号~');
            return false;
          }
          if(_this.formItem.msgCode == ''){
            this.$Message.warning('请输入手机验证码~');
            return false;
          }
          if(_this.countryKey == "中国"){
            _this.countryKey = 86;
          }

          let params = {
            area_code: _this.countryKey,
            mobile: _this.formItem.username,
            op: 'check',
          };
          //判断验证码是否正确
          let verifyMsgCodeRes = await this.$scoreApi.getMsgCode(params);
          if(verifyMsgCodeRes.code != '200'){
            this.$Message.warning('您输入的验证码不正确~');
            return;
          }
          _this.resisterNext = true;
          _this.resisterStep = '2';
        }else if(step == '3' && this.resisterNext == true){
          //验证输入的密码是否合适
          if(_this.formItem.password == ''){
            this.$Message.warning('请输入密码~');
            return false;
          }
          if(_this.formItem.rePassword == ''){
            this.$Message.warning('请再次输入密码~');
            return false;
          }

          if(_this.formItem.password != _this.formItem.rePassword){
            this.$Message.warning('再次输入的密码不一致~');
            return false;
          }

          _this.resisterStep = '3';
        }

      },
      //完成注册
      async finish(){
        let _this = this;

        if(_this.countryKey == "中国"){
          _this.countryKey = 86;
        }

        console.log(_this.formItem)

        let params = {
          'area_code':_this.countryKey,
          'mobile':_this.formItem.username,
          'mark':_this.formItem.mark,
          'password':_this.formItem.password,
          'rePassword':_this.formItem.rePassword,
          'image_url': _this.formItem.image_url,
          'nickname': _this.formItem.nickname,
          'sex': _this.formItem.sex,
          'year': _this.formItem.year,
          'month': _this.formItem.month,
          'day': _this.formItem.day,
        };

        let regRes = await this.$scoreApi.getRegister(params);
        if(regRes.code == '200'){
          this.$Message.success('恭喜您，注册成功~');
          this.$router.push({
            path: '/'
          });
        }else{
          this.$Message.warning(regRes.message);
          return;
        }

      }
    }
    ,
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>

  /*注册*/

  .register-wrap /deep/ .ivu-select {
    .ivu-select-selection {
      border: 0px solid transparent;
    }
  }
  #datePicker >>> .ivu-input{
    border: 0px solid transparent;
  }
  #datePicker >>> input{
    box-shadow: 0 0 0 0 #fff;
  }


  .upload-avatar-modal >>> .ivu-modal-header{
    border-bottom:0px transparent;
  }
  .upload-avatar-modal >>> .ivu-modal-header-inner{
    font-size: 16px;
    color: #2d2f33;
  }



  .upload-avatar-modal{
    .avatar{
      width 100%;
      background: rgba(0,0,0,0.04);

      .cropper-container{
        border-radius: 50%;
      }
      .avatar-wrapper {
        width 100%;
        height: 310px;
        margin-top: 0;
        border-radius: 50%;
        background: #e1e1e3;
        box-shadow: none;
        overflow: hidden;

        img {
          width 100%;
          max-width: 100%; /* This rule is very important, please do not ignore this! */
        }
      }
    }


    .avatar-size{
      display flex;
      margin-top:20px;
    }
    .avatar-preview {
      float: left;
      margin: 0;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
      }
    }
    .avatar-preview.preview-lg {
      width: 100px;
      height: 100px;
    }
    .avatar-preview.preview-md {
      width: 60px;
      height: 60px;
      margin-top: 20px;
      margin-left: 55px;
    }
    .avatar-preview.preview-sm {
      width: 30px;
      height: 30px;
      margin-top: 35px;
      margin-left: 55px;
    }


    .avatar-btns {
      margin-top:20px;
      padding:15px 0;
      display flex;
      justify-content space-around;



      .btn {
        width: 120px;
        padding: 0;
        height: 30px;
        line-height: 30px;
        background: #0d8dfc;
        border-radius: 15px;
        border: 0;
        border-color: transparent;
        outline: none;
        font-size: 13px;
      }
      .upload-btn {
        position: relative;
        color: #fff;
        overflow: hidden;

        input {
          display: block;
          cursor: pointer;
          width: 100%;
          height: 100%;
          opacity: 0;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
        }
      }
    }
  }





  /*注册流程1*/
  .register-wrap {
    width: 100%;
  }

  .register-wrap .box-main {
    margin: 90px auto;
    width: 420px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 22px -6px rgba(0,107,230,0.08);
  }

  .register-wrap .box-main .header {
    text-align: center;
    padding: 32px 0px;
  }
  .register-wrap .box-main .header .title {
    line-height: 34px;
    font-weight: normal;
    font-size: 24px;
    color: #0D8DFC;
  }
  .register-wrap .box-main .step{
    width: 220px;
    text-align: center;
    margin: 0 auto 20px auto;
  }
  .register-wrap .box-main .step .step_main{
    width: 92px;
    position: relative;
    float: left;
  }
  .register-wrap .box-main .step .step_main:after{
    content: '';
    width: 100%;
    height: 4px;
    border-top: 1px solid #EBEBED;
    border-bottom: 1px solid #EBEBED;
    position: absolute;
    right: 0px;
    top: 16px;
  }
  .register-wrap .box-main .step .step_main:last-child{
    width: auto;
  }
  .register-wrap .box-main .step .step_item{
    width: 28px;
    height: 28px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #EBEBED;
    border-radius: 50%;
    position: relative;
    z-index: 2;
    padding: 3px;
    margin-top: 4px;
  }
  .register-wrap .box-main .step .step_item.active{
    width: 36px;
    height: 36px;
    margin-top: 0px;
  }
  .register-wrap .box-main .step span.step_num{
    display: block;
    width: 100%;
    height: 100%;
    line-height: 20px;
    color: #A8ABB3;
    background: #efefef;
    border-radius: 50%;
  }
  .register-wrap .box-main .step .step_item.active span.step_num{
    line-height: 28px;
    color: #fff;
    background: #0D8DFC;
  }
  .register-wrap .box-main .step .step_item.done span.step_num{
    line-height: 20px;
    color: #fff;
    background: #0D8DFC;
  }
  .register-wrap .box-main .step .step_item.done span.step_num .iconfont{
    font-size: 12px;
    vertical-align: top;
  }
  .box {
    text-align: center;
    padding-bottom: 30px;
  }
  .score_reg_form{
    width: 320px;
    margin: 0 auto;
  }
  .send-code-wrap{
    display: table-cell;
  }
  a.send-code-btn{
    display: block;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    color: #FFFFFF;
    text-align: center;
    background: #0D8DFC;
    border-radius: 100px;
    padding: 0 12px;
  }
  .send-code-btn:hover{
    background: #077EE6;
  }
  a.score_reg_btn{
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background-color: #0D8DFC;
    border-radius: 20px;
    /*letter-spacing: 4px;*/
    transition: all 0.3s;
    -webkit-transition: all 0.3s;
    margin-bottom: 24px;
  }
  .reg_user_rule{
    line-height: 32px;
    text-align: left;
    margin-bottom: 14px;
  }
  .reg_user_rule input{
    margin: 0 14px;
  }
  .reg_user_rule a{
    color:  #0D8DFC;
  }
  .score_reg_login a{
    color:  #0D8DFC;
  }

  .imgcode_shadow{
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 90;
  }
  .imgcode_wrap{
    /*display: block;*/
    width: 320px;
    padding-bottom: 30px;
  }
  .imgcode_wrap .pop-title {
    height: 46px;
    line-height: 46px;
    text-align: center;
    background: #0D8DFC;
    color: #fff;
    font-size: 16px;
  }
  .score_reg_imgcode_form{
    width: 260px;
    padding-top: 30px;
    margin: 0 auto;
  }
  .login-form.score_reg_imgcode_form .input-box{
    width: 260px;
  }

  .login-form .input-box select{
    height: 40px;
    border: none;
    outline: none;
    float: left;
  }
  .years {
    width: 56px;
    margin-left: 10px;
  }

  .month, .days {
    width: 38px;
  }
  .login-form .input-box.nc_slider {
    border-bottom: 0;
  }
  .login-form .input-box .sex-btn {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    float: left;
    margin-left: 14px;
  }
  .login-form .input-box .sex-btn.checked {
    color: #2D2F33;
  }
  .login-form .input-box .sex-btn span{
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    background-color: #A8ABB3;
    border-radius: 50%;
    margin-left: 8px;
  }
  .login-form .input-box .sex-btn.boy.checked span{
    background-color: #0D8DFC;
  }
  .login-form .input-box .sex-btn.girl.checked span{
    background-color: #ff4466;
  }
  .login-form .input-box .sex-btn .iconfont{
    font-size: 12px;
    color: #fff;

  }
  .login-form .input-box .sex-btn .iconfont:after{
    display: none;
  }

  .input-box.right {
    clip: auto;
  }

  .agreement {
    font-size: 13px;
  }

  input[type="checkbox"]{
    display: none;
  }
  label{
    font-weight: normal;
  }
  label .icon{
    width: 18px;
    height: 18px;
    margin-top: 6px;
    margin-right: 8px;
    /*margin-left: 12px;*/
    float: left;
  }
  .reg_checked{
    display: none;
  }
  .reg_check{
    display: block;
  }
  input[type="checkbox"]:checked + label .reg_checked{
    display: block;
  }
  input[type="checkbox"]:checked + label .reg_check{
    display: none;
  }
  /*input[type="checkbox"]:disabled + label .reg_check{*/
  /*display: none;*/
  /*}*/
  /*input[type="checkbox"]:disabled + label .reg_checked{*/
  /*display: none;*/
  /*}*/



  .slider {
    margin-bottom: 20px;
    text-align: center;
  }


  .numbers {
    width: 90%;
    margin: 0 auto;
  }

  .seclect {
    width: 102%;
    overflow: hidden;
  }

  .seclect li {
    width: 88px;
    text-align: center;
    color: #999;
    float: left;
    font-size: 14px;
    margin-left: 216px;
    line-height: 30px;
  }

  .seclect li:first-child {
    margin-left: 0;
    text-align: left;
  }

  .seclect li.curr {
    font-weight: 600;
  }

  .form {
    width: 300px;
    height: auto;
    margin: 0 auto;
    position: relative;
  }
  .form .inputs {
    height: 60px;
    border-bottom: 1px solid #F2F2F2;
    width: 100%;
    margin-bottom: 5px;
    display: table;
    position: relative;
    text-align: left;
  }
  .form .inputs i,
  .form .inputs img,
  .form .inputs input {
    display: table-cell;
  }

  .form .inputs .verify-image {
    width: 100px;
    height: 35px;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 11px;
    border-radius: 5px;
  }

  .form .inputs .iconfont {
    display: table-cell;
    color: #b3b3b3;
    font-size: 20px;
    font-weight: normal;
    vertical-align: middle;
    width: 50px;
    text-align: center;
  }

  .form .inputs label{
    line-height:60px;
    font-weight:normal;
    margin-bottom:0;
  }
  .form .inputs input {
    width: 100%;
    height: 100%;
    font-size: 14px;
    color: #999;
  }
  .form .inputs input::-webkit-input-placeholder{
    color:#B8B8B8;
  }


  .form .inputs select:focus {
    outline: none;
  }



  .form .country-code{
    height:60px;
    cursor: pointer;
    position: relative;
  }
  .form .country-code .left{
    position: absolute;
    top:0;
    left:0;
    width: 182px;
    border-bottom: 1px solid #F2F2F2;
  }
  .form .country-code .left .icon-icon4{
    width:20px;
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
  }
  .form .country-code .left input{
    cursor: pointer;
    background-color: transparent;
    color:#333;
  }
  .form .country-code .right{
    position: absolute;
    top:0;
    right:0;
    width: 80px;
    border-bottom: 1px solid #F2F2F2;
  }
  .form .country-code .right input{
    text-align: right;
    background: transparent;
    color:#333;
  }



  .sub_btn button {
    height: 50px;
    background-color: #fddc00;
    width: 100%;
    border-radius: 5px;
    font-size: 16px;
    display: block;
    text-align: center;
    border: none;
    outline: none;
    letter-spacing: 4px;
  }

  .sub_btn button[disabled] {
    background-color: #eee;
    color: #999;
  }

  /*注册流程2*/
  .form .bz_ul {
  }

  .form .bz_ul li {
    width: 100%;
    margin-top: 20px;
    min-height: 40px;
    line-height: 40px;
  }

  .form .bz_ul li > p {
    float: left;
    color: #666;
    font-size: 14px;
    margin-right: 5px;
  }

  .form .bz_ul li.spe_li {
  }

  .form .bz_ul li.spe_li > p {
    line-height: 100px;
  }

  .form .bz_ul li.spe_li .tx {
    float: left;
  }

  .form .bz_ul li.spe_li .zs {
    width: 155px;
    float: right;
    text-align: left;
    line-height: 25px;
    margin-top: 32px;
  }

  .form .bz_ul li.spe_li .zs > p {
    font-size: 14px;
    color: #999;
    text-align: center;
  }

  .form .bz_ul li.spe_li .zs > span {
    font-size: 14px;
    color: #3399cc
  }

  .form .bz_ul li .name_txt {
    float: left;
    width: 70%;
    height: 38px;
    border: 1px solid #dddddd;
    line-height: 40px;
    text-indent: 1em;
  }





  /*注册流程3*/
  .num_three .form {
    width: 82%;
    margin: 0 auto;
    margin-bottom: 63px;
  }

  .num_three .sub_btn {
    width: 320px;
    margin: 0 auto;
  }

  .per_h {
    font-weight: normal;
    font-size: 14px;
    color: #333;
    margin: 10px 0 20px;
    text-align: left;
  }

  .person_ul {
    width: 110%;
    margin-left: -24px;
    overflow: hidden;
    margin-bottom: 30px;
  }

  .person_ul li {
    float: left;
    margin-left: 24px;
    margin-bottom: 15px;
    position: relative;
    cursor: pointer;
  }

  .person_ul li a {
    display: block;
    border-radius: 5px;
    position: relative;
  }

  .person_ul li.act_click a:after {
    border-radius: 5px;
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: url("/images/register/succe.png");
    background-color: rgba(243, 207, 41, 0.8);
    background-size: 53px;
    background-position: center;
    background-repeat: no-repeat;
  }

  .person_ul li a img {
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
  }

  .person_ul li p {
    max-width: 85px;
    text-overflow: ellipsis;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    color: #666;
    overflow: hidden;
  }

  .person_ul li .over {
    position: absolute;
    top: 0;
    left: 0;
    width: 85px;
    height: 85px;
    background: url(/images/register/overbg.png) repeat;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    display: none;
  }

  .person_ul li.act_click .over {
    display: block;
  }

  .over img {
    margin-top: 26px;
  }

  /*忘记密码*/
  .forget_pic {
    width: 464px;
    height: 181px;
    margin: 0 auto;
    padding-bottom: 20px;
  }

  .forget_pic img {
    margin-left: -58px;
  }

  .error_p {
    line-height: 24px;
    font-size: 14px;
    color: #FF3333;
    padding: 8px 16px 12px 16px;
  }

  .register-wrap .message {
    display: none;
    position: fixed;
    text-align: center;
    padding: 0 30px;
    height: 100px;
    line-height: 100px;
    top: 50%;
    width: 300px;
    left: 50%;
    margin: -50px 0 0 -150px;
    border-radius: 5px;
    z-index: 150;
    color: #fff;
    font-size: 16px;
    background-color: rgba(0, 0, 0, .75);
  }

  .register-wrap .message.success {
    color: lime;
  }

  #crop-avatar {
    width: 100%;
    margin-bottom: 10px;
  }

  #crop-avatar .avatar-view {
    border-radius: 50%;
    box-shadow: none;
    margin: 0 auto;

    img{
      width 94px;
      height 94px;
      border-radius: 50%;
    }
  }

  /*select样式*/
  /*select {*/
  /*border: solid 1px #000;*/
  /*appearance:none;*/
  /*-moz-appearance:none;*/
  /*-webkit-appearance:none;*/
  /*background: url('/images/new_index/next.png') no-repeat scroll right center transparent;*/
  /*padding-right: 14px;*/
  /*}*/
  select::-ms-expand { display: none; }

  @media screen and (max-width: 1366px) {
    .box-main {
      /*width: 760px;*/
    }
  }

  @media screen and (max-width: 768px) {

    .register-wrap {
      padding: 0;
    }

    .register-wrap > .box-main > .header {
      /*padding: 0 10px;*/
    }

    .register-wrap > .box-main > .header > .login-link span {
      display: none;
    }

    .register-wrap > .box-main > .header > .title {
      /*font-size: 16px;*/
    }

    .subtitle {
      margin: 0;
    }

    .register-wrap > .box-main {
      border-radius: 0;
      width: 100%;
      /*margin: 0;*/
      box-sizing: border-box;
    }

    .num_three .form,
    .form {
      width: 100%;
      padding: 15px;
    }

    .person_ul {
      width: 100%;
      margin: 0 0 30px 0;
    }

    .person_ul li {
      margin: 0;
      width: 30%;
    }

    .num_three .sub_btn {
      width: 100%;
    }

    .person_ul li:nth-child(3n+2) {
      margin: 0 5%;
    }

    .nc_slider ._nc .stage1 {
      height: 40px;
      padding: 0;
    }
    .nc_slider ._nc .stage1 .slider {
      height: 40px;
      border-radius: 26px;
      box-shadow: 0 0 3px #999;
      background-color: #ddd;
    }
    .nc_slider ._nc .stage1 .button {
      width: 40px;
      height: 40px;
    }
    .nc_slider ._nc .stage1 .slider {
      left: 0;
      right: 0;
    }
    .nc_slider ._nc .stage1 .icon-ok {
      left: 6px;
      top: 3px;
    }
    .nc_slider ._nc .icon-ok {
      font-size: 24px;
    }
    ._nc .stage1 .button {
      border-radius: 50%;
    }
    /* 滑动条 */
    ._nc .stage1 .track div {
      border-radius: 26px;
      color: #fff;
    }
    /* 滑动条背景色-正常 */
    ._nc .stage1 .bg-green {
      background-color: #78c430;
    }
    /* 滑动条背景色-失败 */
    ._nc .stage1 .bg-red {
      background-color: #ff5500;
    }
    .nc-h5-overlay div.info i.iconfont {
      color: #f00;
      width: 1.2em;
      font-size: 120%;
      margin-right: .3em;
    }
    /* 验证码输入框 */
    ._nc .stage2 .textbox .input {
      background: none;
      width: 140px;
      height: 40px;
      outline: none;
      font-size: 18px;
      color: #333;
    }
    /* 图标 */
    ._nc .icon {
      width: 32px;
      height: 32px;
      background-image: url("//g.alicdn.com/sd/nch5/icons.png?v=2");
    }
    ._nc .stage2 .icon.tip {
      left: 10px;
      background-position: -192px 0;
    }
    ._nc .stage2 .icon.clear {
      left: 106px;
      background-position: -224px 0;
    }
    ._nc .stage2 .icon.refresh {
      right: 11px;
      background-position: -256px 0;
    }
    /* 确定按钮、提示 */
    ._nc .stage2 .btn-ok, ._nc .stage2 .tips {
      width: 100%;
      height: 46px;
      border-radius: 5px;
      color: #fff;
      font-size: 20px;
      border: none;
      outline: none;
      background-color: #3199f4;
    }
    ._nc .stage2 .btn-ok:disabled {
      background-color: #ccc;
    }
    ._nc .stage2 .tips {
      background-color: #333;
      color: #fff;
      text-align: center;
      line-height: 46px;
    }
    ._nc .stage3 .title {
      font-size: 20px;
      color: #777;
      width: 100%;
    }
    /* 图标 */
    ._nc .icon {
      width: 32px;
      height: 32px;
      background-image: url("//g.alicdn.com/sd/nch5/icons.png?v=2");
    }
    ._nc .icon-ok {
      background-image: none;
    }
    ._nc .stage3 .menu.refresh .icon {
      background-position: -128px 0;
    }
    ._nc .stage3 .menu.feedback .icon {
      background-position: -160px 0;
    }
    /* 刷新链接 */
    ._nc .stage3 .menu.refresh {
      border-right: 2px solid #ccc;
    }
    .nc_slider ._nc .stage1 .track div,
    .nc_slider ._nc .stage1 .label {
      height: 40px;
      line-height: 40px;
    }
  }

</style>
