<template>

  <!-- Banner Section -->
  <section class="relative bg-cover bg-top h-[300px] flex items-center px-6 md:px-16"
    style="background-image: url('/files/about-us-banner.png');">
    <div class="container text-white max-w-lg px-4">
      <h2 class="text-3xl md:text-6xl font-bold mb-2">About us</h2>
      <div class="text-lg md:text-2xl font-medium">
        Trusted Partner in Diagnostic and health care
      </div>
    </div>
  </section>
  <div class="container mx-auto">

    <!-- About Section -->
    <section class="py-8 px-2 md:px-16 bg-white">
      <h2 class="text-center text-4xl md:text-4xl font-bold bold-test-color mb-4">
        About Triguna Healthcare
      </h2>

      <div class="flex flex-col md:flex-row items-start gap-10">
        <!-- Left Column -->
        <div class="md:w-3/5 text-gray-700 space-y-4">
          <!-- Who We Are -->
          <div>
            <h3 class="text-2xl font-semibold bold-test-color mb-1">Who We Are</h3>
            <p>
              Welcome to BloodTestNearMe.in, your trusted partner in healthcare and
              the ultimate destination for convenient and accurate Online Blood Tests.
              Our journey is built on a foundation of commitment to your well-being,
              and we’re excited to share more about our identity, core values, mission,
              and the dedicated team behind our vision.
            </p>
          </div>

          <!-- Our Vision -->
          <div>
            <h3 class="text-2xl font-semibold bold-test-color mb-1 flex items-center">
              <!-- Heroicon: Eye -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 bold-test-color mr-2" viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zM10 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
                <path d="M10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
              </svg>
              Our Vision
            </h3>
            <p>
              At BloodTestNearMe.in, we hold a steadfast vision to democratize healthcare.
              We envision a world where individuals of all backgrounds can seamlessly
              access vital health information, enabling them to lead healthier, more informed lives.
              Our mission is to bridge the gap between healthcare and convenience,
              making it easier than ever for you to prioritize your health.
            </p>
          </div>

          <!-- Our Mission -->
          <div>
            <h3 class="text-2xl font-semibold bold-test-color mb-1 flex items-center">
              <!-- Heroicon: Globe Alt -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 bold-test-color mr-2" viewBox="0 0 24 24"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 
                10-4.477 10-10S17.523 2 12 2zM4 12a8 8 0 0 0 13.856 5.285c-.467-.333-.96-.682-1.46-1.045a10.764 10.764 0 0 1-2.465 1.31A7.964 7.964 0 0 1 12 18a7.967 7.967 0 0 1-2.001-.45 10.77 10.77 0 0 1-2.465-1.31c-.5.363-.993.712-1.46 1.045A7.967 7.967 0 0 0 4 12zm4.708-4.708A7.965 7.965 0 0 1 12 6c.676 0 1.334.083 1.968.237a10.773 10.773 0 0 1 2.464 1.31c.5-.363.993-.712 1.46-1.045A7.967 7.967 0 0 0 12 4a7.965 7.965 0 0 0-3.292.708z"
                  clip-rule="evenodd" />
              </svg>
              Our Mission
            </h3>
            <p>
              At BloodTestNearMe.in, we hold a steadfast mission to democratize healthcare.
              We envision a world where individuals of all backgrounds can seamlessly
              access vital health information, enabling them to lead healthier, more informed lives.
              Our mission is to bridge the gap between healthcare and convenience,
              making it easier than ever for you to prioritize your health.
            </p>
          </div>

        </div>

        <!-- Right Column -->
        <div class="md:w-2/5">
          <div class="w-full h-[400px] rounded-xl shadow-md bg-cover bg-center"
            style="background-image: url('/files/bloodtest.png');"></div>

        </div>
      </div>
    </section>
    <section class="px-8 py-2">

      <!-- Heading -->
      <div class="text-center mb-10">
        <h2 class="text-2xl sm:text-3xl font-bold bold-test-color">Expert Healthcare For All</h2>
        <p class="text-gray-600 mt-2 text-sm sm:text-base max-w-3xl mx-auto">
          This approach involves a direct relationship between the pediatrician and the patient and may include
          additional services and
        </p>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">

        <!-- Card 1 -->
        <div class="md:-translate-y-4">
          <div class="rounded-2xl overflow-hidden shadow-md">
            <div class="w-full h-80 bg-cover bg-center"
              style="background-image: url('/files/Trained-Phlebotomists.jpg');"></div>
          </div>
          <h3 class="font-semibold text-lg bold-test-color mt-3">Trained Phlebotomists</h3>
        </div>

        <!-- Card 2 -->
        <div class="md:translate-y-4">
          <div class="rounded-2xl overflow-hidden shadow-md">
            <div class="w-full h-80 bg-cover bg-center"
              style="background-image: url('/files/Advanced-Diagnostic-Equipment.jpg');"></div>
          </div>
          <h3 class="font-semibold text-lg bold-test-color mt-3">Advanced Diagnostic Equipment</h3>
        </div>

        <!-- Card 3 -->
        <div class="md:-translate-y-4">
          <div class="rounded-2xl overflow-hidden shadow-md">
            <div class="w-full h-80 bg-cover bg-center"
              style="background-image: url('/files/Advanced-manufacture-machine.jpg');"></div>
          </div>
          <h3 class="font-semibold text-lg bold-test-color mt-3">Sterile and Hygienic Process</h3>
        </div>

        <!-- Card 4 -->
        <div class="md:translate-y-4">
          <div class="rounded-2xl overflow-hidden shadow-md">
            <div class="w-full h-80 bg-cover bg-center"
              style="background-image: url('/files/Enjoy-your-treatment.png');"></div>
          </div>
          <h3 class="font-semibold text-lg bold-test-color mt-3">Enjoy Your Treatment</h3>
        </div>

      </div>

    </section>

    <section class="px-8 py-12">
      <!-- Heading -->
      <div class="text-left mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold bold-test-color">Why You Should Choose Us</h2>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
        <!-- Test Tube -->
        <div class="flex items-center space-x-3">
          <div class="bg-[#2077BF] text-white rounded-full w-10 h-10 flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M9 2v9.586a2 2 0 0 1-.586 1.414l-3.828 3.828a4 4 0 1 0 5.656 5.656l3.828-3.828A2 2 0 0 1 15.586 17H21" />
            </svg>
          </div>
          <span class="font-medium global-text-color">Certified Labs</span>
        </div>

        <!-- Home -->
        <div class="flex items-center space-x-3">
          <div class="bg-[#2077BF] text-white rounded-full w-10 h-10 flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M3 9.75L12 3l9 6.75M4.5 10.5V21h15V10.5" />
            </svg>
          </div>
          <span class="font-medium global-text-color">Home Sample Collection</span>
        </div>

        <!-- Printer -->
        <div class="flex items-center space-x-3">
          <div class="bg-[#2077BF] text-white rounded-full w-10 h-10 flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M6 9V2h12v7M6 18h12v4H6v-4zM4 9h16a2 2 0 012 2v5H2v-5a2 2 0 012-2z" />
            </svg>
          </div>
          <span class="font-medium global-text-color">Fast Reports</span>
        </div>

        <!-- Rupee -->
        <div class="flex items-center space-x-3">
          <div class="bg-[#2077BF] text-white rounded-full w-10 h-10 flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M7 4h10M7 8h10M7 12h6a4 4 0 1 1 0 8H7" />
            </svg>
          </div>
          <span class="font-medium global-text-color">Affordable Pricing</span>
        </div>

        <!-- Time -->
        <div class="flex items-center space-x-3">
          <div class="bg-[#2077BF] text-white rounded-full w-10 h-10 flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
          </div>
          <span class="font-medium global-text-color">24/7 Support</span>
        </div>

        <!-- Percentage -->
        <div class="flex items-center space-x-3">
          <div class="bg-[#2077BF] text-white rounded-full w-10 h-10 flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M19 5l-14 14M8.5 8.5a2 2 0 1 1-2.828-2.828A2 2 0 0 1 8.5 8.5zm9 9a2 2 0 1 1-2.828-2.828A2 2 0 0 1 17.5 17.5z" />
            </svg>
          </div>
          <span class="font-medium global-text-color">100% Confidentiality</span>
        </div>
      </div>
    </section>

  </div>
  <section class="relative bg-cover bg-center bg-no-repeat text-white py-8 px-6"
    style="background-image: url('/files/working-lab.jpg');">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <!-- Content -->
    <div class="relative max-w-3xl mx-auto text-center">
      <h3 class="text-lg font-medium mb-3">Triguna Healthcare</h3>
      <h2 class="text-3xl sm:text-4xl font-bold mb-4">
        Keeping you Confident and Healthy until the Big Day
      </h2>
      <div class="text-gray-200 text-sm sm:text-base mb-8 leading-relaxed">
        Our blood test services help you understand your health better with quick, accurate, and affordable testing —
        all from trusted labs near you. Whether it’s a routine health check, a pre-employment test, or pregnancy-related
        screening, we ensure a smooth and safe experience every time.
      </div>
      <RouterLink to="/health-checkup-packages-bangalore"
        class="global-bg-color hover:bg-[#005fa3] text-white font-semibold px-6 py-2 rounded-full shadow-md transition inline-block">
        Book Your Test Now
      </RouterLink>

    </div>
  </section>
  <Testimonial />
</template>

<script setup>
import Testimonial from '@/Home/Testimonial.vue';
</script>


<style scoped>
p {
  color: #001D55;
}
</style>
