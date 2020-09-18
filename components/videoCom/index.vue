<template>
  <div class="video-con" ref="videoCon" @click.stop="">
    <div v-show="showBtn" @click.stop="playAction" class="video-modal" :style="{'backgroundImage': `url(${cover})`}">
      <i class="video-action-icon" :class="[playing ? 'pause' : 'play']"></i>
    </div>
    <video :src="vedioUrl" ref="videoRef"
      playsinline webkit-playsinline controls
      loop
      preload="auto"
      controlsList="nodownload"
      class="video-style" :style="{'height': height}"></video>
  </div>
</template>

<script>
export default {
  data () {
    return {
      playing: false,   
      showBtn: true
    }
  },
  props: {
    width: Number,
    mediaItem: Object,
    picHost: String
  },
  computed: {
    cover () {
      return this.mediaItem && this.picHost + this.mediaItem.coverUrl
    },
    vedioUrl () {
      return this.mediaItem && this.picHost + this.mediaItem.url
    },
    height () {
      // let width
      if (this.width) {
        // width = this.width
        let height = this.mediaItem && parseInt((this.mediaItem.height / this.mediaItem.width) * this.width)
        return height + 'px'
      } else {
        return `100%`
      }
    }
  },
  mounted () {
    // console.log(this.mediaItem, this.$refs.videoCon.style.width)
  },
  methods: {
    playAction () {
      this.oVideo = this.$refs.videoRef
      console.log(this.oVideo, this.oVideo.width)
      this.oVideo.play()
      this.playing = true
      this.showBtn = false
    }
  }
}
</script>

<style lang="less">
  .video-con {
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
    margin: 0 auto;
    // background-color: #000;

    > img {
      width: 100%;
      height: 100%;
      // height: 285px;
    }

    .video-modal {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9;
      background-repeat: no-repeat;
      background-size: 100%;
    }

    .video-action-icon {
      display: inline-block;
      width: 40px;
      height: 40px;
      cursor: pointer;
      z-index: 10;
    }


    .video-style {
      width: 100%;
      height: 100%;
      display: block;
      background-color: #000;
      // width: initial;
      // object-fit: fill;
    }
  }
</style>
