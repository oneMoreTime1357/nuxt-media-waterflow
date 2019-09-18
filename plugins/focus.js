const focus = {
  install (Vue, options) {
    Vue.directive('focus', {
      inserted: function (el, binding) {
        if (binding.value) {
          el.focus()
        } else {
          el.blur()
        }
      },

      componentUdated: function (el, binding) {
        if (binding.modifiers.lazy) {
          if (Boolean(binding.value) == Boolean(binding.oldValue)) {
            return
          }
        }

        if (binding.value) {
          el.focus()
        } else {
          el.blur()
        }
      }
    })
  }
}

export default focus
