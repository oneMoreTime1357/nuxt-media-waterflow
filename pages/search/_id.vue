<template>
  <div class="search-con">
    <div class="search-video-con">
      <waterflow
        contain-id="search-key"
        :lists="lists"></waterflow>
      <div class="load-list-con">
        <base-btn v-if="isLoading" :loading="isLoading" class="load-styl">正在加载</base-btn>
        <span v-if="loadAll">已全部加载完</span>
        <span v-if="loadAll && lists.length === 0">暂无搜索内容</span>
      </div>
    </div>
  </div>
</template>

<script>
import waterflow from '~/components/waterflow'
import baseBtn from '~/components/baseBtn'

import request from '~/assets/utils/request'

export default {
  data () {
    return {
      keywords: '',
      limit: 30,
      lists: [],
      isLoading: false,
      loadAll: false
    }
  },
  components: {
    baseBtn,
    waterflow
  },
  mounted () {
    this.keywords = this.$route.params.id

    this.getSearchData()
    window.onscroll = () => {
      if (this.loadAll) {
        return
      }
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
        // this.isLoading = true
        this.getSearchData()
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
    getSearchData () {
      this.isLoading = true
      request.get({
        url: '/news/get_tribe_news_keywords',
        data: {
          keywords: this.keywords,
          offset: 0,
          limit: this.limit
        },
        done: (res) => {
          this.isLoading = false
          if (!res.code) {
            this.$toast('系统繁忙请重试')
            return
          }

          this.lists = this.lists.concat(res.data.list)
          this.loadAll = res.data.list.length < this.limit
        },
        fail: (err) => {
          console.log(err)
          this.isLoading = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .search-con {
    .load-list-con {
      margin-top: 20px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;

      .load-styl {
        background-color: transparent;
      }
    }
  }
</style>
