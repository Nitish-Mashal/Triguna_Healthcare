<template>
  <div>
    <!-- ⭐ Promotions for MOBILE ONLY -->
    <div v-if="hasPromotions" class="block sm:hidden">
      <Suspense>
        <PromoMobile />
      </Suspense>
    </div>

    <!-- Hero Section -->
    <section class="relative bg-cover bg-center bg-no-repeat flex flex-col sm:flex-row items-center justify-center sm:justify-end
  py-6 sm:py-12 md:py-[60px] px-4 m:px-6 md:pr-20
  bg-[url('/files/StickyimageMobile.jpg')] sm:bg-[url('/files/StickyBannerImage.jpg')]">
      <div class="absolute inset-0 bg-black/10"></div>

      <div class="relative z-10 text-left max-w-3xl sm:mr-[30px] bold-test-color">

        <!-- ✅ Dynamic City Heading -->
        <h1 class="text-xl sm:text-2xl md:text-[30px] font-medium mb-1 ml-[4px] sm:ml-[2px] underline leading-tight">
          Blood Tests & Full Body Health Checkups
        </h1>

        <p class="text-sm mb-2 ml-[4px] sm:ml-[2px]">
          Trusted Lab Tests with Professional Home Sample Collection
        </p>

        <!-- Loader -->
        <div v-if="isLoading" class="flex justify-center items-center my-4">
          <svg class="animate-spin h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </div>

        <!-- Packages -->
        <div v-else class="flex flex-wrap gap-3 mb-3">
          <router-link v-for="pkg in packages" :key="pkg.id" :to="pkg.url ? `/${pkg.url}` : '#'">
            <button
              class="global-bg-color text-white font-medium px-4 py-2 rounded-full transition text-xs sm:text-sm whitespace-normal break-words text-center"
              :title="pkg.name">
              {{ pkg.name }}
            </button>
          </router-link>
        </div>

        <router-link to="/contact-us">
          <button class="border-1 border-[#001D55] bold-test-color bg-white text-sm font-medium
  px-6 sm:px-8 py-2 rounded-full transition
  ml-[4px] sm:ml-[2px] mt-1">
            Request Callback
          </button>
        </router-link>
      </div>
    </section>

    <!-- Lazy Sections -->
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
  name: "HeroSection",

  components: {
    LazySections,
    PromoMobile: defineAsyncComponent(() => import("./Promotions.vue")),
  },

  data() {
    return {
      packages: [],
      isLoading: true,
      hasPromotions: false,
    };
  },

  computed: {
    selectedCity() {
      const city = this.$route.params.city;
      return city ? city.replace(/-/g, " ") : "Bangalore";
    },
  },

  mounted() {
    this.fetchHeroPackages();
    this.checkPromotions();
  },

  watch: {
    "$route.params.city"() {
      // reactively update if city changes
    },
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
