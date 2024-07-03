<script setup lang="ts" generic="OptionType">
import type { SelectOption, SelectProps } from './select.types'

defineProps<SelectProps<OptionType>>()
const currentOption = defineModel<OptionType>('currentOption')

</script>

<template>
    <select v-model="currentOption">
        <option v-for="option in options" :value="option.value">
            {{ option.label }}
        </option>
    </select>
</template>


<style scoped></style>