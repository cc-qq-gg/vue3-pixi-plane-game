import { defineComponent, h, toRefs } from '@vue/runtime-core';
import Boom from '../../assets/boom.png';
import { Texture, Rectangle } from 'pixi.js'
const texture = Texture.from(Boom, { width: 512, height: 1024 })
const rectangle = new Rectangle(160, 315, 150, 160)
texture.frame = rectangle
export default defineComponent({
  props: ['x', 'y'],
  setup(props, ctx) {
    const { x, y } = toRefs(props)
    return {
      x, y
    }
  },
  render(ctx) {
    // 响应式丢失？
    // 这里的x，y 可以用props，
    // 1. reactive props 包裹,然后可以动态修改
    // 2. toRefs {x, y} props
    const { x, y } = ctx
    return h('Container', [
      h('Sprite', {
        texture: { texture },
        x,
        y,
      }),
    ])
  }
})