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
        question: "What services does Triguna Healthcare provide? ",
        answer:
            "We offer a comprehensive range of Blood Tests & Full Body Health Checkups processed through our official Thyrocare partnership. All services include professional home sample collection.",
    },
    {
        question: "How do I book a lab test online? ",
        answer:
            "Select your required package on our website and schedule a collection time. Our system is designed to provide a seamless booking experience from the comfort of your home.",
    },
    {
        question: "Can I book tests for my family members? ",
        answer:
            "Yes. Our home service is ideal for senior citizens, children, and those with limited mobility. You can manage multiple bookings under one account..",
    },
    {
        question: "Is the home collection process safe?",
        answer:
            " Yes. Our certified phlebotomists use single-use sterile kits and follow strict clinical hygiene protocols to ensure a safe and professional experience at your doorstep.",
    },
    {
        question: "How should I prepare for my blood test? ",
        answer:
            "Preparation depends on the test. For most Full Body Health Checkups, 8-12 hours of fasting is required. We recommend staying hydrated with water unless otherwise instructed.",
    },
    {
        question: "What if I need to reschedule my appointment? ",
        answer:
            "You can easily reschedule or cancel your appointment by contacting our support team via WhatsApp or phone at least 4 hours before the scheduled time.",
    },
]);
</script>
