<template>
  <div class="home-con">
    <skeleton v-if="!showPage"></skeleton>
    <div class="flud-con">
      <waterflow
        contain-id="box"
        :lists="listData"
        :is-right="true"
        @paintSuccess="val => showPage = val"
        >
      </waterflow>
      <div class="load-list-con">
        <base-btn v-if="isLoading" :loading="isLoading">正在加载</base-btn>
        <span v-if="loadAll">已全部加载完</span>
      </div>
    </div>

  </div>
</template>

<script>
import card from '~/components/card'
import waterflow from '~/components/waterflow'
import baseBtn from '~/components/baseBtn'
import skeleton from '~/components/skeleton'
import request from '~/assets/utils/request'

export default {
  data () {
    return {
      listData: [],
      show: false,
      limit: 30,
      isLoading: false,
      loadAll: false,
      showPage: false
    }
  },
  asyncData(context) {

  },
  components: {
    card,
    waterflow,
    baseBtn,
    skeleton
  },
  mounted () {
    // console.log(this.listData, 222)
    this.loadAll = this.listData.length < this.limit
    this.show = true
    window.onscroll = () => {
      if (this.loadAll) {
        return
      }
      this.throttle(this.loadCaculate(), 400)
    }
  },
  beforeDestroy () {
    window.onscroll = null
  },
  methods: {
    loadCaculate () {
      let sh = window.$(window).scrollTop()
      let wh = window.$(window).height()
      let dh = window.$('.flud-con').height() + 100
      // console.log(sh, wh, dh, dh - sh - wh)
      if (dh - sh - wh < 55 && !this.isLoading) {
        this.isLoading = true
        this.getVideoData()
      }
    },
    throttle (fn, wait) {
      let canRun = true

      return function () {
        if (!canRun) {
          return
        }

        canRun = false
        setTimeout(() => {
          fn.apply(this, arguments)
          canRun = true
        }, wait)
      }
    },
    getVideoData () {
    }
  }
}
</script>

<style lang="less">
.home-con {
  position: relative;

  .flud-con {
    position: relative;
    margin: 0 auto;

    .load-list-con {
      margin-top: 20px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
    }
  }

  .info-right {
    width: 285px;
    margin-bottom: 20px;
    height: 200px;
    float: right;
    // background-color: aqua;
    margin-right: 20px;

    .tougao {
      height: 95px;
      border-radius: 6px;
      color: #fff;
      padding: 20px;
    }
    .title {
      font-size: 20px;
    }
    .sub-text {
      margin-top: 10px;
    }
    .download {
      margin-top: 16px;
      border-radius: 4px;
      padding: 20px;
      height: 95px;
      color: #fff;
      position: relative;
    }

    .download-pic {
      position: absolute;
      width: 60px;
      height: 60px;
      right: 20px;
      top: 18px;
    }
  }
}
</style>
