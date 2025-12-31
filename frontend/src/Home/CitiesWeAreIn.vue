<template>
    <section class="container">
        <h2 class="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#001D55] mb-6">
            Cities We Are In
        </h2>

        <div
            class="flex flex-wrap justify-center gap-x-2 max-w-5xl mx-auto text-[#001D55] text-sm sm:text-base font-semibold leading-relaxed text-center">

            <span v-for="(city, index) in cities" :key="index"
                class="cursor-pointer hover:text-[#2077BF] transition-colors duration-200" @click="goToCity(city)">
                {{ city }}
                <span v-if="index !== cities.length - 1"> | </span>
            </span>

        </div>
    </section>
</template>

<script>
export default {
    name: "CitiesWeAreIn",
    data() {
        return {
            cities: [
                "Agra", "Ahmedabad", "Aligarh", "Bareilly", "Bengaluru", "Bhopal",
                "Bhubaneswar", "Bilaspur", "Chennai", "Chhattisgarh", "Coimbatore",
                "Dadar", "Delhi", "Dhanbad", "Ernakulam", "Faridabad", "Ghaziabad",
                "Goa", "Gonda", "Greater Noida", "Gurgaon", "Gwalior", "Hyderabad",
                "Indore", "Jabalpur", "Jaipur", "Jamshedpur", "Jhansi", "Jodhpur",
                "Kalyan", "Kerala", "Kochi", "Kolkata", "Kota", "Lucknow", "Ludhiana",
                "Mangalore", "Mulund", "Mumbai", "Navi Mumbai", "Nizamabad", "Noida",
                "Panaji", "Patiala", "Patna", "Pune", "Rajkot", "Ranchi", "Ratnagiri",
                "South Delhi", "Surat", "Tirupati", "Udaipur", "Varanasi",
                "Venkateswara Nagar", "Vijayawada", "Visakhapatnam", "West Bengal",
                "West Delhi",
            ],
        };
    },
    methods: {
        goToCity(city) {
            const slug = city
                .toLowerCase()
                .replace(/\s+/g, "-");

            this.$router.push(`/city/${slug}`);
        },
    },
};
</script>

<style scoped>
section {
    animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
