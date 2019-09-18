<style lang="less" scoped>
  @import 'index.less';
</style>

<template>
  <div class="tribe-detail-con">
    <div class="detail-con-inner">
      <div class="head">
        <img :src="detail.portraitUrl && detail.portraitUrl.indexOf('http') > -1 ? detail.portraitUrl : detail.picHost + detail.portraitUrl + '?imageView2/1/w/64/h/64'" alt="">
        <span class="name">{{ detail.userName }}</span>
      </div>

      <div class="scroll-comment-con">
        <div class="detail-content">
          <pre class="info">{{ detail.content }}</pre>
          <div class="tribe-zan">
            <like-comment :detail="detail"></like-comment>
          </div>
        </div>

        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import likeComment from '../likeComment'

export default {
  data () {
    return {

    }
  },
  props: {
    detail: {
      type: Object,
      default: {}
    }
  },
  components: {
    likeComment
  },
  mounted () {

  },
  methods: {

  }
}
</script>

