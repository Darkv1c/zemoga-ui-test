<script setup lang="ts">
import type { ButtonProps } from './button.types';

defineProps<ButtonProps>()
</script>

<template>
    <button>
        {{ text }}
    </button>
</template>


<style scoped></style>