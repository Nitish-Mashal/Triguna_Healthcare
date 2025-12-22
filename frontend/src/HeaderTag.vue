<template>
    <div id="header-container">
        <h1>{{ headerTag }}</h1>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const headerTag = ref('Loading...');

onMounted(async () => {
    const res = await fetch('/api/get-header-tag');
    const data = await res.json();
    if (data.header_tag) headerTag.value = data.header_tag;
});
</script>
