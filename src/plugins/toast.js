import { reactive } from 'vue'

export default {
  install(app) {
    const state = reactive({
      show: false,
      message: '',
      timeoutId: null,
    })

    function show(message, duration = 3000) {
      state.message = message
      state.show = true

      clearTimeout(state.timeoutId)
      state.timeoutId = setTimeout(() => {
        state.show = false
        state.message = ''
      }, duration)
    }

    function hide() {
      state.show = false
      state.message = ''
      clearTimeout(state.timeoutId)
    }

    const toast = { show, hide, state }

    app.provide('toast', toast)
  }
}
