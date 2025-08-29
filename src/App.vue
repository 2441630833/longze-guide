<template>
  <div id="app">
    <header class="app-header">
      <img alt="Vue logo" src="./assets/logo.png" class="logo">
      <h1>Longze Guide Demo</h1>
      <button class="start-btn" @click="startGuide">Start Guide</button>
    </header>

    <main class="demo-area">
      <section class="toolbar">
        <button class="increment_btn" @click="increment">＋ Increment</button>
        <button class="reset_btn" @click="resetCounter">↺ Reset</button>
      </section>

      <section class="content">
        <div class="counter-card">
          <h3>Counter</h3>
          <p class="count-display">{{ count }}</p>
          <p class="hint">Use the buttons above to change the value.</p>
        </div>
      </section>
    </main>

    <!-- Longze Guide Component -->
    <longze-guide
      ref="guide"
      :steps="guideSteps"
      :theme="guideTheme"
      :primaryColor="'#FF9800'"
      :primaryHoverColor="'#F57C00'"
      :highlightColor="'#FF9800'"
      :skip-enabled="true"
      @complete="onGuideComplete"
      @skip="onGuideSkip"
      @step-change="onGuideStepChange"
    />
  </div>
</template>

<script>
import LongzeGuide from './components/longze-guide.vue'

export default {
  name: 'App',
  components: { LongzeGuide },
  data() {
    return {
      // Guide state
      guideTheme: 'dark',
      guideSteps: [
        {
          target: '.increment_btn',
          title: 'Increase the counter',
          content: 'Click Increment to add 1 to the counter value.',
          position: 'bottom'
        },
        {
          target: '.count-display',
          title: 'Current value',
          content: 'This number updates every time you click Increment.',
          position: 'right'
        },
        {
          target: '.reset_btn',
          title: 'Reset to zero',
          content: 'Click Reset to set the counter back to 0.',
          position: 'right'
        }
      ],

      // Counter state
      count: 0
    }
  },
  methods: {
    startGuide() {
      this.$refs.guide.start()
    },

    // Guide event handlers
    onGuideComplete() {
      this.showCustomToast('Finish Guide！', 'success')
    },
    onGuideSkip() {
      this.showCustomToast('Already Skip Guide', 'none')
    },
    onGuideStepChange() {
      // No dynamic UI changes required for the counter walkthrough
    },

    // Demo helpers
    showCustomToast(message, type) {
      // Minimal toast replacement
      // eslint-disable-next-line no-alert
      alert(`${type ? '[' + type + '] ' : ''}${message}`)
    },

    // Counter actions
    increment() {
      this.count += 1
    },
    resetCounter() {
      this.count = 0
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.logo {
  width: 64px;
  height: 64px;
}
.app-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #eee;
}
.start-btn {
  margin-left: auto;
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.demo-area {
  padding: 24px;
}
.toolbar {
  display: flex;
  gap: 12px;
}
.toolbar button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
}
.content {
  margin-top: 24px;
}
.counter-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  max-width: 420px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,.06);
}
.counter-card h3 { margin: 0 0 12px; }
.count-display {
  font-size: 40px;
  margin: 8px 0 4px;
}
.hint {
  color: #666;
  margin: 0;
  font-size: 12px;
}
</style>
