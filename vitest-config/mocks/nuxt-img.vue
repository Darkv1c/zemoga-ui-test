<script setup>
defineProps(['src', 'alt']);
</script>

<template>
    <img :src="src" :alt="alt" />
</template>