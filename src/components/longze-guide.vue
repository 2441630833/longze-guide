<template>
  <div class="longze-guide" :class="[theme]" :style="cssVars">
    <div v-if="visible" class="guide-container">
      <!-- Mask layer -->
      <div v-if="theme === 'dark'" class="mask-layer">
        <div class="mask-top" :style="{
          left: '0',
          top: '0',
          right: '0',
          height: targetPosition.top + 'px'
        }"></div>
        <div class="mask-right" :style="{
          left: (targetPosition.left + targetPosition.width) + 'px',
          top: targetPosition.top + 'px',
          right: '0',
          height: targetPosition.height + 'px'
        }"></div>
        <div class="mask-bottom" :style="{
          left: '0',
          top: (targetPosition.top + targetPosition.height) + 'px',
          right: '0',
          bottom: '0'
        }"></div>
        <div class="mask-left" :style="{
          left: '0',
          top: targetPosition.top + 'px',
          width: targetPosition.left + 'px',
          height: targetPosition.height + 'px'
        }"></div>
      </div>
      
      <!-- Highlight border -->
      <div class="highlight-border" :style="{
        left: targetPosition.left + 'px',
        top: targetPosition.top + 'px',
        width: targetPosition.width + 'px',
        height: targetPosition.height + 'px'
      }"></div>
      
      <!-- Guide box -->
      <div class="guide-box" :style="guideBoxStyle" :class="[guideBoxClass]">
        <div class="content">
          <span class="title">{{ currentStep ? currentStep.title : '' }}</span>
          <span class="description">{{ currentStep ? currentStep.content : '' }}</span>
        </div>
        
        <div class="actions">
          <button v-if="currentIndex > 0" class="btn-prev" @click="prevStep">Previous</button>
          <button v-if="skipEnabled" class="btn-skip" @click="skipGuide">Skip</button>
          <button class="btn-next" @click="nextStep">
            {{ isLastStep ? 'Done' : 'Next' }}
          </button>
        </div>
        
        <div class="step-indicator">
          <span>{{ currentIndex + 1 }}/{{ steps.length }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'longze-guide',
  
  props: {
    steps: {
      type: Array,
      default: () => []
    },
    theme: {
      type: String,
      default: 'dark'
    },
    skipEnabled: {
      type: Boolean,
      default: true
    },
    // Primary action color (e.g., Next button)
    primaryColor: {
      type: String,
      default: '#e53935'
    },
    // Hover color for primary action
    primaryHoverColor: {
      type: String,
      default: '#d32f2f'
    },
    // Highlight border color for target element
    highlightColor: {
      type: String,
      default: '#e53935'
    },
    // Opacity for highlight shadow (0-1)
    highlightShadowOpacity: {
      type: Number,
      default: 0.3
    }
  },
  
  data() {
    return {
      visible: false,
      currentIndex: 0,
      targetPosition: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      }
    }
  },
  
  computed: {
    currentStep() {
      return this.steps[this.currentIndex] || null;
    },
    
    isLastStep() {
      return this.currentIndex === this.steps.length - 1;
    },
    
    guideBoxStyle() {
      if (!this.currentStep) return {};
      
      const position = this.currentStep.position || 'bottom';
      const offset = 15; // Increased offset for better spacing
      const left_offset = 45;
      const top_offset = 70;
      const guideBoxWidth = 300; // Fixed width of guide box
      const guideBoxHeight = 120; // Approximate height of guide box
      
      let left, top;
      
      // Calculate initial position with proper margins and centering
      switch (position) {
        case 'top':
          // Position above the target with margin, center horizontally
          left = this.targetPosition.left + (this.targetPosition.width / 2) - (guideBoxWidth / 2);
          top = this.targetPosition.top - top_offset - guideBoxHeight;
          break;
        case 'bottom':
          // Position below the target with margin, center horizontally
          left = this.targetPosition.left + (this.targetPosition.width / 2) - (guideBoxWidth / 2);
          top = this.targetPosition.top + this.targetPosition.height + offset;
          break;
        case 'left':
          // Position to the left of the target with margin, center vertically
          left = this.targetPosition.left - left_offset - guideBoxWidth;
          top = this.targetPosition.top + (this.targetPosition.height / 2) - (guideBoxHeight / 2);
          break;
        case 'right':
          // Position to the right of the target with margin, center vertically
          left = this.targetPosition.left + this.targetPosition.width + offset;
          top = this.targetPosition.top + (this.targetPosition.height / 2) - (guideBoxHeight / 2);
          break;
        default:
          left = this.targetPosition.left + (this.targetPosition.width / 2) - (guideBoxWidth / 2);
          top = this.targetPosition.top + this.targetPosition.height + offset;
      }
      
      // Get viewport dimensions
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // Adjust position to keep guide box within viewport
      if (position === 'left' && left < 10) {
        // If left position would go off-screen, switch to right
        left = this.targetPosition.left + this.targetPosition.width + offset;
      } else if (position === 'right' && left + guideBoxWidth > viewportWidth - 10) {
        // If right position would go off-screen, switch to left
        left = this.targetPosition.left - offset - guideBoxWidth;
      } else if (position === 'top' && top < 10) {
        // If top position would go off-screen, switch to bottom
        top = this.targetPosition.top + this.targetPosition.height + offset;
      } else if (position === 'bottom' && top + guideBoxHeight > viewportHeight - 10) {
        // If bottom position would go off-screen, switch to top
        top = this.targetPosition.top - offset - guideBoxHeight;
      }
      
      // Ensure guide box doesn't go off-screen horizontally
      if (left < 10) left = 10;
      if (left + guideBoxWidth > viewportWidth - 10) {
        left = viewportWidth - guideBoxWidth - 10;
      }
      
      // Ensure guide box doesn't go off-screen vertically
      if (top < 10) top = 10;
      if (top + guideBoxHeight > viewportHeight - 10) {
        top = viewportHeight - guideBoxHeight - 10;
      }
      
      return {
        left: left + 'px',
        top: top + 'px'
      };
    },
    
    guideBoxClass() {
      if (!this.currentStep) return '';
      // Remove position classes as we're handling positioning in JavaScript
      return '';
    },
    
    cssVars() {
      return {
        '--lg-primary': this.primaryColor,
        '--lg-primary-hover': this.primaryHoverColor,
        '--lg-highlight': this.highlightColor,
        '--lg-highlight-shadow': this.hexToRgba(this.highlightColor, this.highlightShadowOpacity)
      }
    }
  },
  
  mounted() {
    // Add window resize listener for guide positioning
    window.addEventListener('resize', this.handleResize);
  },
  
  beforeUnmount() {
    // Remove window resize listener
    window.removeEventListener('resize', this.handleResize);
  },
  
  methods: {
    start() {
      if (this.steps.length === 0) return;
      
      this.currentIndex = 0;
      this.visible = true;
      this.updateTargetPosition();
    },
    
    nextStep() {
      if (this.isLastStep) {
        this.complete();
      } else {
        this.currentIndex++;
        this.updateTargetPosition();
        this.$emit('step-change', this.currentIndex);
      }
    },
    
    prevStep() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.updateTargetPosition();
        this.$emit('step-change', this.currentIndex);
      }
    },
    
    skipGuide() {
      this.visible = false;
      this.$emit('skip');
    },
    
    complete() {
      this.visible = false;
      this.$emit('complete');
    },
    
    updateTargetPosition() {
      if (!this.currentStep) return;
      
      // Ensure DOM is updated before measuring
      this.$nextTick(() => {
        const targetElement = document.querySelector(this.currentStep.target);
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect();
          this.targetPosition = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height
          };
        }
      });
    },
    
    handleResize() {
      // Update target position when window is resized
      if (this.visible) {
        this.updateTargetPosition();
      }
    },
    
    hexToRgba(hex, alpha = 1) {
      if (!hex) return `rgba(0,0,0,${alpha})`;
      let normalized = hex.replace('#', '');
      if (normalized.length === 3) {
        normalized = normalized.split('').map(c => c + c).join('');
      }
      const r = parseInt(normalized.substring(0, 2), 16);
      const g = parseInt(normalized.substring(2, 4), 16);
      const b = parseInt(normalized.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }
}
</script>

<style scoped>
.longze-guide {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  pointer-events: none;
}

.guide-container {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: auto;
}

.mask-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.mask-top,
.mask-right,
.mask-bottom,
.mask-left {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
}

.highlight-border {
  position: absolute;
  border: 2px solid var(--lg-highlight);
  border-radius: 4px;
  box-shadow: 0 0 0 4px var(--lg-highlight-shadow);
  pointer-events: none;
}

.guide-box {
  position: absolute;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 300px;
  min-width: 250px;
  z-index: 10000;
}

.guide-box.light {
  background-color: white;
  color: #333;
}

.guide-box.dark {
  background-color: #333;
  color: white;
}

.content {
  margin-bottom: 16px;
}

.title {
  display: block;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.description {
  display: block;
  font-size: 14px;
  line-height: 1.4;
  color: #666;
}

.actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.btn-prev,
.btn-skip,
.btn-next {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-prev {
  background-color: #f0f0f0;
  color: #666;
}

.btn-prev:hover {
  background-color: #e0e0e0;
}

.btn-skip {
  background-color: transparent;
  color: #999;
  border: 1px solid #ddd;
}

.btn-skip:hover {
  background-color: #f5f5f5;
}

.btn-next {
  background-color: var(--lg-primary);
  color: white;
}

.btn-next:hover {
  background-color: var(--lg-primary-hover);
}

.step-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 12px;
  color: #999;
}

/* Position classes - removed as positioning is now handled in JavaScript */
</style> 