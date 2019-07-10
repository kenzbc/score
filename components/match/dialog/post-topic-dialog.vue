<template>
  <div class="topic-dialog" v-if="show">
    <div class="dialog-container">
      <div class="dialog-box">
        <div class="d-header">
          发布新话题
          <label class="topic-dialog-close" @click="close()"><i class="icon iconfont"></i></label>
        </div>
        <div class="topic-body">
          <div class="circle-info">
            <div class="circle-img"><img src="https://img1.famulei.com/z/2957331/p/1811/0817005841076.png" ></div>
            <div class="circle-name">游乐场</div>
          </div>
          <div class="form-input"><input type="text" v-model="title" placeholder="标题 (不超过30字)"></div>
          <!--<div class="form-input"><textarea v-model="content" maxlength="5000"></textarea></div>-->
          <div class="form-input">
            <div class="wang-editor" id="editor"></div>
          </div>
        </div>
        <div class="topic-footer">
          <div class="topic-btn" @click="close()">取消</div>
          <div class="topic-btn active" @click="submitAct()">发布</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  //发布新话题
  export default {
    name: "post-topic-dialog",
    props:{
      show:{
        type:Boolean,
        default:false
      },
      matchInfo:{
        type:Object,
        default:function () {
          return {};
        }
      }
    },
    data:function() {
      return {
        title:'',
        content:''
      }
    },
    watch:{
      show:function(newVal,oldVal){
        if (newVal === true) {

          this.createEditor();
        } else {

        }
      }
    },
    mounted() {

    },
    methods: {
      /**关闭菠菜投注弹层**/
      close:function(){
        this.price = this.minBet;
        this.$emit('close',true);
      },
      /**发布**/
      submitAct:function(){
        var _this = this;
        var params = {
          'title': this.title,
          'content_html':this.content,
          'topic_matchID':matchId,
          'circle_id':this.matchInfo.circle_id
        };
        this.$api.dynamic.add({params}).then((res)=> {
          if (res.code == '200') {

            this.content = '';
            this.title = '';
            this.$emit('close',true);
            this.$emit('refresh-topic-list',true);
          }
          this.$Message.info(res.message);
        });
      },
      createEditor(){
        var _this = this;
        setTimeout(function () {
          var E = window.wangEditor;
          var editor = new E('#editor');
          // 自定义菜单配置
          editor.customConfig.menus = [
            'bold',
            'emoticon',
            'image',
            // 'video',
            'undo',  // 撤销
            'redo'  // 重复
          ];
          //配置表情
          editor.customConfig.emotions =[
            {title: '赛高小子', type: 'image', content: editor_emoji},
            {title: '伐木累', type: 'image', content: editor_emoji1},
            {title: '小花狸', type: 'image', content: editor_emoji2}
          ];
          //配置图片上传
          editor.customConfig.uploadImgServer = '/services/upload_file/upload_image.php';
          editor.customConfig.showLinkImg = false;//隐藏“网络图片”
          editor.customConfig.uploadFileName = 'upfile';
          editor.customConfig.uploadImgHeaders = {
            // 'Accept': '*/*',
            // 'Authorization':'Bearer ' + token    //头部token
          };
          editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024; // 将图片大小限制为 10M
          editor.customConfig.uploadImgMaxLength = 1; // 限制一次最多上传 9 张图片
          editor.customConfig.maxUploadPic = 9;//自定义图片限制
          editor.customConfig.uploadImgHooks = {
            before: function (xhr, editor, files) {
              // 图片上传之前触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

              // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
              // return {
              //     prevent: true,
              //     msg: '放弃上传'
              // }
            },
            success: function (xhr, editor, result) {
              // 图片上传并返回结果，图片插入成功之后触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            fail: function (xhr, editor, result) {
              // 图片上传并返回结果，但图片插入错误时触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            error: function (xhr, editor) {
              // 图片上传出错时触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            timeout: function (xhr, editor) {
              // 图片上传超时时触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },

            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            customInsert: function (insertImg, result, editor) {
              // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
              // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

              // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
              var url = result.url;
              insertImg(url)

              // result 必须是一个 JSON 格式字符串！！！否则报错
            }
          };
          // 编辑区域内容变化时，实时打印出当前内容
          editor.customConfig.onchange = function(html){
            console.log(html)
            if (editor.txt.text().length > 800) {
              _this.$Message.warning('评论不能大于800个字符');
            }else{
              _this.content = html;
            }
          };
          // 或者 var editor = new E( document.getElementById('editor') )
          editor.create();
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>

  .topic-dialog{
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0,0,0,0.7);
    position: fixed;



    .dialog-container{
      transform: translate(-50%,-50%);
      position: absolute;
      top: 50%;
      left: 50%;
      background: #fff;
      border-radius:4px;
      overflow hidden;

      .dialog-box{
        width:500px;
        min-height:340px;
        background:#fff;
        box-shadow:0px 2px 8px 0px rgba(0,0,0,0.08),0px 0px 0px 1px rgba(0,0,0,0.03);
        position: relative;


        .d-header{
          width:100%;
          height:46px;
          background:#0D8DFC;
          border-radius:4px 4px 0px 0px;

          font-size:16px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:#FFFFFF;
          line-height:46px;
          text-align center;

          .topic-dialog-close{
            position: absolute;
            top: 10px;
            right: 10px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            text-align: center;
            cursor: pointer;
            padding-top: 1px;
            line-height initial;

            .icon{
              font-size: 12px;
              color: #fff;
            }
          }
        }

        .topic-body{
          padding:20px 15px 14px;

          .circle-info{
            display: flex;
            align-items center;
            margin-bottom:14px;

            .circle-img{
              width 50px;
              height 50px;
              border-radius 50%;
              overflow hidden;
              border:1px solid #ddd;

              img{
                max-width 100%;
              }
            }
            .circle-name{
              margin-left:10px;
              font-size:16px;
              font-weight 700;
            }


          }

          .form-input{
            cursor: pointer;
            margin-bottom: 10px;

            input[type=text]{
              padding-left: 14px;
              width: 100%;
              border: 1px solid #ebebed;
              border-radius: 4px;
              height: 40px;
              font-size: 14px;
              color: #656973;
            }

            textarea{
              padding: 14px;
              width: 100%;
              border: 1px solid #ebebed;
              border-radius: 4px;
              height: 200px;
              font-size: 14px;
              color: #656973;
              resize: none;
            }

            .wang-editor{
              border: 1px solid #ebebed;
              border-radius: 4px;

              .w-e-toolbar{
                background-color: #fff!important;
                border:1px solid transparent!important;
                border-bottom: 1px solid #ebebed!important;
              }

              .w-e-text-container{
                border:1px solid transparent!important;
              }
            }

          }
        }



        .topic-footer {
          width 100%;
          display flex;
          justify-content center;
          padding: 0 0 16px;
          background: #fff;

          .topic-btn {
            width:110px;
            height:34px;
            border-radius:18px;
            border:1px solid #EBEBED;
            font-size:13px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:#656973;
            text-align center;
            line-height 34px;

            &:hover{
              cursor pointer;
            }

            &.active{
              background:rgba(13,141,252,1);
              border-radius:20px;
              color:#fff;
              margin-left:16px;
            }
          }
        }



      }


    }
  }




</style>
