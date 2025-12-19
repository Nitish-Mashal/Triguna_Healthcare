<template>
  <section class="mt-6">
    <div class="container sm:px-8">

      <!-- ⭐ Vue3 Carousel -->
      <Carousel ref="carouselRef" :breakpoints="carouselBreakpoints" :wrapAround="true" :transition="500"
        :snapAlign="'start'" :itemsToScroll="1" @slide-start="onSlideChange" @slide-change="onSlideChange"
        class="offer-carousel">
        <Slide v-for="(offer, i) in offers" :key="i">
          <div class="cursor-pointer w-full hover:scale-[1.02] mr-3" @click="openLink(offer.link)">
            <img :src="offer.image" :alt="offer.name1 ? `Offer: ${offer.name1}` : 'Promotional offer image'"
              class="w-full h-[180px] object-cover rounded-xl shadow-md" />
          </div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>

      <!-- show pagination only when offers loaded -->
      <div v-if="offers.length" class="text-center mt-2 font-semibold text-gray-700 text-sm">
        {{ currentIndex + 1 }} / {{ offers.length }}
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

const offers = ref([]);
const currentIndex = ref(0);
const carouselRef = ref(null);

// responsive breakpoints omitted for brevity (keep your previous object)
const carouselBreakpoints = {
  0: { itemsToShow: 1.1, snapAlign: "start" },
  640: { itemsToShow: 2.1, snapAlign: "start" },
  1024: { itemsToShow: 2.1, snapAlign: "start" }
};

// fetch offers
const fetchOffers = async () => {
  try {
    const res = await axios.get("/api/method/bloodtestnearme.api.offers.get_offers");
    offers.value = Array.isArray(res.data?.message) ? res.data.message : (Array.isArray(res.data?.data) ? res.data.data : []);
    // ensure index reset if fewer offers after fetch
    currentIndex.value = 0;
    // if carousel exposes currentSlide we can sync
    if (carouselRef.value?.currentSlide != null) {
      currentIndex.value = Number(carouselRef.value.currentSlide) || 0;
    }
  } catch (err) {
    console.error("❌ Error fetching offers:", err);
  }
};

// robust handler for different event shapes
const onSlideChange = (payload) => {
  let idx = null;

  if (typeof payload === "number") {
    idx = payload;
  } else if (payload && typeof payload === "object") {
    // common properties seen in different versions
    idx = payload.slidingTo ?? payload.slide ?? payload.index ?? payload.current ?? payload.currentSlide ?? null;
  }

  // fallback to reading exposed carousel API
  if (idx == null && carouselRef.value) {
    // many carousel components expose `currentSlide`
    idx = carouselRef.value.currentSlide ?? carouselRef.value.getCurrentSlide?.() ?? null;
  }

  // finally ensure numeric
  if (Number.isFinite(idx)) {
    currentIndex.value = Number(idx);
  } else {
    // safe fallback
    currentIndex.value = 0;
  }
};

const openLink = (url) => {
  if (url) window.open(url, "_blank", "noopener,noreferrer");
};

onMounted(fetchOffers);
</script>


<style scoped>
.offer-carousel {
  padding-right: 0;
}

/* Arrows above image */
.carousel__prev,
.carousel__next {
  z-index: 20;
  background: rgba(0, 0, 0, 0.5) !important;
  border-radius: 50%;
  width: 36px;
  height: 36px;
}

.carousel__prev:hover,
.carousel__next:hover {
  background: rgba(0, 0, 0, 0.8) !important;
}
</style>
