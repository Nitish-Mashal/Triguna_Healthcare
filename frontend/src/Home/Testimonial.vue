<template>
    <div>
        <div class="container mx-auto py-1">
            <!-- Header -->
            <div
                class="flex flex-col sm:flex-row items-center justify-between w-full px-2 sm:px-6 pt-4 sm:pt-6 gap-2 sm:gap-0">
                <h2 class="text-lg sm:text-xl md:text-4xl font-bold bold-test-color text-center flex-1">
                    Testimonials
                </h2>

                <a href="https://www.google.com/search?q=Thyrocare+%E2%80%93+Akshayanagar+Begur&oq=thyrocare+&gs_lcrp=EgZjaHJvbWUqBggBEEUYOzIGCAAQRRg5MgYIARBFGDsyBggCEEUYPDIGCAMQRRhBMgYIBBBFGEEyBggFEEUYPDIGCAYQRRg8MgYIBxBFGEHSAQgzNDA4ajBqMagCALACAA&sourceid=chrome&ie=UTF-8&sei=TaFTafeHM--_0-kPiuKS0Qw#lrd=0x3bae14cb65a79fbf:0xe3e900f850587203,1"
                    target="_blank"
                    class="text-sm bold-test-color font-medium flex items-center gap-1 hover:underline mt-2 sm:mt-0 whitespace-nowrap">
                    <span>View All</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-3 h-3 mt-[1px]">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </a>
            </div>

            <!-- Testimonial Section -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-3">
                <!-- Carousel -->
                <div class="lg:col-span-2">
                    <el-carousel :interval="4000" arrow="always" indicator-position="none" height="300px">
                        <!-- Mobile: show 1 testimonial per slide -->
                        <template v-if="isMobile">
                            <el-carousel-item v-for="(testimonial, index) in testimonials" :key="'mobile-' + index"
                                class="h-full">
                                <div
                                    class="bg-gray-100 px-5 py-4 rounded-xl shadow-sm flex flex-col justify-between h-full overflow-hidden min-h-[260px]">
                                    <div class="flex items-center justify-between gap-3">
                                        <img :src="testimonial.image" alt="User"
                                            class="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                                        <span class="text-[50px] text-blue-900 leading-none">&rdquo;</span>
                                    </div>

                                    <div class="mt-3 flex-1 overflow-hidden">
                                        <div class="">
                                            <p class="font-semibold text-blue-900 truncate">
                                                {{ testimonial.name }}
                                            </p>
                                            <p class="text-sm text-blue-500">{{ testimonial.role }}</p>
                                        </div>

                                        <p class="font-semibold text-blue-900 text-sm sm:text-base leading-snug">
                                            {{ testimonial.highlight }}
                                        </p>
                                        <p
                                            class="text-gray-600 text-xs sm:text-sm overflow-hidden text-ellipsis line-clamp-3">
                                            {{ testimonial.description }}
                                        </p>
                                    </div>
                                </div>
                            </el-carousel-item>
                        </template>

                        <!-- Desktop: show 2 testimonials per slide -->
                        <template v-else>
                            <el-carousel-item v-for="(pair, index) in chunkedTestimonials" :key="'desktop-' + index"
                                class="h-full">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                                    <div v-for="(testimonial, i) in pair" :key="i"
                                        class="bg-gray-100 px-5 py-2 rounded-xl shadow-sm flex flex-col justify-between h-full overflow-hidden min-h-[260px]">
                                        <div class="flex items-center justify-between gap-3">
                                            <img :src="testimonial.image" alt="User"
                                                class="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                                            <span class="text-4xl text-blue-900 leading-none">&rdquo;</span>
                                        </div>

                                        <div class="mt-2 flex-1 overflow-hidden">
                                            <div class="pb-1">
                                                <div class="font-semibold text-blue-900 truncate">
                                                    {{ testimonial.name }}
                                                </div>
                                            </div>

                                            <div class="font-semibold text-blue-900 text-sm sm:text-base leading-snug">
                                                {{ testimonial.highlight }}
                                            </div>
                                            <div
                                                class="text-gray-600 text-xs sm:text-sm mt-1 overflow-hidden text-ellipsis line-clamp-3">
                                                {{ testimonial.description }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-carousel-item>
                        </template>
                    </el-carousel>
                </div>

                <!-- Fixed Rating Card -->
                <div
                    class="bg-gray-100 p-6 rounded-xl shadow-sm flex flex-col items-center justify-center min-h-[300px]">
                    <div class="text-left w-full max-w-sm">
                        <div class="text-[45px] font-bold text-blue-900">
                            4.9
                            <span class="text-yellow-400 text-2xl align-middle ml-1">★★★★★</span>
                        </div>
                        <h2 class="text-blue-900 font-semibold text-[16px]">
                            Top-Rated Online Pathology Service
                        </h2>
                    </div>
                </div>
            </div>
        </div>

        <!-- WhatsApp Section -->
        <a href="https://wa.me/919611011266" target="_blank" rel="noopener noreferrer" class="no-underline">
            <div class="w-full flex justify-center items-center mt-4 px-3 sm:px-0">
                <div
                    class="global-bg-color text-white p-6 rounded-3xl text-left flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-10 w-full sm:w-auto max-w-4xl">
                    <div class="text-center sm:text-left">
                        <div class="text-[22px] sm:text-[30px] leading-tight">
                            Can't find what you're looking for?
                        </div>
                        <div class="bold-test-color text-lg sm:text-2xl mt-2">
                            We are here to help. Say 'Hi' on WhatsApp
                        </div>
                    </div>
                    <div class="sm:mt-0">
                        <img src="/whatsapp.png" alt="whatsappLogo" class="h-16 sm:h-20 mx-auto sm:mx-0" />
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    name: "TestimonialsSection",
    data() {
        return {
            isMobile: false,
            testimonials: [
                {
                    name: "Aishwarya S N",
                    image: "/files/TestimonialFemale.jpg",
                    highlight:
                        "I have using thyrocare service for the last 5 years.",
                    description:
                        "They are very prompt, on -time and accommodate as per customer request. The sample collectors maintain good hygiene and are experienced. The results are quick and efficient.",
                },
                {
                    name: "Tohid Inamdar",
                    image: "/files/TestimonialImg.png",
                    highlight:
                        "One of the best diagnostic centre for blood testing.",
                    description:
                        "Best service to collect blood from home. They will visit house and collect the blood and report will be provided same day. Trusted one, so will recommend to anyone who is looking for home blood collection.",
                },
                {
                    name: "Hema Shree",
                    image: "/files/TestimonialFemale.jpg",
                    highlight:
                        "I had an excellent experience with Thyrocare's home blood test service today.",
                    description:
                        "The lab technician, Shankar, was highly professional and ensured a smooth, painless sample collection. The entire process was hassle-free, and I was impressed by the prompt service—I received my report on the same day. Highly recommend Thyrocare for reliable and efficient diagnostics!",
                },
                {
                    name: "Anu Jayashankar",
                    image: "/files/TestimonialFemale.jpg",
                    highlight:
                        "Very quick and prompt response. So far Thyrocare Lab's services have been very satisfactory.",
                    description:
                        "Samples are collected neatly and ensuring all safety protocols. Test Reports are also given without too much of a delay. Would definitely recommend them!",
                },
            ],
        };
    },
    computed: {
        chunkedTestimonials() {
            const chunks = [];
            for (let i = 0; i < this.testimonials.length; i += 2) {
                chunks.push(this.testimonials.slice(i, i + 2));
            }
            return chunks;
        },
    },
    mounted() {
        this.checkScreen();
        window.addEventListener("resize", this.checkScreen);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.checkScreen);
    },
    methods: {
        checkScreen() {
            this.isMobile = window.innerWidth < 640; // Tailwind's sm breakpoint
        },
    },
};
</script>
