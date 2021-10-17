import { defineComponent, h } from '@vue/runtime-core';
import StartBtn from '../../assets/player.png';

export default defineComponent({
  setup(props, ctx) {
    function click() {
      console.log('click')
      ctx.emit('changePage', 'GamePage')
    }
    return {
      click
    }
  },
  render(ctx) {
    return h('Container', [
      h('Sprite', {
        texture: StartBtn,
        x: 265,
        y: 530,
        interactive: true,
        onClick: ctx.click
      }),
    ])
  }
})