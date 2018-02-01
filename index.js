import AutoType from './src'

const text = [
  {
    type: 'text',
    text: '我不是针对你。'
  },
  {
    type: 'br'
  },
  {
    type: 'text',
    text: '我的意思其实是--'
  },
  {
    type: 'wait',
    time: 1000
  },
  {
    type: 'text',
    text: '在座的各位都是辣鸡！'
  },
  {
    type: 'wait',
    time: 2000
  },
  {
    type: 'delete',
    num: 3
  },
  {
    type: 'wait',
    time: 1000
  },
  {
    type: 'text',
    text: '帅哥！'
  },
  {
    type: 'wait',
    time: 1000
  },
  {
    type: 'text',
    text: '嘻嘻 - -'
  },
  {
    type: 'br'
  },
  {
    type: 'text',
    text: '给大家看看我的帅照！'
  },
  {
    type: 'br'
  },
  {
    type: 'text',
    text: '...'
  },
  {
    type: 'wait',
    time: 1000
  },
  {
    type: 'br'
  },
  {
    type: 'img',
    class: 'avatar-class',
    id: 'avatar-id',
    src: './static/img/avatar.jpg'
  }
]

const autoType = new AutoType('#content', text, {
  speed: 200,
  end: function () {
    alert('哈哈，结束咯')
  }
})

autoType.run()
