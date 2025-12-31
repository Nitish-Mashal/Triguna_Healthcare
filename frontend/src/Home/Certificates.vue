<template>
    <section class="mt-4 text-center">
        <h2 class="text-lg sm:text-xl md:text-4xl font-bold bold-test-color mb-8">
            Certificates
        </h2>

        <!-- Loader -->
        <div v-if="loading" class="text-gray-600">Loading certifications...</div>

        <!-- Certificates Grid -->
        <div v-else-if="certifications.length" class="flex flex-wrap justify-center gap-4 sm:gap-10">
            <div v-for="cert in certifications" :key="cert.title"
                class="flex flex-col items-center text-center w-[120px] sm:w-[150px] hover:scale-105 transition-transform duration-200">
                <img :src="cert.image" :alt="cert.title" loading="lazy"
                    class="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-cover rounded-full shadow-md" />
                <h3 class="mt-3 font-semibold bold-test-color text-sm sm:text-base">
                    {{ cert.title }}
                </h3>
            </div>
        </div>

        <!-- Empty State -->
        <p v-else class="text-gray-500 italic">
            No certifications found.
        </p>
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const certifications = ref([]);
const loading = ref(false);

const fetchCertifications = async () => {
    loading.value = true;
    try {
        const { data } = await axios.get(
            "/api/method/bloodtestnearme.api.certifications.get_certifications"
        );

        if (data.message?.status === "success" && Array.isArray(data.message.data)) {
            certifications.value = data.message.data.map((item) => ({
                title: item.title,
                image: item.image?.startsWith("/files")
                    ? item.image
                    : `/files/${item.image}`,
            }));
        } else {
            console.warn("Unexpected API response:", data);
        }
    } catch (err) {
        console.error("Error fetching certifications:", err);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchCertifications);
</script>
