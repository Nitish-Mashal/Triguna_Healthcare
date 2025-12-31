<template>
    <div class="mt-4">
        <div class="container px-2 sm:px-8 mt-6">
            <div class="bg-gray-100 px-3 py-4 rounded-xl">

                <!-- Header -->
                <div
                    class="flex flex-col sm:flex-row items-center justify-between w-full px-2 sm:px-6 pt-2 sm:pt-6 gap-2 sm:gap-0">
                    <h2 class="text-lg sm:text-xl md:text-4xl font-bold bold-test-color text-center flex-1">
                        Most Booked Blood Tests
                    </h2>

                    <router-link to="/book-blood-tests"
                        class="text-sm font-medium flex items-center gap-1 no-underline bold-test-color hover:underline whitespace-nowrap">
                        <span>View All</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-3 h-3 mt-[1px]">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </router-link>
                </div>

                <!-- ⭐ Vue3 Carousel -->
                <div class="sm:p-3 rounded-xl w-full">
                    <Carousel ref="carouselRef" v-if="packages.length" :wrapAround="true" :transition="500"
                        :itemsToScroll="1" :breakpoints="carouselBreakpoints" snapAlign="start"
                        class="most-booked-carousel" @slide-change="onSlideChange" @slide-start="onSlideChange">

                        <Slide v-for="pkg in packages" :key="pkg.id">
                            <!-- CARD -->
                            <div
                                class="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white mr-3 sm:mr-3 cursor-pointer w-56">

                                <!-- Top gradient -->
                                <router-link :to="`/${pkg.url}`" class="no-underline">
                                    <div class="px-3 py-3 text-white rounded-xl"
                                        :style="{ background: 'linear-gradient(180deg,#2077BF 0%,#0040BB 100%)', height: '80px' }">
                                        <h3 class="font-semibold text-[82%] leading-tight line-clamp-2">
                                            {{ pkg.name }}
                                        </h3>
                                    </div>
                                </router-link>

                                <!-- Bottom White -->
                                <div class="p-2 bg-white rounded-b-xl">

                                    <div class="flex justify-between items-center">
                                        <!-- Prices -->
                                        <div class="flex items-center gap-2">
                                            <template v-if="pkg.actual_price != pkg.discounted_price">
                                                <div class="text-gray-400 line-through">₹ {{ pkg.actual_price }}</div>
                                                <div class="font-semibold bold-test-color">₹ {{ pkg.discounted_price }}
                                                </div>
                                            </template>

                                            <template v-else>
                                                <div class="font-semibold bold-test-color">₹ {{ pkg.discounted_price }}
                                                </div>
                                            </template>
                                        </div>

                                        <!-- Cart -->
                                        <button :disabled="isInCart(pkg.name)" @click="addToCart(pkg)"
                                            :title="isInCart(pkg.name) ? 'Item already in cart' : 'Add to cart'"
                                            class="relative group p-1 rounded-full transition" :class="[
                                                isInCart(pkg.name)
                                                    ? 'bg-gray-200 cursor-not-allowed'
                                                    : 'hover:bg-gray-100 text-indigo-900'
                                            ]">

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor"
                                                :class="['w-5 h-5', isInCart(pkg.name) ? 'text-gray-400' : 'text-indigo-900']">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 
                             14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218
                             c1.121-2.3 2.1-4.684 2.924-7.138a60.114 
                             60.114 0 0 0-16.536-1.84M7.5 14.25 
                             5.106 5.272M6 20.25a.75.75 
                             0 1 1-1.5 0 .75.75 0 0 1 
                             1.5 0Zm12.75 0a.75.75 0 1 
                             1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                            </svg>

                                            <span v-if="isInCart(pkg.name)"
                                                class="absolute inset-0 flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition">
                                                ×
                                            </span>

                                        </button>
                                    </div>

                                    <!-- Buttons -->
                                    <div
                                        class="flex flex-row sm:flex-row sm:justify-between items-center gap-2 sm:gap-0 mt-2">
                                        <router-link
                                            :to="pkg.url ? { name: 'SinglePackageBook', params: { slug: pkg.url } } : '#'"
                                            class="w-1/2 sm:w-auto no-underline">
                                            <button :disabled="!pkg.url"
                                                class="bg-[#2077BF] text-white text-sm px-3 py-1.5 rounded-full hover:bg-blue-700 transition w-full">
                                                Book Now
                                            </button>
                                        </router-link>

                                        <router-link :to="pkg.url ? `/${pkg.url}` : '#'"
                                            class="w-1/2 sm:w-auto no-underline">
                                            <button :disabled="!pkg.url"
                                                class="border-1 border-[#001D55] font-semibold text-xs bold-test-color px-2 py-1 rounded-full hover:bg-gray-100 transition flex items-center justify-center gap-1 w-full whitespace-nowrap">
                                                View Details
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="2" stroke="currentColor" class="w-3 h-3 mt-[1px]">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                                </svg>
                                            </button>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </Slide>

                        <!-- Arrows -->
                        <template #addons>
                            <Navigation />
                        </template>

                    </Carousel>

                    <!-- Loading -->
                    <div v-else class="flex justify-center items-center py-10">
                        <svg class="animate-spin h-6 w-6 text-[#001D55]" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"></path>
                        </svg>
                    </div>

                </div>
                <div v-if="packages.length" class="text-center mt-2 font-semibold text-gray-700 text-sm">
                    {{ currentIndexDisplay }} / {{ packages.length }}
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useCartStore } from "@/stores/cartStore";

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

const carouselRef = ref(null);
const currentIndex = ref(0);

const packages = ref([]);
const cartStore = useCartStore();

/* ⭐ Responsive Carousel Config */
const carouselBreakpoints = {
    0: { itemsToShow: 1.20, snapAlign: 'start' },
    640: { itemsToShow: 2.20, snapAlign: 'start' },
    1024: { itemsToShow: 4.20, snapAlign: 'start' }
};

const onSlideChange = () => {
    if (carouselRef.value) {
        currentIndex.value = carouselRef.value.currentSlide ?? 0;
    }
};

const currentIndexDisplay = computed(() => {
    const total = packages.value.length;
    if (!total) return 0;

    // normalize index and make it 1-based
    const logical = ((currentIndex.value % total) + total) % total;
    return logical + 1;
});

// ⭐ Fetch only 'mostbooktests' packages
const fetchMostBookedTests = async () => {
    try {
        const res = await axios.get(
            "/api/method/bloodtestnearme.api.packages.get_packages_by_tags",
            { params: { tag: "mostbooktests" } }
        );
        packages.value = res.data?.message || [];

    } catch (e) {
        console.error("❌ Error fetching tests:", e);
    }
};

const isInCart = (name) => cartStore.cartItems.some((i) => i.name1 === name);

const addToCart = (pkg) => {
    if (!isInCart(pkg.name)) {
        cartStore.addToCart({
            name1: pkg.name,
            actual_price: pkg.actual_price,
            discounted_price: pkg.discounted_price
        });
    }
};

onMounted(fetchMostBookedTests);
</script>


<style scoped>
.most-booked-carousel .carousel__prev,
.most-booked-carousel .carousel__next {
    z-index: 20;
    background: rgba(0, 0, 0, 0.5) !important;
    width: 38px;
    height: 38px;
    border-radius: 50%;
}

.most-booked-carousel .carousel__prev:hover,
.most-booked-carousel .carousel__next:hover {
    background: rgba(0, 0, 0, 0.8) !important;
}
</style>
