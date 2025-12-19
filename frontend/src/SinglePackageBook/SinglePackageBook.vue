<template>
    <div v-if="isLoading" class="flex justify-center items-center h-60">
        <div class="flex flex-col items-center">
            <svg class="animate-spin h-8 w-8 text-[#001D55]" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <p class="text-[#001D55] mt-3 font-semibold">Loading package details...</p>
        </div>
    </div>

    <div v-else>
        <div class="container">
            <div class="py-4 row">
                <div class="col-12 col-md-6 mb-2">
                    <!-- Always visible -->
                    <h4 class="bold-test-color pb-2">
                        {{ packageData.name1 }} ({{ packageData.number_of_test }} Tests)
                    </h4>

                    <!-- Visible only on md and above -->
                    <div class="bold-test-color d-none d-md-block">
                        <div class="pt-2" v-html="packageData.description"></div>

                        <div class="pt-4">
                            <strong>Sample Type: </strong>
                            <span class="text-red-600">{{ packageData.sample_type }}</span>
                        </div>
                    </div>
                </div>


                <!-- Form -->
                <div class="col-12 col-md-6">
                    <div class="p-3 border-0 shadow-sm rounded-xl bg-gray-50">
                        <form @submit.prevent="singleTestSubmit" class="space-y-2 bold-test-color">
                            <!-- Row 1 -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 items-start">
                                <div class="relative w-full min-h-[40px]">
                                    <input v-model="form.pincode" @input="clearError('pincode')" type="text"
                                        placeholder="Pincode *"
                                        class="border rounded-md px-3 py-[1px] text-sm w-full" />

                                    <p v-if="errors.pincode" class="absolute text-[11px] text-red-500 mt-[2px]"> {{
                                        errors.pincode }} </p>
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

                            <!-- Row 2 -->
                            <div>
                                <!-- Select Number of Persons -->
                                <select v-model="numPersons" class="border rounded-md px-3 py-1 text-sm w-full">
                                    <option disabled value="">Select Number of Person *</option>
                                    <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                                </select>

                                <div class="text-xs text-red-500 mb-2 mt-2">
                                    Note: Same set of tests/packages will be added for all persons.
                                </div>

                                <!-- Dynamic Fields -->
                                <div v-for="(person, index) in persons" :key="index"
                                    class="border p-1 rounded-md bg-gray-50 mb-2">
                                    <h6 v-if="numPersons && numPersons > 1" class="text-sm font-semibold mb-2 mt-2">
                                        Person {{ index + 1 }}
                                    </h6>

                                    <!-- Beneficiary Name -->
                                    <input v-model="person.name" @input="clearError(`name_${index}`)" type="text"
                                        placeholder="Beneficiary Name *"
                                        class="border rounded-md px-3 py-[1px] text-sm w-full mb-2" />
                                    <p v-if="errors[`name_${index}`]" class="text-xs text-red-500 mt-1">
                                        {{ errors[`name_${index}`] }}
                                    </p>

                                    <!-- Age & Gender -->
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

                            <!-- Row 4 -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                    <input v-model="form.email" @input="clearError('email')" type="email"
                                        placeholder="Email *" class="border rounded-md px-3 py-[1px] text-sm w-full" />
                                    <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
                                </div>

                                <div>
                                    <input v-model="form.mobile" @input="onMobileInput" type="tel"
                                        placeholder="Mobile (Indian Number Only) *"
                                        class="border rounded-md px-3 py-[1px] text-sm w-full" />
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

                            <!-- Date and Time -->
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
                                <!-- Printed Reports Option -->
                                <div class="flex items-center text-sm text-gray-700">
                                    <input type="checkbox" v-model="form.printedReports" id="printedReports"
                                        class="mr-2" />
                                    <label for="printedReports" class="text-red-500">
                                        Additional Rs. 75 for Printed Reports
                                    </label>
                                </div>

                                <!-- Price Summary -->
                                <div class="mt-3">
                                    <p><strong>Test/Package Price:</strong> ₹{{ packageData.discounted_price }}</p>

                                    <!-- ✅ Show Home Collection only if price < 300 -->
                                    <p v-if="packageData.discounted_price < 300">
                                        <strong>Home Collection Charge:</strong> ₹{{ homeCollectionCharge }}
                                    </p>

                                    <p v-if="form.printedReports">
                                        <strong>Printed Report Charge:</strong> ₹{{ printedReportCharge }}
                                    </p>

                                    <p class="mt-2 text-lg font-semibold text-[#001D55]">
                                        <strong>Total Amount:</strong> ₹{{ finalAmount }}
                                    </p>
                                </div>
                            </div>

                            <div class="flex justify-center">
                                <button type="submit"
                                    class="global-bg-color text-white px-20 py-2 rounded-full hover:bg-blue-700 transition w-full sm:w-auto">
                                    Book Now
                                </button>
                            </div>

                            <!-- ✅ Backend Message Display (Cleaned) -->
                            <div v-if="frontendSuccessMessage" class="mt-3 text-center">
                                <p class="text-green-600">{{ frontendSuccessMessage }}</p>
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
import { useRoute } from "vue-router";
import axios from "axios";
import { useQRCodeStore } from '@/stores/useQRCodeStore'
import MostBookedHealthCheckups from "../Home/MostBookedHealthCheckups.vue";

const route = useRoute();
// const packageName = route.params.name1;
const packageName = decodeURIComponent(route.params.slug);
const packageData = ref({});
const isLoading = ref(true);
const totalAmount = ref(0);
const pincodeMessage = ref("");
const pincodeStatus = ref("");
const isChecking = ref(false);
// const successmessage = ref("");
const frontendSuccessMessage = ref("");


// 🧍‍♂️ Dynamic form logic
const numPersons = ref("");
const persons = ref([{ name: "", age: "", gender: "" }]);

watch(numPersons, (newVal) => {
    const count = Number(newVal);
    if (!count) {
        persons.value = [{ name: "", age: "", gender: "" }];
        return;
    }
    persons.value = Array.from({ length: count }, () => ({
        name: "",
        age: "",
        gender: "",
    }));
});

// 🧾 Main form fields
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

const errors = ref({});
const timeSlots = ref([]);
const todayISO = new Date().toISOString().split("T")[0];
const minDate = ref(todayISO);
const homeCollectionCharge = ref(200);
const printedReportCharge = ref(75);

// 🕒 Generate time slots
const generateTimeSlots = () => {
    const slots = [];
    const start = new Date();
    start.setHours(7, 0, 0, 0);
    const end = new Date();
    end.setHours(18, 0, 0, 0);

    while (start < end) {
        const endTime = new Date(start.getTime() + 30 * 60000);
        const formatTime = (date) =>
            date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
        slots.push(`${formatTime(start)} - ${formatTime(endTime)}`);
        start.setTime(endTime.getTime());
    }
    return slots;
};

const allSlots = generateTimeSlots();

watch(
    () => form.value.date,
    (newDate) => {
        if (!newDate) {
            timeSlots.value = [];
            form.value.timeSlot = "";
            return;
        }

        const selected = new Date(newDate);
        const today = new Date();

        if (
            selected.getFullYear() === today.getFullYear() &&
            selected.getMonth() === today.getMonth() &&
            selected.getDate() === today.getDate()
        ) {
            const now = new Date();
            timeSlots.value = allSlots.filter((slot) => {
                const slotStart = new Date();
                const [startStr] = slot.split(" - ");
                const [time, meridiem] = startStr.split(" ");
                let [hour, minute] = time.split(":").map(Number);
                if (meridiem === "PM" && hour !== 12) hour += 12;
                if (meridiem === "AM" && hour === 12) hour = 0;
                slotStart.setHours(hour, minute, 0, 0);
                return slotStart > now;
            });
        } else {
            timeSlots.value = [...allSlots];
        }

        form.value.timeSlot = "";
    }
);


const fetchPackageDetails = async () => {
    isLoading.value = true;

    try {
        const packageUrl = route.params.url || route.params.slug || route.params.id;

        if (packageUrl) {
            // 🔹 Try fetching directly by URL first
            try {
                const response = await axios.get(
                    "/api/method/bloodtestnearme.api.packages.get_packages",
                    { params: { url: decodeURIComponent(packageUrl) } }
                );

                const msg = response.data?.message;
                const data =
                    Array.isArray(msg?.data) && msg.data.length
                        ? msg.data[0]
                        : msg?.data || msg;

                if (data) {
                    packageData.value = data;
                    totalAmount.value =
                        parseFloat(data.discounted_price || 0) + homeCollectionCharge.value;

                    // ✅ Apply SEO meta updates
                    updatePageSEO(data);

                    return; // ✅ Stop here if found
                } else {
                    console.warn("⚠️ No data found using URL param:", packageUrl);
                }
            } catch (urlError) {
                console.warn("⚠️ URL-based API failed, falling back to full fetch.");
            }
        }

        // 🔹 Fallback: search manually in both endpoints
        const endpoints = [
            "/api/method/bloodtestnearme.api.packages.get_package_based_tests",
            "/api/method/bloodtestnearme.api.packages.get_individual_packages",
        ];

        for (const endpoint of endpoints) {
            const response = await axios.get(endpoint);
            const data = response.data?.message?.data || [];

            const found = data.find((pkg) => {
                const normalizedName = pkg.name1?.toLowerCase().replace(/\s+/g, "-");
                return normalizedName === packageUrl?.toLowerCase();
            });

            if (found) {
                packageData.value = found;
                totalAmount.value =
                    parseFloat(found.discounted_price || 0) + homeCollectionCharge.value;

                // ✅ Apply SEO meta updates
                updatePageSEO(found);

                break;
            }
        }
    } catch (error) {
        console.error("❌ Error fetching package details:", error);
    } finally {
        isLoading.value = false;
    }
};

/**
 * ✅ Dynamically updates page title and meta description
 */
const updatePageSEO = (data) => {
    // 🔹 Update tab title
    document.title =
        data.title ||
        data.package_name ||
        data.name1 ||
        "Blood Test Near Me - Health Packages";

    // 🔹 Update or create <meta name="description">
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
    }

    metaDesc.setAttribute(
        "content",
        data.meta_description ||
        data.short_description ||
        `Book ${data.package_name || "this health checkup"} at home easily with Blood Test Near Me.`
    );

    // (Optional) You can also handle Open Graph (for sharing)
    setOrUpdateMeta("og:title", data.meta_title || data.package_name);
    setOrUpdateMeta("og:description", data.meta_description);
    setOrUpdateMeta("og:type", "website");
};

/**
 * Helper to safely set/update meta tags
 */
const setOrUpdateMeta = (property, content) => {
    if (!content) return;
    let meta = document.querySelector(`meta[property='${property}']`);
    if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
};

// ✅ Submit and Call Backend API
const singleTestSubmit = async () => {
    frontendSuccessMessage.value = "";
    errors.value = {};

    // ✅ Validate form first
    const isValid = handleSubmit();
    if (!isValid) {
        frontendSuccessMessage.value = "Please fix the highlighted errors before submitting.";
        return;
    }

    // ✅ Auto-check pincode if not manually checked
    const isPincodeValid =
        pincodeStatus.value === "success" ||
        (await checkPincodeAvailability(true));

    if (!isPincodeValid) {
        frontendSuccessMessage.value = "Please enter a valid pincode before booking.";
        return;
    }

    isLoading.value = true;

    try {
        // -----------------------------------------------------
        // ✅ Load QR code data from Pinia store (Correct Method)
        // -----------------------------------------------------
        const qrCodeStore = useQRCodeStore();
        qrCodeStore.loadScannedId();  // <-- FIXED
        const scannedId = qrCodeStore.scannedId;

        // -----------------------------------------------------
        // ✅ Prepare raw payload (Vue reactive objects avoided)
        // -----------------------------------------------------
        let rawPayload = {
            customer_name: persons.value[0]?.name || "",
            age: persons.value[0]?.age || "",
            gender: persons.value[0]?.gender || "",
            email: form.value.email,
            mobile_number: form.value.mobile,
            address: form.value.address,
            pincode: form.value.pincode,
            appointment_date: form.value.date,
            appointment_time: form.value.timeSlot,
            number_of_persons: numPersons.value || 1,
            hard_copy_required: form.value.printedReports ? 1 : 0,
            total_price: totalAmount.value,
            total_item_price: packageData.value.discounted_price,
            ordered_items: [packageData.value],
            customer_details: persons.value,
        };

        // Add affiliate ID only if exists
        if (scannedId) {
            rawPayload.affiliated_id = scannedId;
        }

        // -----------------------------------------------------
        // ✅ Deep clone to remove Vue Proxy / refs
        // -----------------------------------------------------
        const payload = JSON.parse(JSON.stringify(rawPayload));
        console.log("Payload:", payload);

        // -----------------------------------------------------
        // ✅ Send request
        // -----------------------------------------------------
        const res = await axios.post(
            "/api/method/bloodtestnearme.api.order_api.create_order",
            payload
        );

        // Frappe sometimes returns {message:{...}} or plain {...}
        const data = res.data?.message ?? res.data ?? {};

        // -----------------------------------------------------
        // ✅ Handle backend success
        // -----------------------------------------------------
        if (data.status === "success") {
            frontendSuccessMessage.value =
                data.successmessage || "Your order is submitted successfully";

            // Reset form on success
            form.value = {
                pincode: "",
                email: "",
                mobile: "",
                address: "",
                date: "",
                timeSlot: "",
                homeCollection: false,
                printedReports: false,
            };

            numPersons.value = "";
            persons.value = [{ name: "", age: "", gender: "" }];
            pincodeMessage.value = "";
            pincodeStatus.value = "";

            // Auto-clear message
            setTimeout(() => (frontendSuccessMessage.value = ""), 3000);
        } else {
            frontendSuccessMessage.value =
                data.message || "Failed to create order. Please try again.";
        }
    } catch (error) {
        console.error("API ERROR:", error.response?.data || error);

        frontendSuccessMessage.value =
            error.response?.data?.message ||
            error.response?.data?.exc ||
            "Server error occurred.";
    } finally {
        isLoading.value = false;
    }
};

// 🧩 Check Pincode Availability (Backend Message Only)
const checkPincodeAvailability = async (autoCheck = false) => {
    const pincode = form.value.pincode?.trim();

    // If empty and this was an auto check from "Book Now"
    if (!pincode && autoCheck) {
        errors.value.pincode = "Please enter your pincode before booking.";
        return false;
    }

    if (!/^\d{6}$/.test(pincode)) {
        errors.value.pincode = "Pincode must be 6 digits.";
        return false;
    }

    // Reset message and status
    pincodeMessage.value = "";
    pincodeStatus.value = "";
    isChecking.value = true;

    try {
        const response = await axios.get(
            "/api/method/bloodtestnearme.api.pincodes_api.getby_pincodes",
            { params: { pincode } }
        );

        const res = response.data?.message;

        if (res) {
            pincodeMessage.value = res.message || "";
            pincodeStatus.value = res.status || "error";
        } else {
            pincodeMessage.value = "Unexpected API response format.";
            pincodeStatus.value = "error";
        }
    } catch (error) {
        console.error("Error checking pincode:", error);
        pincodeMessage.value = "Unable to check availability at the moment.";
        pincodeStatus.value = "error";
    } finally {
        isChecking.value = false;
    }

    return pincodeStatus.value === "success";
};


onMounted(fetchPackageDetails);

// 🧩 Pincode Input Logic → only numbers allowed
watch(
    () => form.value.pincode,
    (val) => {
        const digitsOnly = val.replace(/\D/g, "");
        if (val !== digitsOnly) form.value.pincode = digitsOnly;

        // 🧹 Clear previous messages when user types a new pincode
        pincodeMessage.value = "";
        pincodeStatus.value = "";

        if (!digitsOnly) {
            errors.value.pincode = "Please enter pincode.";
        } else if (digitsOnly.length !== 6) {
            errors.value.pincode = "Pincode must be 6 digits.";
        } else {
            delete errors.value.pincode;
        }
    }
);

// 🧩 Email Validation Logic
watch(
    () => form.value.email,
    (val) => {
        if (!val) {
            errors.value.email = "Please enter your email.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            errors.value.email = "Please enter a valid email address (example@domain.com).";
        } else {
            delete errors.value.email;
        }
    }
);

// 🧩 Mobile Input Logic
const onMobileInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) value = value.slice(0, 10);
    form.value.mobile = value;

    if (!value) {
        errors.value.mobile = "Please enter your mobile number.";
    } else if (!/^[6-9]/.test(value)) {
        errors.value.mobile = "Please enter a valid Indian mobile number.";
    } else if (value.length < 10) {
        errors.value.mobile = "Mobile number must be exactly 10 digits.";
    } else {
        delete errors.value.mobile;
    }
};

// 🧩 Address Input Logic
const onAddressInput = (e) => {
    const value = e.target.value; // ❌ no trim here
    form.value.address = value;

    if (!value.trim()) {
        errors.value.address = "Please enter your address.";
    } else if (value.trim().length < 25) {
        errors.value.address = "Address must be at least 25 characters long.";
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

// 🧩 Name Validation (only letters and spaces)
watch(
    persons,
    (newPersons) => {
        newPersons.forEach((person, i) => {
            // Remove invalid characters
            if (person.name && /[^a-zA-Z\s]/.test(person.name)) {
                person.name = person.name.replace(/[^a-zA-Z\s]/g, "");
            }

            if (person.name) delete errors.value[`name_${i}`];
            if (person.age) delete errors.value[`age_${i}`];
            if (person.gender) delete errors.value[`gender_${i}`];
        });
    },
    { deep: true }
);

// 🧩 Submit Validation — return true/false instead of alert
const handleSubmit = () => {
    errors.value = {};

    // Pincode
    if (!form.value.pincode) errors.value.pincode = "Please enter pincode.";
    else if (!/^\d{6}$/.test(form.value.pincode))
        errors.value.pincode = "Pincode must be 6 digits.";

    // Persons
    persons.value.forEach((p, i) => {
        if (!p.name) errors.value[`name_${i}`] = "Name is required.";
        else if (!/^[A-Za-z\s]+$/.test(p.name))
            errors.value[`name_${i}`] = "Name must contain only letters.";
        if (!p.age) {
            errors.value[`age_${i}`] = "Age is required.";
        } else if (p.age < 0 || p.age > 100) {
            errors.value[`age_${i}`] = "Age should be a number between 0 and 100";
        }
        if (!p.gender) errors.value[`gender_${i}`] = "Gender is required.";
    });

    // Email
    if (!form.value.email) errors.value.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email))
        errors.value.email = "Please enter a valid email address.";

    // Mobile
    const mobile = form.value.mobile.trim();
    if (!mobile) errors.value.mobile = "Please enter your mobile number.";
    else if (!/^[6-9]\d{9}$/.test(mobile))
        errors.value.mobile = "Invalid Indian mobile number.";

    // Address
    const address = form.value.address.trim();
    if (!address) errors.value.address = "Please enter your address.";
    else if (address.length < 25)
        errors.value.address = "Address must be at least 25 characters.";

    // Date & Time
    if (!form.value.date) errors.value.date = "Please select your date.";
    if (!form.value.timeSlot) errors.value.timeSlot = "Please select your time slot.";

    // ✅ Return true if valid, false otherwise
    return Object.keys(errors.value).length === 0;
};


// 🧮 Dynamic total amount
const finalAmount = computed(() => {
    const basePrice = parseFloat(packageData.value.discounted_price || 0);
    let total = basePrice;
    if (basePrice < 300) total += homeCollectionCharge.value;
    if (form.value.printedReports) total += printedReportCharge.value;
    return total;
});

watch(finalAmount, (val) => (totalAmount.value = val));
</script>