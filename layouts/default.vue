<template>
  <div>
    <head-nav></head-nav>
    <section class="main-con">
      <div class="main-inner">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import headNav from '../components/headNav'
import cookie from '~/assets/utils/cookie'
import { mapActions } from 'vuex'

export default {
  components: {
    headNav
  },
  computed: {
    showLogin () {
      return this.$store.state.needLogin
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions(['getUserInfo'])
  }
}
</script>


<style lang="less">
  @import '../assets/styles/reset.less';

  .main-con {
    padding-top: 100px;
    background-color: #F9FAFF;
    padding-bottom: 50px;
    // min-width: 1440px;

    .main-inner {
      // width: 1440px;
      // width: 100%;
      // padding-left: 120px;
      // padding-right: 120px;
      margin: 0 auto;
    }
  }
</style>
