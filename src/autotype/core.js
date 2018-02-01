import { warn } from '../utils'

function coreMixin (AutoType) {
  AutoType.prototype.run = function () {
    this.$actions.forEach((action) => {
      this.matchType(action)
    })

    this.runQueue()
  }

  AutoType.prototype.runQueue = function () {
    const queue = this.$queue
    const step = (index) => {
      if (index >= queue.length) {
        this.$options.end && this.$options.end()
        return
      }
      const fn = queue[index]
      if (fn) {
        fn(() => { step(index + 1) })
      } else {
        step(index + 1)
      }
    }
    step(0)
  }

  AutoType.prototype.matchType = function (action) {
    if (!action.type) warn('action should has a type')

    switch (action.type) {
      case 'text':
        this.handleText(action)
        break
      case 'wait':
        this.handleWait(action)
        break
      case 'delete':
        this.handleDel(action)
        break
      case 'br':
        this.handleBr(action)
        break
      case 'img':
        this.handleImg(action)
        break
      default:
        warn('Unknown action type')
    }
  }

  AutoType.prototype.handleText = function (action) {
    if (!action.text) warn('text action should has text property')

    this.$queue.push((next) => {
      const wrapper = this.$el
      const textArr = action.text.split('')
      const oldText = wrapper.innerHTML
      let i = 1

      const timer = setInterval(() => {
        wrapper.innerHTML = oldText + textArr.slice(0, i).join('')
        i++
        if (i > textArr.length) {
          clearInterval(timer)
          next()
        }
      }, this.$options.speed)
    })
  }

  AutoType.prototype.handleWait = function (action) {
    if (!action.time) warn('wait action should has time property')

    this.$queue.push((next) => {
      const now = new Date()
      const timer = setInterval(() => {
        const temp = new Date()
        if (temp - now >= action.time) {
          clearInterval(timer)
          next()
        }
      }, 1000 / 60)
    })
  }

  AutoType.prototype.handleDel = function (action) {
    if (!action.num) warn('del action should has del num')

    this.$queue.push((next) => {
      const wrapper = this.$el
      const oldText = wrapper.innerText
      const textArr = oldText.split('')
      let index = 0

      const timer = setInterval(() => {
        wrapper.innerText = textArr.slice(0, textArr.length - index).join('')
        index++
        if (index > action.num) {
          clearInterval(timer)
          next()
        }
      }, this.$options.speed)
    })
  }

  AutoType.prototype.handleBr = function (action) {
    this.$queue.push((next) => {
      const wrapper = this.$el
      wrapper.appendChild(document.createElement('br'))
      next()
    })
  }

  AutoType.prototype.handleImg = function (action) {
    if (!action.src) warn('img action should has src property')
    const className = action.class || ''
    const id = action.id || ''

    this.$queue.push((next) => {
      const wrapper = this.$el
      const img = document.createElement('img')
      img.src = action.src
      img.className = className
      img.id = id
      wrapper.appendChild(img)
      img.onload = function () {
        next()
      }
    })
  }
}

export default coreMixin
