<template>
  <div id="app">
    <header class="app-header">
      <img alt="Vue logo" src="./assets/logo.png" class="logo">
      <h1>Longze Guide Demo</h1>
      <button class="start-btn" @click="startGuide">Start Guide</button>
    </header>

    <main class="demo-area">
      <section class="toolbar">
        <button class="plus_guide" @click="showCreatePageDialog = true">＋ New Page</button>
        <button class="import_guide" @click="showImportDialog = true">⇪ Import</button>
        <button class="danger" @click="showDeleteDialog = true">🗑 Delete</button>
      </section>

      <section class="content">
        <div v-if="showCreatePageDialog" class="dialog create-page-dialog">
          <h3>Create Page</h3>
          <label>
            Model
            <select v-model="selectedPageModel">
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
              <option value="orange">Orange</option>
            </select>
          </label>
          <textarea v-model="pageDescription" placeholder="Describe your page..."></textarea>
          <div class="dialog-actions">
            <button @click="confirmCreatePage">Create</button>
            <button @click="closeCreatePageDialog">Cancel</button>
          </div>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </div>

        <div v-if="showImportDialog" class="dialog import-dialog">
          <h3>Import</h3>
          <label>
            Type
            <select v-model="selectedImportType">
              <option value="image">Image</option>
              <option value="json">JSON</option>
            </select>
          </label>
          <input type="file" multiple @change="onImportFiles">
          <div class="dialog-actions">
            <button @click="confirmImport">Import</button>
            <button @click="closeImportDialog">Cancel</button>
          </div>
          <p v-if="importError" class="error">{{ importError }}</p>
        </div>

        <div v-if="showDeleteDialog" class="dialog delete-dialog">
          <h3>Confirm Delete</h3>
          <p>Are you sure you want to delete this item?</p>
          <div class="dialog-actions">
            <button class="danger" @click="confirmDelete">Delete</button>
            <button @click="closeDeleteDialog">Cancel</button>
          </div>
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
          target: '.plus_guide',
          title: 'First Step',
          content: 'Click the + button to add a new page to your project.',
          position: 'bottom'
        },
        {
          target: '.create-page-dialog',
          title: 'Second Step',
          content: 'Fill in details to create a new page for your project.',
          position: 'right'
        },
        {
          target: '.import_guide',
          title: 'Third Step',
          content: 'Click Import to bring an existing page into your project.',
          position: 'right'
        }
      ],

      // Demo dialogs/state
      showCreatePageDialog: false,
      selectedPageModel: 'apple',
      pageDescription: '',
      errorMessage: '',

      showImportDialog: false,
      importFileList: [],
      importError: '',
      selectedImportType: 'image',

      showDeleteDialog: false
    }
  },
  methods: {
    startGuide() {
      // Ensure initial UI state for the walkthrough
      this.showCreatePageDialog = false
      this.showImportDialog = false
      this.showDeleteDialog = false
      this.$refs.guide.start()
    },

    // Guide event handlers
    onGuideComplete() {
      this.showCustomToast('Finish Guide！', 'success')
    },
    onGuideSkip() {
      this.showCustomToast('Already Skip Guide', 'none')
    },
    onGuideStepChange(index) {
      if (index === 1) {
        this.showCreatePageDialog = true
        this.pageDescription = ''
        this.errorMessage = ''
        this.selectedPageModel = 'apple'
      } else if (index === 2) {
        this.showCreatePageDialog = false
      } else if (index === 3) {
        this.showImportDialog = true
        this.importFileList = []
        this.importError = ''
        this.selectedImportType = 'image'
      } else if (index === 4) {
        this.closeImportDialog()
      } else if (index === 5) {
        this.showDeleteDialog = true
      } else if (index === 6) {
        this.closeDeleteDialog()
      }
    },

    // Demo helpers
    showCustomToast(message, type) {
      // Minimal toast replacement
      // eslint-disable-next-line no-alert
      alert(`${type ? '[' + type + '] ' : ''}${message}`)
    },

    closeCreatePageDialog() {
      this.showCreatePageDialog = false
    },
    confirmCreatePage() {
      if (!this.pageDescription.trim()) {
        this.errorMessage = 'Description is required.'
        return
      }
      this.errorMessage = ''
      this.showCreatePageDialog = false
      this.showCustomToast('Page created', 'success')
    },

    onImportFiles(event) {
      this.importFileList = Array.from(event.target.files || [])
    },
    closeImportDialog() {
      this.showImportDialog = false
    },
    confirmImport() {
      if (this.importFileList.length === 0) {
        this.importError = 'Please select at least one file.'
        return
      }
      this.importError = ''
      this.showImportDialog = false
      this.showCustomToast('Import started', 'success')
    },

    closeDeleteDialog() {
      this.showDeleteDialog = false
    },
    confirmDelete() {
      this.showDeleteDialog = false
      this.showCustomToast('Deleted', 'success')
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
.toolbar .danger {
  background: #ffe7e7;
  color: #b00020;
}
.content {
  margin-top: 24px;
}
.dialog {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  max-width: 420px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,.06);
}
.dialog h3 { margin: 0 0 12px; }
.dialog textarea {
  width: 100%;
  min-height: 80px;
  margin-top: 8px;
}
.dialog-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 12px;
}
.error { color: #b00020; }
</style>
