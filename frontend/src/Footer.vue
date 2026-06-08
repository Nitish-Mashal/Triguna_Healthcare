<template>
    <footer class="global-bg-color text-white py-8">
        <div class="container mx-auto px-4">

            <!-- ================= TOP SECTION ================= -->
            <div
                class="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/20 pb-6 mb-6">

                <!-- Logo -->
                <div>
                    <h6 class="text-sm uppercase tracking-wider mb-2">
                        Owned and Managed By
                    </h6>

                    <img src="/Triguna.png" alt="Triguna Healthcare" class="h-10">
                </div>

                <!-- Social Icons -->
                <div class="md:mt-0">
                    <h6 class="text-sm uppercase tracking-wider mb-3 text-center md:text-right">
                        Follow Us
                    </h6>

                    <div class="flex gap-4 justify-center md:justify-end">
                        <a v-for="(icon, index) in socialLinks" :key="index" :href="icon.url" target="_blank"
                            rel="noopener noreferrer"
                            class="text-white text-xl hover:text-gray-300 transition-transform hover:scale-110">
                            <i :class="icon.icon"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- ================= MIDDLE SECTION ================= -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                <!-- Quick Links -->
                <div>
                    <h2 class="font-bold text-lg mb-4 ml-8">
                        Quick Links
                    </h2>

                    <ul class="space-y-2 text-sm">
                        <li v-for="(link, index) in quickLinks" :key="'q' + index">
                            <router-link :to="link.path" class="text-white no-underline hover:underline">
                                {{ link.name }}
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- Health Checkups -->
                <div>
                    <h2 class="font-bold text-lg mb-4 ml-8">
                        Other Health Checkups
                    </h2>

                    <ul class="space-y-2 text-sm">
                        <li v-for="(pkg, index) in popularPackages" :key="'p' + index">
                            <router-link :to="{ name: 'SinglePackageBook', params: { slug: pkg.url } }"
                                class="text-white no-underline hover:underline">
                                {{ pkg.name }}
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- Lab Tests -->
                <div>
                    <h2 class="font-bold text-lg mb-4 ml-8">
                        Other Lab Tests
                    </h2>

                    <ul class="space-y-2 text-sm">
                        <li v-for="(pkg, index) in otherPackages" :key="'o' + index">
                            <router-link :to="{ name: 'SinglePackageBook', params: { slug: pkg.url } }"
                                class="text-white no-underline hover:underline">
                                {{ pkg.name }}
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- Address -->
                <div>
                    <h2 class="font-bold text-lg mb-4">
                        Address
                    </h2>

                    <div class="text-sm leading-6">
                        Triguna Healthcare <br>
                        Sy No, 373/3, Site No 5, Shop No 6 <br>
                        10th Cross, Classic Paradise Layout <br>
                        Begur Hulimavu Road, Begur <br>
                        Bangalore, Karnataka 560068
                    </div>

                    <div class="mt-4">
                        <a href="tel:+919611011266" class="text-white no-underline hover:underline">
                            +91 9611011266
                        </a>
                    </div>
                </div>

            </div>

            <!-- ================= BOTTOM SECTION ================= -->
            <div :class="[
                'flex flex-col md:flex-row items-start md:items-center text-sm gap-4 sm:gap-20 ml-8 sm:ml-8',
                isSmallScreen ? 'mt-3' : otherPackages.length > 0 ? 'mt-3' : 'mt-6'
            ]">
                <div class="text-white">
                    © 2026 Triguna Healthcare. All Rights Reserved.
                </div>

                <a href="https://quantumberg.com/" target="_blank" rel="noopener noreferrer"
                    class="text-white no-underline hover:underline">
                    <strong>Powered by</strong> Quantumberg Technologies Pvt. Ltd.
                </a>

                <a @click="handleLogin" class="cursor-pointer text-white no-underline hover:underline sm:ml-auto">
                    <strong>Login</strong>
                </a>
            </div>

        </div>
    </footer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

/* ✅ Static Social & Quick Links */
const socialLinks = [
    { name: "Facebook", url: " https://www.facebook.com/trigunahealthcares", icon: "bi bi-facebook" },
    { name: "Twitter", url: "https://x.com/BloodTestNearMe/", icon: "bi bi-twitter" },
    { name: "Instagram", url: "https://www.instagram.com/trigunahealthcare/", icon: "bi bi-instagram" },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/triguna-healthcare/", icon: "bi bi-linkedin" },
    { name: "YouTube", url: "https://www.youtube.com/@trigunahealthcares", icon: "bi bi-youtube" },
    { name: "Medium", url: " https://medium.com/@trigunahealthcare", icon: "bi bi-medium" },
];

const quickLinks = [
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
    { name: "Blogs", path: "/blog" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
    { name: "Careers", path: "/Careers" },
    { name: "Upcoming Services", path: "#" },
    { name: "Add Diagnostic Center", path: "/add-diagnostic-center" },
    { name: "Labs Near Me", path: "/labs-near-me" },
];

const handleLogin = () => {
    const backend = window.location.origin;
    const isLoggedIn = document.cookie.includes("sid=");

    if (isLoggedIn) {
        window.location.href = `${backend}/app/triguna`;
    } else {
        window.location.href = `${backend}/login?redirect-to=/app/triguna`;
    }
};

/* ✅ Reactive Variables */
const popularPackages = ref([]);
const otherPackages = ref([]);
const isSmallScreen = ref(false);

/* ✅ Fetch Data from NEW API */
const fetchPackages = async () => {
    try {
        const res = await axios.get("/api/method/bloodtestnearme.api.packages.get_packages_by_tags", {
            params: { tag: "footer" },
        });
        const data = res.data?.message || [];

        // Map packages to include name and url for routing
        const packages = data.map((pkg) => ({
            name: pkg.name,
            url: pkg.url || pkg.name.toLowerCase().replace(/\s+/g, "-"),
        }));

        popularPackages.value = packages.slice(0, 10);
        otherPackages.value = packages.slice(10, 20);
    } catch (err) {
        console.error("❌ Error fetching packages:", err);
    }
};

/* ✅ Detect Screen Size */
onMounted(() => {
    const handleResize = () => {
        isSmallScreen.value = window.innerWidth < 640;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    fetchPackages();
});
</script>


<style scoped>
a:hover i {
    transform: scale(1.2);
    transition: transform 0.2s ease-in-out;
}
</style>