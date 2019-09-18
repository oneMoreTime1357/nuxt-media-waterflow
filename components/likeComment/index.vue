<style lang="less" scoped>
  @import 'index.less';
</style>

<template>
  <div class="like-comment-content">
    <ul class="like-comment">
      <li @click.stop="caiAction">
        <i :class="[ detail.downed ? 'cai-active-icon' : 'cai-png' ]"></i>
        <span>{{ detail.downCount }}</span>
      </li>
      <li @click.stop="zanAction">
        <i :class="[ detail.upped ? 'zan-active-icon' : 'zan-png' ]"></i>
        <span :class="{ 'active-color': detail.upped }">{{ detail.upCount }}</span>
      </li>
      <li>
        <i class="comment-png"></i>
        <span>{{ detail.commentCount }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import request from '~/assets/utils/request'
// import commentModule from '../commentModule'
// import { Indicator, MessageBox } from 'mint-ui'
import Cookie from '~/assets/utils/cookie'
import { mapMutations } from 'vuex'

export default {
  props: {
    tribeId: {
      type: Number
    },
    detail: {
      type: Object,
      default: {
        downed: true,
        upped: false
      }
    },
    newsId: {
      type: String
    },
    updateData: {
      type: Function
    },
    commentNew: {
      type: Function
    },
    isList: Boolean
  },
  data () {
    return {
      // showComment: false,
      userId: '',
      token: ''
    }
  },
  mounted () {
    this.token = Cookie.getCookie('utoken')
    this.userId = Cookie.getCookie('_user_id')
  },
  components: {
    // needLogin () {
    //   return this.$store.state.needLogin
    // }
  },
  methods: {
    ...mapMutations(['setNeedLogin']),
    needLoginAction () {
      if (!this.token) {
        this.setNeedLogin(true)
        return true
      }

      return false
    },
    zanAction () {
      if (this.needLoginAction()) {
        return
      }

      const data = {
        news_id: this.detail.id,
        user_id: this.userId
      }

      request.get({
        url: '/news/up_tribe_news',
        data,
        done: (res) => {
          // Indicator.close()
          if (!res.code) {
            return
          }
          if (this.detail.upped) {
            this.detail.upped = false
            this.detail.upCount -= 1
            // this.detail.downed = !this.detail.upped
          } else if (!this.detail.upped && this.detail.downed) {
            this.detail.upCount += 1
            this.detail.downCount -= 1
            this.detail.upped = true
            this.detail.downed = false
          } else {
            this.detail.upped = true
            this.detail.upCount += 1
          }
        },
        fail: (err) => {
          // Indicator.close()
          console.log(err)
        }
      })
    },
    caiAction () {
      if (this.needLoginAction()) {
        return
      }

      const data = {
        news_id: this.detail.id,
        user_id: this.userId
      }
      // Indicator.open({ spinnerType: 'fading-circle' })
      request.get({
        url: '/news/down_tribe_news',
        data,
        done: (res) => {
          // Indicator.close()
          if (!res.code) {
            return
          }
          // console.log(this.detail.downed, this.detail.upCount, this.detail.downCount)
          if (this.detail.downed) {
            this.detail.downed = false
            this.detail.downCount -= 1
          } else if (!this.detail.downed && this.detail.upped) {
            this.detail.downed = true
            this.detail.downCount += 1
            this.detail.upCount -= 1
            this.detail.upped = false
          } else {
            this.detail.downed = true
            this.detail.downCount += 1
          }
        },
        fail: () => {
          Indicator.close()
        }
      })
    }
  }
}
</script>
