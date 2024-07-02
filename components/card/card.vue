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
  <div :class="`${styles.container}`" :style="{ backgroundImage: `url(${topic.picture})` }">
    <div :class="`${styles.title}`">{{ topic.name }}</div>
    <div :class="`${styles.description}`">{{ topic.description }}</div>
    <div :class="`${styles.time}`">{{ formattedDate }} </div>
    <Button text="Vote Now" />
    {{
    topic.votesPercentage.positive }}% {{ topic.votesPercentage.negative
    }}%
  </div>
</template>

<style lang="scss" module="styles">
.container {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  box-sizing: border-box;
  padding: 36px;
  overflow: hidden;
  background-size: cover;
  background-position: center;

  & * {
    color: #FFFFFF;
  }

  .title {
    font-size: 1.875rem;
    font-weight: 400;
    line-height: 2.25rem;
    margin-top: auto;
    margin-bottom: 8px;
    overflow: hidden;
  }

  .description {
    font-size: 0.938rem;
    font-weight: 400;
    line-height: 1.125rem;
    margin-bottom: 12px;
  }

  .title,
  .description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .time {
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 0.9rem;
    margin-bottom: 12px;
    margin-left: auto;
  }
}
</style>