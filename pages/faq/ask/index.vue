<template>
  <div class="faq-all">
    <faq-header></faq-header>
    <!--自定义提交问题-->
    <div class="ask_wrap">
      <input type="hidden" id="appid" value="<?php  echo isset($_REQUEST['appid'])?$_REQUEST['appid']:1  ?>" name="appid">
      <h2 class="ask_title">提交您的问题<a href="javascript:;" @click="sentMsgToParents()" class="flr">&lt; 返回</a></h2>
      <p class="ask_desc">如果您有使用上的问题，想要给我们反馈或者建议，请在下面表单中提交，我们很及时给您回复，谢谢您的支持 !</p>
      <!--表单-->
      <div class="ask_main ask_input_wrap cl">
        <div class="ask_label ask_input input_lock">
          <p class="ask_input_title">姓名：<span>*</span></p>
          <input type="text" name="name" readonly >
        </div>
        <div class="ask_label ask_input">
          <p class="ask_input_title">联系方式：<span>*</span></p>
          <input type="text" name="email" v-model="submitFaqForm.email" placeholder="请填写邮箱或QQ号码">
        </div>
      </div>
      <div class="ask_main ask_label">
        <p class="ask_input_title">问题分类<span>*</span></p>
        <select v-model="currSelected" @change="chooseFaqCategory()">
          <option value="">点击选择一个分类</option>
          <option :value="item.id" v-for="(item, index) in category_list">{{item.name}}</option>
        </select>
      </div>
      <div class="ask_main ask_label">
        <p class="ask_input_title">问题描述<span>*</span></p>
        <textarea v-model="submitFaqForm.content" name="content" maxlength="500"></textarea>
      </div>
      <div class="ask_main ask_label upload_img">
        <p class="ask_input_title">添加附件</p>
        <!--<input type="file" name="file" id="uploadInput" multiple accept="image/png,image/jpeg,image/gif,image/jpg">-->
        <div class="control-form">
          <p class="help-block">(建议图片格式为：JPEG/BMP/PNG/GIF，大小不超过5M，最多可上传1张)</p>
          <ul class="upload-imgs">
            <li v-if="imgLen>=1 ? false : true">
              <input type="file" class="upload" @change="addImg" ref="inputer" multiple accept="image/png,image/jpeg,image/gif,image/jpg"/>
              <a class="add" href="javascript:;"><i class="iconfont icon-plus"></i><p>点击上传</p></a>
            </li>
            <li v-for='(value, key) in imgs'>
              <p class="img"><img :src="getObjectURL(value)"><a class="close" @click="delImg(key)">×</a></p>
            </li>
          </ul>
        </div>
        <!--<input type="file" name="file" multiple accept="image/png,image/jpeg,image/gif,image/jpg">-->
        <!--<input type="file" name="uploadify" id="ask_file">-->
        <!--<input type="hidden" name="ask_picture" class="ask_picture" value="">-->
      </div>
      <div class="submit_wrap" @click="submitAsk()">
        <button-confirm :paramsObj="paramsObj" ></button-confirm>
        <!--<a href="javascript:;" type="submit" class="submit_ask" @click="submitAsk()">提交问题</a>-->
      </div>
    </div>
  </div>
</template>

<script>
  import FaqHeader from '~/components/faq/faq-header.vue'
  import buttonConfirm from '~/components/faq/button-confirm.vue'
  export default {
    name: 'faq-ask',
    components: {
      FaqHeader,
      buttonConfirm
    },
    data () {
      return {
        submitFaqForm: {
          email: '',
          cate_id: '',
          content: '',
          image_url: '',
        },
        categoryList: {},
        currSelected: '',
        paramsObj: {
          title: '提交问题',
          class: 'blue',
        },
        imgs: {},
        file:'',
        imgLen: 0,
      }
    },

    async asyncData({$axios, app}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
      let [category_list] = await Promise.all([
        app.$api.faq.getFaqCategoryList()
      ])

      return {
        category_list: category_list.data,
      }
    },
    methods: {
      // 添加图片
      addImg (event) {
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        this.fil = inputDOM.files;
        this.file = this.fil[0];  // 当前图片

        let oldLen = this.imgLen;
        let len = this.fil.length + oldLen;
        if (len > 4) {
          alert('最多可上传4张，您还可以上传' + (4 - oldLen) + '张');
          return false;
        }
        for (let i = 0; i < this.fil.length; i++) {
          let size = Math.floor(this.fil[i].size / 1024);
          if (size > 5 * 1024 * 1024) {
            this.$Message.warning('请选择5M以内的图片！')
            return false
          }
          this.imgLen++;
          this.$set(this.imgs, this.fil[i].name + '?' + new Date().getTime() + i, this.fil[i]);
        }
      },
      getObjectURL (file) {
        this.img = file;
        var url = null;
        if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      delImg (key) {
        this.$delete(this.imgs, key);
        this.imgLen--;
      },
      sentMsgToParents () {
        this.$router.push({
          name: 'faq'
        });
        // var params = {
        //   faqAskBlock: false
        // }
        // this.$emit('listenToAskEvent', params)
      },
      async chooseFaqCategory () {
        this.submitFaqForm.cate_id = this.currSelected
      },
      async uploadImage (){

      },
      async submitAsk () {

        if (!this.submitFaqForm.email) {
          this.$Message.error('请填写联系方式');
          return false;
        }
        if (!this.submitFaqForm.cate_id) {
          this.$Message.error('请选择问题分类');
          return false;
        }
        if (!this.submitFaqForm.content) {
          this.$Message.error('请填写问题描述');
          return false;
        }


        var formData = new FormData();
        formData.append('uploadImage', this.file);
        formData.append('file_type', "picture");

        // 根据用户信息 type 判断角色
        let session_type = sessionStorage.getItem('userInfo').type;
        let type;
        if (session_type == 0 ) {
          type = 2
        } else if (session_type == 1) {
          type = 0
        }
        formData.append('type', type);

        // 上传图片
        let res = await this.$api.upload.image(formData);
        if (res.code == '200') {
          this.submitFaqForm.image_url = res.data[0].half_path;

          // 提交表单
          let res = this.$api.faq.faqSubmitForm({ params: this.submitFaqForm});
          if (res.code == '200') {
            this.submitFaqForm = {
              email: '',
              cate_id: '',
              content: '',
              image_url: '',
            };
            this.$Message.success(res.message);
          } else {
            this.$Message.warning(res.message);
          }

        } else {
          this.$Message.warning(res.message);
        }

      }
    },
    mounted () {

    }
  }
</script>

<style lang="stylus" scoped>
  .faq-all {
    background: #fff;
    margin-bottom: 50px;
    min-height: 100vh;
    h3 {
      margin-top: 20px;
      margin-bottom: 10px;
      line-height: 24px;
    }
    /*自定义提问*/
    .ask_wrap {
      max-width: 1200px;
      padding-top: 20px;
      padding-bottom: 50px;
      margin: 0 auto -50px;
    }

    .ask_wrap h2.ask_title {
      font-size: 22px;
      color: #1F375B;
      font-weight: normal;
      margin-bottom: 12px;
      height: 26px;
      line-height: 26px;
    }

    .ask_wrap h2.ask_title a {
      font-size: 18px;
      color: #1493ff;
    }

    .ask_wrap p.ask_desc {
      font-size: 14px;
      color: #8f9ea8;
      margin-bottom: 24px;
    }

    .ask_main {
      width: 100%;
      margin-bottom: 24px;
    }

    .ask_label {
      border: 1px solid #C5CED3;
      border-radius: 3px;
      padding: 0;
    }

    .ask_input {
      width: 50%;
      float: left;
      clear: none;
    }

    .ask_main p.ask_input_title {
      display: inline-block;
      width: 100%;
      font-weight: bold;
      padding: 10px 12px 0;
      margin-bottom: 2px;
    }

    .ask_main p.ask_input_title span {
      color: #c31c24;
    }

    .ask_label input, .ask_label select, .ask_label textarea {
      width: 100%;
      border: none;
      box-shadow: none;
      font-size: 14px;
      color: #1F375B;
      padding: 0 12px 12px;
      outline: none;
      resize: none;
    }

    .ask_label textarea {
      min-height: 100px;
    }

    .submit_wrap {
      margin-top: 14px;
      width 110px
    }

    .submit_ask {
      font-size: 14px;
      color: #fff;
      background-image: linear-gradient(-180deg, #1493ff 0%, #0f89f1 100%);
      box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 1px 0px rgba(0, 0, 0, 0.05), inset 0px -1px 0px 0px rgba(0, 0, 0, 0.15);
      text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.15);
      padding: 12px 24px;
    }

    .faq_home {
      color: #1493ff;
    }

    .search_none {
      background-color: #f5f5f5;
      border: 1px solid #B9C4CB;
      padding: 20px 10px;
    }

    /*wkit_btn*/
    .wkit_btn {
      width: 28px;
      font-size: 14px;
      color: #fff;
      background-color: #1493ff;
      border: 1px solid #1493ff;
      position: fixed;
      left: 0;
      top: 50%;
      padding: 10px 4px;
      opacity: 0.7;
    }

    .input_lock, .input_lock input {
      background-color: #eee;
    }

    #ask_name {
      cursor: no-drop;
    }

    .control-form {
      padding 0 14px

      .help-block {
        font-size 12px
        color #A8ABB3
      }
    }
    // 上传图片
    .upload-imgs{
      margin: 10px 0 30px 0;
      overflow: hidden;
      font-size: 0;

      li {
        position: relative;
        width: 118px;
        height: 118px;
        font-size: 14px;
        display: inline-block;
        padding: 10px;
        margin-right: 25px;
        border: 2px dashed #ccc;
        text-align: center;
        vertical-align: middle;

        &:hover {
          border-color: #0d8dfc;

          .add{
            background-color: #0d8dfc;
          }

          .img {
            .close{
              display: block;
              position: absolute;
              right: -6px;
              top: -10px;
              line-height: 1;
              font-size: 22px;
              color: #aaa;
            }
          }
        }

        .upload{
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 118px;
          height: 118px;
          color: transparent;
          opacity: 0;
        }

        .add {
          display: block;
          background-color: #ccc;
          color: #ffffff;
          height: 94px;
          padding: 8px 0;
          z-index -1

          p {
            margin-top 29px
          }

          .iconfont{

            &:before {
              position absolute
              width 40px
              height 7px
              background #fff

            }
          }
        }
      }


      .img{
        position: relative;
        width: 94px;
        height: 94px;
        line-height: 94px;

        img{
          vertical-align: middle;
          width: 100%;
        }
        .close{
          display: none;
        }
      }
    }
  }


  @media screen and (min-width: 769px)  and (max-width: 1200px){
    .faq-all {
      .ask_wrap{
        padding-left 60px
        padding-right 60px
      }
    }
  }
  @media screen and (min-width: 769px) {
    .ask_input:first-child {
      border-bottom-right-radius: 0;
      border-top-left-radius: 3px;
      border-top-right-radius: 0;
      border-bottom-left-radius: 3px;
    }

    .ask_input:last-child {
      border-bottom-right-radius: 3px;
      border-top-left-radius: 0;
      border-top-right-radius: 3px;
      border-bottom-left-radius: 0;
      border-left: 0;
    }
  }

  @media screen and (max-width: 768px) {
    .faq-all {
      .ask_wrap {
        padding: 0 3% 8% 3%;

        .ask_input {
          width: 100%;
          float: inherit;
        }

        .ask_input:first-child {
          margin-bottom: 24px;
        }

        .uploadifive-button {
          text-transform: none;
        }
      }
    }
  }
</style>
