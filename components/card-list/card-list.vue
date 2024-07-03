<script setup lang="ts">
import type { CardListProps } from './card-list.types';

defineProps<CardListProps>()
</script>

<template>
    <div :class="styles.container">
        <slot />
    </div>
</template>

<style lang="scss" module="styles">
.container {
    display: flex;
    flex-direction: v-bind("list ? 'column' : 'row'");
    gap: 12px;
    padding: 24px 16px 0;
    max-width: 100%;
    overflow-x: auto;
}
</style>