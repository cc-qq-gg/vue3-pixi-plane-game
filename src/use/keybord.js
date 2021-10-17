import { reactive } from '@vue/runtime-core';
import useKeyEvent from './useKeyEvent';
// 
const planInfo = reactive({
  x: 150,
  y: 650,
  width: 115,
  height: 97,
  currentDerection: {
    ArrowDown: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowLeft: false,
    leftOrRight: '',
    upOrDown: '',
  }
})
export default function useCreatePlane() {
  setPlaneInfo();
  return {
    planInfo,
  }
}
function setPlaneInfo() {
  const { keyupOption, keydownOption } = getKeyBordConfig();
  const handleDefault = e => {
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
  }
  useKeyEvent({ keyupOption, keydownOption })
  useKeyEvent({ keydownOption: handleDefault })
}

function getKeyBordConfig() {
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
    if (planInfo.currentDerection.upOrDown !== UP) {
      planInfo.currentDerection.upOrDown = DOWN
    }
    planInfo.currentDerection.ArrowDown = true
  }
  function onArrowRightDown() {
    if (planInfo.currentDerection.leftOrRight !== LEFT) {
      planInfo.currentDerection.leftOrRight = RIGHT
    }
    planInfo.currentDerection.ArrowRigh = true
  }
  function onArrowUpDown() {
    if (planInfo.currentDerection.upOrDown !== DOWN) {
      planInfo.currentDerection.upOrDown = UP
    }
    planInfo.currentDerection.ArrowUp = true
  }
  function onArrowLeftDown() {
    if (planInfo.currentDerection.leftOrRight !== RIGHT) {
      planInfo.currentDerection.leftOrRight = LEFT
    }
    planInfo.currentDerection.ArrowLeft = true
  }
  function onArrowDownUp() {
    if (planInfo.currentDerection.ArrowUp) {
      planInfo.currentDerection.upOrDown = UP
    } else {
      planInfo.currentDerection.upOrDown = ''

    }
    planInfo.currentDerection.ArrowDown = false
  }
  function onArrowRightUp() {
    if (planInfo.currentDerection.ArrowLeft) {
      planInfo.currentDerection.leftOrRight = LEFT
    } else {
      planInfo.currentDerection.leftOrRight = ''

    }
    planInfo.currentDerection.ArrowRigh = false
  }
  function onArrowUpUp() {
    if (planInfo.currentDerection.ArrowDown) {
      planInfo.currentDerection.upOrDown = DOWN
    } else {
      planInfo.currentDerection.upOrDown = ''
    }
    planInfo.currentDerection.ArrowUp = false
  }
  function onArrowLeftUp() {
    if (planInfo.currentDerection.ArrowRigh) {
      planInfo.currentDerection.leftOrRight = RIGHT
    } else {
      planInfo.currentDerection.leftOrRight = ''
    }
    planInfo.currentDerection.ArrowLeft = false
  }
  return {
    keydownOption,
    keyupOption
  }
}