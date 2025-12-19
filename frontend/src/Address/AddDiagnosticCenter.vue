<template>
  <div>
    <div class="container mx-auto px-4 py-6">
      <h2 class="text-3xl font-semibold mb-4 bold-test-color">
        Diagnostic Center Contact Information
      </h2>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        @submit.prevent="handleSubmit"
        class="grid grid-cols-2 gap-x-4 gap-y-3 bg-white p-3 rounded-lg shadow-sm border border-gray-200"
      >
        <!-- Lab Name -->
        <el-form-item label="Lab Name" prop="labName">
          <input
            v-model="form.labName"
            type="text"
            placeholder="Enter Lab Name"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </el-form-item>

        <!-- Address -->
        <el-form-item label="Address" prop="address">
          <textarea
            v-model="form.address"
            placeholder="Enter Address"
            rows="1"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          ></textarea>
        </el-form-item>

        <!-- Phone -->
        <el-form-item label="Phone Number" prop="phone">
          <input
            v-model="form.phone"
            type="text"
            placeholder="Enter Phone Number"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </el-form-item>

        <!-- City -->
        <el-form-item label="City" prop="city">
          <input
            v-model="form.city"
            type="text"
            placeholder="Enter City"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </el-form-item>

        <!-- State -->
        <el-form-item label="State" prop="state">
          <input
            v-model="form.state"
            type="text"
            placeholder="Enter State"
            class="w-full border border-gray-300 rounded-md px-3 py-1"
          />
        </el-form-item>

        <!-- Pincode -->
        <el-form-item label="Pincode" prop="pincode">
          <input
            v-model="form.pincode"
            type="text"
            placeholder="Enter Pincode"
            class="w-full border border-gray-300 rounded-md px-3 py-1"
          />
        </el-form-item>

        <!-- Location Link -->
        <el-form-item label="Location Link" prop="locationLink">
          <input
            v-model="form.locationLink"
            type="text"
            placeholder="Paste location link"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </el-form-item>

        <!-- Website -->
        <el-form-item label="Website" prop="website">
          <input
            v-model="form.website"
            type="text"
            placeholder="Enter Website URL"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </el-form-item>

        <!-- Buttons -->
        <div class="col-span-2 flex justify-end mt-2 space-x-3">
          <el-button type="default" @click="resetForm">Cancel</el-button>
          <el-button type="primary" @click="handleSubmit">Submit</el-button>
        </div>
      </el-form>

      <!-- Success / Error message -->
      <p v-if="successMsg" class="text-green-600 mt-1">{{ successMsg }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";

const formRef = ref();
const successMsg = ref("");

const form = reactive({
  labName: "",
  address: "",
  phone: "",
  city: "",
  state: "",
  pincode: "",
  locationLink: "",
  website: "",
});

const rules = {
  labName: [{ required: true, message: "Please enter Lab Name", trigger: "blur" }],

  // Address must be minimum 25 characters
  address: [
    { required: true, message: "Please enter Address", trigger: "blur" },
    {
      min: 25,
      message: "Address must be at least 25 characters",
      trigger: "blur",
    },
  ],

  // Phone validation
phone: [
  { required: true, message: "Please enter Phone Number", trigger: "blur" },

  {
    validator: (rule, value, callback) => {
      const digitsOnly = value.replace(/\D/g, ""); // remove non-digits

      if (!digitsOnly) {
        callback(new Error("Please enter your mobile number."));
      } 
      else if (!/^[6-9]\d{0,9}$/.test(digitsOnly)) {
        callback(new Error("Please enter a valid Indian mobile number."));
      } 
      else if (digitsOnly.length > 10) {
        callback(new Error("Mobile number cannot exceed 10 digits."));
      } 
      else if (digitsOnly.length < 10) {
        callback(new Error("Mobile number must be 10 digits."));
      } 
      else {
        callback(); // valid
      }
    },
    trigger: "blur",
  },
],


  city: [{ required: true, message: "Please enter City", trigger: "blur" }],
  state: [{ required: true, message: "Please enter State", trigger: "blur" }],

  // Pincode validation
  pincode: [
    { required: true, message: "Please enter Pincode", trigger: "blur" },
    { pattern: /^[1-9][0-9]{5}$/, message: "Enter valid 6-digit pincode", trigger: "blur" },
  ],

  // Location link URL validation
  locationLink: [
    { required: true, message: "Please enter location link", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        try {
          new URL(value);
          callback();
        } catch {
          callback(new Error("Enter valid URL"));
        }
      },
      trigger: "blur",
    },
  ],

  // Website validation (must be a real website)
website: [],

};

const resetForm = () => {
  formRef.value.resetFields();
  // ❌ Do not clear successMsg here
};

const handleSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) {
      successMsg.value = "Please fill all required fields correctly.";
      console.log("Form validation failed");
      return;
    }

    try {
      const payload = {
        diagnostic_center_name: form.labName,
        address: form.address,
        phone_number: form.phone,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        map_embed_link: form.locationLink,
        website: form.website,
        workflow_state: "Created",
      };

      const res = await fetch(
        "/api/method/bloodtestnearme.api.diagnostic_center.create_diagnostic_center",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      ).then((r) => r.json());

      // 🔥 Show entire response in console
      console.log("API Response:", res);

      if (res.message?.message === "Diagnostic Center created successfully") {
        successMsg.value = res.message.message;
        resetForm();
      } else {
        successMsg.value =
          res.message?.message || "Something went wrong. Please try again.";
      }
    } catch (err) {
      console.error("Error:", err);
      successMsg.value = "Something went wrong. Please try again.";
    }
  });
};

</script>

<style scoped>
.el-form-item {
  margin-bottom: 8px !important;
}

:deep(.el-form-item__label) {
  color: #001D55 !important;
}
</style>

