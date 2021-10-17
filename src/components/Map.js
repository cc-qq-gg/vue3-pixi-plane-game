import { defineComponent, h, ref } from '@vue/runtime-core';
import MapImage from '../../assets/map.jpg';
import { game } from '../Game';
import { viewHeight, MAP_SPEED } from '../constant';
export default defineComponent({
  setup(props, ctx) {
    const map1Y = ref(0)
    const map2Y = ref(-viewHeight)
    game.ticker.add(() => {
      map1Y.value += MAP_SPEED
      map2Y.value += MAP_SPEED
      if (map1Y.value > viewHeight) {
        map1Y.value = -viewHeight
      }
      if (map2Y.value > viewHeight) {
        map2Y.value = -viewHeight
      }
    })
    return {
      map1Y,
      map2Y,
    }
  },
  render(ctx) {
    return h('Container', [
      h('Sprite', { texture: MapImage, y: ctx.map1Y }),
      h('Sprite', { texture: MapImage, y: ctx.map2Y }),
    ])
  }
})