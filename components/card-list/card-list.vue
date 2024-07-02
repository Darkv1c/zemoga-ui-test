<script setup lang="ts">

</script>

<template>
    <div :class="styles.container">
        <slot />
    </div>
</template>

<style lang="scss" module="styles">
.container {
    display: flex;
    gap: 12px;
    padding: 24px 16px 0;
    max-width: 100%;
    overflow-x: auto;
}
</style>