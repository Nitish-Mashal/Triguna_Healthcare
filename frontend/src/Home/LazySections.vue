<template>
    <div ref="container" class="lazy-sections-wrapper">
        <!-- Optional placeholder -->
        <div v-if="!visible" class="flex items-center justify-center min-h-[150px] text-gray-400">
            <span>Loading content...</span>
        </div>

        <!-- Actual content -->
        <component v-if="visible" :is="AllSections" />
    </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, defineAsyncComponent } from "vue";

export default {
    name: "LazySections",
    setup() {
        const container = ref(null);
        const visible = ref(false);

        const AllSections = defineAsyncComponent(() => import("./AllSections.vue"));

        let observer;

        onMounted(() => {
            observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        visible.value = true;
                        observer.disconnect();
                    }
                },
                { rootMargin: "300px", threshold: 0.1 }
            );
            observer.observe(container.value);
        });

        onBeforeUnmount(() => {
            if (observer) observer.disconnect();
        });

        return { container, visible, AllSections };
    },
};
</script>

<style scoped>
.lazy-sections-wrapper {
    width: 100%;
}
</style>
