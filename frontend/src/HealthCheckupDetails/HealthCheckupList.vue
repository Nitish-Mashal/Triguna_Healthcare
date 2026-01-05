<template>
    <div class="container px-2 sm:px-16 mx-auto mt-6">
        <!-- 🏷 Header -->
        <h2 class="text-center text-2xl sm:text-3xl md:text-4xl font-bold bold-test-color mb-4">
            Full Body Health Checkup at Home
        </h2>

        <!-- ⏳ Loader -->
        <div v-if="isLoading" class="flex justify-center items-center h-60">
            <div class="flex flex-col items-center">
                <svg class="animate-spin h-8 w-8 text-[#001D55]" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <p class="text-[#001D55] mt-3 font-semibold">Loading packages...</p>
            </div>
        </div>

        <!-- 🧩 Main Content -->
        <div v-else>
            <!-- 🔍 Search Bar -->
            <div class="flex justify-center mb-8">
                <div class="relative w-full max-w-2xl shadow-md shadow-gray-300 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 
              5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                    <input v-model.trim="searchQuery" type="text" placeholder="Search Your Tests.." class="w-full border border-gray-300 rounded-full py-2.5 pl-12 pr-4 text-gray-700 
                   focus:outline-none focus:ring-2 focus:ring-[#001D55]" />
                </div>
            </div>

            <!-- 🧱 Cards Grid -->
            <div class="p-2 sm:p-3 rounded-xl">
                <transition-group name="fade" tag="div"
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    <div v-for="pkg in filteredPackages" :key="pkg.name1"
                        class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow flex flex-col h-[290px]">

                        <!-- 🖼 Image -->
                        <router-link :to="`/${pkg.url}`" class="w-full sm:w-auto no-underline">
                            <img :src="pkg.image || '/files/placeholder.jpg'"
                                :alt="getAltFromImage(pkg.image, pkg.name1 || 'Health Checkup Package')" loading="lazy"
                                class="w-full h-40 object-cover rounded-xl px-2 mt-2" />
                        </router-link>

                        <!-- 📋 Details -->
                        <div class="p-3 pt-2 flex flex-col flex-1">
                            <div class="flex justify-between items-center">
                                <h3 class="text-[82%] font-semibold bold-test-color pt-1">
                                    {{ pkg.name1 }}
                                    <span v-if="pkg.number_of_test > 0">
                                        ({{ pkg.number_of_test }} Tests)
                                    </span>
                                </h3>


                                <!-- 🛒 Cart Button -->
                                <button @click="toggleCart(pkg)" :disabled="isInCart(pkg)"
                                    class="relative group p-1 rounded-full transition" :class="[
                                        isInCart(pkg)
                                            ? 'bg-gray-200 cursor-not-allowed'
                                            : 'hover:bg-gray-100 text-indigo-900'
                                    ]">
                                    <svg v-if="!isInCart(pkg)" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 
                      1.087.835l.383 1.437M7.5 14.25a3 
                      3 0 0 0-3 3h15.75m-12.75-3h11.218
                      c1.121-2.3 2.1-4.684 
                      2.924-7.138a60.114 
                      60.114 0 0 0-16.536-1.84M7.5 
                      14.25 5.106 5.272M6 20.25a.75.75 
                      0 1 1-1.5 0 .75.75 0 0 1 
                      1.5 0Zm12.75 0a.75.75 0 1 
                      1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>

                                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1" stroke="currentColor" class="w-5 h-5 text-gray-400">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 
                      1.087.835l.383 1.437M7.5 14.25a3 
                      3 0 0 0-3 3h15.75m-12.75-3h11.218
                      c1.121-2.3 2.1-4.684 
                      2.924-7.138a60.114 
                      60.114 0 0 0-16.536-1.84M7.5 
                      14.25 5.106 5.272M6 20.25a.75.75 
                      0 1 1-1.5 0 .75.75 0 0 1 
                      1.5 0Zm12.75 0a.75.75 0 1 
                      1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                </button>
                            </div>

                            <!-- 💰 Prices -->
                            <div class="flex items-center gap-2 flex-wrap mb-1">

                                <!-- Show actual price ONLY when different -->
                                <div v-if="pkg.actual_price != pkg.discounted_price" class="text-gray-400 line-through">
                                    ₹ {{ pkg.actual_price }}
                                </div>

                                <!-- Always show discounted price -->
                                <div class="bold-test-color">
                                    ₹ {{ pkg.discounted_price }}
                                </div>

                            </div>


                            <!-- 🔘 Actions -->
                            <div
                                class="mt-auto flex flex-row sm:flex-row sm:justify-between items-center gap-2 sm:gap-0">
                                <router-link :to="{ name: 'SinglePackageBook', params: { slug: pkg.url } }"
                                    class="w-1/2 sm:w-auto no-underline">
                                    <button
                                        class="bg-[#2077BF] text-white text-sm px-3 py-1.5 rounded-full hover:bg-blue-700 transition w-full">
                                        Book Now
                                    </button>
                                </router-link>

                                <router-link :to="`/${pkg.url}`" class="w-1/2 sm:w-auto no-underline">
                                    <button
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
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cartStore";

const route = useRoute();
const cartStore = useCartStore();

const searchQuery = ref("");
const packages = ref([]);
const isLoading = ref(true);

const isInCart = (pkg) => cartStore.cartItems.some((item) => item.name1 === pkg.name1);

const toggleCart = (pkg) => {
    if (!isInCart(pkg)) cartStore.addToCart(pkg);
};

// ✅ Debounced Search (prevents re-render spam)
let searchTimeout;
watch(searchQuery, () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        nextTick();
    }, 300);
});

// ✅ Optimized Filter
const filteredPackages = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return !query
        ? packages.value
        : packages.value.filter((pkg) => pkg.name1?.toLowerCase().includes(query));
});

const getAltFromImage = (imageUrl, fallback) => {
    if (!imageUrl) return fallback;

    return imageUrl
        .split("/")               // get last part
        .pop()                     // filename
        .split(".")[0]             // remove extension
        .replace(/[-_]/g, " ")     // clean hyphens/underscores
        .replace(/\b\w/g, c => c.toUpperCase()); // capitalize
};

// ✅ Fetch Data with Graceful Fallback
const fetchPackages = async () => {
    try {
        isLoading.value = true;

        const rawCategory = route.params.category;

        const category =
            rawCategory &&
                rawCategory !== "null" &&
                rawCategory !== "undefined"
                ? rawCategory
                : "";

        const apiUrl = category
            ? `/api/method/bloodtestnearme.api.packages.get_packages?category=${encodeURIComponent(category)}`
            : "/api/method/bloodtestnearme.api.packages.get_package_based_tests";

        const { data } = await axios.get(apiUrl);
        packages.value = data?.message?.data || data?.data || [];
    } catch (error) {
        console.error("❌ Error fetching packages:", error);
        packages.value = [];
    } finally {
        isLoading.value = false;
    }
};



// 🔄 React to category change
watch(() => route.params.category, fetchPackages);

onMounted(fetchPackages);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>
