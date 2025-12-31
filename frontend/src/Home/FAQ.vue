<template>
    <section class="py-4 bg-white">
        <div class="container mx-auto px-5 md:px-8">
            <!-- Title -->
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001D55] text-center mb-6">
                FAQ
            </h2>

            <!-- Accordion Section -->
            <div class="accordion" id="faqAccordion">
                <div v-for="(faq, index) in faqs" :key="index"
                    class="accordion-item border border-gray-200 overflow-hidden">
                    <h3 class="accordion-header" :id="'heading' + index">
                        <button class="accordion-button font-semibold bold-test-color"
                            :class="{ collapsed: activeIndex !== index }" type="button" data-bs-toggle="collapse"
                            :data-bs-target="'#collapse' + index" aria-expanded="activeIndex === index"
                            :aria-controls="'collapse' + index" @click="toggleAccordion(index)">
                            {{ index + 1 }}. {{ faq.question }}
                        </button>
                    </h3>

                    <div :id="'collapse' + index" class="accordion-collapse collapse mb-0"
                        :class="{ show: activeIndex === index }" :aria-labelledby="'heading' + index"
                        data-bs-parent="#faqAccordion">
                        <p class="accordion-body text-[14px] text-[#001D55] leading-relaxed mb-0">
                            {{ faq.answer }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Know More Button -->
            <router-link to="/FAQs" class="no-underline">
                <div class="mt-3">
                    <button
                        class="border-1 border-[#001D55] font-semibold text-sm text-[#001D55] px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-1">
                        Know More FAQ
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-4 h-4 mt-[1px]">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </button>
                </div>
            </router-link>
        </div>
    </section>
</template>

<script>
export default {
    name: "FAQ",
    data() {
        return {
            activeIndex: 0,
            faqs: [
                {
                    question:
                        "What services does Triguna Healthcare provide? ",
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
                        "Yes. Our home service is ideal for senior citizens, children, and those with limited mobility. You can manage multiple bookings under one account.",
                },
                {
                    question: "Is the home collection process safe?",
                    answer:
                        " Yes. Our certified phlebotomists use single-use sterile kits and follow strict clinical hygiene protocols to ensure a safe and professional experience at your doorstep.",
                },
            ],
        };
    },
    methods: {
        toggleAccordion(index) {
            this.activeIndex = this.activeIndex === index ? null : index;
        },
    },
};
</script>

<style>
.accordion-collapse {
    transition: height 0.35s ease !important;
    overflow: hidden;
}

.accordion-collapse.collapsing {
    height: 0 !important;
}

.accordion-button {
    transition: background-color 0.3s ease, color 0.3s ease;
}
</style>