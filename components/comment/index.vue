<style lang="less" scoped>
  @import './index.less';
</style>

<template>
  <div class="comment-item">
    <div class="comment-inner">
      <div class="head-con">
        <div class="name-time">
          <p class="name">{{ item.userName }}</p>
          <p class="time">{{ formateDate }}</p>
        </div>

        <img :src="item.avatar + '?imageView2/1/w/64/h/64'" alt="">

        <ul class="zan-comment">
          <li @click="replyAction"><span class="reply-btn">回复</span></li>
          <li><span class="line">|</span></li>
          <li><i @click="zanCommentAction" class="zan-s" :class="[ item.upped ? 'zan-active-icon' : 'zan-png' ]"></i><span>{{ item.upCount }}</span></li>
        </ul>
      </div>

      <div class="comment-info">
        <pre class="comment-text"><span v-if="item.atUserId !== -1">回复 {{ item.atUserName }}:</span> {{ item.content }}</pre>

        <div v-if="item && item.subCommentList" class="sub-comment">
          <div v-for="subItem in item.subCommentList" :key="subItem.id" class="sub-comment-list">
            <div class="active-content sub-content">
              <p class="name detail-text">
                <span class="blue-text">{{ subItem.userName }}</span>:
                <!-- {{ subItem.status === 1 ? '原评论已删除' : subItem.content }} -->
                <span v-if="subItem.status === 1" class="detail-text del-text">原评论已删除</span>
                <span v-else class="detail-text" ref="text-html">{{ subItem.content }}</span>
              </p>
            </div>
          </div>
          <span v-if="item.subCommentCount > 2" @click="showSubComment" class="comment-count">共{{ item && item.subCommentCount }}条回复></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '~/assets/utils/request'
import cookie from '~/assets/utils/cookie'
import { dateFormat } from '~/assets/utils/date'

export default {
  data () {
    return {
      userId: ''
    }
  },
  props: {
    item: Object,
    replyComment: Function
  },
  computed: {
    formateDate () {
      return dateFormat(new Date(this.item.createTime - 28800000), 'MM月DD日 hh:mm')
    }
  },
  mounted () {
    this.userId = cookie.getCookie('_user_id')
  },
  methods: {
    zanCommentAction () {
      if (!this.userId) {
        return
      }

      request.get({
        url: '/news/up_news_comment',
        data: {
          comment_id: this.item.id,
          user_id: this.userId
        },
        done: (res) => {
          if (!res.code) {
            return
          }

          if (this.item.upped === 0) {
            this.item.upped = 1
            this.item.upCount += 1
          } else {
            this.item.upped = 0
            this.item.upCount -= 1
          }
        },
        fail: (err) => {
          console.log(err)
        }
      })
    },
    replyAction () {
      this.replyComment(this.item)
    },
    showSubComment () {
      this.$emit('subCommentShow', this.item.id)
    }
  }
}
</script>
