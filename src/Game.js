import { Application } from 'pixi.js'
import { viewHeight, viewWidth } from './constant';
// 创建canvas 容器
export const game = new Application({
  width: viewWidth,
  height: viewHeight
})
document.body.append(game.view)
game.renderer.backgroundColor = 0x061639;
document.body.style.background = "#343434"
// 获取game的根容器
export function getRootContainer() {
  return game.stage
}