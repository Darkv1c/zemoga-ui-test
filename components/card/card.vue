<script setup lang="ts">
import type { CardProps } from './card.types';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Button from '../button/button.vue';

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo('en-US')

const props = defineProps<CardProps>()

const formattedDate = computed(() => {
  return `${timeAgo.format(props.topic.lastUpdated)} in ${props.topic.category}`
});
</script>

<template>
  <div>
    {{ topic.name }} {{ topic.description }} {{ formattedDate }} {{ topic.category }} {{
      topic.votesPercentage.positive }}% {{ topic.votesPercentage.negative
    }}%
    <NuxtImg :src="topic.picture" alt="topic image" />
    <Button text="Vote Now" />
  </div>
</template>

<style scoped></style>