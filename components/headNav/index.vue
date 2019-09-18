<style lang="less" scoped>
  @import 'index.less';
</style>

<template>
  <header class="head-con">
    <nav>
      <div class="head-left">
        <router-link to="/" class="logo">
          Nuxt media
        </router-link>
        <div class="search-bar">
          <i class="search-icon"></i>
          <input v-model="keyword" class="search-input" placeholder="搜索视频" @keyup.enter="searchAction">
        </div>
      </div>

      <div class="head-right">
        <a v-if="!token" @click="loginAction" href="javascript:void(0)" class="login">登录</a>
        <a v-else href="javascript:void(0)" class="avater">
          <!-- <img src="avatar" alt=""> -->
          <span class="name">{{ nickName }}</span>
          <i @click="logoutAction" class="logout-icon"></i>
        </a>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations } from 'vuex'
import Cookie from '~/assets/utils/cookie'
import request from '~/assets/utils/request'

export default {
  data () {
    return {
      keyword: '',
      token: '',
      nickName: '',
      avatar: ''
    }
  },
  computed: {

  },
  mounted () {
    this.token = Cookie.getCookie('utoken')
    this.avatar = Cookie.getCookie('_avatar')
  },
  methods: {
    ...mapMutations(['setNeedLogin']),
    searchAction () {
      this.$router.push({ path: `/search/${this.keyword}` })
    },
    loginAction () {
      this.setNeedLogin(true)
    },
    logoutAction () {
    }
  }
}
</script>
