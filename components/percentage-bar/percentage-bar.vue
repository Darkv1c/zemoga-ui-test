<script setup lang="ts">
import type { PercentageBarProps } from './percentage-bar.types'

const props = defineProps<PercentageBarProps>()

const positivePercentage = `${props.positive}%`
const negativePercentage = `${props.negative}%`
</script>

<template>
    <div :class="styles.percentageBar">
        <span :class="styles.positive">
            <img :class="styles.thumb" src="/assets/img/thumbs-up.svg" alt="Positive" />
            {{ positivePercentage }}
        </span>
        <span :class="styles.negative">
            {{ negativePercentage }}
            <img :class="styles.thumb" src="/assets/img/thumbs-down.svg" alt="Negative" />
        </span>
    </div>
</template>

<style lang="scss" module="styles">
@import '../../styles/index.scss';

.percentageBar {
    display: flex;

    .positive,
    .negative {
        display: flex;
        gap: 6px;
        box-sizing: border-box;
        padding: 10px 12px;
    }

    .positive {
        background-color: $positive-vote;
        width: v-bind(positivePercentage);
    }

    .negative {
        justify-content: flex-end;
        background-color: $negative-vote;
        width: v-bind(negativePercentage);
    }

    .thumb {
        width: 0.938rem;
        height: 0.938rem;
    }
}
</style>