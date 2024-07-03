<script setup lang="ts">
import { CheckButtonVariant } from '../check-button/check-button.types';
import type { CheckButtonCombo } from './check-button-combo.types';

const props = defineProps<CheckButtonCombo>()

const emit = defineEmits<{
    buttonClick: [{
        votes: {
            positive: boolean,
            negative: boolean,
        },
    }],
}>()

const isPositive = ref(false);

const isNegative = ref(false);

const isButtonDisabled = computed(() => {
    return !props.keepButtonAvailable && (!isPositive.value && !isNegative.value);
});

function onClick() {
    emit('buttonClick', {
        votes: {
            positive: isPositive.value,
            negative: isNegative.value,
        },
    });
}


watch(isPositive, () => {
    if (isPositive.value) {
        isNegative.value = false;
    }
});
watch(isNegative, () => {
    if (isNegative.value) {
        isPositive.value = false;
    }
});
</script>

<template>
    <div :class="styles.voteContainer">
        <CheckButton v-model:checked="isPositive"><img :class="styles.thumb" src="/assets/img/thumbs-up.svg"
                alt="Positive" /></CheckButton>
        <CheckButton v-model:checked="isNegative" :variant="CheckButtonVariant.Secondary"><img :class="styles.thumb"
                src="/assets/img/thumbs-down.svg" alt="Negative" /></CheckButton>
        <Button @click="onClick" :text="buttonText" :disabled="isButtonDisabled" />
    </div>
</template>

<style lang="scss" module="styles">
.voteContainer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;

    img {
        width: 1rem;
        height: 1rem;
    }
}
</style>