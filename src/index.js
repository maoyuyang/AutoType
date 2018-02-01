import coreMixin from './autotype/core'
import initMixin from './autotype/init'
import { warn, $ } from './utils'

function AutoType (el, actions, options) {
  this.$el = typeof el === 'string' ? $(el) : el
  if (!this.$el) {
    warn('can not resolve the content dom')
  }
  if (!Array.isArray(actions)) {
    warn('actions must be an array')
  }

  this._init(actions, options)
}

AutoType.defaultOptions = {
  speed: 200,
  end: null
}

initMixin(AutoType)
coreMixin(AutoType)

export default AutoType
