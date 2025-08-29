# longze-guide

A lightweight, flexible, and themeable in-app product tour/guide component for Vue 2.

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

## Registration

Register the component globally or import locally.

```js
// Global (main.js)
import Vue from 'vue'
import LongzeGuide from 'longze-guide'

Vue.component('longze-guide', LongzeGuide)
```

```vue
<!-- Local (inside a component) -->
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
    <button class="plus_guide" @click="onPlus">＋ New Page</button>
    <button class="import_guide" @click="onImport">⇪ Import</button>

    <longze-guide
      ref="guide"
      :steps="guideSteps"
      :theme="guideTheme"
      :primaryColor="'#e53935'"
      :primaryHoverColor="'#d32f2f'"
      :highlightColor="'#e53935'"
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
          target: '.plus_guide',
          title: 'First Step',
          content: 'Click the + button to add a new page to your project',
          position: 'bottom'
        },
        {
          target: '.create-page-dialog',
          title: 'Second Step',
          content: 'Create a new page for your project here',
          position: 'right'
        },
        {
          target: '.import_guide',
          title: 'Third Step',
          content: 'Click Import to bring a page into your project',
          position: 'right'
        }
      ]
    }
  },
  methods: {
    onGuideComplete() { /* ... */ },
    onGuideSkip() { /* ... */ },
    onGuideStepChange(index) {
      if (index === 1) {
        // Open your dialog as the second step begins
        this.$emit('open-create-dialog')
      }
    }
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

## Theming

Use props to change colors. Example:

```vue
<longze-guide
  :primaryColor="'#3f51b5'"
  :primaryHoverColor="'#32408f'"
  :highlightColor="'#3f51b5'"
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
