import { createRenderer } from '@vue/runtime-core'
import { Texture, Sprite, Text, Container } from 'pixi.js'
// createRenderer方法，用于自定义createApp方法，创建视图规则
const renderer = createRenderer({
  createText() { },
  parentNode() { },
  nextSibling() { },
  // 1.创建节点
  createElement(type) {
    // 绘制
    let el
    switch (type) {
      case 'Container':
        el = new Container()
        break
      case 'Sprite':
        el = new Sprite()
        break
    }
    return el
  },
  // 2. 派发props
  patchProp(el, key, preValue, nextValue) {
    // pixi 更改属性
    switch (key) {
      case 'texture':
        el.texture = nextValue.texture || Texture.from(nextValue)
        break
      case 'onClick':
        el.on('pointertap', nextValue)
        break
      default:
        el[key] = nextValue
    }
  },
  // 3.插入节点
  insert(el, parent) {
    parent.addChild(el)
  },
  setElementText(node, text) {
    node.addChild(new Text(text))
  },
  remove(el) {
    const parent = el.parent
    if (parent) {
      parent.removeChild(el)
    }
  },
})
export function createApp(rootComponent) {
  return renderer.createApp(rootComponent)
}