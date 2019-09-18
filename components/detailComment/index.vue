<style lang="less" scoped>
  @import 'index.less';
</style>

<template>
  <div class="detail-comment-con" :class="{'sub-bg': showSubComment}">
    <tribe-detail
      :detail="activeDetail">

      <comment v-for="item in commentLists"
        :key="item.id"
        :item="item"
        :reply-comment="onReplyComment"
        @subCommentShow="onSubCommentShow"></comment>
      <div class="load-con">
        <span @click="loadMoreComment">{{ commentLoadText }}</span>
      </div>
    </tribe-detail>

    <div class="comment-input">
      <div class="input-con">
        <input ref="inputF" :class="{'cancel-input': isReply}" v-model="commentText" :placeholder="inputPlaceholder || '添加评论'">
        <span @click="cancelReply" v-if="isReply || isAtReply" class="cancel-text">取消回复</span>
      </div>
      <base-btn @click="sendComment" :loading="sending" class="btn-send">发送</base-btn>
    </div>
  </div>
</template>

<script>
import xss from 'xss'
import request from '~/assets/utils/request'
import Cookie from '~/assets/utils/cookie'
import tribeDetail from '~/components/tribeDetail'
import comment from '~/components/comment'
import baseBtn from '~/components/baseBtn'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      token: '',
      inputPlaceholder: '',
      commentText: '',
      isReply: false,
      currentReplyId: '',
      showSubComment: false,
      sending: false,
      commentLists: [],
      tribe_userid: '',
      subComments: [],
      commentCon: {},
      newsId: '',
      offset: 0,
      subcommentEmpty: false,
      isAtReply: false,
      atReplyUserId: '',
      currentSubCommentId: '',
      commentLoadText: '',
      subCommentLoadText: '',
      commentLoadAll: false,
      subCommentLoadAll: false
    }
  },
  props: {
    limit: Number,
    initComment: Array,
    activeDetail: Object
  },
  components: {
    tribeDetail,
    comment,
    baseBtn
  },
  mounted () {
    this.newsId = this.$route.params.id
    // console.log(this.initComment, 4444444444)
    this.commentLists = [].concat(this.initComment)
    this.tribe_userid = Cookie.getCookie('_user_id')
    this.token = Cookie.getCookie('utoken')
    this.commentLoadState(this.initComment)
  },
  methods: {
    ...mapMutations(['setNeedLogin']),
    cancelReply () {
      this.isAtReply = false
      this.isReply = false
      this.inputPlaceholder = ''
      this.commentText = ''
    },
    onReplySubComment (item) {
      // 回复顶层评论
      this.isAtReply = false
      this.currentReplyId = item.id
    },
    onReplyAtComment (item) {
      this.inputPlaceholder = '回复' + item.userName
      this.isAtReply = true
      this.$refs.inputF.focus()
      this.atReplyUserId = item.userId
    },
    onSubCommentShow (commentId) {
      // console.log('二级评论的ID', commentId)
      if (commentId) {
        this.subComments = []
        this.$refs.inputF.focus()
        this.currentReplyId = commentId
        this.getSubComment()
        this.showSubComment = true
      } else {
        this.currentReplyId = ''
        this.showSubComment = false
      }
    },
    onReplyComment (item) { // 回复评论
      this.inputPlaceholder = '回复' + item.userName
      // this.focused = true
      this.$refs.inputF.focus()
      this.isReply = true
      this.currentReplyId = item.id
    },
    sendComment () {
      if (!this.token) {
        this.setNeedLogin(true)
        return
      }

      if (!this.commentText) {
        return
      }
      this.commentText = this.filterText(this.commentText)

      let data = {
        news_id: this.activeDetail.id,
        user_id: +this.tribe_userid,
        comment: this.commentText
      }

      if (this.sending) {
        return
      }

      // 一级回复
      if (this.isReply || this.showSubComment) {
        data = Object.assign(data, {
          comment_id: this.currentReplyId
        })
      }

      if (this.isAtReply) {
        data['at_user_id'] = this.atReplyUserId
      }

      this.commentAction(data)
    },
    commentAction (data, callback) {
      this.sending = true
      request.get({
        url: '/news/comment_tribe_news',
        data,
        done: (res) => {
          // Indicator.close()
          this.sending = false
          if (!res.code) {
            // console.log(res.err.message, 333333, this.$toast)
            let err = res.err.message
            this.$toast({message: err, type: 'error'})
            return
          }
          this.updateCommentData()
          console.log('更新成功')
        },
        fail: () => {
          // Indicator.close()
        }
      })
    },
    filterText (text) {
      return xss(text, {
        whiteList: [],        // 白名单为空，表示过滤所有标签
        stripIgnoreTag: true,      // 过滤所有非白名单标签的HTML
        stripIgnoreTagBody: ['script'] // sc
      })
    },
    updateCommentData () {
      this.commentText = ''
      if (this.showSubComment) {
        this.subComments = []
        this.getSubComment()
      } else {
        this.commentLists = []
        this.getCommentList()
      }
    },
    loadMoreComment () {
      if (!this.commentLoadAll) {
        this.getCommentList()
      }
    },
    getCommentList () {
      const data = {
        news_id: this.newsId,
        offset: this.commentLists.length,
        limit: this.limit,
        type: 1
      }

      if (this.tribe_userid) {
        data.user_id = this.tribe_userid
      }

      request.get({
        url: '/news/get_news_comment',
        data,
        done: res => {
          if (res.err) {
            return
          }

          this.commentLists = this.commentLists.concat(res.data.list)
          this.commentLoadState(res.data.list)
        }
      })
    },
    commentLoadState (data) {
      if (data.length < this.limit) {
        this.commentLoadAll = true
        this.commentLoadText = this.commentLists.length === 0 ? '暂无评论' : '已加载全部评论'
      } else {
        this.commentLoadText = '点击加载更多'
      }
    },
    loadMoreSubComment () {
      if (!this.subCommentLoadAll) {
        this.getSubComment()
      }
    },
    getSubComment () {
      const data = {
        news_id: this.newsId,
        comment_id: this.currentReplyId,
        offset: this.subComments.length,
        limit: this.limit
      }

      if (this.userId) {
        data.user_id = this.userId
      }

      request.get({
        url: '/news/get_sub_comment',
        data,
        done: res => {
          if (res.err) {
            return
          }

          if (this.subComments.length === 0 && res.data.subList.length === 0) {
            this.subcommentEmpty = true
          } else {
            this.subcommentEmpty = false
          }

          this.subComments = this.subComments.concat(res.data.subList)
          if (!this.commentCon.id) {
            this.commentCon = res.data.comment
          }

          if (res.data.subList.length < this.limit) {
            this.subCommentLoadText = '已加载完全部评论'
            this.subCommentLoadAll = false
          } else {
            this.subCommentLoadText = '点击加载更多'
          }
        },
        fail: (err) => {
          // Indicator.close()
          console.log(err)
        }
      })
    }
  }
}
</script>

