<script setup lang="ts">
const checked = defineModel<boolean>('checked', { default: false });
const styles = useCssModule('styles');

const classes = computed(() => ({
    [styles.isChecked]: checked.value,
}));

function toggleCheck() {
    checked.value = !checked.value;
}
</script>

<template>
    <button @click="toggleCheck" :class="classes">
        <slot />
    </button>
</template>

<style lang="scss" module="styles">
.isChecked {
    color: red;
}
</style>