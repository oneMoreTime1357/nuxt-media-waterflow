<template>
  <div class="skeleton-con">
    <!-- <div class="skeleton-inner">
      <div class="head">
        <div class="avater"></div>
        <p class="name"></p>
      </div> -->

      <!-- <div class="media-con"></div> -->

      <!-- <div class="info-con">
        <p style="width: 60%"></p>
        <p style="width: 50%"></p>
        <p style="width: 70%"></p>
      </div>
    </div> -->
    <!-- <content-loader
      :height="480"
      :width="285">
      <circle cx="30" cy="30" r="30" />
      <rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
      <rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
      <rect x="0" y="70" rx="5" ry="5" width="400" height="400" />
    </content-loader> -->
    <div class="skeleton-inner">
      <facebook-loader unique-key="123aaw1"></facebook-loader>
    </div>
    <div class="skeleton-inner">
      <facebook-loader unique-key="123aawa"></facebook-loader>
    </div>
  </div>
</template>

<script>
import { FacebookLoader } from 'vue-content-loader'

export default {
  components: {
    FacebookLoader
  }
}
</script>

<style lang="less" scoped>

.skeleton-con {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 80vh;
  background-color: #F9FAFF;
  // background-color: #fff;
  padding-left: 30px;
  padding-right: 30px;
  z-index: 200;

  .skeleton-inner {
    width: 320px;
    padding-bottom: 16px;
    cursor: pointer;
    float: left;
    background-color: #fff;
    margin-right: 20px;
    padding: 16px;

    .head {
      padding: 16px;

      .avater {
        position: relative;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 12px;
        background-color: #F0EEF0;
      }

      .name {
        position: absolute;
        left: 48px;
        top: 24px;
        width: 40px;
        height: 10px;
        background-color: #F0EEF0;
      }
    }

    .media-con {
      width: 100%;
      height: 380px;
      background-color: #F0EEF0;
    }

    .info-con {
      padding: 20px 16px 16px;

      > p {
        background-color: #F0EEF0;
      }
    }
  }
}


</style>
