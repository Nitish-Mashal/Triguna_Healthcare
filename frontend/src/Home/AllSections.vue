<template>
    <div>
        <!-- ⭐ Promotions for DESKTOP (only if data exists) -->
        <div v-if="promotions" class="hidden sm:block">
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

<script setup>
import axios from "axios";
import { ref, onMounted, onUnmounted, defineAsyncComponent } from "vue";

// =====================================================
// COMPONENTS
// =====================================================

const Promotions = defineAsyncComponent(() =>
    import("./Promotions.vue")
);

const MostBookedHealthCheckups = defineAsyncComponent(() =>
    import("./MostBookedHealthCheckups.vue")
);

const MostBookedBloodTests = defineAsyncComponent(() =>
    import("./MostBookedBloodTests.vue")
);

const OurWorkFlow = defineAsyncComponent(() =>
    import("./OurWorkFlow.vue")
);

const HealthPackageCategories = defineAsyncComponent(() =>
    import("./HealthPackageCategories.vue")
);

const Testimonial = defineAsyncComponent(() =>
    import("./Testimonial.vue")
);

const Certificates = defineAsyncComponent(() =>
    import("./Certificates.vue")
);

const FAQ = defineAsyncComponent(() =>
    import("./FAQ.vue")
);

const CitiesWeAreIn = defineAsyncComponent(() =>
    import("./CitiesWeAreIn.vue")
);


// =====================================================
// STATE
// =====================================================

const promotions = ref([]);

const HOME_SCHEMA_ID = "triguna-home-schema";


// =====================================================
// HOME PAGE SCHEMA
// =====================================================

const homeSchema = {
    "@context": "https://schema.org",

    "@graph": [
        {
            "@type": "Organization",

            "@id": "https://trigunahealthcare.com/#organization",

            "name": "Triguna Healthcare",

            "alternateName":
                "Triguna Healthcare Online Pathology & Online Diagnostics Services",

            "url": "https://trigunahealthcare.com/",

            "logo":
                "https://www.trigunahealthcare.com/assets/triguna_healthcare/Thyrocare.png",

            "description":
                "Triguna Healthcare is an official online partner of Thyrocare Technologies Limited, offering blood tests, urine tests, full body health checkups, and home sample collection services across India.",

            "telephone": "+91-9611011266",

            "contactPoint": {
                "@type": "ContactPoint",

                "telephone": "+91-9611011266",

                "contactType": "Customer Service",

                "availableLanguage": [
                    "English",
                    "Hindi",
                    "Kannada"
                ]
            },

            "areaServed": {
                "@type": "Country",
                "name": "India"
            },

            "parentOrganization": {
                "@type": "Organization",

                "name": "Thyrocare Technologies Limited",

                "url": "https://thyrocare.com"
            },

            "sameAs": [
                "https://www.facebook.com/trigunahealthcares",
                "https://www.instagram.com/trigunahealthcare/",
                "https://www.linkedin.com/company/triguna-healthcare/",
                "https://www.youtube.com/@trigunahealthcares",
                "https://medium.com/@trigunahealthcare",
                "https://x.com/Trigunahealth"
            ]
        },


        // =================================================
        // WEBSITE
        // =================================================

        {
            "@type": "WebSite",

            "@id": "https://trigunahealthcare.com/#website",

            "url": "https://trigunahealthcare.com/",

            "name": "Triguna Healthcare",

            "description":
                "Online booking platform for preventive health checkups, blood tests, urine tests, and home sample collection across India.",

            "publisher": {
                "@id":
                    "https://trigunahealthcare.com/#organization"
            }
        },


        // =================================================
        // WEB PAGE
        // =================================================

        {
            "@type": "WebPage",

            "@id": "https://trigunahealthcare.com/#webpage",

            "url": "https://trigunahealthcare.com/",

            "name":
                "Triguna Healthcare - Online Health Checkups & Blood Tests",

            "description":
                "Book blood tests, urine tests, full body health checkups and home sample collection services across India.",

            "isPartOf": {
                "@id":
                    "https://trigunahealthcare.com/#website"
            },

            "about": {
                "@id":
                    "https://trigunahealthcare.com/#organization"
            }
        },


        // =================================================
        // FAQ
        // =================================================

        {
            "@type": "FAQPage",

            "@id": "https://trigunahealthcare.com/#faq",

            "mainEntity": [
                {
                    "@type": "Question",

                    "name":
                        "Is a doctor's prescription mandatory to book a test?",

                    "acceptedAnswer": {
                        "@type": "Answer",

                        "text":
                            "No. A doctor's prescription is not required to book preventive health checkups or routine diagnostic blood tests."
                    }
                },

                {
                    "@type": "Question",

                    "name":
                        "How long does it take to receive the medical diagnostic report?",

                    "acceptedAnswer": {
                        "@type": "Answer",

                        "text":
                            "Most reports are delivered within 6 to 24 hours after the sample reaches Thyrocare's central processing laboratory, depending on the test."
                    }
                },

                {
                    "@type": "Question",

                    "name":
                        "How is the blood sample collected?",

                    "acceptedAnswer": {
                        "@type": "Answer",

                        "text":
                            "A trained and certified phlebotomist visits your home to collect the blood sample using sterile equipment while following standard safety protocols."
                    }
                }
            ]
        },


        // =================================================
        // SERVICE
        // =================================================

        {
            "@type": "Service",

            "@id": "https://trigunahealthcare.com/#service",

            "name":
                "Online Pathology and Diagnostic Services",

            "serviceType": [
                "Blood Tests",
                "Urine Tests",
                "Full Body Health Checkups",
                "Home Blood Sample Collection"
            ],

            "description":
                "Triguna Healthcare provides online pathology booking, preventive health checkups, home blood sample collection, and laboratory diagnostic services across India through its official partnership with Thyrocare Technologies Limited.",

            "provider": {
                "@id":
                    "https://trigunahealthcare.com/#organization"
            },

            "areaServed": {
                "@type": "Country",
                "name": "India"
            },

            "offers": {
                "@type": "Offer",

                "priceCurrency": "INR",

                "availability":
                    "https://schema.org/InStock",

                "eligibleRegion": {
                    "@type": "Country",
                    "name": "India"
                }
            },

            "hasOfferCatalog": {
                "@type": "OfferCatalog",

                "name":
                    "Laboratory Testing Services",

                "itemListElement": [
                    {
                        "@type": "OfferCatalog",
                        "name": "Blood Tests"
                    },
                    {
                        "@type": "OfferCatalog",
                        "name": "Urine Tests"
                    },
                    {
                        "@type": "OfferCatalog",
                        "name": "Full Body Health Checkups"
                    },
                    {
                        "@type": "OfferCatalog",
                        "name": "Home Blood Sample Collection"
                    }
                ]
            }
        }
    ]
};


// =====================================================
// ADD SCHEMA TO HEAD
// =====================================================

const addHomeSchema = () => {
    // Prevent duplicate schema
    if (document.getElementById(HOME_SCHEMA_ID)) {
        return;
    }

    const script = document.createElement("script");

    script.id = HOME_SCHEMA_ID;

    script.type = "application/ld+json";

    script.textContent = JSON.stringify(homeSchema);

    document.head.appendChild(script);
};


// =====================================================
// REMOVE SCHEMA
// =====================================================

const removeHomeSchema = () => {
    const script = document.getElementById(HOME_SCHEMA_ID);

    if (script) {
        script.remove();
    }
};


// =====================================================
// API / OTHER EXISTING LOGIC
// =====================================================

const loadPromotions = async () => {
    try {
        // Your existing API logic here

        // Example:
        // const response = await axios.get("/api/...");
        // promotions.value = response.data;

    } catch (error) {
        console.error("Failed to load promotions:", error);
    }
};


// =====================================================
// LIFECYCLE
// =====================================================

onMounted(() => {
    // Add Home page Schema.org
    addHomeSchema();

    // Your existing API calls
    loadPromotions();
});


// Remove Home page schema when leaving the page
onUnmounted(() => {
    removeHomeSchema();
});
</script>