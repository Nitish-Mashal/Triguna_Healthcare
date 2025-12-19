<template>
    <div>

        <!-- ⭐ Promotions for DESKTOP (only if data exists) -->
        <div v-if="hasPromotions" class="hidden sm:block">
            <Promotions />
        </div>

        <!-- Other Sections -->
        <MostBookedHealthCheckups />
        <MostBookedBloodTests />
        <OurWorkFlow />
        <HealthPackageCategories />
        <Testimonial />
        <Certificates />
        <FAQ />
        <CitiesWeAreIn />
    </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { defineAsyncComponent } from "vue";

export default {
    components: {
        // Promotions (desktop)
        Promotions: defineAsyncComponent(() => import("./Promotions.vue")),

        // Other components
        MostBookedHealthCheckups: defineAsyncComponent(() =>
            import("./MostBookedHealthCheckups.vue")
        ),
        MostBookedBloodTests: defineAsyncComponent(() =>
            import("./MostBookedBloodTests.vue")
        ),
        OurWorkFlow: defineAsyncComponent(() => import("./OurWorkFlow.vue")),
        HealthPackageCategories: defineAsyncComponent(() =>
            import("./HealthPackageCategories.vue")
        ),
        Testimonial: defineAsyncComponent(() => import("./Testimonial.vue")),
        Certificates: defineAsyncComponent(() => import("./Certificates.vue")),
        FAQ: defineAsyncComponent(() => import("./FAQ.vue")),
        CitiesWeAreIn: defineAsyncComponent(() =>
            import("./CitiesWeAreIn.vue")
        ),
    },

    setup() {
        const hasPromotions = ref(false);

        const checkPromotions = async () => {
            try {
                const res = await axios.get(
                    "/api/method/bloodtestnearme.api.offers.get_offers"
                );

                const list =
                    res.data?.message ||
                    res.data?.data ||
                    [];

                hasPromotions.value = Array.isArray(list) && list.length > 0;

            } catch (err) {
                console.error("Error fetching promotions:", err);
                hasPromotions.value = false;
            }
        };

        onMounted(checkPromotions);

        return { hasPromotions };
    }
};
</script>
