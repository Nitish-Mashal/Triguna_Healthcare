<template>
  <div>
    <!-- ⭐ Promotions for MOBILE ONLY (show only if data exists) -->
    <div v-if="hasPromotions" class="block sm:hidden">
      <Suspense>
        <PromoMobile />
      </Suspense>
    </div>

    <!-- Hero Section -->
    <section class="relative bg-cover bg-center bg-no-repeat flex flex-col sm:flex-row items-center justify-center sm:justify-end py-10 sm:py-22 md:py-[100px] px-4 m:px-6 md:pr-20
  bg-[url('/files/StickyimageMobile.jpg')] sm:bg-[url('/files/StickyBannerImage.jpg')]">


      <div class="absolute inset-0 bg-black/10"></div>

      <div class="relative z-10 text-left max-w-3xl sm:mr-[30px]">

        <h1 class="text-xl sm:text-2xl md:text-[30px] font-medium bold-test-color mb-2 ml-[4px] sm:ml-[2px]">
          Lab Tests at the Comfort of Your Home
        </h1>

        <!-- Loader -->
        <div v-if="isLoading" class="flex justify-center items-center my-4">
          <svg class="animate-spin h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </div>

        <div v-else class="flex flex-wrap gap-3 mb-4">
          <router-link v-for="pkg in packages" :key="pkg.id" :to="pkg.url ? `/${pkg.url}` : '#'">
            <button
              class="global-bg-color text-white font-medium px-4 py-2 rounded-full transition text-xs sm:text-sm whitespace-normal break-words text-center"
              :title="pkg.name">
              {{ pkg.name }}
            </button>
          </router-link>
        </div>

        <p class="bold-test-color text-sm sm:text-base md:text-lg mb-2 ml-[4px] sm:ml-[2px] font-bold">
          We Bring Healthcare to Your Doorstep
        </p>

        <router-link to="/contact-us">
          <button
            class="border-1 border-[#001D55] bold-test-color bg-white text-sm font-medium px-6 sm:px-8 py-2 rounded-full transition ml-[4px] sm:ml-[2px]">
            Request Callback
          </button>
        </router-link>
      </div>
    </section>

    <!-- Lazy Load Remaining Sections -->
    <Suspense>
      <LazySections />
    </Suspense>

  </div>
</template>

<script>
import LazySections from "./LazySections.vue";
import { defineAsyncComponent } from "vue";
import axios from "axios";

export default {
  components: {
    LazySections,
    PromoMobile: defineAsyncComponent(() => import("./Promotions.vue")),
  },

  data() {
    return {
      packages: [],
      isLoading: true,
      hasPromotions: false, // ⭐ new
    };
  },

  mounted() {
    this.fetchHeroPackages();
    this.checkPromotions(); // ⭐ added
  },

  methods: {
    async fetchHeroPackages() {
      try {
        this.isLoading = true;

        const res = await axios.get(
          "/api/method/bloodtestnearme.api.packages.get_packages_by_tags",
          { params: { tag: "herosection" } }
        );

        const data = res.data?.message || [];

        this.packages = data.map(pkg => ({
          id: pkg.id,
          name: pkg.name,
          url: pkg.url,
        }));

      } catch (err) {
        console.error("Error fetching hero section packages:", err);
      } finally {
        this.isLoading = false;
      }
    },

    // ⭐ NEW METHOD — checks if promotions exist
    async checkPromotions() {
      try {
        const res = await axios.get(
          "/api/method/bloodtestnearme.api.offers.get_offers"
        );

        const list = res.data?.message || [];

        this.hasPromotions = Array.isArray(list) && list.length > 0;

      } catch (err) {
        console.error("Error checking promotions:", err);
        this.hasPromotions = false;
      }
    },
  },
};
</script>
