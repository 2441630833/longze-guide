import LongzeGuide from './components/longze-guide.vue'

export { LongzeGuide }

export default LongzeGuide

export function install(app) {
  if (!app || !app.component) return
  app.component('longze-guide', LongzeGuide)
} 