<template>
    <div>
        <!-- 🔹 Dynamic Banner Image -->
        <div class="h-[250px] sm:h-[400px] w-full bg-cover bg-center" :style="{
            backgroundImage: testCenter?.image
                ? `url(${testCenter.image})`
                : 'url(/files/AddressDetails.jpg)'
        }">
        </div>

        <div class="container">
            <div class="text-3xl font-semibold bold-test-color pt-3 pb-3">
                Our Address
            </div>

            <div class="text-lg bold-test-color pb-3">
                <div class="row">
                    <div class="col-md-6 pb-3">
                        <!-- Test Center Name -->
                        <div><strong>Test Center Name:</strong> {{ testCenter?.test_center_name }}</div>

                        <!-- Address Line -->
                        <div><strong>Test Center Address:</strong> {{ testCenter?.address_line }}</div>
                    </div>

                    <div class="col-md-6 pb-3">
                        <strong>Phone:</strong> {{ testCenter?.contact_number || "-" }} <br>
                        <strong>Email:</strong> {{ testCenter?.email_id || "-" }}
                    </div>
                </div>

                <!-- Description -->
                <div class="pb-3" v-html="testCenter?.description">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
    setup() {
        const route = useRoute();
        const centerId = route.query.id;   // get selected center name
        const testCenter = ref(null);

        const fetchTestCenter = async () => {
            try {
                const res = await fetch(
                    "/api/method/bloodtestnearme.api.testcenter_address.get_test_centers"
                );
                const data = await res.json();
                const centers = data.message || [];

                // Find the exact center user clicked
                testCenter.value =
                    centers.find(c =>
                        c.test_center_name === centerId ||
                        c.branch_name === centerId
                    ) || null;

                console.log("Selected Center:", testCenter.value);

            } catch (error) {
                console.error("Error fetching test center:", error);
            }
        };

        onMounted(() => {
            fetchTestCenter();
        });

        return { testCenter };
    }
};
</script>
