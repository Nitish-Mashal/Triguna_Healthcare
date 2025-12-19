<template>
    <section class="container mx-auto px-4 py-10">
        <h1 class="text-3xl font-bold bold-test-color mb-6">
            Frequently Asked Questions
        </h1>

        <div class="space-y-6 bold-test-color">
            <div v-for="(faq, index) in faqs" :key="index">

                <!-- Question Number + Question -->
                <h3 class="text-xl font-semibold">
                    {{ index + 1 }}. {{ faq.question }}
                </h3>

                <!-- Answer -->
                <p class="text-base mt-1">
                    <span class="font-semibold">Ans:</span> {{ faq.answer }}
                </p>

            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";

const faqs = ref([
    {
        question: "What is Triguna Healthcare?",
        answer:
            "Triguna Healthcare is an authorised partner of Thyrocare, offering accurate blood tests, preventive health packages, and reliable home sample collection services across India.",
    },
    {
        question: "Do you provide home sample collection?",
        answer:
            "Yes. We offer nationwide home blood sample collection through our collaboration with Thyrocare's pan-India network.",
    },
    {
        question: "In how many cities do you provide diagnostic services?",
        answer:
            "We serve all major cities and towns across India, including Bangalore, Mumbai, Delhi, Gurugram, Noida, Hyderabad, Chennai, Pune, and more.",
    },
    {
        question: "What are the service hours for home sample collection?",
        answer:
            "Home collection is available from 05:30 AM to 07:00 PM, depending on your location.",
    },
    {
        question: "How quickly will I receive my test reports?",
        answer:
            "Reports are usually delivered within 12-24 hours, depending on the test type.",
    },
    {
        question: "Are the test results accurate?",
        answer:
            "Yes. All tests are processed in Thyrocare's ISO/NABL/CAP-certified laboratory using advanced automated systems for high accuracy.",
    },
    {
        question: "What types of health checkup packages do you offer?",
        answer:
            "We provide full body checkups, thyroid profiles, diabetes screening, vitamin tests, hormone tests, women's wellness profiles, senior citizen packages, and customized wellness plans.",
    },
    {
        question: "Can I cancel or reschedule a booking?",
        answer:
            "Yes. You can cancel or reschedule easily by contacting our customer support team via phone or WhatsApp. 📞 96110 11266",
    },
]);
</script>
