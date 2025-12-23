<template>
    <div>
        <div class="container">
            <div v-if="!isLoading && packageData" class="py-4 row">

                <!-- ⭐ MOBILE PRICE CARD (TOP) -->
                <div class="col-12 d-block d-md-none mb-3">
                    <div class="card p-3">
                        <div class="card-title bold-test-color font-semibold text-2xl pb-3">
                            {{ packageData.name1 }}
                            <span v-if="packageData.number_of_test > 0">
                                ({{ packageData.number_of_test }} Tests)
                            </span>
                        </div>

                        <!-- Conditional Pricing -->
                        <div v-if="packageData.actual_price != packageData.discounted_price">
                            <div class="flex justify-between font-semibold pb-2 text-lg">
                                <span>Package Price:</span>
                                <span class="text-red-600 line-through">₹ {{ packageData.actual_price }}</span>
                            </div>

                            <div class="flex justify-between font-semibold pb-2 text-lg">
                                <span>Offer Price:</span>
                                <span>₹ {{ packageData.discounted_price }}</span>
                            </div>
                        </div>

                        <div v-else>
                            <div class="flex justify-between font-semibold pb-2 text-lg">
                                <span>Package Price:</span>
                                <span>₹ {{ packageData.discounted_price }}</span>
                            </div>
                        </div>

                        <!-- Final Amount -->
                        <div class="flex justify-between font-bold pb-4 text-xl">
                            <span>Amount to be paid:</span>
                            <span class="text-green-600">₹ {{ packageData.discounted_price }}</span>
                        </div>

                        <!-- Buttons -->
                        <div class="flex flex-col sm:flex-row justify-center mb-4 gap-4">
                            <router-link v-if="packageData?.url"
                                :to="{ name: 'SinglePackageBook', params: { slug: packageData.url } }"
                                class="w-full sm:w-auto no-underline">
                                <button
                                    class="global-bg-color text-white text-sm px-3 py-2 rounded-full transition w-full sm:w-auto">
                                    Book Now
                                </button>
                            </router-link>

                            <button :disabled="isInCart(packageData)" @click="toggleCart(packageData)"
                                class="relative border border-[#001D55] text-sm bold-test-color px-3 py-2 rounded-full flex items-center justify-center gap-1 transition"
                                :class="{
                                    'bg-gray-200 cursor-not-allowed': isInCart(packageData),
                                    'hover:bg-gray-100': !isInCart(packageData),
                                }">
                                <span>{{ isInCart(packageData) ? 'Added' : 'Add to Cart' }}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 
                                        1.087.835l.383 1.437M7.5 
                                        14.25a3 3 0 0 0-3 
                                        3h15.75m-12.75-3h11.218
                                        c1.121-2.3 2.1-4.684 
                                        2.924-7.138a60.114 
                                        60.114 0 0 0-16.536-1.84M7.5 
                                        14.25 5.106 5.272M6 20.25a.75.75 
                                        0 1 1-1.5 0 .75.75 0 0 1 
                                        1.5 0Zm12.75 0a.75.75 0 1 
                                        1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Accordion OR Description Block -->
                <div class="col-12 col-md-8 mb-2 bold-test-color">

                    <!-- If list_include exists → show accordion -->
                    <div v-if="hasListInclude">
                        <h5 class="font-bold bold-test-color pb-2">List Of Tests Included:</h5>

                        <div class="accordion" id="accordionExample">
                            <div v-for="(item, index) in listInclude" :key="index"
                                class="accordion-item border border-gray-200 overflow-hidden">

                                <h2 class="accordion-header" :id="`heading${index}`">
                                    <button class="accordion-button font-semibold bold-test-color text-sm" type="button"
                                        data-bs-toggle="collapse" :data-bs-target="`#collapse${index}`"
                                        :aria-expanded="index === 0" :aria-controls="`collapse${index}`"
                                        :class="{ collapsed: index !== 0 }">
                                        {{ item.heading }}
                                    </button>
                                </h2>

                                <div :id="`collapse${index}`" class="accordion-collapse collapse"
                                    :class="{ show: index === 0 }">
                                    <div class="accordion-body text-sm bold-test-color">
                                        <ul v-if="item.values?.length" class="list-disc pl-5 mb-0">
                                            <li v-for="(test, i) in item.values" :key="`${index}-${i}`">
                                                {{ test }}
                                            </li>
                                        </ul>

                                        <p v-else class="text-gray-500 italic">No tests available.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <!-- If no list_include → show description instead -->
                    <div v-else>
                        <!-- <h3>
                            {{ packageData.name1 }}
                            <span v-if="packageData.number_of_test > 0">
                                ({{ packageData.number_of_test }} Tests)
                            </span>
                        </h3> -->

                        <div class="pt-2" v-html="packageData.description"></div>

                        <div class="pt-2">
                            <strong>Sample Type: </strong>
                            <span class="text-red-600">{{ packageData.sample_type }}</span>
                        </div>
                    </div>

                </div>

                <!-- ⭐ DESKTOP PRICE CARD (RIGHT SIDE) -->
                <div class="col-12 col-md-4 d-none d-md-block">
                    <div class="card p-3">
                        <div class="card-title bold-test-color font-semibold text-2xl pb-3">
                            {{ packageData.name1 }}
                            <span v-if="packageData.number_of_test > 0">
                                ({{ packageData.number_of_test }} Tests)
                            </span>
                        </div>

                        <!-- Conditional Pricing -->
                        <div v-if="packageData.actual_price != packageData.discounted_price">
                            <div class="flex justify-between font-semibold pb-2 text-lg">
                                <span>Package Price:</span>
                                <span class="text-red-600 line-through">₹ {{ packageData.actual_price }}</span>
                            </div>

                            <div class="flex justify-between font-semibold pb-2 text-lg">
                                <span>Offer Price:</span>
                                <span>₹ {{ packageData.discounted_price }}</span>
                            </div>
                        </div>

                        <div v-else>
                            <div class="flex justify-between font-semibold pb-2 text-lg">
                                <span>Package Price:</span>
                                <span>₹ {{ packageData.discounted_price }}</span>
                            </div>
                        </div>

                        <!-- Final Amount -->
                        <div class="flex justify-between font-bold pb-4 text-xl">
                            <span>Amount to be paid:</span>
                            <span class="text-green-600">₹ {{ packageData.discounted_price }}</span>
                        </div>

                        <!-- Buttons -->
                        <div class="flex flex-col sm:flex-row justify-center mb-4 gap-4">
                            <router-link v-if="packageData?.url"
                                :to="{ name: 'SinglePackageBook', params: { slug: packageData.url } }"
                                class="w-full sm:w-auto no-underline">
                                <button
                                    class="global-bg-color text-white text-sm px-3 py-2 rounded-full transition w-full sm:w-auto">
                                    Book Now
                                </button>
                            </router-link>

                            <button :disabled="isInCart(packageData)" @click="toggleCart(packageData)"
                                class="relative border border-[#001D55] text-sm bold-test-color px-3 py-2 rounded-full flex items-center justify-center gap-1 transition"
                                :class="{
                                    'bg-gray-200 cursor-not-allowed': isInCart(packageData),
                                    'hover:bg-gray-100': !isInCart(packageData),
                                }">
                                <span>{{ isInCart(packageData) ? 'Added' : 'Add to Cart' }}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 
                                        1.087.835l.383 1.437M7.5 
                                        14.25a3 3 0 0 0-3 
                                        3h15.75m-12.75-3h11.218
                                        c1.121-2.3 2.1-4.684 
                                        2.924-7.138a60.114 
                                        60.114 0 0 0-16.536-1.84M7.5 
                                        14.25 5.106 5.272M6 20.25a.75.75 
                                        0 1 1-1.5 0 .75.75 0 0 1 
                                        1.5 0Zm12.75 0a.75.75 0 1 
                                        1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </button>
                        </div>
                        <slot name="desktop-price-card"></slot>
                    </div>
                </div>

                <!-- 🔹 Additional Sections -->
                <div v-if="packageData" class="bold-test-color pt-4">

                    <template v-if="hasListInclude">
                        <!-- <h3>
                            {{ packageData.name1 }}
                            <span v-if="packageData.number_of_test > 0">
                                ({{ packageData.number_of_test }} Tests)
                            </span>
                        </h3> -->

                        <div class="pt-2" v-html="packageData.description"></div>

                        <div class="pt-2">
                            <strong>Sample Type: </strong>
                            <span class="text-red-600">{{ packageData.sample_type }}</span>
                        </div>
                    </template>

                    <section class="pt-4">
                        <h5 class="font-semibold pb-4">Precautionary Measures:</h5>
                        <div class="row">
                            <div v-for="measure in precautionaryMeasures" :key="measure.alt"
                                class="col-md-4 col-lg-3 col-sm-12 pb-3">
                                <div
                                    class="card shadow border-0 rounded-4 bold-test-color p-4 text-[90%] font-regular text-center flex flex-col items-center justify-center">
                                    <img :src="measure.image" :alt="measure.alt" loading="lazy" decoding="async"
                                        class="w-16 pb-2" />
                                    <div>{{ measure.text }}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section v-if="parsedBookingProcedure.length" class="pt-4">
                        <h5 class="font-semibold pb-4">Booking Procedure:</h5>
                        <ol class="list-decimal pl-6 space-y-1">
                            <li v-for="(step, index) in parsedBookingProcedure" :key="index">
                                {{ step }}
                            </li>
                        </ol>
                    </section>

                </div>
            </div>

            <!-- Loader -->
            <div v-else-if="isLoading" class="flex justify-center items-center h-60">
                <div class="flex flex-col items-center">
                    <svg class="animate-spin h-8 w-8 text-[#001D55]" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <p class="text-[#001D55] mt-3 font-semibold">
                        Loading package details...
                    </p>
                </div>
            </div>

        </div>

        <MostBookedHealthCheckups />
    </div>
</template>


<script setup>
import { ref, nextTick, onMounted, watch, computed } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useCartStore } from "@/stores/cartStore";
import MostBookedHealthCheckups from "../Home/MostBookedHealthCheckups.vue";


const route = useRoute();   // inside component
const router = useRouter(); // inside component
const cartStore = useCartStore();

const isLoading = ref(true);
const packageData = ref(null);
const listInclude = ref([]);

const precautionaryMeasures = [
    { image: "/files/watch.png", alt: "time", text: "10-12 hours fasting is required. Water is allowed." },
    { image: "/files/glass.png", alt: "water", text: "Keep yourself well-hydrated. Water is important." },
    { image: "/files/bed.png", alt: "rest", text: "Get enough rest for mind and body." },
    { image: "/files/gym.png", alt: "exercise", text: "Avoid heavy exercise a day before the blood test." },
];

const hasListInclude = computed(() => {
    return Array.isArray(listInclude.value) && listInclude.value.length > 0;
});

const parsedBookingProcedure = computed(() => {
    const raw = packageData.value?.booking_procedure;
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.map((s) => s.trim()).filter(Boolean) : [];
    } catch {
        return raw
            .replace(/[\[\]"]/g, "")
            .split(",")
            .map((s) => s.replace(/^\d+\.\s*/, "").trim())
            .filter(Boolean);
    }
});

const isInCart = (pkg) => cartStore.cartItems.some((i) => i.name1 === pkg.name1);
const toggleCart = (pkg) => {
    if (isInCart(pkg)) cartStore.removeFromCart(pkg.name1);
    else cartStore.addToCart(pkg);
};

const fetchPackageDetails = async () => {
    isLoading.value = true;
    try {
        const packageUrl = route.params.url;

        const { data } = await axios.get(
            "/api/method/bloodtestnearme.api.packages.get_packages",
            { params: { url: decodeURIComponent(packageUrl) } }
        );

        const pkg = data?.message?.data?.[0];

        // ❌ If package not found → redirect to NotFound page
        if (!pkg) {
            router.replace({ name: "NotFound" });
            return;
        }

        // ✅ If package exists → show details
        packageData.value = pkg;

        try {
            let parsed = pkg.list_include ? JSON.parse(pkg.list_include) : [];

            // If backend sends a single object, convert to array
            if (!Array.isArray(parsed)) {
                parsed = [parsed];
            }

            listInclude.value = parsed;
        } catch {
            listInclude.value = [];
        }

        await nextTick();
        updatePageSEO(pkg);
    } catch (error) {
        console.error(error);
        router.replace({ name: "NotFound" }); // fallback on error
    } finally {
        isLoading.value = false;
    }
};
const updatePageSEO = (data) => {
    const title =
        data.meta_title ||
        data.title ||
        `${data.package_name || "Health Checkup"} | Triguna Healthcare`;

    document.title = title;

    updateMeta("description", data.meta_description || data.short_description);
    updateMeta("keywords", data.meta_keyword);
    updateMeta("header_tag", data.header_tag);
};

const updateMeta = (key, content, attr = "name") => {
    if (!content) return;
    let meta = document.querySelector(`meta[${attr}='${key}']`);
    if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, key);
        document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
};

onMounted(fetchPackageDetails);
watch(() => route.params.url, fetchPackageDetails);
</script>