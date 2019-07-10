<template>
  <div :id="modelName" :class="[modelName]">
    <div class="nc-container"></div>
    <!-- <no-captcha-js src="http://g.alicdn.com/sd/ncpc/nc.js?t=2015052012" type="text/javascript" charset="utf-8" /> -->
  </div>
</template>

<script>
  /**
   * 阿里滑块验证
   *
   * */
  export default {
    name: "no-captcha",
    components: {},
    props:{
      width:{
        type:Number,
        default:300
      },
      height:{
        type:Number,
        default:40
      },
      isReset:{
        type:Boolean,
        default:false
      }
    },
    watch:{
      isReset(newVal,oldVal){
        if(newVal == true){
          this.reset();
        }
      }
    },
    data () {
      return {
        appKey:'FFFF0N00000000007563',
        modelName:'ali-slider',
        nc_token:null,
        lang:'cn',
        NC_Opt:null,
        nc:''
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        var _this = this;
        this.nc_token = [this.appKey, (new Date()).getTime(), Math.random()].join(':');
        this.NC_Opt = {
          renderTo: "#ali-slider",
          appkey: "FFFF0N00000000007563",
          scene: "nc_login",
          token: this.nc_token,
          customWidth: this.width,
          trans:{"key1":"code0"},
          // elementID: ["usernameID"],
          is_Opt: 0,
          language: this.lang,
          isEnabled: true,
          timeout: 3000,
          times:5,
          apimap: {},
          callback: function (data) {

            var res = {}
            res.token = _this.nc_token;
            res.csessionid = data.csessionid;
            res.sig = data.sig;
            res.scene = _this.NC_Opt.scene;

            _this.$emit("captchaCallback",res);

            //window.console && console.log(_this.nc_token)
            //window.console && console.log(data.csessionid)
            //window.console && console.log(data.sig)
            //将这三个参数在这里回调服务器的接口，进行服务器的验证
          }
        }


        if(!process.server){
          var loadjs = require('loadjs');
          loadjs('https://g.alicdn.com/sd/ncpc/nc.js?t=2015052012', function() {
            /* foo.js loaded */
            _this.generarte()
          });
        }

      },

      generarte(){
        this.nc = new noCaptcha(this.NC_Opt)
        this.nc.upLang('cn', {
          _startTEXT: "请按住滑块，拖动到最右边",
          _yesTEXT: "验证通过",
          _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
          _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
        });
      },
      reset(){
        this.nc.reset();
      }
    },
    destroyed() {
    }
  }
</script>

<style scoped>

</style>
