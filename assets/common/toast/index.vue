<template>
  <div v-if="show" class="toast-container" :class="[type === 'error' ? 'error' : 'success']">
    <!-- <i class="close-icon"></i> -->
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      show: false,
      type: 'success'
    }
  }
}
</script>

<style lang="less" scoped>
  .toast-container {
    padding: 10px;
    position: fixed;
    left: 50%;
    top: 78px;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    color: #333;
    z-index: 1000;
    min-width: 320px;
    max-width: 600px;
    border-radius: 4px;
    text-align: center;
    font-size: 15px;
  }

  .error {
    background-color: fade(#D14B64, 10%);
    color: #D14B64;
  }

  .success {
    background-color: fade(#03AD8F, 10%);
    color: #03AD8F;
  }
</style>

