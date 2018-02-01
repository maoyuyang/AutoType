## AutoType

一个原生js实现打字效果的库，感觉挺有趣

## demo

![image][./static/img/demo.gif]

## usage

```
<div id="content"></div>

...

const text = [
  { type: 'text', text: '我不是针对你。' },
  { type: 'br' },
  { type: 'wait', time: 1000 },
  { type: 'delete', num: 3 },
  { type: 'wait', time: 1000 },
  { type: 'text', text: '帅哥！' },
  { type: 'wait', time: 1000 },
  { type: 'text', text: '嘻嘻 - -' },
  { type: 'br' },
  { type: 'text', text: '给大家看看我的帅照！' },
  { type: 'br' },
  { type: 'text', text: '...' },
  { type: 'wait', time: 1000 },
  { type: 'br' },
  {
    type: 'img',
    class: 'avatar-class',
    id: 'avatar-id',
    src: './static/img/avatar.jpg'
  }
]

const autoType = new AutoType('#content', text, {
  speed: 200, // 每次打字的间隔
  end: function () {
    alert('哈哈，结束咯') // 结束回调
  }
})

autoType.run()
```

## API

### 初始化
```
  const autoType = new AutoType(selector, actions, options)
  autoType.run()
```

### actions
包括5种类型：text(文本), br(换行), img(插入的图片), del(删除文字), wait(等待)

具体用法可见usage

