import { defineComponent, h } from '@vue/runtime-core';
import startPageImage from '../../assets/map.png';
console.log(startPageImage, 'startPageImage')
export default defineComponent({
  setup() {

  },
  render() {
    return h('Container', [h('Sprite', { texture: startPageImage })])
  }
})