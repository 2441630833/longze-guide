# longze-guide

A lightweight, flexible, and themeable in-app product tour/guide component for Vue 2 and Vue 3.

- **Zero dependency** and easy to drop into any Vue app
- **Targets any element** using CSS selectors
- **Smart positioning** to keep the tooltip in the viewport
- **Customizable theme and colors**
- **Skip/Next/Previous** controls and step indicator

## Installation

```bash
npm install longze-guide
# or
yarn add longze-guide
```

## Compatibility

- Vue 3: Fully supported. Provides an `install(app)` function and works with `createApp`.
- Vue 2: Supported by registering the component directly with `Vue.component('longze-guide', LongzeGuide)`.
- API parity: Props and events are the same between Vue 2 and Vue 3 examples in this README.

## Registration

Register the component globally or import locally.

### Vue 2 (Global)
```js
// main.js
import Vue from 'vue'
import LongzeGuide from 'longze-guide'

Vue.component('longze-guide', LongzeGuide)
```

### Local (Vue 2 or Vue 3)
```vue
<script>
import LongzeGuide from 'longze-guide'
export default { components: { LongzeGuide } }
</script>
```
## Quick Start

Add a ref to the component, pass `steps`, then call `this.$refs.guide.start()`.

```vue
<template>
  <div>
    <section class="toolbar">
      <button class="increment_btn" @click="increment">＋ Increment</button>
      <button class="reset_btn" @click="resetCounter">↺ Reset</button>
    </section>

    <p class="count-display">{{ count }}</p>

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

    <button @click="$refs.guide.start()">Start Guide</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
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

      count: 0
    }
  },
  methods: {
    onGuideComplete() { /* ... */ },
    onGuideSkip() { /* ... */ },
    onGuideStepChange() { /* No dynamic changes needed for this demo */ },

    increment() { this.count += 1 },
    resetCounter() { this.count = 0 }
  }
}
</script>
```

### Start guide method

If you prefer a method wrapper instead of calling the ref inline:

```js
// Longze Guide methods
startGuide() {
  const guide = this.$refs.guide;
  if (guide) {
    guide.start();
  }
}
```

## Steps

Each step is an object in the `steps` array:

- **target**: CSS selector to highlight (e.g., `.btn`, `#field`, `button[data-id="x"]`)
- **title**: Title text in the tooltip
- **content**: Description text
- **position**: One of `top | right | bottom | left`

## Props

- **steps** (Array, default: `[]`): Steps definition.
- **theme** (String, default: `dark`): Visual theme, `dark` or `light`.
- **skipEnabled** (Boolean, default: `true`): Show the Skip button.
- **primaryColor** (String, default: `#e53935`): Main action color.
- **primaryHoverColor** (String, default: `#d32f2f`): Hover color for the main action.
- **highlightColor** (String, default: `#e53935`): Highlight border color around the target.
- **highlightShadowOpacity** (Number, default: `0.3`): Shadow opacity around the highlight.

## Methods

- **start()**: Start the guide at the first step.

Example:

```js
this.$refs.guide.start()
```

## Events

- **@step-change(index: number)**: Fired after the step changes.
- **@skip**: Fired when the user clicks Skip.
- **@complete**: Fired when finishing the last step.

Example:

```vue
<longze-guide @step-change="handleStep" @skip="onSkip" @complete="onDone" />
```

### Handling step changes with `onGuideStepChange`

Use the `index` from the `@step-change` event to coordinate UI changes. The example below shows routing different steps to dedicated methods. If you need to run logic after the very last step, use `onGuideComplete` instead of relying on `index`.

```js
onGuideStepChange(index) {
  if (index === 1) {
    this.test1();
  }
  else if (index === 2) {
    this.test2();
  }
  else if (index === 3) {
    this.test3();
  }
  else if (index === 4) {
    this.test4();
  }
  else if (index === 5) {
    this.test5();
  }
  // For the final step, use onGuideComplete instead of index === 6
},

onGuideComplete() {
  // Trigger logic for the final step here
  this.test6();
}
```

## Theming

Use props to change colors. Example:

```vue
<longze-guide
  :primaryColor="'#FF9800'"
  :primaryHoverColor="'#F57C00'"
  :highlightColor="'#FF9800'"
/>
```

## Notes

- The component uses `document.querySelector` to find the target. Ensure the element exists and is visible when a step starts.
- The positioning logic automatically keeps the tooltip within the viewport; it may flip to the opposite side when there is not enough space.

## Development

```bash
# Install deps
npm install

# Run demo
npm run serve

# Build library
npm run build
```

## License

MIT © Longze
