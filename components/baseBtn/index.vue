<style lang="less">

  .cbtn-default {
    background-color: transparent;
    // color: #fff;
    // border-color: #FE6DB5;

    &:hover {
      // background-color: #FE6DB5;
      // border-color: #FE6DB5;
      // color: #fff;
    }
  }

  .cbtn-base {
    height: 44px;
    outline: none;
  }

  .cbtn-gray {
    // background-color: #fff;
    // border-color: #ccc;
  }

  .btn-loading {
    padding-left: 24px;
    background: url('//o3pvuu23u.qnssl.com/candy/images/loading-min.gif') no-repeat;
    background-size: 20px 20px;
    background-position: 0;
  }

</style>

<template>
  <button
    class="cbtn-base"
    :disabled="disabled || loading"
    :class="[ type ? 'cbtn-' + type : 'cbtn-default' ]"
    @click="handleClick">
    <i class="btn-loading" v-if="loading"></i>
    <span><slot></slot></span>
  </button>
</template>

<script>
  export default {
    props: {
      loading: Boolean,
      disabled: Boolean,
      type: {
        type: String,
        default: 'default'
      }
    },
    methods: {
      handleClick (evt) {
        this.$emit('click', evt)
      }
    }
  }
</script>
