<template>
    <div v-if="loading" class="flex justify-center items-center h-60">
        <div class="flex flex-col items-center">
            <svg class="animate-spin h-8 w-8 text-[#001D55]" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <p class="text-[#001D55] mt-3 font-semibold">Loading cart details...</p>
        </div>
    </div>

    <div v-else>
        <div class="container">
            <div class="py-4 row">
                <!-- Left Section -->
                <div class="col-12 col-md-6 mb-2">
                    <div class="flex justify-between items-center mb-4">
                        <h5 class="text-[#001D55] font-semibold">Cart Items</h5>
                        <router-link to="/book-blood-tests"
                            class="flex items-center text-red-700 font-medium no-underline hover:underline-offset-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4 mr-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add more tests
                        </router-link>
                    </div>

                    <hr class="border-gray-300 mb-3" />

                    <div v-if="cartStore.cartItems && cartStore.cartItems.length">
                        <div v-for="(item, index) in cartStore.cartItems" :key="index"
                            class="flex justify-between items-center mb-3 rounded-lg">
                            <div>
                                <h6 class="font-semibold text-[#001D55]">{{ item.name1 }}</h6>
                                <div class="text-gray-500">
                                    <span class="line-through">₹ {{ item.actual_price }}</span>
                                    <span class="font-semibold text-[#001D55] ml-1">₹ {{ item.discounted_price }}</span>
                                </div>
                            </div>

                            <button @click="cartStore.removeFromCart(item.name1)"
                                class="bg-[#0040BB] text-white px-4 py-2 rounded-full hover:bg-[#002F8E] transition">
                                Remove
                            </button>
                        </div>
                    </div>
                    <p v-else class="text-gray-500">No items in the cart.</p>
                </div>

                <!-- Right Section -->
                <div class="col-12 col-md-6">
                    <div class="p-3 border-0 shadow-sm rounded-xl bg-gray-50">
                        <form class="space-y-2 bold-test-color" @submit.prevent="singleOrderSubmit">
                            <!-- Row 1 -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 items-start">
                                <div class="relative w-full min-h-[40px]">
                                    <input v-model="form.pincode" @input="onPincodeInput" type="text"
                                        placeholder="Pincode *"
                                        class="border rounded-md px-3 py-[1px] text-sm w-full" />

                                    <p v-if="errors.pincode" class="absolute text-[11px] text-red-500 mt-[2px]">
                                        {{ errors.pincode }}
                                    </p>
                                    <p v-if="pincodeMessage" :class="[
                                        'absolute text-[11px] mt-[2px]',
                                        pincodeStatus === 'success' ? 'text-green-600' : 'text-red-500'
                                    ]">
                                        {{ pincodeMessage }}
                                    </p>
                                </div>

                                <button type="button" @click="checkPincodeAvailability" :disabled="isChecking"
                                    class="bg-gray-200 text-gray-700 text-sm px-3 py-[1px] rounded-md hover:bg-gray-300 transition h-[28px] sm:h-[30px] self-start disabled:opacity-60 disabled:cursor-not-allowed">
                                    {{ isChecking ? "Checking..." : "Check Availability" }}
                                </button>
                            </div>

                            <!-- Persons -->
                            <div>
                                <select v-model="numPersons" class="border rounded-md px-3 py-1 text-sm w-full">
                                    <option disabled value="">Select Number of Person *</option>
                                    <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                                </select>

                                <div class="text-xs text-red-500 mb-2 mt-2">
                                    Note: Same set of tests will be added for all persons.
                                </div>

                                <div v-for="(person, index) in persons" :key="index"
                                    class="border p-1 rounded-md bg-gray-50 mb-2">
                                    <h6 v-if="numPersons && numPersons > 1" class="text-sm font-semibold mb-2 mt-2">
                                        Person {{ index + 1 }}
                                    </h6>

                                    <input v-model="person.name" @input="clearError(`name_${index}`)" type="text"
                                        placeholder="Beneficiary Name *"
                                        class="border rounded-md px-3 py-[1px] text-sm w-full mb-2" />
                                    <p v-if="errors[`name_${index}`]" class="text-xs text-red-500 mt-1">
                                        {{ errors[`name_${index}`] }}
                                    </p>

                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <div>
                                            <input v-model="person.age" @input="validateAge(index)" type="number"
                                                placeholder="Age *"
                                                class="border rounded-md px-3 py-[1px] text-sm w-full" />

                                            <p v-if="errors[`age_${index}`]" class="text-xs text-red-500 mt-1">
                                                {{ errors[`age_${index}`] }}
                                            </p>
                                        </div>

                                        <div>
                                            <select v-model="person.gender" @change="clearError(`gender_${index}`)"
                                                class="border rounded-md px-3 py-1 text-sm w-full">
                                                <option disabled value="">Select Gender *</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Others</option>
                                            </select>
                                            <p v-if="errors[`gender_${index}`]" class="text-xs text-red-500 mt-1">
                                                {{ errors[`gender_${index}`] }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Email & Mobile -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                    <input v-model="form.email" type="email" placeholder="Email *"
                                        class="border rounded-md px-3 py-[1px] text-sm w-full" />
                                    <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
                                </div>
                                <div>
                                    <input v-model="form.mobile" @input="onMobileInput" type="tel"
                                        placeholder="Mobile (Indian Number Only) *"
                                        class="border rounded-md px-3 py-[1px] text-sm w-full" maxlength="10"
                                        inputmode="numeric" />
                                    <p v-if="errors.mobile" class="text-xs text-red-500 mt-1">{{ errors.mobile }}</p>
                                </div>
                            </div>

                            <!-- Address -->
                            <div>
                                <textarea v-model="form.address" @input="onAddressInput" rows="2"
                                    class="border rounded-md px-3 py-[1px] text-sm w-full"
                                    placeholder="Complete Address *"></textarea>
                                <p v-if="errors.address" class="text-xs text-red-500 mt-1">{{ errors.address }}</p>
                            </div>


                            <!-- Collection Type -->
                            <div class="flex items-center justify-center gap-2">
                                <span class="font-semibold text-sm">Collection Type:</span>
                                <label class="flex items-center gap-2 text-sm cursor-not-allowed">
                                    <input type="checkbox" checked disabled
                                        class="w-4 h-4 appearance-none border border-gray-400 rounded-full checked:bg-[#001D55] checked:border-[#001D55] transition duration-200" />
                                    Home Collection
                                </label>
                            </div>

                            <!-- Date & Time -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                    <input v-model="form.date" @change="clearError('date')" :min="minDate" type="date"
                                        class="border rounded-md px-3 py-[1px] text-sm w-full" />
                                    <p v-if="errors.date" class="text-xs text-red-500 mt-1">{{ errors.date }}</p>
                                </div>
                                <div>
                                    <select v-model="form.timeSlot" @change="clearError('timeSlot')"
                                        class="border rounded-md px-3 py-1 text-sm w-full"
                                        :disabled="!timeSlots.length">
                                        <option disabled value="">Select Preferred Time Slot *</option>
                                        <option v-for="(slot, i) in timeSlots" :key="i" :value="slot">{{ slot }}
                                        </option>
                                    </select>
                                    <p v-if="errors.timeSlot" class="text-xs text-red-500 mt-1">{{ errors.timeSlot }}
                                    </p>
                                </div>
                            </div>

                            <!-- Printed Reports -->
                            <div>
                                <div class="flex items-center text-sm text-gray-700">
                                    <input type="checkbox" v-model="form.printedReports" class="mr-2" />
                                    <span class="text-red-500">Additional Rs. 75 for Printed Reports</span>
                                </div>
                                <div class="mt-3">
                                    <p><strong>Test/Package Price:</strong> ₹{{ totalBasePrice }}</p>

                                    <!-- Show Home Collection Charge only if there are cart items AND total < 300 -->
                                    <p v-if="cartStore.cartItems.length > 0 && totalBasePrice < 300">
                                        <strong>Home Collection Charge:</strong> ₹{{ homeCollectionCharge }}
                                    </p>

                                    <!-- Printed Report Charge -->
                                    <p v-if="form.printedReports">
                                        <strong>Printed Report Charge:</strong> ₹{{ printedReportCharge }}
                                    </p>

                                    <!-- Final Amount -->
                                    <p class="mt-2 text-lg font-semibold text-[#001D55]">
                                        <strong>Total Amount:</strong> ₹{{ finalAmount }}
                                    </p>
                                </div>
                            </div>

                            <!-- Book Now -->
                            <div class="flex justify-center">
                                <button type="submit" :disabled="cartStore.cartItems.length === 0 || submitting" :class="[
                                    'px-20 py-2 rounded-full transition w-full sm:w-auto',
                                    cartStore.cartItems.length === 0 || submitting
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'global-bg-color text-white'
                                ]">
                                    {{ submitting ? "Booking..." : "Book Now" }}
                                </button>
                            </div>

                            <!-- Backend Message -->
                            <div v-if="backendMessage.text" class="mt-3 text-center">
                                <p :class="backendMessage.type === 'success' ? 'text-green-600' : 'text-red-600'">
                                    {{ backendMessage.text }}
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>

        <MostBookedHealthCheckups />
    </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useCartStore } from "@/stores/cartStore";
import { useQRCodeStore } from '@/stores/useQRCodeStore'
import MostBookedHealthCheckups from "../Home/MostBookedHealthCheckups.vue";

const cartStore = useCartStore();

// ========================== STATE ==========================
const route = useRoute();
const router = useRouter();
const orderId = route.params.orderId;
const loading = ref(true);
const submitting = ref(false);
const isChecking = ref(false);

const numPersons = ref("");
const persons = ref([{ name: "", age: "", gender: "" }]);
const errors = ref({});
const backendMessage = ref({ text: "", type: "" });

const pincodeMessage = ref("");
const pincodeStatus = ref("");

const form = ref({
    pincode: "",
    email: "",
    mobile: "",
    address: "",
    date: "",
    timeSlot: "",
    homeCollection: false,
    printedReports: false,
});

// Charges
const HOME_COLLECTION_THRESHOLD = 300;
const homeCollectionCharge = 200;
const printedReportCharge = 75;

// ========================== COMPUTED ==========================
const totalBasePrice = computed(() =>
    cartStore.cartItems.reduce((sum, item) => sum + Number(item.discounted_price || 0), 0)
);

const finalAmount = computed(() => {
    let total = totalBasePrice.value;
    if (total < HOME_COLLECTION_THRESHOLD) total += homeCollectionCharge;
    if (form.value.printedReports) total += printedReportCharge;
    return Math.round(total);
});

const totalAmount = ref(0);
watch(finalAmount, v => (totalAmount.value = v), { immediate: true });

// ========================== PERSON HANDLING ==========================
watch(numPersons, count => {
    const n = Number(count);
    persons.value = Array.from({ length: n || 1 }, () => ({
        name: "",
        age: "",
        gender: "",
    }));
});

watch(persons, newPersons => {
    newPersons.forEach((p, i) => {
        p.name = p.name.replace(/[^a-zA-Z\s]/g, "");
        ["name", "age", "gender"].forEach(f => {
            if (p[f]) delete errors.value[`${f}_${i}`];
        });
    });
}, { deep: true });

// ========================== TIME SLOTS ==========================
const timeSlots = ref([]);
const minDate = ref(new Date().toISOString().split("T")[0]);

const generateTimeSlots = () => {
    const slots = [];
    const start = new Date(); start.setHours(5, 30, 0, 0);
    const end = new Date(); end.setHours(19, 0, 0, 0);

    while (start < end) {
        const endTime = new Date(start.getTime() + 30 * 60000);
        const format = d => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
        slots.push(`${format(start)} - ${format(endTime)}`);
        start.setTime(endTime.getTime());
    }
    return slots;
};

const allSlots = generateTimeSlots();

watch(() => form.value.date, newDate => {
    if (!newDate) {
        timeSlots.value = [];
        form.value.timeSlot = "";
        return;
    }

    const selected = new Date(newDate);
    const today = new Date();

    const isToday = selected.toDateString() === today.toDateString();
    if (isToday) {
        const now = new Date();
        timeSlots.value = allSlots.filter(slot => {
            const [startStr] = slot.split(" - ");
            const [time, meridiem] = startStr.split(" ");
            let [hour, minute] = time.split(":").map(Number);
            if (meridiem === "PM" && hour !== 12) hour += 12;
            if (meridiem === "AM" && hour === 12) hour = 0;

            const slotStart = new Date(); slotStart.setHours(hour, minute, 0, 0);
            return slotStart > now;
        });
    } else {
        timeSlots.value = [...allSlots];
    }

    form.value.timeSlot = "";
});

// ========================== VALIDATIONS ==========================
const onPincodeInput = (e) => {
    const value = e.target.value;

    // ✅ Allow only digits
    const digitsOnly = value.replace(/\D/g, "");

    // ✅ Update model
    form.value.pincode = digitsOnly;

    // ✅ Validation
    if (!digitsOnly) {
        errors.value.pincode = "Please enter pincode.";
        pincodeMessage.value = "";
        pincodeStatus.value = "";
    } else if (digitsOnly.length < 6) {
        errors.value.pincode = "Pincode must be 6 digits.";
        pincodeMessage.value = "";
        pincodeStatus.value = "";
    } else if (digitsOnly.length > 6) {
        // ✅ Show immediate message if more than 6 digits
        errors.value.pincode = "Pincode cannot exceed 6 digits.";
        pincodeMessage.value = "";
        pincodeStatus.value = "error";
    } else {
        // ✅ Clear errors when exactly 6 digits
        delete errors.value.pincode;
        pincodeMessage.value = "";
        pincodeStatus.value = "";
    }
};

const onAddressInput = (e) => {
    const value = e.target.value; // ✅ no .trim() here
    form.value.address = value;

    const trimmedValue = value.trim();

    if (!trimmedValue) {
        errors.value.address = "Please enter your address.";
    } else if (trimmedValue.length < 25) {
        errors.value.address = "Address must be at least 25 characters.";
    } else {
        delete errors.value.address;
    }
};

const validateAge = (index) => {
    let value = persons.value[index].age.toString();

    // CASE 1: User typed "-" (negative sign)
    if (value === "-") {
        errors.value[`age_${index}`] = "Negative numbers are not allowed";
        return;
    }

    // Convert to number for checks
    const num = Number(value);

    // CASE 2: Live validation
    if (!value) {
        errors.value[`age_${index}`] = "Age is required.";
    }
    else if (isNaN(num)) {
        errors.value[`age_${index}`] = "Age must be a number.";
    }
    else if (num < 0) {
        errors.value[`age_${index}`] = "Negative numbers are not allowed";
        persons.value[index].age = ""; // Clear input
    }
    else if (num > 100) {
        errors.value[`age_${index}`] =
            "Age should be a number between 0 and 100";
    }
    else {
        delete errors.value[`age_${index}`];
    }
};



// ========================== LIVE FIELD VALIDATIONS ==========================
watch(() => form.value.email, (val) => {
    const email = val.trim();
    if (!email) {
        errors.value.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.value.email = "Please enter a valid email address (example@domain.com).";
    } else {
        delete errors.value.email;
    }
});

watch(() => form.value.mobile, (val) => {
    const mobile = val.trim();
    if (!mobile) {
        errors.value.mobile = "Please enter your mobile number.";
    } else if (!/^[6-9]\d{9}$/.test(mobile)) {
        errors.value.mobile = "Please enter a valid Indian mobile number.";
    } else {
        delete errors.value.mobile;
    }
});

const onMobileInput = (e) => {
    // ✅ Remove all non-digit characters
    const digitsOnly = e.target.value.replace(/\D/g, "");
    form.value.mobile = digitsOnly;

    // ✅ Live validation messages
    if (!digitsOnly) {
        errors.value.mobile = "Please enter your mobile number.";
    } else if (!/^[6-9]\d{0,9}$/.test(digitsOnly)) {
        errors.value.mobile = "Please enter a valid Indian mobile number.";
    } else if (digitsOnly.length > 10) {
        errors.value.mobile = "Mobile number cannot exceed 10 digits.";
    } else if (digitsOnly.length < 10) {
        errors.value.mobile = "Mobile number must be 10 digits.";
    } else {
        delete errors.value.mobile;
    }
};


const clearError = field => delete errors.value[field];

const validateBeforeSubmit = () => {
    errors.value = {};

    const f = form.value;
    const pin = f.pincode?.trim();

    if (!pin) errors.value.pincode = "Please enter pincode.";
    else if (!/^\d{6}$/.test(pin)) errors.value.pincode = "Pincode must be 6 digits.";

    persons.value.forEach((p, i) => {
        if (!p.name) errors.value[`name_${i}`] = "Name is required.";
        else if (!/^[A-Za-z\s]+$/.test(p.name)) errors.value[`name_${i}`] = "Name must contain only letters.";
        if (!p.age) errors.value[`age_${i}`] = "Age is required.";
        if (!p.gender) errors.value[`gender_${i}`] = "Gender is required.";
    });

    if (!f.email) errors.value.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errors.value.email = "Invalid email address.";

    const mobile = f.mobile?.trim();
    if (!mobile) errors.value.mobile = "Please enter your mobile number.";
    else if (!/^[6-9]\d{9}$/.test(mobile)) errors.value.mobile = "Invalid Indian mobile number.";

    const addr = f.address?.trim();
    if (!addr) errors.value.address = "Please enter your address.";
    else if (addr.length < 25) errors.value.address = "Address must be at least 25 characters.";

    if (!f.date) errors.value.date = "Please select date.";
    if (!f.timeSlot) errors.value.timeSlot = "Please select time slot.";

    if (!cartStore.cartItems?.length)
        backendMessage.value = { text: "No items in cart to book.", type: "error" };

    return !Object.keys(errors.value).length && (!backendMessage.value.text || backendMessage.value.type !== "error");
};

// ========================== PINCODE CHECK ==========================
const checkPincodeAvailability = async () => {
    const pincode = form.value.pincode.trim();
    pincodeMessage.value = "";
    pincodeStatus.value = "";

    if (!/^\d{6}$/.test(pincode)) {
        pincodeMessage.value = "Enter valid 6 digit pincode first.";
        pincodeStatus.value = "error";
        return;
    }

    isChecking.value = true;
    try {
        const { data } = await axios.get("/api/method/bloodtestnearme.api.pincodes_api.getby_pincodes", { params: { pincode } });
        const msg = data?.message;
        pincodeMessage.value = msg?.message || "Response received";
        pincodeStatus.value = msg?.status || "success";
    } catch (err) {
        console.error("Error checking pincode:", err);
        pincodeMessage.value = err.response?.data?.message || "Unable to check availability.";
        pincodeStatus.value = "error";
    } finally {
        isChecking.value = false;
    }
};

// ========================== SUBMIT ORDER ==========================
const singleOrderSubmit = async () => {
    backendMessage.value = { text: "", type: "" };

    // -----------------------------------------------------
    // ✅ Validate front-end form
    // -----------------------------------------------------
    if (!validateBeforeSubmit()) {
        backendMessage.value = { text: "Please fix the errors above.", type: "error" };
        return;
    }

    // -----------------------------------------------------
    // ✅ Validate pincode first
    // -----------------------------------------------------
    if (pincodeStatus.value !== "success") {
        await checkPincodeAvailability();
        if (pincodeStatus.value !== "success") {
            backendMessage.value = {
                text: pincodeMessage.value || "Home collection not available for this pincode.",
                type: "error",
            };
            return;
        }
    }

    // -----------------------------------------------------
    // ✅ Load scanned ID from localStorage using Pinia store
    // -----------------------------------------------------
    const qrCodeStore = useQRCodeStore();
    qrCodeStore.loadScannedId();
    const scannedId = qrCodeStore.scannedId;

    // -----------------------------------------------------
    // ✅ Prepare pure JS payload
    // -----------------------------------------------------
    const payload = {
        customer_name: persons.value[0]?.name || "",
        age: persons.value[0]?.age || "",
        gender: persons.value[0]?.gender || "",
        email: form.value.email,
        mobile_number: form.value.mobile,
        address: form.value.address,
        pincode: form.value.pincode,
        appointment_date: form.value.date,
        appointment_time: form.value.timeSlot,

        number_of_persons: Number(numPersons.value) || persons.value.length || 1,
        hard_copy_required: form.value.printedReports ? 1 : 0,

        total_price: totalAmount.value,
        total_item_price: totalBasePrice.value,

        ordered_items: JSON.parse(JSON.stringify(cartStore.cartItems)),
        customer_details: JSON.parse(JSON.stringify(persons.value)),

        home_collection: form.value.homeCollection ? 1 : 0,
    };

    // -----------------------------------------------------
    // ✅ Add affiliated_id only when available
    // -----------------------------------------------------
    if (scannedId) {
        payload.affiliated_id = scannedId;
        console.log("📦 Including affiliated_id in payload:", scannedId);
    }

    submitting.value = true;
    loading.value = true;

    try {
        // -----------------------------------------------------
        // ✅ Send to backend
        // -----------------------------------------------------
        const res = await axios.post(
            "/api/method/bloodtestnearme.api.order_api.create_order",
            payload
        );

        const responseData = res.data?.message ?? res.data ?? {};
        const ok = responseData.status === "success";

        // -----------------------------------------------------
        // ✅ SUCCESS → Redirect to Thank You page
        // -----------------------------------------------------
        if (ok && responseData.order_id) {
            cartStore.clearCart?.();

            router.replace({
                name: "ThankYou",
                params: { orderId: responseData.order_id }
            });

            return;
        }

        // -----------------------------------------------------
        // ❌ Success but order_id missing
        // -----------------------------------------------------
        if (ok && !responseData.order_id) {
            backendMessage.value = {
                text: "Order placed but Order ID missing. Please contact support.",
                type: "error",
            };
            return;
        }

        // -----------------------------------------------------
        // ❌ Failure
        // -----------------------------------------------------
        backendMessage.value = {
            text: responseData?.message || "Failed to create order.",
            type: "error",
        };

    } catch (err) {
        console.error("Order creation error:", err);

        backendMessage.value = {
            text: err?.response?.data?.message || "Server error occurred.",
            type: "error",
        };
    } finally {
        submitting.value = false;
        loading.value = false;
    }
};

// ========================== FETCH INIT ==========================
onMounted(async () => {
    try {
        await Promise.all([
            axios.get("/api/method/bloodtestnearme.api.packages.get_individual_packages"),
            axios.get("/api/method/bloodtestnearme.api.packages.get_package_based_tests"),
        ]);
    } catch (err) {
        console.error("Error fetching packages:", err);
    } finally {
        loading.value = false;
    }
});
</script>