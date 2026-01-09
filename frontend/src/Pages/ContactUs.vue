<template>
  <div>
    <!-- Banner -->
    <div class="relative">
      <div class="w-full h-72 bg-cover bg-center" style="background-image: url('/files/contact-us.jpg');">
      </div>
    </div>

    <!-- Main Section -->
    <div class="container px-4 py-6">
      <div class="flex justify-center items-center">
        <!-- Outer Card -->
        <div
          class="w-full max-w-7xl bg-white rounded-3xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-[70%_30%]">

          <!-- Contact Form Section -->
          <div class="px-5 py-4 w-full">
            <div class="md:px-5 max-w-md">

              <h2 class="text-4xl font-bold bold-test-color mb-1">Get in Touch</h2>
              <p class="text-gray-600 text-sm mb-3">Have questions? We'd love to hear from you.</p>

              <!-- ---------------- FORM START ---------------- -->
              <el-form ref="contactForm" :model="form" :rules="rules" label-position="top">

                <!-- Name -->
                <el-form-item label="Name" prop="name">
                  <input v-model="form.name" type="text" placeholder="Enter your name"
                    class="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none" />
                </el-form-item>

                <!-- Email -->
                <el-form-item label="Email" prop="email">
                  <input v-model="form.email" type="email" placeholder="Enter your email"
                    class="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none" />
                </el-form-item>

                <!-- Phone -->
                <el-form-item label="Phone" prop="phone">
                  <input v-model="form.phone" type="text" placeholder="Enter your phone number"
                    class="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none" />
                </el-form-item>

                <!-- How did you find us? -->
                <el-form-item label="How did you find us?" prop="source">
                  <select v-model="form.source"
                    class="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none">
                    <option value="">Select option</option>
                    <option value="google">Google</option>
                    <option value="facebook">Facebook</option>
                    <option value="friend">Friend</option>
                    <option value="other">Other</option>
                  </select>
                </el-form-item>

                <!-- Button -->
                <el-button type="primary"
                  class="w-full py-2 mt-1 font-semibold rounded-md global-bg-color text-white hover:bg-[#003d80] transition-all"
                  :loading="loading" @click="handleSubmit">
                  SEND
                </el-button>

                <!-- Success / Error Messages -->
                <p v-if="successMsg" class="text-green-600 mt-3 text-center text-sm">
                  {{ successMsg }}
                </p>
                <p v-if="errorMsg" class="text-red-600 mt-3 text-center text-sm">
                  {{ errorMsg }}
                </p>

              </el-form>
              <!-- ---------------- FORM END ---------------- -->

            </div>
          </div>

          <!-- Right Blue Section -->
          <div class="relative global-bg-color flex items-center justify-center">
            <div class="absolute -left-56 hidden md:flex items-center justify-center bg-transparent">
              <div class="w-96 h-96 rounded-full shadow-lg bg-cover bg-center"
                style="background-image: url('/files/contact-view.jpg');"></div>

            </div>
          </div>

        </div>
      </div>

      <!-- Contact Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <div v-for="(loc, i) in locations" :key="i">
          <div
            class="cursor-pointer bg-white rounded-2xl shadow-md border border-gray-200 p-4 hover:shadow-lg transition-all">
            <router-link :to="{ name: 'AddressDetails', params: { slug: loc.url } }" class="no-underline">
              <!-- Location Name -->
              <div class="bold-test-color text-lg font-semibold leading-relaxed mb-2">
                {{ loc.name }}
              </div>

              <!-- Address -->
              <p class="bold-test-color text-sm leading-relaxed mb-2">
                {{ loc.address }}
              </p>

              <!-- Email -->
              <div class="flex items-center gap-3 mb-3">
                <span class="text-[#001D55] text-sm font-medium">
                  {{ loc.email }}
                </span>
              </div>
            </router-link>


            <!-- Phone + Google Map Buttons -->
            <div v-if="loc.contact_number || loc.map_embed_link" class="grid grid-cols-2 gap-2">

              <!-- Phone Button -->
              <a v-if="loc.contact_number" :href="'tel:' + loc.contact_number"
                class="flex items-center justify-center gap-2 global-bg-color text-white px-3 py-2 rounded-full text-sm font-medium hover:bg-[#003d80] transition-all whitespace-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 3.75l2.69-.67a1.125 1.125 0 011.11.29l2.1 2.1a1.125 1.125 0 01.24 1.21l-1.26 2.52a12.042 12.042 0 005.64 5.64l2.52-1.26a1.125 1.125 0 011.21.24l2.1 2.1a1.125 1.125 0 01.29 1.11l-.67 2.69a1.125 1.125 0 01-1.09.84c-9.11 0-16.5-7.39-16.5-16.5 0-.51.33-.96.84-1.09z" />
                </svg>
                {{ loc.contact_number }}
              </a>

              <!-- Google Map Button -->
              <a v-if="loc.map_embed_link" :href="loc.map_embed_link" target="_blank"
                class="flex items-center justify-center gap-2 border border-gray-300 bold-test-color px-1 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="#001D55" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Google Map
              </a>

            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Form Refs
const contactForm = ref(null);
const loading = ref(false);
const successMsg = ref("");
const errorMsg = ref("");

// Form data
const form = ref({
  name: "",
  email: "",
  phone: "",
  source: "",
});

// Validation rules
const rules = {
  name: [{ required: true, message: "Please enter your name", trigger: "blur" }],
  email: [{ required: true, message: "Please enter your email", trigger: "blur" }],
  phone: [
    { required: true, message: "Please enter Phone Number", trigger: "blur" },

    {
      validator: (rule, value, callback) => {
        const digitsOnly = value.replace(/\D/g, ""); // remove non-digits

        if (!digitsOnly) {
          callback(new Error("Please enter your mobile number."));
        }
        else if (!/^[6-9]\d{0,9}$/.test(digitsOnly)) {
          callback(new Error("Please enter a valid Indian mobile number."));
        }
        else if (digitsOnly.length > 10) {
          callback(new Error("Mobile number cannot exceed 10 digits."));
        }
        else if (digitsOnly.length < 10) {
          callback(new Error("Mobile number must be 10 digits."));
        }
        else {
          callback(); // valid
        }
      },
      trigger: "blur",
    },
  ],
  source: [{ required: true, message: "Please select an option", trigger: "blur" }],
};

// Locations from backend
const locations = ref([]);

// Fetch locations from Frappe API
const fetchLocations = async () => {
  try {
    const res = await axios.get(
      "/api/method/bloodtestnearme.api.testcenter_address.get_test_center"
    );

    console.log("API Response:", res.data);

    // ✅ FIX HERE
    const centers = res.data.message?.data || [];

    locations.value = centers.map(center => ({
      name: center.test_center_name || center.branch_name || "Unnamed Center",
      address: `${center.address_line?.trim() || ""}, ${center.city || ""} - ${center.pincode || ""}`,
      contact_number: center.contact_number || "",
      email: center.email_id || "",
      map_embed_link: center.map_embed_link || "", // 🔥 FIX HERE
      description: center.description || "",
      image: center.image || null,
      url: center.url,
    }));

  } catch (error) {
    console.error("Error fetching locations:", error);
  }
};


// Submit contact form
const handleSubmit = () => {
  successMsg.value = "";
  errorMsg.value = "";

  contactForm.value.validate(async (valid) => {
    if (!valid) return;

    loading.value = true;

    try {
      const res = await axios.post(
        "/api/method/bloodtestnearme.api.contact.submit_contact",
        form.value,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
          }
        }
      );

      console.log("API RES:", res.data);

      if (res.data.message?.message === "success") {
        successMsg.value = "Message submitted successfully!";
        form.value = { name: "", email: "", phone: "", source: "" };
      } else {
        errorMsg.value = res.data.message?.message || "Something went wrong.";
      }

    } catch (error) {
      console.error("ERROR:", error);
      errorMsg.value = "Something went wrong.";
    } finally {
      loading.value = false;
    }
  });
};


// Fetch locations on component mount
onMounted(() => {
  fetchLocations();
});
</script>
<style scoped>
:deep(.el-form-item__label) {
  color: #001D55 !important;
}
</style>
