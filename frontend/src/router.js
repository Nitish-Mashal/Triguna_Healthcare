import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/Home/HeroSection.vue"),
    meta: {
      title: "Blood Tests & Full Body Health Checkups | Triguna Healthcare",
      description:
        "Triguna Healthcare, official Thyrocare partner, offers blood tests, full body health checkups & home sample collection. Book your Lab Tests online today.",
    },
  },
  {
    path: "/city/:city",
    name: "HomeByCity",
    component: () => import("@/Home/HeroSection.vue"),
    props: true,
    meta: {
      title: "Blood Tests Near You | Triguna Healthcare",
      description:
        "Book blood tests and health checkups with free home sample collection.",
    },
  },
  {
    path: "/full-body-health-checkups/:category?",
    name: "HealthCheckupList",
    component: () => import("@/HealthCheckupDetails/HealthCheckupList.vue"),
    props: true,
    meta: {
      title: "Book Full Body Health Checkups at Home | Triguna Healthcare",
      description:
        "Book full body health checkups at home with Triguna Healthcare, an official Thyrocare partner offering lab tests and professional home sample collection.",
    },
  },
  {
    path: "/book-blood-tests",
    name: "BloodTestList",
    component: () => import("@/BloodTest/BloodTestList.vue"),
    meta: {
      title: "Book Blood Tests at Home | Triguna Healthcare",
      description:
        "Book blood tests online at home with Triguna Healthcare, an official Thyrocare partner offering professional lab tests and home sample collection.",
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
      title: "Join Triguna Healthcare | Careers & Job Opportunities in Healthcare",
      description:
        "Explore exciting career opportunities at Triguna Healthcare. Join our team of healthcare and technology professionals dedicated to delivering reliable diagnostic services and exceptional patient care. Apply now to grow your career with us.",
    },
  },
  {
    path: "/ApplyJob",
    name: "JobApply",
    component: () => import("@/Careers/JobApply.vue"),
    meta: {
      title: "Join Triguna Healthcare | Careers & Job Opportunities in Healthcare",
      description:
        "Explore exciting career opportunities at Triguna Healthcare. Join our team of healthcare and technology professionals dedicated to delivering reliable diagnostic services and exceptional patient care. Apply now to grow your career with us.",
    },
  },
  {
    path: '/qrcodedata',
    name: 'QRcodeData',
    component: () => import('@/QRscan/QRcodeData.vue'),
  },
  {
    path: '/blog',
    name: 'BlogsPreview',
    component: () => import('@/Blogs/BlogsPreview.vue'),
    meta: {
      title: "Health & Wellness Blog | Triguna Healthcare",
      description:
        "Stay updated with the latest health tips, diagnostic guides, and wellness advice from Triguna Healthcare. Your trusted source for blood test and health checkup information.",
    },
  },
  {
    path: '/blogdetails/:slug',
    name: 'BlogDetails',
    component: () => import('@/Blogs/BlogDetails.vue'),
    meta: {
      title: "Triguna Healthcare - Health Blog",
      description:
        "Explore informative health articles on Triguna Healthcare blog. Stay updated on lab tests, wellness, and healthcare insights.",
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
    path: '/terms-and-conditions',
    name: 'TermsAndCondition',
    component: () => import('@/Pages/TermsAndCondition.vue'),
    meta: {
      title: "Terms & Conditions | Triguna Healthcare",
      description:
        "Read the Terms & Conditions of Triguna Healthcare to know the rules, responsibilities, and policies while using our website and services.",
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
    path: '/address/:slug',
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
      title: "About Us | Triguna Healthcare",
      description:
        "Learn about Triguna Healthcare, an official Thyrocare partner offering blood tests, full body health checkups & professional home sample collection. Book online today.",
    },
  },
  {
    path: '/privacy-policy',
    name: 'PrivavyAndPolicy',
    component: () => import('@/Pages/PrivavyAndPolicy.vue'),
    meta: {
      title: "Privacy Policy | Triguna Healthcare",
      description:
        "Read the Privacy Policy of Triguna Healthcare to understand how we collect, use, and protect your personal information on our website and services.",
    },
  },

  {
    path: '/FAQs',
    name: 'FAQDetails',
    component: () => import('@/Home/FAQDetails.vue'),
    meta: {
      title: "Frequently Asked Questions | Triguna Healthcare",
      description:
        "Find answers to common questions about blood tests, full body health checkups, and home sample collection with Triguna Healthcare. Official Thyrocare partner.",
    },
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
router.beforeEach((to, from, next) => {
  // Set document title
  document.title = to.meta.title || "Blood Test Near Me";

  // Update or create <meta name="description">
  const metaDescription = document.querySelector("meta[name='description']");
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      to.meta.description ||
      "Book affordable blood tests and health checkups at home."
    );
  } else {
    const meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute(
      "content",
      to.meta.description ||
      "Book affordable blood tests and health checkups at home."
    );
    document.head.appendChild(meta);
  }

  next();
});


export default router;
