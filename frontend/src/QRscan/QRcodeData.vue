<template>
  <div>
    <!-- Display current scanned ID -->
    <p><strong>Scanned ID:</strong> {{ qrStore.scannedId || 'No ID scanned yet' }}</p>

    <!-- Simulate scanning a QR code -->
    <button @click="simulateScan">Simulate Scan</button>
    <button @click="qrStore.clearScannedId">Clear Scan</button>
  </div>
</template>

<script setup>
import { useQRCodeStore } from '@/stores/useQRCodeStore'

const qrStore = useQRCodeStore()

// Simulate scanning a QR code (hardcoded ID)
function simulateScan() {
  const newId = 'HOSP12345'  // ✅ your hardcoded ID value
  qrStore.setScannedId(newId)
}
</script>

