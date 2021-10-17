import { defineComponent, h, toRefs } from '@vue/runtime-core';
import EnemyPlane from '../../assets/enemyShip2.png';

export default defineComponent({
  props: ['x', 'y'],
  setup(props, ctx) {
    const { x, y } = toRefs(props)
    return {
      x, y
    }
  },
  render(ctx) {
    // 这里的x，y 可以用props，
    // 1. reactive props 包裹,然后可以动态修改
    // 2. toRefs {x, y} props
    const { x, y } = ctx
    return h('Container', [
      h('Sprite', {
        texture: EnemyPlane,
        x,
        y,
      }),
    ])
  }
})