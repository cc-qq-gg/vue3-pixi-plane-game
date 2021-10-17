import { defineComponent, h, reactive, onUnmounted, onMounted } from '@vue/runtime-core';
import { PLANE_SPEED, ENEMY_SPEED, BULLET_SPEED, LEFT, RIGHT, UP, DOWN, viewWidth } from '../constant';
import Plane from '../components/Plane';
import Bullet from '../components/Bullet';
import EnemyPlane from '../components/EnemyPlane';
import Boom from '../components/Boom';
import Map from '../components/Map';
import { intersectRect, throttle } from '../utils';
import { game } from '../Game'


export default defineComponent({
  setup(props, ctx) {
    // 飞机
    // 敌机
    // 子弹
    // 游戏控制
    // 碰撞检测  
    // 键盘控制
    const { planInfo, currentDerection, bullets } = useCreatePlane()
    const { enemyPlanes, addEnemyPlane } = useCreateEnemyPlaneInfo()
    const { booms, createBoom, clearBoom } = createBooms()
    setGame({ planInfo, bullets, enemyPlanes, addEnemyPlane, currentDerection, clearBoom, createBoom })
    return {
      planInfo,
      enemyPlanes,
      bullets,
      booms
    }
  },
  render(ctx) {
    const { planInfo: { x, y } } = ctx
    const createEnemyPlanes = () => ctx.enemyPlanes.map(({ x, y }) => h(EnemyPlane, { x, y }))
    const createBullets = () => ctx.bullets.map(({ x, y }) => h(Bullet, { x, y }))
    const createBooms = () => ctx.booms.map(({ x, y }) => h(Boom, { x, y }))
    return h('Container', [
      h(Map),
      h(Plane, { x, y }),
      ...createEnemyPlanes(),
      ...createBullets(),
      ...createBooms()
    ])
  }
})
function setGame({ planInfo, bullets, enemyPlanes, addEnemyPlane, currentDerection, clearBoom, createBoom }) {
  clearBoom = throttle(clearBoom)
  addEnemyPlane = throttle(addEnemyPlane, 2000)
  const changeDeraction = throttle((enemy) => (enemy.deraction = Math.random() < 0.5 ? -1 : 1))
  const gameTicker = () => {
    // 添加敌机
    if (enemyPlanes.length < 20) {
      addEnemyPlane()
    }
    if (enemyPlanes.length > 19) {
      enemyPlanes = enemyPlanes.slice(0, 19)
    }
    // 战机移动
    movePlane(planInfo, currentDerection)
    // 敌机
    enemyPlanes.forEach((enemy, eIdx) => {
      // game over
      if (intersectRect(planInfo, enemy)) {
        // console.log('collision')
      } else {
        // 改变敌机方向
        changeDeraction(enemy)
        // 随机移动
        enemy.y += ENEMY_SPEED
        enemy.x += ENEMY_SPEED * enemy.deraction
        // 越界处理
        checkCross(enemy)
      }

      clearBoom()
      // 敌机子弹碰撞检测
      bullets.forEach((bullet, bIdx) => {
        if (intersectRect(bullet, enemy)) {
          createBoom(bullet.x - 80, bullet.y - 80)
          enemyPlanes.splice(eIdx, 1)
          bullets.splice(bIdx, 1)
        }
      })
    });
    bullets.forEach((bullet) => {
      bullet.y -= BULLET_SPEED
    })
  }
  onMounted(() => {
    game.ticker.add(gameTicker)
  })
  onUnmounted(() => {
    game.ticker.remove(gameTicker)
  })

}
function checkCross(item) {
  if (item.x > viewWidth - 200) {
    item.x = viewWidth - 200
  }
  if (item.x < 0) {
    item.x = 0
  }
}
function movePlane(planInfo, currentDerection) {
  const { leftOrRight, upOrDown } = currentDerection;
  if (currentDerection.ArrowDown && upOrDown === DOWN) {
    planInfo.y += PLANE_SPEED;
  }
  if (currentDerection.ArrowUp && upOrDown === UP) {
    planInfo.y -= PLANE_SPEED;
  }
  if (currentDerection.ArrowLeft && leftOrRight === LEFT) {
    planInfo.x -= PLANE_SPEED;
  }
  if (currentDerection.ArrowRigh && leftOrRight === RIGHT) {
    planInfo.x += PLANE_SPEED;
  }
}

function useCreateEnemyPlaneInfo() {
  const enemyPlanes = reactive([{ x: 150, y: 30, width: 179, height: 134 }])
  const addEnemyPlane = () => enemyPlanes.unshift({
    x: Math.random() * (viewWidth - 150),
    y: -30, width: 179, height: 134,
    deraction: Math.random() < 0.5 ? -1 : 1
  })
  return {
    enemyPlanes,
    addEnemyPlane
  }
}
function createBooms() {
  const booms = reactive([])
  const createBoom = (x, y) => booms.push({ x, y, width: 50, height: 50 })
  const clearBoom = () => booms.pop()
  return {
    booms,
    createBoom,
    clearBoom
  }
}

function useCreatePlane() {
  const planInfo = reactive({ x: 150, y: 650, width: 115, height: 97 })
  const bullets = reactive([])
  const currentDerection = reactive({
    ArrowDown: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowLeft: false,
    leftOrRight: '',
    upOrDown: '',
  })
  const keydownOption = {
    ArrowDown: onArrowDownDown,
    ArrowRight: onArrowRightDown,
    ArrowUp: onArrowUpDown,
    ArrowLeft: onArrowLeftDown,
  }
  const keyupOption = {
    ArrowDown: onArrowDownUp,
    ArrowRight: onArrowRightUp,
    ArrowUp: onArrowUpUp,
    ArrowLeft: onArrowLeftUp,
  }
  function onArrowDownDown() {
    if (currentDerection.upOrDown !== UP) {
      currentDerection.upOrDown = DOWN
    }
    currentDerection.ArrowDown = true
  }
  function onArrowRightDown() {
    if (currentDerection.leftOrRight !== LEFT) {
      currentDerection.leftOrRight = RIGHT
    }
    currentDerection.ArrowRigh = true
  }
  function onArrowUpDown() {
    if (currentDerection.upOrDown !== DOWN) {
      currentDerection.upOrDown = UP
    }
    currentDerection.ArrowUp = true
  }
  function onArrowLeftDown() {
    if (currentDerection.leftOrRight !== RIGHT) {
      currentDerection.leftOrRight = LEFT
    }
    currentDerection.ArrowLeft = true
  }
  function onArrowDownUp() {
    if (currentDerection.ArrowUp) {
      currentDerection.upOrDown = UP
    } else {
      currentDerection.upOrDown = ''

    }
    currentDerection.ArrowDown = false
  }
  function onArrowRightUp() {
    if (currentDerection.ArrowLeft) {
      currentDerection.leftOrRight = LEFT
    } else {
      currentDerection.leftOrRight = ''

    }
    currentDerection.ArrowRigh = false
  }
  function onArrowUpUp() {
    if (currentDerection.ArrowDown) {
      currentDerection.upOrDown = DOWN
    } else {
      currentDerection.upOrDown = ''
    }
    currentDerection.ArrowUp = false
  }
  function onArrowLeftUp() {
    if (currentDerection.ArrowRigh) {
      currentDerection.leftOrRight = RIGHT
    } else {
      currentDerection.leftOrRight = ''
    }
    currentDerection.ArrowLeft = false
  }
  function onKeyDown(e) {
    switch (e.keyCode) {
      case 37:
      case 39:
      case 38:
      case 40: // Arrow keys
      case 32:
        e.preventDefault()
        break; // Space
      default:
        break; // do not block other keys
    }
  };
  const fire = throttle(() => {
    bullets.push({ x: planInfo.x + planInfo.width / 2 - 5, y: planInfo.y - 3, width: 20, height: 50 })
  })
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keydown', e => {
    const code = e.code;
    keydownOption[code]?.()
    if (code === 'Space') {
      fire()
    }
  })
  window.addEventListener('keyup', e => {
    keyupOption[e.code]?.()
  })
  return {
    planInfo,
    bullets,
    currentDerection,
  }
}

