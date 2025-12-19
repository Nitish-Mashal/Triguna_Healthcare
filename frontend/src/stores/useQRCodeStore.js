import { defineStore } from 'pinia'

export const useQRCodeStore = defineStore('qrCode', {
  state: () => ({
    scannedId: null,
  }),

  actions: {
    // Store scannedId in localStorage
    setScannedId(id) {
      if (!id) return

      this.scannedId = id
      const data = {
        id,
        timestamp: Date.now(),
      }
      localStorage.setItem('scannedId', JSON.stringify(data))
      console.log('✅ Scanned ID saved in localStorage:', id)
    },

    // Load scannedId from localStorage and check expiration
    loadScannedId() {
      const storedData = localStorage.getItem('scannedId')
      if (!storedData) return

      const { id, timestamp } = JSON.parse(storedData)
      const oneDay = 24 * 60 * 60 * 1000 // 1 day in milliseconds
      const isExpired = Date.now() - timestamp > oneDay

      if (isExpired) {
        console.log('⚠️ Scanned ID expired, clearing...')
        this.clearScannedId()
      } else {
        this.scannedId = id
        console.log('✅ Loaded scanned ID from localStorage:', id)
      }
    },

    // Clear scannedId manually
    clearScannedId() {
      this.scannedId = null
      localStorage.removeItem('scannedId')
      console.log('🗑️ Scanned ID cleared')
    },
  },
})

