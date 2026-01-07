<template>
    <div>
        <!-- 🔹 Banner -->
        <div v-if="testCenter?.image" class="h-[250px] sm:h-[400px] w-full bg-cover bg-center" :style="{
            backgroundImage: `url(${testCenter.image})`
        }">
        </div>

        <!-- 🔹 Content -->
        <div class="container">

            <!-- Description -->
            <div v-if="testCenter?.description" class="mt-6 bold-test-color">
                <!-- <h3 class="text-xl font-semibold">About This Test Center</h3> -->
                <p v-html="testCenter.description"></p>
            </div>

            <router-link to="/contact-us">
                <button class="border-1 border-[#001D55] bold-test-color bg-white text-sm font-medium
  px-6 sm:px-8 py-2 rounded-full transition
  ml-[4px] sm:ml-[2px] mt-1">
                    Request Callback
                </button>
            </router-link>

            <!-- 🔹 Google Map -->
            <div v-if="getEmbedMapUrl(testCenter?.map_embed_link)" class="mt-3">
                <h3 class="text-xl font-semibold mb-2 bold-test-color">Location Map</h3>

                <iframe :src="getEmbedMapUrl(testCenter.map_embed_link)" width="100%" height="350" style="border:0;"
                    loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const testCenter = ref(null);

/* ---------------- SEO HELPERS ---------------- */

const updateMeta = (name, content, attr = "name") => {
    if (!content) return;

    let meta = document.querySelector(`meta[${attr}='${name}']`);
    if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
};

const updatePageSEO = (data) => {
    if (!data) return;

    // ✅ Title
    document.title =
        data.meta_title ||
        `${data.name} | Triguna Healthcare`;

    // ✅ Meta Description
    updateMeta(
        "description",
        data.meta_description ||
        `Book blood tests and full body health checkups at ${data.name}. Trusted diagnostic services by Triguna Healthcare.`
    );

    // ✅ Optional but recommended OG tags
    updateMeta("og:title", data.meta_title || data.name, "property");
    updateMeta("og:description", data.meta_description, "property");
    updateMeta("og:type", "website", "property");
};

/* ---------------- GOOGLE MAP ---------------- */

const getEmbedMapUrl = (url) => {
    if (!url) return null;

    if (url.includes("output=embed") || url.includes("/embed?")) {
        return url;
    }

    const place = url.split("/place/")[1]?.split("/")[0];
    return place
        ? `https://www.google.com/maps?q=${place}&output=embed`
        : null;
};

/* ---------------- API CALL ---------------- */

const fetchTestCenter = async () => {
    try {
        const res = await axios.get(
            "/api/method/bloodtestnearme.api.testcenter_address.get_test_center"
        );

        const centers = res.data.message?.data || [];

        testCenter.value =
            centers.find(c => c.url === route.params.slug) || null;

        // ✅ APPLY SEO AFTER DATA LOAD
        if (testCenter.value) {
            updatePageSEO(testCenter.value);
        }

    } catch (err) {
        console.error("Error loading test center:", err);
    }
};

onMounted(fetchTestCenter);
watch(() => route.params.slug, fetchTestCenter);
</script>
