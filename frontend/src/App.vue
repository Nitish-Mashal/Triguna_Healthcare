<template>
  <div>
    <Navbar />
    <router-view />
    <WhatsappFloat />
    <ScrollToTop />
    <Footer />
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import Footer from './Footer.vue';
import ScrollToTop from './ScrollToTop.vue';
import WhatsappFloat from './WhatsappFloat.vue';

import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  components: {
    Navbar,
    ScrollToTop,
    WhatsappFloat,
    Footer
  },

  setup() {
    const route = useRoute()
    const router = useRouter()

    const baseUrl = "https://triguna.quantumberg.com"

    const updateCanonical = () => {
      const canonicalUrl = baseUrl + router.resolve(route).path

      let link = document.querySelector("link[rel='canonical']")
      if (!link) {
        link = document.createElement("link")
        link.setAttribute("rel", "canonical")
        document.head.appendChild(link)
      }

      link.setAttribute("href", canonicalUrl)
    }

    // Run when App loads
    onMounted(updateCanonical)

    // Run every time the route changes
    watch(route, updateCanonical)
  }
}
</script>


<style>
* {
  font-family: 'Ubuntu', sans-serif;
}
</style>
