import { defineComponent, h, computed, ref } from '@vue/runtime-core'
import StartPage from './pages/StartPage'
import GamePage from './pages/GamePage';

export default defineComponent({
  setup() {
    // const currentPageName = ref('StartPage')
    const currentPageName = ref('GamePage')
    function onChangePage(page) {
      currentPageName.value = page
    }
    const currentPage = computed(() => {
      if (currentPageName.value === 'StartPage') {
        return StartPage
      }
      if (currentPageName.value === 'GamePage') {
        return GamePage
      }
    })
    return {
      onChangePage,
      currentPage,
      currentPageName
    }
  },
  render(ctx) {
    const { onChangePage } = ctx;
    return h('Container', [h(ctx.currentPage, { onChangePage })])
  }
})