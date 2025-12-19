import { defineStore } from "pinia";
import { ref, computed, watch, onMounted } from "vue";

export const useCartStore = defineStore("cart", () => {
    const cartItems = ref([]);
    const homeCollectionCharge = ref(99); // Example static charge

    // ✅ Load saved cart on store initialization
    const loadCartFromLocalStorage = () => {
        const saved = localStorage.getItem("cartItems");
        if (saved) {
            try {
                cartItems.value = JSON.parse(saved);
            } catch (err) {
                console.error("Error parsing saved cart:", err);
                cartItems.value = [];
            }
        }
    };

    // Call this once store is used
    loadCartFromLocalStorage();

    // ✅ Add item to cart
    const addToCart = (pkg) => {
        const exists = cartItems.value.some((item) => item.name1 === pkg.name1);
        if (!exists) {
            cartItems.value.push({ ...pkg });
            localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
        }
    };

    // ✅ Remove item from cart
    const removeFromCart = (pkgName) => {
        cartItems.value = cartItems.value.filter((item) => item.name1 !== pkgName);
        localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
    };

    // ✅ Clear cart
    const clearCart = () => {
        cartItems.value = [];
        localStorage.removeItem("cartItems");
    };

    // ✅ Computed properties
    const totalPackagePrice = computed(() =>
        cartItems.value.reduce((sum, i) => sum + Number(i.discounted_price || 0), 0)
    );

    const totalAmount = computed(
        () => totalPackagePrice.value + homeCollectionCharge.value
    );

    const cartCount = computed(() => cartItems.value.length);

    // ✅ Automatically sync changes to localStorage
    watch(
        cartItems,
        (newVal) => {
            localStorage.setItem("cartItems", JSON.stringify(newVal));
        },
        { deep: true }
    );

    return {
        cartItems,
        homeCollectionCharge,
        totalPackagePrice,
        totalAmount,
        cartCount,
        addToCart,
        removeFromCart,
        clearCart,
    };
});
