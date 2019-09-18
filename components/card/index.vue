<style lang="less">
  @import 'index.less';
</style>

<template>
  <article class="card-con" @click="toDetail">
    <div class="card-inner">
      <div @click.stop="toUser" class="head">
        <img class="avater" :src="item.portraitUrl && item.portraitUrl.indexOf('http') > -1 ? item.portraitUrl + '?imageView2/1/w/64/h/64' : item.picHost + item.portraitUrl + '?imageView2/1/w/64/h/64'">
        <span class="name">{{ item.userName }}</span>
      </div>

      <div class="media-con">
        <video-com
          :media-item="mediaItem"
          :pic-host="item.picHost"
          :width="285"></video-com>
      </div>

      <div class="info-con">
        <pre class="text-con">{{ item.content }}</pre>
      </div>
      <div class="foot-comment">
        <like-comment :detail="item"></like-comment>
      </div>
    </div>
  </article>
</template>

<script>
import likeComment from '../likeComment'
import videoCom from '../videoCom'

export default {
  data () {
    return {
      playing: false,
      videoR: '',
      showBtn: true,
      oVideo: null
    }
  },
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  watch: {
  },
  components: {
    likeComment,
    videoCom
  },
  mounted () {

  },
  computed: {
    mediaItem () {
      return this.item && this.item.imagesList[0]
    }
  },
  methods: {
    toUser () {
      this.$router.push({ path: `/user/${this.item.userId}`})
    },
    toDetail () {
      this.$router.push({ path: `/detail/${this.item.id}`})
    }
    // playAction () {
    //   this.oVideo = this.$refs.videoRef
    //   console.log(this.oVideo)
    //   this.oVideo.play()
    //   this.playing = true
    //   this.showBtn = false
    // }
  }
}
</script>


