import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Frappe UI imports
import { Button, setConfig, frappeRequest, resourcesPlugin } from 'frappe-ui'

// Vue G-Tag (fixed for Vue 3)
import { createGtag } from 'vue-gtag'
import router from './router'


// Element Plus imports
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// ✅ Create app once
const app = createApp(App)

// ✅ Create and use Pinia
const pinia = createPinia()
app.use(pinia)

// ✅ Store scannedId from URL into Pinia + localStorage
import { useQRCodeStore } from './stores/useQRCodeStore'

const urlParams = new URLSearchParams(window.location.search)
const scannedId = urlParams.get('scannedId')

if (scannedId) {
  const qrStore = useQRCodeStore(pinia) // Pass pinia instance
  qrStore.setScannedId(scannedId)
  console.log('✅ Scanned ID stored from URL:', scannedId)
}

// ✅ Frappe UI setup
setConfig('resourceFetcher', frappeRequest)
app.use(resourcesPlugin)

// ✅ Vue Router
app.use(router)

// ✅ Element Plus
app.use(ElementPlus)

// ✅ Vue G-Tag
app.use(
  createGtag,
  {
    config: { id: 'AW-17112290457' }
  },
  router
)

// ✅ Global Components
app.component('Button', Button)

// ✅ Mount app
app.mount('#app')
