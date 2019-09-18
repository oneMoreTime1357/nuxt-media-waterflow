<template>
  <div class="detail-con">
    <div class="detail-inner">
      <div class="po-left">
        <video-com
          class="video-po"
          :media-item="mediaItem"
          :pic-host="activeDetail.picHost"></video-com>
      </div>
      <div class="po-right">
        <detail-comment
          :limit="30"
          :active-detail="activeDetail"
          :init-comment="commentList"></detail-comment>
      </div>
    </div>
  </div>
</template>

<script>
import xss from 'xss'
import request from '~/assets/utils/request'
import Cookie from '~/assets/utils/cookie'
import videoCom from '~/components/videoCom'
import detailComment from '~/components/detailComment'

export default {
  data () {
    return {
      activeDetail: {},
      commentList: []
    }
  },
  asyncData(context) {
    let cookie = request.getSsrContextCookie(context)
    let user_id = cookie['_user_id']
    // console.log(context.req.headers, 'ccccccccccccccccccccccc', user_id)

    return request.all({
      requests: [{
        method: 'get',
        url: '/xsd',
        data: {
          news_id: context.params.id
        },
        context
      }, {
        method: 'get',
        url: '/sdfw',
        data: {
          news_id: context.params.id,
          user_id
        },
        context
      }],
      done (data1, data2) {
        return {
          activeDetail: data1.data && data1.data.data.list[0],
          commentList: data2.data && data2.data.data.list
        }
      }
    })
  },
  components: {
    videoCom,
    detailComment
  },
  computed: {
    mediaItem () {
      // console.log(this.activeDetail.imagesList, 22)
      return this.activeDetail.imagesList && this.activeDetail.imagesList[0]
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style lang="less">
  .detail-con {
    min-width: 1200px;

    .detail-inner {
      position: relative;
      max-width: 1200px;
      min-height: 82vh;
      margin: 0 auto;
      background-color: #fff;

      .po-left {
        position: absolute;
        left: 0;
        width: 700px;
        height: 100%;
        background-color: black;

        .video-po {
          width: 100%;
          height: 100%;
          text-align: center;
        }
      }

      .po-right {
        position: absolute;
        right: 0;
        width: 500px;
        height: 100%;
      }
    }
  }
</style>


