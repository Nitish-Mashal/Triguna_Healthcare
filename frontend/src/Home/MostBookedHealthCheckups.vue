<template>
  <div class="mt-4">
    <div class="container sm:px-16 mx-auto">
      <div class="bg-gray-100 px-3 sm:px-5 py-6 sm:py-5 rounded-xl">

        <!-- Header -->
        <div
          class="flex flex-col sm:flex-row items-center justify-between w-full px-2 sm:px-4 pt-2 sm:pt-5 gap-2 sm:gap-0">
          <h2 class="text-lg sm:text-xl md:text-4xl font-bold bold-test-color text-center flex-1">
            Most Booked Full Body Health Checkups.
          </h2>

          <div class="text-sm font-medium sm:mt-0 whitespace-nowrap">
            <router-link to="/health-checkup-packages"
              class="flex items-center gap-1 no-underline bold-test-color hover:underline">
              <span>View All</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-3 h-3 mt-[1px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </router-link>
          </div>
        </div>

        <!-- Carousel Section -->
        <div class="sm:p-2 rounded-xl w-full">
          <Carousel ref="carouselRef" :breakpoints="carouselBreakpoints" :wrapAround="true" snapAlign="start"
            :transition="500" :itemsToScroll="1" @slide-change="onSlideChange" @slide-start="onSlideChange"
            class="pkg-carousel">

            <Slide v-for="(pkg, index) in packages" :key="pkg.name + index">
              <div class="slide-inner mr-3">

                <!-- FIXED CARD HEIGHT -->
                <div
                  class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow h-[260px] flex flex-col">

                  <!-- Image -->
                  <router-link :to="`/${pkg.url}`" class="no-underline rounded-2">
                    <img :src="pkg.image || '/files/placeholder.jpg'" class="w-96 h-36 object-cover p-2 rounded-xl" />
                  </router-link>

                  <!-- Content -->
                  <div class="p-2 flex flex-col justify-between h-full">

                    <!-- Title + Price + Cart -->
                    <div>
                      <div class="flex justify-between items-start">
                        <h3 class="text-[82%] font-semibold bold-test-color line-clamp-2 leading-tight">
                          {{ pkg.title }} {{ pkg.tests }}
                        </h3>

                        <div class="relative group">
                          <button :disabled="isInCart(pkg.name)" @click="addToCart(pkg)"
                            :title="isInCart(pkg.name) ? 'Item already in cart' : 'Add to cart'"
                            class="relative group p-1 rounded-full transition"
                            :class="isInCart(pkg.name) ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-gray-100 text-indigo-900'">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                              stroke="currentColor" :class="['w-5 h-5 transition-colors duration-200',
                                isInCart(pkg.name) ? 'text-gray-400' : 'text-indigo-900']">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 
                                 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218
                                 c1.121-2.3 2.1-4.684 2.924-7.138a60.114 
                                 60.114 0 0 0-16.536-1.84M7.5 14.25 
                                 5.106 5.272M6 20.25a.75.75 
                                 0 1 1-1.5 0 .75.75 0 0 1 
                                 1.5 0Zm12.75 0a.75.75 0 1 
                                 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <!-- Price -->
                      <div class="flex items-center gap-2">
                        <div v-if="pkg.actual_price !== pkg.discounted_price"
                          class="text-gray-500 line-through text-sm">
                          ₹ {{ pkg.actual_price }}
                        </div>
                        <div class="text-indigo-900 font-semibold text-sm">
                          ₹ {{ pkg.discounted_price }}
                        </div>
                      </div>
                    </div>

                    <!-- Bottom Buttons -->
                    <div class="flex flex-row justify-between items-center gap-2 mt-2">

                      <router-link :to="{ name: 'SinglePackageBook', params: { slug: pkg.url } }"
                        class="w-1/2 no-underline">
                        <button
                          class="bg-[#2077BF] text-white text-sm px-3 py-1.5 rounded-full hover:bg-blue-700 transition w-full">
                          Book Now
                        </button>
                      </router-link>

                      <router-link :to="`/${pkg.url}`" class="w-1/2 no-underline">
                        <button
                          class="border-1 border-[#001D55] font-semibold text-xs bold-test-color px-2 py-1 rounded-full hover:bg-gray-100 transition flex items-center justify-center gap-1 w-full whitespace-nowrap">
                          View Details
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-3 h-3 mt-[1px]">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </button>
                      </router-link>
                    </div>

                  </div>
                </div>
              </div>
            </Slide>

            <template #addons>
              <Navigation />
            </template>
          </Carousel>

          <div v-if="packages.length" class="text-center mt-2 font-semibold text-gray-700 text-sm">
            {{ currentIndexDisplay }} / {{ packages.length }}
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useCartStore } from "@/stores/cartStore";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const packages = ref([]);
const currentIndex = ref(0);
const carouselRef = ref(null);
const cartStore = useCartStore();

const carouselBreakpoints = {
  0: { itemsToShow: 1.20, snapAlign: "start" },
  640: { itemsToShow: 2.20, snapAlign: "start" },
  1024: { itemsToShow: 4.20, snapAlign: "start" }
};

// ⭐ Fetch only 'mostbooked' packages
const fetchMostBookedPackages = async () => {
  try {
    const res = await axios.get(
      "/api/method/bloodtestnearme.api.packages.get_packages_by_tags",
      { params: { tag: "mostbooked" } }
    );

    const data = res.data?.message || [];
    packages.value = Array.isArray(data)
      ? data.map((pkg) => ({
        image: pkg.image,
        title: pkg.name,
        name: pkg.name,
        name1: pkg.name,
        tests: pkg.tests || "",
        url: pkg.url,
        actual_price: pkg.actual_price,
        discounted_price: pkg.discounted_price
      }))
      : [];

    setTimeout(() => {
      if (carouselRef.value?.currentSlide != null) {
        currentIndex.value = Number(carouselRef.value.currentSlide) || 0;
      } else {
        currentIndex.value = 0;
      }
    }, 50);

  } catch (err) {
    console.error("Error fetching packages:", err);
  }
};

const onSlideChange = (payload) => {
  let idx = null;

  if (typeof payload === "number") {
    idx = payload;
  } else if (payload && typeof payload === "object") {
    idx = payload.currentSlide ?? payload.slidingTo ?? payload.slide ?? payload.index ?? null;
  }

  if ((idx === null || idx === undefined) && carouselRef.value) {
    idx = carouselRef.value.currentSlide ?? carouselRef.value.getCurrentSlide?.() ?? null;
  }

  currentIndex.value = Number.isFinite(Number(idx)) ? Number(idx) : 0;
};

const currentIndexDisplay = computed(() => {
  const total = packages.value.length;
  if (!total) return 0;
  const logical = ((Number(currentIndex.value) % total) + total) % total;
  return logical + 1;
});

const addToCart = (pkg) => {
  if (!isInCart(pkg.name)) {
    const cartItem = {
      name1: pkg.name,
      actual_price: pkg.actual_price,
      discounted_price: pkg.discounted_price
    };
    cartStore.addToCart(cartItem);
  }
};

const isInCart = (pkgName) => cartStore.cartItems.some((i) => i.name1 === pkgName);

onMounted(fetchMostBookedPackages);
</script>


<style scoped>
.pkg-carousel .carousel__prev,
.pkg-carousel .carousel__next {
  z-index: 30;
  background: rgba(0, 0, 0, 0.45) !important;
  border-radius: 50%;
  width: 36px;
  height: 36px;
}

.pkg-carousel .carousel__prev:hover,
.pkg-carousel .carousel__next:hover {
  background: rgba(0, 0, 0, 0.75) !important;
}

.pkg-carousel {
  overflow: visible;
}
</style>
