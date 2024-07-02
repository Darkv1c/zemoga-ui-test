<script setup lang="ts">
import type { CheckButtonProps } from './check-button.types'
import { CheckButtonVariant } from './check-button.types'
const props = withDefaults(defineProps<CheckButtonProps>(), {
    variant: CheckButtonVariant.Primary,
});
const checked = defineModel<boolean>('checked', { default: false });
const styles = useCssModule('styles');

const classes = computed(() => ({
    [styles.container]: true,
    [styles.isChecked]: checked.value,
    [styles.secondary]: props.variant === CheckButtonVariant.Secondary,
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
@import '../../styles/index.scss';

.container {
    box-sizing: border-box;
    background-color: black;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    background-color: $positive-solid;

    &.isChecked {
        border: 1px solid $white;
    }

    &.secondary {
        background-color: $negative-solid;
    }
}
</style>