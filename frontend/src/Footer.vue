<template>
    <footer class="global-bg-color px-4 sm:px-5 py-6 mt-4 text-white">
        <div class="container sm:px-5">
            <!-- ✅ Social Media Icons -->
            <nav class="flex justify-start gap-4 mb-4 flex-wrap ml-4 sm:ml-8">
                <a v-for="(icon, index) in socialLinks" :key="index" :href="icon.url" target="_blank"
                    rel="noopener noreferrer"
                    class="text-white text-lg hover:text-gray-300 transition-transform transform hover:scale-110"
                    :aria-label="icon.name">
                    <i :class="icon.icon"></i>
                </a>
            </nav>

            <!-- ✅ Footer Sections -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-left">
                <!-- Quick Links -->
                <div>
                    <h2 class="font-bold text-lg sm:text-xl mb-3 ml-8">Quick Links</h2>
                    <ul class="space-y-2 text-sm">
                        <li v-for="(link, index) in quickLinks" :key="'q' + index">
                            <router-link :to="link.path"
                                class="text-white no-underline hover:underline focus:outline-none focus:underline">
                                {{ link.name }}
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- Most Popular Packages -->
                <div :class="[
                    'transition-all',
                    otherPackages.length > 0 ? 'mb-3' : 'mb-6',
                    isSmallScreen ? 'mb-2' : ''
                ]">
                    <h2 class="font-bold text-lg sm:text-xl mb-3 sm:mb-3 ml-8">
                        Most Popular Packages
                    </h2>
                    <ul class="space-y-2 text-sm">
                        <li v-for="(pkg, index) in popularPackages" :key="'p' + index">
                            <router-link :to="{ name: 'SinglePackageBook', params: { slug: pkg.url } }"
                                class="text-white no-underline hover:underline cursor-pointer">
                                {{ pkg.name }}
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- Other Packages -->
                <div v-if="otherPackages.length > 0">
                    <h2 class="font-bold text-lg sm:text-xl mb-3 sm:mb-3 ml-8">
                        Other Packages
                    </h2>
                    <ul class="space-y-2 text-sm">
                        <li v-for="(pkg, index) in otherPackages" :key="'o' + index">
                            <router-link :to="{ name: 'SinglePackageBook', params: { slug: pkg.url } }"
                                class="text-white no-underline hover:underline cursor-pointer">
                                {{ pkg.name }}
                            </router-link>
                        </li>
                    </ul>
                </div>

            </div>

            <!-- ✅ Footer Bottom -->
            <div :class="[
                'flex flex-col md:flex-row items-start md:items-center text-sm gap-4 sm:gap-20 ml-4 sm:ml-8',
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
    { name: "Facebook", url: "https://www.facebook.com/BloodTestNearme/", icon: "bi bi-facebook" },
    { name: "Twitter", url: "https://x.com/BloodTestNearMe/", icon: "bi bi-twitter" },
    { name: "Instagram", url: "https://www.instagram.com/bloodtestnearme/", icon: "bi bi-instagram" },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/blood-test-near-me/", icon: "bi bi-linkedin" },
    { name: "YouTube", url: "https://www.youtube.com/@bloodtestnearme", icon: "bi bi-youtube" },
    { name: "Medium", url: "https://medium.com", icon: "bi bi-medium" },
];

const quickLinks = [
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
    { name: "Blogs", path: "/blogspreview" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-Conditions" },
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