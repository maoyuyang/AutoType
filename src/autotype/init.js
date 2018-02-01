import { merge } from '../utils'

function initMixin (AutoType) {
  AutoType.prototype._init = function (actions, options) {
    this.$actions = actions
    this.$options = merge(AutoType.defaultOptions, options || {})
    this.$queue = []

    this._initStyle()
  }

  AutoType.prototype._initStyle = function () {
    const selector = this.$el.className ? '.' : '#'
    const cssText = `
      @keyframes blink {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    
      ${selector}${this.$el.className || this.$el.id}::after {
        content: '|';
        animation: blink 1000ms infinite;
      }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssText
    document.getElementsByTagName('head')[0].appendChild(style)
  }
}

export default initMixin
