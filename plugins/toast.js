import Vue from 'vue'
import toastMessage from '~/assets/common/toast/index.vue'

const Toast = {}

Toast.install = (Vue) => {
  const ToastConstuctor = Vue.extend(toastMessage)
  let instance
  let timer = null

  // 初始化
  const initInstance = () => {
    instance = new ToastConstuctor()
    let EL = instance.$mount().$el
    document.body.appendChild(EL)
  }

  Vue.prototype.$toast = function (options) {
    if (!instance) {
      initInstance()
    }

    if (timer) {
      clearTimeout(timer)
      timer = null
      instance.show = false
      instance.message = ''
    }

    let time = 2500
    if (typeof options === 'string') {
      instance.message = options
    } else if (typeof options === 'object') {
      let {message, time, type} = options
      instance.message = message
      instance.type = type || 'success'
      time = time || 2500
    } else {
      return
    }

    instance.show = true
    timer = setTimeout(() => {
      instance.show = false
      clearTimeout(timer)
      timer = null
      instance.message = ''
    }, time)
  }
}

export default Toast
