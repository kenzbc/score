<template>
  <div class="rate" :class="{'disabled':disabled}">
    <div class="star-box">
      <i v-for="i in count" class="iconfont" :style="'color:'+color+';font-size:'+fontSize+';width:'+fontSize+';height:'+fontSize"
         @mouseenter="disabled ? '' : curScore = i"
         @mouseleave="disabled ? '' : curScore = ''"
         @click="disabled ? '' : setScore(i)" :class="getClass(i)"></i>
    </div>
    <div v-if="showText" class="text">{{curScore || score}}分</div>
  </div>
</template>

<script>
  export default {
    name: 'MatchStarRate',
    props: {
      count:{
        type: Number,
        default: 5,
      },
      score: {
        type: Number,
        default: 0,
        //required: true
      },
      color:{
        type: String,
        default: '#ffcc60'
      },
      fontSize: {
        type: String,
        default: '16px'
      },
      left: {
        type: String,
        default: '0px'
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      showText: {
        type: Boolean,
        default: false,
      },
      styleType: {
        type: String,
        default: 'hollow' //hollow 空  solid 实
      },
    },
    data() {
      return {
        curScore: '',
      }
    },
    watch:{
      score(newVal, oldVal){
        this.curScore = newVal;
      }
    },
    created: function () {
      this.curScore = this.score;
    },
    methods: {
      getClass(i) {
        if (this.score === '') {
          return i <= this.score ? 'icon-staron' : i >= this.score+1 ? 'icon-staroff' : 'icon-star-half'
        } else {
          return i <= this.curScore ? 'icon-staron' : i >= this.curScore+1 ? 'icon-staroff' : 'icon-star-half'
        }
      },
      setScore(i){
        if(!this.disabled){
          this.curScore = i;
          this.$emit('update:score',i);//使用`.sync`修饰符，对score 进行“双向绑定
        }
      }
    }
  }
</script>
<style scoped>
  .star-box .iconfont{
    display: inline-block;
    /*margin-left:2px;*/
  }

  .text{
    text-align: center;
    margin-top:4px;
  }
</style>
