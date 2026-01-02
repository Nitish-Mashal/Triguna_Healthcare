<template>
    <div class="flex items-center justify-center bg-[#F5F9FF] p-4">
        <div class="max-w-2xl w-full bg-white rounded-2xl shadow px-8 py-6 sm:px-12 sm:py-8 text-center">

            <!-- ✅ Success Icon -->
            <div class="flex justify-center mb-3">
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <svg class="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor"
                        stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>

            <!-- ✅ Title -->
            <h1 class="text-2xl sm:text-3xl font-bold text-[#001D55] mb-1">
                Thank You for Your Booking!
            </h1>

            <!-- ✅ Subtitle -->
            <p class="text-gray-600 text-sm sm:text-base mb-3">
                Your health checkup / blood test has been successfully booked.
            </p>

            <!-- ✅ Order ID -->
            <p v-if="orderId" class="text-sm text-gray-700 mb-5">
                <strong>Order ID:</strong>
                <span class="text-[#001D55] font-semibold ml-1">
                    {{ orderId }}
                </span>
            </p>

            <!-- ✅ Info Box -->
            <div class="bg-[#F0F6FF] rounded-xl px-5 py-4 text-left">
                <p class="text-sm text-gray-700 mb-2">
                    <strong class="text-[#001D55]">What happens next?</strong>
                </p>

                <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Our representative will contact you shortly to confirm your appointment.</li>
                    <li>Please ensure availability at the selected time for home sample collection.</li>
                    <li>Your reports will be shared digitally once the tests are completed.</li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// ✅ Read orderId ONLY from route params
const orderId = ref(route.params.orderId || "");

// 🚫 Prevent direct access
onMounted(() => {
    if (!orderId.value) {
        router.replace("/");
    }
});
</script>
