<template>
    <section class="mt-6 sm:mt-10">
        <div class="container mx-auto px-4 sm:px-8">
            <!-- Title -->
            <h2 class="text-lg sm:text-2xl md:text-4xl font-bold bold-test-color text-center mb-8">
                Our Work Flow
            </h2>

            <!-- Steps -->
            <div class="flex flex-wrap justify-center items-start gap-8 sm:gap-20 text-center leading-snug">
                <div v-for="(step, index) in steps" :key="index"
                    class="flex flex-col items-center w-28 sm:w-36 transition-transform duration-300 hover:scale-105">
                    <img :src="step.image" :alt="step.alt" loading="lazy"
                        class="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-md" />
                    <p class="mt-3 font-semibold bold-test-color text-sm sm:text-base">
                        <span v-html="step.text"></span>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const steps = [
    {
        image: "/files/BookYourLabTestOnline.png",
        alt: "Book Your Lab Tests Online",
        text: "Book Your Lab<br>Tests Online",
    },
    {
        image: "/files/GetHomeSampleCollection.png",
        alt: "Get Home Sample Collection",
        text: "Get Home Sample<br>Collection",
    },
    {
        image: "/files/SampleProcess.png",
        alt: "Samples Process in Lab",
        text: "Samples Process in<br>Thyrocare Pathology Lab",
    },
    {
        image: "/files/GetyourReportsOnline.png",
        alt: "Get your Reports Online",
        text: "Get your Reports<br>Online",
    },
];
</script>

<style scoped>
/* Optional smooth hover transition */
img {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

img:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
