<script setup lang="ts">
import type { ButtonProps } from './button.types';

defineProps<ButtonProps>()
</script>

<template>
    <button :class="styles.container" :disabled="disabled">
        {{ text }}
    </button>
</template>

<style lang="scss" module="styles">
@import '../../styles/index';

.container {
    box-sizing: border-box;
    padding: 10px 20px;
    width: fit-content;
    border: 1px solid $white;

    &,
    &:active:not([disabled]) {
        background-color: $button;
    }

    &[disabled] {
        cursor: not-allowed;
    }

    cursor: pointer;
    font-size: 0.938rem;
    font-weight: 400;
    line-height: 1.125rem;
    text-align: center;

    &:hover:not(:active):not([disabled]) {
        background-color: $black;
    }
}
</style>