<script setup lang="ts">
import type { CardProps } from './card.types';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import PercentageBar from '../percentage-bar/percentage-bar.vue';
import { CheckButtonVariant } from '../check-button/check-button.types';

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo('en-US')

const props = defineProps<CardProps>()

const topicImage = `url(${props.topic.picture})`

const mainlyPositive = computed(() => {
  return props.topic.votesPercentage.positive > 50
})

const formattedDate = computed(() => {
  return `${timeAgo.format(props.topic.lastUpdated)} in ${props.topic.category}`
});

const backgroundImage = computed(() => {
  if (!props.list) {
    return topicImage
  }

  const gradient = `linear-gradient(
    to right, 
    rgba(0, 0, 0, 0.0001) 0%, 
    #888888 19.79%, 
    #666666 50%, 
    rgba(51, 51, 51, 0.6) 71.88%
  )`
  return `${gradient}, ${topicImage}`
})
</script>

<template>
  <div :class="styles.container">
    <div :class="styles.infoContainer">
      <div />
      <div :class="styles.titleAndDescription">
        <div :class="styles.titleContainer">
          <CheckButton v-if="mainlyPositive" :class="styles.titleThumb"><img :class="styles.thumb"
              src="/assets/img/thumbs-up.svg" alt="Positive" />
          </CheckButton>
          <CheckButton v-else :class="styles.titleThumb" :variant="CheckButtonVariant.Secondary"><img
              :class="styles.thumb" src="/assets/img/thumbs-down.svg" alt="Negative" /></CheckButton>
          <div :class="styles.title">
            {{ topic.name }}
          </div>
        </div>
        <div :class="styles.description">{{ topic.description }}</div>
      </div>
      <div :class="styles.vote">
        <div :class="styles.time">{{ formattedDate }} </div>
        <CheckButtonCombo />
      </div>
    </div>
    <PercentageBar :positive="topic.votesPercentage.positive" :negative="topic.votesPercentage.negative" />
  </div>
</template>

<style lang="scss" module="styles">
@import '../../styles/index.scss';

.maxTwoLines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.container {
  position: v-bind("list ? 'static' : 'relative'");
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: v-bind("list ? '100%' : '300px'");
  min-height: v-bind("list ? '140px' : '300px'");
  overflow: hidden;
  z-index: 2;

  &::before {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform: v-bind("list ? 'scale(1.5)' : 'none'");
    transform-origin: left;
    background-size: v-bind("list ? 'contain' : 'cover'");
    background-repeat: no-repeat;
    background-position: left;
    background-image: v-bind(backgroundImage);
  }

  & * {
    color: $white;
  }

  .infoContainer {
    display: v-bind("list ? 'grid' : 'flex'");
    flex-direction: column;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 28px;
    box-sizing: border-box;
    padding: 12px 36px;
    min-width: 100%;
    flex: 1;

    .titleAndDescription {
      margin-top: v-bind("list ? '' : 'auto'");

      .titleContainer {
        position: v-bind("list ? 'static' : 'relative'");
        margin-top: v-bind("list ? '' : 'auto'");

        .title {
          @extend .maxTwoLines;
          font-size: 1.875rem;
          font-weight: 400;
          line-height: 2.25rem;
          margin-top: auto;
          margin-bottom: 8px;
          overflow: visible;
          overflow-y: hidden;
        }

        .titleThumb {
          position: absolute;
          bottom: v-bind("list ? '' : '0'");
          top: v-bind("list ? '0' : ''");
          right: v-bind("list ? '' : '100%'");
          left: v-bind("list ? '0' : ''");

          img {
            min-width: 1rem;
            min-height: 1rem;
          }
        }
      }


      .description {
        @extend .maxTwoLines;
        font-size: 0.938rem;
        font-weight: 400;
        line-height: 1.125rem;
        margin-bottom: 12px;
      }
    }


    .vote {

      .time {
        font-size: 0.75rem;
        font-weight: 700;
        line-height: 0.9rem;
        margin-bottom: 12px;
        text-align: right;
      }
    }

  }
}
</style>