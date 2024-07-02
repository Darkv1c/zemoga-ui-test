<script setup lang="ts">
import { CheckButtonVariant } from '../check-button/check-button.types';
</script>

<template>
    <div :class="styles.voteContainer">
        <CheckButton><img :class="styles.thumb" src="/assets/img/thumbs-up.svg" alt="Positive" /></CheckButton>
        <CheckButton :variant="CheckButtonVariant.Secondary"><img :class="styles.thumb"
                src="/assets/img/thumbs-down.svg" alt="Negative" /></CheckButton>
        <Button text="Vote Now" />
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