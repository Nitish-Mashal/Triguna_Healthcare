<template>
  <div class="container px-2 sm:px-16 mx-auto mt-6">
    <!-- Header -->
    <h2 class="text-center text-2xl sm:text-3xl md:text-4xl font-bold bold-test-color mb-4">
      Labs Near Me
    </h2>
  </div>

  <div class="container flex flex-col md:flex-row justify-left items-left gap-4 mb-2">
    <!-- Pincode Search -->
    <div class="relative w-full max-w-sm shadow-md shadow-gray-300 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor"
        class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 
          0 1 0 5.196 5.196a7.5 7.5 
          0 0 0 10.607 10.607Z" />
      </svg>
      <input
        v-model="pincodeQuery"
        type="text"
        placeholder="Search by Pincode..."
        class="w-full border border-gray-300 rounded-full py-2.5 pl-12 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#001D55]"
      />
    </div>

    <!-- City Search -->
    <div class="relative w-full max-w-sm shadow-md shadow-gray-300 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor"
        class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 
          0 1 0 5.196 5.196a7.5 7.5 
          0 0 0 10.607 10.607Z" />
      </svg>
      <input
        v-model="cityQuery"
        type="text"
        placeholder="Search by City..."
        class="w-full border border-gray-300 rounded-full py-2.5 pl-12 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#001D55]"
      />
    </div>
  </div>

  <!-- Not Found Message -->
  <div v-if="!loading && filteredCenters.length === 0" class="text-center text-red-600 font-semibold mb-4">
    Not found
  </div>

  <div class="container flex justify-center items-center p-3">
    <!-- Loading -->
    <div v-if="loading" class="text-center text-lg font-medium text-gray-700">
      Loading diagnostic centers...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center text-red-600 font-semibold">
      {{ error }}
    </div>

    <!-- Cards Grid -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full"
    >
      <div
        v-for="(center, index) in filteredCenters"
        :key="index"
        class="bg-white bold-test-color rounded-2xl shadow-md shadow-gray-400 p-4 flex flex-col justify-between transition-transform transform hover:scale-105"
      >
        <!-- Diagnostic Center Name -->
        <h3 class="text-lg font-semibold mb-2 flex items-center gap-2">
          {{ center.diagnostic_center_name }}
        </h3>

        <!-- Address -->
        <p class="text-sm text-gray-700 mb-2 leading-relaxed">
          {{ center.address }}, {{ center.city }}, {{ center.state }} - {{ center.pincode }}
        </p>

        <!-- Website (show only when is_website == Yes) -->
        <div v-if="center.is_website === 'Yes' && center.website" class="mb-3">
          <a
            :href="center.website.startsWith('http') ? center.website : 'https://' + center.website"
            target="_blank"
            class="text-[#001D55] underline flex items-center gap-2 text-sm font-semibold"
          >
            <!-- Globe Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-[#001D55]">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m-9 9h18" />
            </svg>
            {{ center.website }}
          </a>
        </div>

        <!-- Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 mt-auto">

          <!-- Phone Button (Show only when is_phone == Yes) -->
          <a
            v-if="center.is_phone === 'Yes' && center.phone_number"
            :href="'tel:' + center.phone_number"
            class="global-bg-color text-white text-sm px-2 py-2 rounded-full hover:bg-blue-700 flex items-center justify-center gap-2 transition w-full sm:w-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-white">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 
                15 15h2.25a2.25 2.25 0 0 0 
                2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 
                1.293c-.282.376-.769.542-1.21.38a12.035 
                12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 
                3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 
                2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            {{ center.phone_number }}
          </a>

          <!-- Google Map -->
          <a
            v-if="center.map_embed_link"
            :href="center.map_embed_link"
            target="_blank"
            class="border border-[#001D55] font-semibold text-sm text-[#001D55] px-2 py-1.5 rounded-full hover:bg-gray-100 transition flex items-center justify-center gap-1 whitespace-nowrap w-full sm:w-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              class="w-4 h-4 text-gray-700">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 
                3 3 0 0 1 6 0Z" />
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 
                11.25-7.5 11.25S4.5 17.642 
                4.5 10.5a7.5 7.5 0 1 1 
                15 0Z" />
            </svg>
            Open in Google Maps
          </a>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const centers = ref([]);
const loading = ref(true);
const error = ref("");
const pincodeQuery = ref("");
const cityQuery = ref("");

const apiUrl =
  "/api/method/bloodtestnearme.api.diagnostic_center.get_accepted_diagnostic_centers";

// Fetch centers
onMounted(async () => {
  try {
    const response = await axios.get(apiUrl);
    const res = response.data.message;

    if (res.status === "success") {
      centers.value = res.data;
    } else {
      error.value = res.message || "Failed to fetch diagnostic centers.";
    }
  } catch (err) {
    console.error("Error fetching centers:", err);
    error.value = "An error occurred while loading data.";
  } finally {
    loading.value = false;
  }
});

// Filter centers
const filteredCenters = computed(() => {
  const pin = pincodeQuery.value.trim().toLowerCase();
  const city = cityQuery.value.trim().toLowerCase();

  return centers.value.filter((center) => {
    const matchPin = pin ? center.pincode?.toString().toLowerCase().includes(pin) : true;
    const matchCity = city ? center.city?.toLowerCase().includes(city) : true;
    return matchPin && matchCity;
  });
});
</script>

<style scoped>
p {
  text-align: justify;
}
</style>
