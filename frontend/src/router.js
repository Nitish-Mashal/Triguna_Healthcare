import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/Home/HeroSection.vue"),
    meta: {
      title: "Blood Tests | Full Body Health Checkups | Thyrocare",
      description:
        "Book blood tests and full body health checkup packages online at Thyrocare Bangalore. Get accurate lab tests at home with free sample collection.",
    },
  },
  {
    path: "/health-checkup-packages/:category?",
    name: "HealthCheckupList",
    component: () => import("@/HealthCheckupDetails/HealthCheckupList.vue"),
    props: true,
    meta: {
      title: "Thyrocare Full Body Health Checkup Packages in Bangalore",
      description:
        "Explore the best full body health checkup packages offered by Thyrocare in Bangalore. Affordable and reliable tests at home.",
    },
  },
  {
    path: "/blood-test-online",
    name: "BloodTestList",
    component: () => import("@/BloodTest/BloodTestList.vue"),
    meta: {
      title: "Book Blood Tests in Bangalore | Thyrocare Lab",
      description:
        "Book blood tests online in Bangalore with Thyrocare. Get free home sample collection and quick digital reports.",
    },
  },
  {
    path: "/:url",
    name: "HealthCheckupDetails",
    component: () => import("@/HealthCheckupDetails/HealthCheckupDetails.vue"),
    props: true,
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: () => import("@/NotFound.vue"),
    props: true,
  },
  {
    path: "/book/:slug",
    name: "SinglePackageBook",
    component: () => import("@/SinglePackageBook/SinglePackageBook.vue"),
    props: true,
  },
  {
    path: "/CartPage",
    name: "CartPage",
    component: () => import("@/CartPage/CartPage.vue"),
    meta: {
      title: "Online Blood Test At Home | Full Body Checkup | Cart",
      description:
        "Review your selected health checkup packages and proceed to checkout easily. Safe and secure online booking.",
    },
  },
  {
    path: "/Careers",
    name: "JobListing",
    component: () => import("@/Careers/JobListing.vue"),
    meta: {
      title: "Join Blood Test Near Me | Careers & Job Opportunities in Healthcare",
      description:
        "Explore exciting career opportunities at Blood Test Near Me. Join our team of healthcare and technology professionals dedicated to delivering reliable diagnostic services and exceptional patient care. Apply now to grow your career with us.",
    },
  },
  {
    path: "/ApplyJob",
    name: "JobApply",
    component: () => import("@/Careers/JobApply.vue"),
    meta: {
      title: "Join Blood Test Near Me | Careers & Job Opportunities in Healthcare",
      description:
        "Explore exciting career opportunities at Blood Test Near Me. Join our team of healthcare and technology professionals dedicated to delivering reliable diagnostic services and exceptional patient care. Apply now to grow your career with us.",
    },
  },
  {
    path: '/qrcodedata',
    name: 'QRcodeData',
    component: () => import('@/QRscan/QRcodeData.vue'),
  },

  {
    path: '/blogspreview',
    name: 'BlogsPreview',
    component: () => import('@/Blogs/BlogsPreview.vue'),
    meta: {
      title: "Blood Test Near Me - Health Blog",
      description:
        "Explore informative health articles on Blood Test Near Me blog. Stay updated on lab tests, wellness, and healthcare insights.",
    },
  },
  {
    path: '/blogdetails',
    name: 'BlogDetails',
    component: () => import('@/Blogs/BlogDetails.vue'),
    meta: {
      title: "Blood Test Near Me - Health Blog",
      description:
        "Explore informative health articles on Blood Test Near Me blog. Stay updated on lab tests, wellness, and healthcare insights.",
    },
  },
  {
    path: '/add-diagnostic-center',
    name: 'AddDiagnosticCenter',
    component: () => import('@/Address/AddDiagnosticCenter.vue'),
    meta: {
      title: "Book Blood Tests in Bangalore | Thyrocare Lab",
      description:
        "Book blood tests online in Bangalore with Thyrocare. Get free home sample collection and quick digital reports.",
    },
  },
  {
    path: '/labs-near-me',
    name: 'LabsNearMe',
    component: () => import('@/Address/LabsNearMe.vue'),
    meta: {
      title: "Book Blood Tests in Bangalore | Thyrocare Lab",
      description:
        "Book blood tests online in Bangalore with Thyrocare. Get free home sample collection and quick digital reports.",
    },
  },
  {
    path: '/terms-Conditions',
    name: 'TermsAndCondition',
    component: () => import('@/Pages/TermsAndCondition.vue'),
    meta: {
      title: "Book Blood Tests in Bangalore | Terms and Conditions",
      description:
        "Book blood tests online in Bangalore with Thyrocare. Get free home sample collection and quick digital reports.",
    },
  },
  {
    path: '/contact-us',
    name: 'ContactUs',
    component: () => import('@/Pages/ContactUs.vue'),
    meta: {
      title: "Contact Us | Thyrocare Health Checkups and Blood Tests",
      description:
        "Contact Thyrocare Bangalore for home blood sample collection. Call us or book online for reliable diagnostics at your convenience.",
    },
  },
  {
    path: '/AddressDetails',
    name: 'AddressDetails',
    component: () => import('@/Pages/AddressDetails.vue'),
    meta: {
      title: "AddressDetails | Thyrocare Health Checkups and Blood Tests",
      description:
        "Contact Thyrocare Bangalore for home blood sample collection. Call us or book online for reliable diagnostics at your convenience.",
    },
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: () => import('@/Pages/AboutUs.vue'),
    meta: {
      title: "About Blood Test Near Me - Thyrocare Bangalore",
      description:
        "Explore lab tests in Bangalore. Home sample collection, health packages, and online booking. Your health journey starts here",
    },
  },
  {
    path: '/privacy-policy',
    name: 'PrivavyAndPolicy',
    component: () => import('@/Pages/PrivavyAndPolicy.vue'),
    meta: {
      title: "Book Blood Tests in Bangalore | Privacy and policy",
      description:
        "Book blood tests online in Bangalore with Thyrocare. Get free home sample collection and quick digital reports.",
    },
  },

  {
    path: '/faq-details',
    name: 'FAQDetails',
    component: () => import('@/Home/FAQDetails.vue'),
  },

  // Catch All 404 | This should be the last route always
  {
    path: "/:pathMatch(.*)*",
    redirect: "/not-found"
  },

]

const router = createRouter({
  history: createWebHistory(""),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// ✅ Global hook to set title and meta description
router.afterEach((to) => {
  const isHome = to.path === "/";

  const ogSelectors = [
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[property="og:type"]',
    'meta[property="og:url"]',
    'meta[property="og:image"]',
    'meta[name="twitter:card"]',
    'meta[name="twitter:title"]',
    'meta[name="twitter:description"]',
    'meta[name="twitter:image"]',
  ];

  if (!isHome) {
    ogSelectors.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) el.remove(); // 🔥 hard remove
    });
  }
});


export default router;
