<template>
    <div class="container mt-4">
        <div class="bg-gray-100 sm:px-5 py-3 sm:py-5 rounded-xl shadow-sm">

            <!-- Header -->
            <div
                class="flex flex-col sm:flex-row items-center justify-between w-full px-2 sm:px-4 pt-3 sm:pt-5 gap-2 sm:gap-0">
                <h2 class="text-lg sm:text-xl md:text-4xl font-bold bold-test-color text-center flex-1">
                    Health Package Categories
                </h2>

                <div class="text-sm font-medium sm:mt-0 whitespace-nowrap">
                    <router-link to="/full-body-health-checkups"
                        class="flex items-center gap-1 no-underline bold-test-color hover:underline">
                        <span>View All</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-3 h-3 mt-[1px]">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </router-link>
                </div>
            </div>

            <!-- Loading -->
            <div v-if="isLoading" class="text-center py-10 text-gray-600">
                Loading categories...
            </div>

            <!-- Carousel -->
            <div v-else-if="categories.length" class="sm:p-2 rounded-xl w-full">
                <Carousel ref="carouselRef" :breakpoints="carouselBreakpoints" :wrapAround="true" snapAlign="start"
                    :transition="500" :itemsToScroll="1" @slide-start="onSlideChange" class="pkg-carousel">
                    <Slide v-for="(category, index) in categories" :key="category.name + index">
      <div
  class="slide-inner cursor-pointer"
  @click="goToCategory(category)"
>
                            <div class=" flex flex-col items-center text-center transition-transform hover:scale-105">
                                <img :src="getImage(category.image)" :alt="category.name"
                                    class="object-cover shadow-md rounded-lg w-full h-[120px]" />
                                <p class="mt-3 bold-test-color text-base sm:text-lg font-semibold">
                                    {{ category.name }}
                                </p>
                            </div>
                        </div>
                    </Slide>

                    <template #addons>
                        <Navigation />
                    </template>
                </Carousel>

                <!-- Pagination -->
                <div class="text-center mt-2 font-semibold text-gray-700 text-sm">
                    {{ currentIndexDisplay }}
                </div>
            </div>

            <!-- No Data -->
            <div v-else class="text-center text-gray-500 py-10">
                No categories available.
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const router = useRouter();

const categories = ref([]);
const currentIndex = ref(0);
const carouselRef = ref(null);
const isLoading = ref(true);

const carouselBreakpoints = {
    0: { itemsToShow: 1.5, snapAlign: "start" },
    640: { itemsToShow: 2.5, snapAlign: "start" },
    1024: { itemsToShow: 4.5, snapAlign: "start" }
};

const fetchCategories = async () => {
    try {
        const cached = sessionStorage.getItem("packageCategories");

        if (cached) {
            categories.value = JSON.parse(cached);
            isLoading.value = false;
            return;
        }

        const response = await axios.get(
            "/api/method/bloodtestnearme.api.package_category.get_active_package_categories"
        );

        const data = response.data?.message?.data || response.data?.data || [];
        categories.value = Array.isArray(data) ? data : [];
        sessionStorage.setItem("packageCategories", JSON.stringify(categories.value));

    } catch (error) {
        console.error("Error fetching categories:", error);
    } finally {
        isLoading.value = false;
    }
};

const onSlideChange = () => {
    if (!carouselRef.value) return;
    currentIndex.value = Number(carouselRef.value.currentSlide || 0);
};

const currentIndexDisplay = computed(() => {
    const total = categories.value.length;
    if (!total) return "0 / 0";

    const logical = ((currentIndex.value % total) + total) % total;
    return `${logical + 1} / ${total}`;
});

const getImage = (img) => img || "/placeholder.png";

const generateCategorySlug = (category) => {
    if (category.url && category.url !== "null") {
        return category.url.toLowerCase();
    }

    // fallback → generate from name
    return category.name
        ?.toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
};


// ⭐ THIS IS THE IMPORTANT PART — USE QUERY PARAM
const goToCategory = (category) => {
    const slug = generateCategorySlug(category);
    router.push(`/full-body-health-checkups/${slug}`);
};

onMounted(fetchCategories);
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
