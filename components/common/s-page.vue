<template>
  <ul :class="simpleWrapClasses" :style="styles" v-if="simple">
    <li title="上一页" :class="prevClasses" @click="prev">
      <a><i class="ivu-icon ivu-icon-ios-arrow-back"></i></a>
    </li>
    <div :class="simplePagerClasses" :title="currentPage + '/' + allPages">
      <input
        type="text"
        :value="currentPage"
        autocomplete="off"
        spellcheck="false"
        @keydown="keyDown"
        @keyup="keyUp"
        @change="keyUp">
      <span>/</span>
      {{ allPages }}
    </div>
    <li title="下一页" :class="nextClasses" @click="next">
      <a><i class="ivu-icon ivu-icon-ios-arrow-forward"></i></a>
    </li>
  </ul>
  <ul :class="wrapClasses" :style="styles" v-else>

    <span :class="[prefixCls + '-total']" v-if="showTotal">
        <slot>共 {{ total }}
          <template v-if="total <= 1">页</template>
          <template v-else>页</template>
        </slot>
    </span>

    <li title="上一页" :class="prevClasses" @click="prev">
      <a>
        <template v-if="prevText !== ''">{{ prevText }}</template>
        <i v-else class="ivu-icon ivu-icon-ios-arrow-back"></i>
      </a>
    </li>

    <li title="1" :class="firstPageClasses" @click="changePage(1)"><a>1</a></li>
    <li title="向前 5 页" v-if="currentPage > 5" :class="[prefixCls + '-item-jump-prev']" @click="fastPrev"><a><i class="ivu-icon ivu-icon-ios-arrow-back"></i></a></li>
    <li :title="currentPage - 3" v-if="currentPage === 5" :class="[prefixCls + '-item']" @click="changePage(currentPage - 3)"><a>{{ currentPage - 3 }}</a></li>
    <li :title="currentPage - 2" v-if="currentPage - 2 > 1" :class="[prefixCls + '-item']" @click="changePage(currentPage - 2)"><a>{{ currentPage - 2 }}</a></li>
    <li :title="currentPage - 1" v-if="currentPage - 1 > 1" :class="[prefixCls + '-item']" @click="changePage(currentPage - 1)"><a>{{ currentPage - 1 }}</a></li>
    <li :title="currentPage" v-if="currentPage != 1 && currentPage != allPages" :class="[prefixCls + '-item',prefixCls + '-item-active']"><a>{{ currentPage }}</a></li>
    <li :title="currentPage + 1" v-if="currentPage + 1 < allPages" :class="[prefixCls + '-item']" @click="changePage(currentPage + 1)"><a>{{ currentPage + 1 }}</a></li>
    <li :title="currentPage + 2" v-if="currentPage + 2 < allPages" :class="[prefixCls + '-item']" @click="changePage(currentPage + 2)"><a>{{ currentPage + 2 }}</a></li>
    <li :title="currentPage + 3" v-if="allPages - currentPage === 4" :class="[prefixCls + '-item']" @click="changePage(currentPage + 3)"><a>{{ currentPage + 3 }}</a></li>
    <li title="向后 5 页" v-if="allPages - currentPage >= 5" :class="[prefixCls + '-item-jump-next']" @click="fastNext"><a><i class="ivu-icon ivu-icon-ios-arrow-forward"></i></a></li>
    <li :title="allPages" v-if="allPages > 1" :class="lastPageClasses" @click="changePage(allPages)"><a>{{ allPages }}</a></li>

    <li title="下一页" :class="nextClasses" @click="next">
      <a>
        <template v-if="nextText !== ''">{{ nextText }}</template>
        <i v-else class="ivu-icon ivu-icon-ios-arrow-forward"></i>
      </a>
    </li>

    <div class="ordinary-page-all">
      <div class="ordinary-page-total">
        共<span class="ordinary-page-all-text">{{Math.ceil(total / pageSize)}}</span>页
      </div>
      <div class="ordinary-page-go">
        <span>跳到</span>
        <input class="page-input" type="text" v-model="changePageSize" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
        <span>页</span>
        <span class="page-go-btn" @click="changePage(changePageSize)">GO</span>
      </div>
    </div>

  </ul>
</template>
<script>
  import { oneOf } from '~/utils/assist';
  const prefixCls = 's-page';
  export default {
    name: 's-page',
    components: { },
    props: {
      current: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        default: 0
      },
      pageSize: {
        type: Number,
        default: 10
      },
      pageSizeOpts: {
        type: Array,
        default () {
          return [10, 20, 30, 40];
        }
      },
      placement: {
        validator (value) {
          return oneOf(value, ['top', 'bottom']);
        },
        default: 'bottom'
      },
      transfer: {
        type: Boolean,
        default () {
          return !this.$IVIEW || this.$IVIEW.transfer === '' ? false : this.$IVIEW.transfer;
        }
      },
      size: {
        validator (value) {
          return oneOf(value, ['small']);
        }
      },
      simple: {
        type: Boolean,
        default: false
      },
      showTotal: {
        type: Boolean,
        default: false
      },
      showElevator: {
        type: Boolean,
        default: false
      },
      showSizer: {
        type: Boolean,
        default: false
      },
      className: {
        type: String
      },
      styles: {
        type: Object
      },
      prevText: {
        type: String,
        default: ''
      },
      nextText: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        prefixCls: prefixCls,
        changePageSize:'',
        currentPage: this.current,
        currentPageSize: this.pageSize
      };
    },
    watch: {
      total (val) {
        let maxPage = Math.ceil(val / this.currentPageSize);
        if (maxPage < this.currentPage ) {
          this.currentPage = (maxPage === 0 ? 1 : maxPage);
        }
      },
      current (val) {
        this.currentPage = val;
      },
      pageSize (val) {
        this.currentPageSize = val;
      }
    },
    computed: {
      isSmall () {
        return !!this.size;
      },
      allPages () {
        const allPage = Math.ceil(this.total / this.currentPageSize);
        return (allPage === 0) ? 1 : allPage;
      },
      simpleWrapClasses () {
        return [
          `${prefixCls}`,
          `${prefixCls}-simple`,
          {
            [`${this.className}`]: !!this.className
          }
        ];
      },
      simplePagerClasses () {
        return `${prefixCls}-simple-pager`;
      },
      wrapClasses () {
        return [
          `${prefixCls}`,
          {
            [`${this.className}`]: !!this.className,
            'mini': !!this.size
          }
        ];
      },
      prevClasses () {
        return [
          `${prefixCls}-prev`,
          {
            [`${prefixCls}-disabled`]: this.currentPage === 1,
            [`${prefixCls}-custom-text`]: this.prevText !== ''
          }
        ];
      },
      nextClasses () {
        return [
          `${prefixCls}-next`,
          {
            [`${prefixCls}-disabled`]: this.currentPage === this.allPages,
            [`${prefixCls}-custom-text`]: this.nextText !== ''
          }
        ];
      },
      firstPageClasses () {
        return [
          `${prefixCls}-item`,
          {
            [`${prefixCls}-item-active`]: this.currentPage === 1
          }
        ];
      },
      lastPageClasses () {
        return [
          `${prefixCls}-item`,
          {
            [`${prefixCls}-item-active`]: this.currentPage === this.allPages
          }
        ];
      }
    },
    methods: {
      changePage (page) {
        if (this.currentPage != page) {
          this.currentPage = page;
          this.$emit('update:current', page);
          this.$emit('on-change', page);
        }
      },
      prev () {
        const current = this.currentPage;
        if (current <= 1) {
          return false;
        }
        this.changePage(current - 1);
      },
      next () {
        const current = this.currentPage;
        if (current >= this.allPages) {
          return false;
        }
        this.changePage(current + 1);
      },
      fastPrev () {
        const page = this.currentPage - 5;
        if (page > 0) {
          this.changePage(page);
        } else {
          this.changePage(1);
        }
      },
      fastNext () {
        const page = this.currentPage + 5;
        if (page > this.allPages) {
          this.changePage(this.allPages);
        } else {
          this.changePage(page);
        }
      },
      onSize (pageSize) {
        this.currentPageSize = pageSize;
        this.$emit('on-page-size-change', pageSize);
        this.changePage(1);
      },
      onPage (page) {
        this.changePage(page);
      },
      keyDown (e) {
        const key = e.keyCode;
        const condition = (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key === 8 || key === 37 || key === 39;
        if (!condition) {
          e.preventDefault();
        }
      },
      keyUp (e) {
        const key = e.keyCode;
        const val = parseInt(e.target.value);
        if (key === 38) {
          this.prev();
        } else if (key === 40) {
          this.next();
        } else if (key === 13) {
          let page = 1;
          if (val > this.allPages) {
            page = this.allPages;
          } else if (val <= 0 || !val) {
            page = 1;
          } else {
            page = val;
          }
          e.target.value = page;
          this.changePage(page);
        }
      }
    }
  };
</script>
<style lang="stylus" scoped>

  .s-page {
    &:after {
      content: '';
      display: block;
      height: 0;
      clear: both;
      overflow: hidden;
      visibility: hidden;
    }

    &-item {
      display: inline-block;
      //float: left;
      vertical-align: middle;
      min-width: 24px;
      height: 24px;
      line-height: 24px - 2px;
      margin-right: 4px;
      text-align: center;
      list-style: none;
      background-color: #fff;
      user-select: none;
      cursor: pointer;
      font-family: Arial;
      font-weight: 500;
      /*border: 1px solid #dcdee2;*/
      border-radius: 50%;
      //transition: all .2s ease-in-out;
      //transition: border .2s ease-in-out, color .2s ease-in-out;

      a {
        font-family: "Monospaced Number";
        margin: 0 6px;
        text-decoration: none;
        color: #515a6e;
        //transition: none;
      }

      &:hover {
        border-color: #2d8cf0;
        a {
          color: #2d8cf0;
        }
      }

      &-active {
        border-color: #2d8cf0;
        background: #0d8dfc;

        a, &:hover a {
          color: #fff;
        }
      }
    }

    &-item-jump-prev, &-item-jump-next {
      &:after {
        content: "•••";
        display: block;
        letter-spacing: 1px;
        color: #ccc;
        text-align: center;
      }

      i {
        display: none;
      }

      &:hover {
        &:after {
          display: none;
        }
        i {
          display: inline;
        }
      }
    }

    &-item-jump-prev:hover {
      i:after {
        content: "\F115";
        margin-left: -8px;
      }
    }

    &-item-jump-next:hover {
      i:after {
        content: "\F11F";
        margin-left: -8px;
      }
    }

    &-prev {
      margin-right: 4px;
    }

    &-item-jump-prev,
    &-item-jump-next {
      margin-right: 4px;
    }

    &-prev,
    &-next,
    &-item-jump-prev,
    &-item-jump-next {
      display: inline-block;
      vertical-align: middle;
      user-select: none;
      //float: left;
      min-width: 24px;
      height: 24px;
      line-height: 24px - 2px;
      list-style: none;
      text-align: center;
      cursor: pointer;
      color: #666;
      font-family: Arial;
      /*border: 1px solid #dcdee2;*/
      border-radius: 4px;
      transition: all .2s ease-in-out;
    }
    &-item-jump-prev,
    &-item-jump-next {
      border-color: transparent;
    }

    &-prev,
    &-next {
      /*background-color: #fff;*/

      a {
        color: #666;
        font-size: 14px;
      }

      &:hover {
        border-color: #2d8cf0;

        a {
          color: #2d8cf0;
        }
      }
    }

    &-disabled {
      cursor: not-allowed;
      a {
        color: #ccc;
      }
      &:hover {
        border-color: #dcdee2;
        a {
          color: #ccc;
          cursor: not-allowed;
        }
      }
    }

    &-options {
      display: inline-block;
      vertical-align: middle;
      //float: left;
      margin-left: 15px;
      &-sizer {
        display: inline-block;
        //float: left;
        margin-right: 10px;
      }

      &-elevator {
        display: inline-block;
        vertical-align: middle;
        //float: left;
        height: 24px;
        line-height: 24px;

        input {
          border-radius: 4px;
          margin: 0 8px;
          width: 50px;
        }
      }
    }

    &-total {
      display: inline-block;
      //float: left;
      height: 24px;
      line-height: 24px;
      margin-right: 10px;
    }

    &-simple &-prev,
    &-simple &-next {
      margin: 0;
      border: 0;
      height: 24px;
      line-height: normal;
      font-size: 18px;
    }

    &-simple &-simple-pager {
      display: inline-block;
      //float: left;
      margin-right: 8px;
      vertical-align: middle;

      input {
        width: 30px;
        height: 24px;
        margin: 0 8px;
        padding: 5px 8px;
        text-align: center;
        box-sizing: border-box;
        background-color: #fff;
        outline: none;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        transition: border-color .2s ease-in-out;

        &:hover {
          border-color: #2d8cf0;
        }
      }

      span {
        padding: 0 8px 0 2px;
      }
    }

    &-custom-text, &-custom-text:hover {
      border-color: transparent;
    }
  }

  .s-page {
    &.mini &-total {
      height: 24px;
      line-height: 24px;
    }

    &.mini &-item {
      border: 0;
      margin: 0;
      min-width: 24px;
      height: 24px;
      line-height: 24px;
      border-radius: 24px;
    }

    &.mini &-prev,
    &.mini &-next {
      margin: 0;
      min-width: 24px;
      height: 24px;
      line-height: 24px - 2px;
      border: 0;
      padding:0 4px;

      a {
        i:after {
          height: 24px;
          line-height: 24px;
        }
      }
    }

    &.mini &-item-jump-prev,
    &.mini &-item-jump-next {
      height: 24px;
      line-height: 24px;
      border: none;
      margin-right: 0;
    }

  }

  .ordinary-page-all{
    /*margin-top: 4px;*/
    display: inline-block;
    color: #a8abb3;
    vertical-align: middle;
    position: relative;
    float right;

    .ordinary-page-total{
      display inline-block;
    }

    .ordinary-page-all-text {
      /*display: inline-block;*/
      color: #636873;
      padding: 0 4px;
      vertical-align: middle;
      margin-bottom: 3px;
    }

    .ordinary-page-go {
      margin-left: 12px;
      font-size: 13px;
      color: #a8abb3;
      display: inline-block;
      vertical-align: middle;

      .page-input {
        cursor: pointer;
        margin: 0 5px;
        border: 1px solid #ebebed;
        border-radius: 2px;
        width: 36px;
        height: 22px;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
      }
    }

    .page-go-btn {
      cursor: pointer;
      margin-left: 5px;
      display: inline-block;
      background: rgba(255,255,255,0.7);
      border: 1px solid #ebebed;
      border-radius: 8px;
      width: 36px;
      height: 22px;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
      color: #656973;
    }
  }



</style>
